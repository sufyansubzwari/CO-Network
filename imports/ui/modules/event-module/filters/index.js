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
import { DatePickerRange, SalaryRange } from "btech-base-forms-component";
import PropsTypes from "prop-types";
import { connect } from "react-redux";
import {
  cleanFilters,
  setFilters
} from "../../../actions/SideBarActions";
import { GetTags } from "../../../apollo-client/tag";
import { Query } from "react-apollo";

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
      category: [],
      limit: 4
    };
  }

  componentWillMount() {
    this.props.cleanFilters();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.data && !nextProps.data.loading && nextProps.data.tags) {
  //     let category = JSON.parse(JSON.stringify(nextProps.data.tags));
  //     this.setState({
  //       category: category
  //         .filter(item => !!item.used)
  //         .sort((a, b) => b.used - a.used)
  //     });
  //   }
  // }

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
    actives.length > 0 ? (filters.location = actives) : delete filters.location;
    this.setState({ filters: filters }, () =>
      this.props.setFilters("events", filters)
    );
  }

  handleShowMore() {
    if (this.state.limit < this.state.category.length) {
      const newLimit = this.state.limit + 5;
      this.setState({ limit: newLimit });
    } else this.setState({ limit: 5 });
  }

  onSearch(value, tags) {
    let filters = {};
    tags.length
      ? (filters.category = { in: tags.map(item => item._id) })
      : delete filters.category;
    filters = Object.assign({}, filters, this.state.filters);
    this.setState({ filters: filters }, () =>
      this.props.setFilters("events", filters)
    );
  }

  render() {
    return (
      <FiltersContainer
        onSearchAction={(value, tags) => this.onSearch(value, tags)}
        onClose={() => this.props.onClose && this.props.onClose()}
      >
        <FilterItem>
          <GeoInputLocation
            required={false}
            name={"location"}
            model={this.state}
            placeholder={"Location"}
            isGeoLocationAvailable={true}
            onChange={this.notifyParentLocation.bind(this)}
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
            format={"DD-MM"}
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
            query={GetTags}
            variables={{ tags: { type: "EVENT" } }}
            fetchPolicy={"cache-and-network"}
          >
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div>Error</div>;
              return (
                <MLCheckBoxList
                  showMore
                  limit={this.state.limit}
                  title={"Event Category"}
                  sizeList={this.state.category.length}
                  options={
                    data &&
                    data.tags.slice(0, this.state.limit).map((item, key) => ({
                      ...item,
                      number: item.used || 0,
                      active:
                        this.state.category[key] &&
                        this.state.category[key].active
                    }))
                  }
                  onSelect={selected =>
                    this.addFilters("category", selected, data.tags)
                  }
                  onMoreAction={this.handleShowMore.bind(this)}
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
    setFilters: (type, filters) => dispatch(setFilters(type, filters)),
    cleanFilters: () => dispatch(cleanFilters())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsFilters);
