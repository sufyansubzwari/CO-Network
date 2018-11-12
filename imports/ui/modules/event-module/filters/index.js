import React from "react";
import { Layout } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import {
  BigTag,
  FilterItem,
  FiltersContainer,
  MLCheckBoxList,
  Separator
} from "./../../../components";
import {
  CheckBoxList,
  DatePickerRange,
  SalaryRange
} from "btech-base-forms-component";
import PropsTypes from "prop-types";
import { connect } from "react-redux";
import { cleanFilters, setFilters } from "../../../actions/SideBarActions";
import { TagsFilters } from "../../../apollo-client/tag";
import { Query } from "react-apollo";
import { Meteor } from "meteor/meteor";
import { GetMyEvents } from "../../../apollo-client/event";
import { EVENT_TYPE, LOCATION_RANGE_OPTIONS } from "../../../constants";

class EventsFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        address: "",
        location: { lat: "", lng: "" },
        fullLocation: {}
      },
      locationTags: [],
      industry: "",
      filters: {},
      category: EVENT_TYPE,
      limit: 4,
      eventsFilters: [
        {
          label: "My Events",
          active: false
        },
        {
          label: "My Followings",
          active: false
        }
      ],
      locationOptions: LOCATION_RANGE_OPTIONS,
      activeOption: LOCATION_RANGE_OPTIONS[0]
    };
    this.eventTypes = EVENT_TYPE;

    this.handleLocationMiles = this.handleLocationMiles.bind(this);
  }

  componentWillMount() {
    this.props.cleanFilters();
  }

  addFilters(type, actives, options) {
    const obj = JSON.parse(JSON.stringify(options));
    let filters = this.state.filters;
    const selected = obj.map((category, index) => {
      category["active"] = actives[index];
      return category;
    });
    const activeSelected = selected.filter(element => element.active);
    activeSelected.length > 0
      ? (filters[type] = { in: activeSelected.map(item => item._id) })
      : delete filters[type];
    this.setState({ [type]: selected, filters: filters }, () =>
      this.props.setFilters("events", filters)
    );
  }

  notifyParentLocation(model, name, value) {
    if (model && name && value) {
      delete value.fullLocation;
      let locationNew = Object.assign({}, value);
      let locationArray = this.state.locationTags;
      locationArray.push(locationNew);
      this.setState({ locationTags: locationArray }, () => {
        this.tagSelection(locationArray.length - 1);
      });
    }
  }

  tagSelection(key) {
    let tags = this.state.locationTags;
    tags[key].active = !tags[key].active;
    this.setState({ locationTags: tags }, () => this.checkFilters());
  }

  checkFilters() {
    let actives = this.state.locationTags.filter(item => item.active);
    let filters = this.state.filters;
    if (actives.length > 0) {
      filters.location = actives;
      filters.locationRange = this.state.activeOption.value;
    } else {
      delete filters.location;
      delete filters.locationRange;
    }
    this.setState({ filters: filters }, () =>
      this.props.setFilters("events", filters)
    );
  }

  handleShowMore() {
    if (this.state.limit < this.state.category.length) {
      const newLimit = this.state.limit + 5;
      this.setState({ limit: newLimit });
    } else this.setState({ limit: 4 });
  }

  onSearch(value, tags) {
    let category = {
      in: tags
        .map(item => item._id)
        .concat(
          this.state.category
            .filter(item => !!item.active)
            .map(item => item._id)
        )
    };
    category.in.length
      ? (this.state.filters.category = category)
      : delete this.state.filters.category;
    this.setState({ filters: this.state.filters }, () =>
      this.props.setFilters("events", this.state.filters, value)
    );
  }

  eventOwnerFilters(actives, events, followings) {
    const selected = this.state.eventsFilters.map((category, index) => {
      category["active"] = actives[index];
      return category;
    });
    let filter = this.state.filters;
    filter["_id"] = { in: [] };
    if (actives[0]) {
      filter["_id"]["in"] = filter["_id"]["in"].concat(events);
    }
    if (actives[1]) {
      filter["_id"]["in"] = filter["_id"]["in"].concat(followings);
    }
    !actives[0] && !actives[1] ? delete filter["_id"] : null;
    this.setState({ eventsFilters: selected, filters: filter }, () =>
      this.props.setFilters("events", this.state.filters)
    );
  }

  handleLocationMiles(selected) {
    this.setState({ activeOption: selected });
  }

  render() {
    return (
      <FiltersContainer
        {...this.props}
        onSearchAction={(value, tags) => this.onSearch(value, tags)}
        onClose={() => this.props.onClose && this.props.onClose()}
      >
        <FilterItem>
          <GeoInputLocation
            required={false}
            name={"location"}
            model={this.state}
            placeholder={"Location"}
            onChange={this.notifyParentLocation.bind(this)}
            options={this.state.locationOptions}
            activeOption={this.state.activeOption}
            showDropDown={true}
            onSelect={this.handleLocationMiles}
          />
          <Layout
            mt={"10px"}
            customTemplateColumns={"70px 70px 70px"}
            colGap={"10px"}
          >
            {this.state.locationTags.length > 0
              ? this.state.locationTags.map((item, key) => (
                  <BigTag
                    key={key}
                    text={item.address}
                    icon={"pin"}
                    connected={item.active}
                    onClick={() => this.tagSelection(key)}
                  />
                ))
              : null}
          </Layout>
        </FilterItem>
        <Separator />
        <FilterItem>
          <DatePickerRange
            format={"DD-MM-YYYY"}
            labelText={"Dates"}
            placeholder={"dd/mm"}
            getValue={(startDate, endDate) => {
              let filters = this.state.filters;
              startDate
                ? (filters.startDate = { gte: startDate.toISOString() })
                : delete filters.startDate;
              endDate
                ? (filters.endDate = { lte: endDate.toISOString() })
                : delete filters.endDate;

              this.setState(
                {
                  filters: filters
                },
                () => this.props.setFilters("events", this.state.filters)
              );
            }}
          />
        </FilterItem>
        <Separator />
        <FilterItem>
          <SalaryRange
            labelText={"Prices"}
            placeholder={"000"}
            min={this.state.price && this.state.price.min}
            max={this.state.price && this.state.price.max}
            getValue={data => {
              let filters = this.state.filters;
              let options = {};
              data.min ? (options.min = { gte: data.min }) : null;
              data.max ? (options.max = { lte: data.max }) : null;
              filters.tickets = {
                elemMatch: {
                  ...options
                }
              };
              this.setState(
                {
                  filters: filters,
                  price: data
                },
                () => this.props.setFilters("events", this.state.filters)
              );
            }}
          />
        </FilterItem>
        <Separator />
        <FilterItem>
          <Query
            query={TagsFilters}
            variables={{ type: "EVENT", entity: "EVENT", field: "category" }}
            fetchPolicy={"cache-and-network"}
          >
            {({ loading, error, data }) => {
              const tags =
                data &&
                data.tagsFilters &&
                data.tagsFilters
                  .slice(0, this.state.limit)
                  .map((item, key) => ({
                    ...item,
                    active:
                      this.state.category[key] &&
                      this.state.category[key].active
                  }));
              if (loading) return <div />;
              if (error) return <div/>
              return (
                <MLCheckBoxList
                  showMore
                  limit={this.state.limit}
                  title={"Community Event Categories"}
                  sizeList={this.state.category.length}
                  options={tags}
                  onSelect={selected =>
                    this.addFilters("category", selected, tags)
                  }
                  onMoreAction={this.handleShowMore.bind(this)}
                />
              );
            }}
          </Query>
        </FilterItem>
        <Separator />
        <FilterItem>
          <Query
            query={GetMyEvents}
            variables={{ owner: Meteor.userId() }}
            fetchPolicy={"cache-and-network"}
          >
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div/>
              return (
                <CheckBoxList
                  placeholderText={"My Events"}
                  options={this.state.eventsFilters.map((item, key) => ({
                    ...item,
                    number:
                      key === 0
                        ? data.myEvents.myEvents.length
                        : data.myEvents.followings.length
                  }))}
                  getValue={selected =>
                    this.eventOwnerFilters(
                      selected,
                      data.myEvents.myEvents,
                      data.myEvents.followings
                    )
                  }
                />
              );
            }}
          </Query>
        </FilterItem>
      </FiltersContainer>
    );
  }
}

EventsFilters.propTypes = {
  onClose: PropsTypes.func,
  onChange: PropsTypes.func
};

const mapStateToProps = state => {
  const {} = state;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setFilters: (type, filters, text) =>
      dispatch(setFilters(type, filters, text)),
    cleanFilters: () => dispatch(cleanFilters())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsFilters);
