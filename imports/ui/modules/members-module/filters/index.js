import React from "react";
import { Layout } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import {
  BigTag,
  FilterItem,
  FiltersContainer,
  Separator
} from "./../../../components";
import { Query } from "react-apollo";
import { LOOKING_FOR_DEFAULT } from "../../../constants";
import { CheckBoxList } from "btech-base-forms-component";
import { UsersFieldCounts } from "../../../apollo-client/user";
import { cleanFilters, setFilters } from "../../../actions/SideBarActions";
import { connect } from "react-redux";
import { GetFollowFollowers } from "../../../apollo-client/user";

class MembersFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        address: "",
        location: { lat: "", lng: "" },
        fullLocation: {}
      },
      locationTags: [],
      filters: {},
      profile_DOT_knowledge_DOT_lookingFor: [],
      profile_DOT_speaker_DOT_join: [
        { label: "On Speaker Directory", active: false }
      ],
      usersFilters: [
        {
          label: "I'm Followings",
          active: false
        },
        {
          label: "Following Me",
          active: false
        }
      ]
    };
    this.handleScroll = this.handleScroll(this);
    this.handleClose = this.handleClose(this);
  }

  handleScroll() {}

  handleClose() {}

  addFilters(type, actives, options) {
    const obj = JSON.parse(JSON.stringify(options));
    const selected = obj.map((category, index) => {
      category["active"] = actives[index];
      return category;
    });
    const activeSelected = selected.filter(element => element.active);
    const temp = this.state.filters;
    const checked = activeSelected.map(item => ({
      label: item.label
    }));
    temp[type] =
      type === "profile_DOT_speaker_DOT_join"
        ? true
        : { elemMatch: { or: checked } };
    checked.length === 0 ? delete temp[type] : null;
    this.setState({ [type]: selected, filters: temp }, () =>
      this.props.setFilters("members", this.state.filters)
    );
  }

  notifyParentLocation(model, name, value) {
    if (model && name && value) {
      delete value.fullLocation;
      let locationNew = Object.assign({}, value);
      let locationArray = this.state.locationTags;
      locationArray.push(locationNew);
      this.setState({ locationTags: locationArray });
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
      this.props.setFilters("members", filters)
    );
  }

  onSearch(value, tags) {
    let filters = this.state.filters;
    tags.length
      ? (filters.profile_DOT_knowledge_DOT_languages_DOT_tag = {
          in: tags.map(item => item._id)
        })
      : delete filters.profile_DOT_knowledge_DOT_languages_DOT_tag;
    this.setState({ filters: filters }, () =>
      this.props.setFilters("members", filters, value)
    );
  }

  userFollowFilters(actives, followings, followers) {
    const selected = this.state.usersFilters.map((category, index) => {
      category["active"] = actives[index];
      return category;
    });
    let filter = this.state.filters;
    filter["_id"] = { in: [] };
    if (actives[0]) {
      filter["_id"]["in"] = filter["_id"]["in"].concat(followings);
    }
    if (actives[1]) {
      filter["_id"]["in"] = filter["_id"]["in"].concat(followers);
    }
    !actives[0] && !actives[1] ? delete filter["_id"] : null;
    this.setState({ usersFilters: selected, filters: filter }, () =>
      this.props.setFilters("members", this.state.filters)
    );
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
                    onClick={this.tagSelection.bind(this, key)}
                  />
                ))
              : null}
          </Layout>
        </FilterItem>
        <Separator />
        <FilterItem>
          <Query
            query={UsersFieldCounts}
            variables={{ field: "profile.knowledge.lookingFor" }}
          >
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div>Error</div>;
              const elements =
                data.usersFieldCounts && data.usersFieldCounts.length
                  ? data.usersFieldCounts
                  : LOOKING_FOR_DEFAULT.map(e => {
                      e._id = e.label;
                      e.number = 0;
                      return e;
                    });
              return (
                <CheckBoxList
                  placeholderText={"Seeking"}
                  options={elements.map((item, key) => ({
                    ...item,
                    label: item._id,
                    value: item._id,
                    name: item._id,
                    active:
                      this.state.profile_DOT_knowledge_DOT_lookingFor[key] &&
                      this.state.profile_DOT_knowledge_DOT_lookingFor[key]
                        .active
                  }))}
                  getValue={selected =>
                    this.addFilters(
                      "profile_DOT_knowledge_DOT_lookingFor",
                      selected,
                      elements.map(item => ({
                        ...item,
                        label: item._id
                      }))
                    )
                  }
                />
              );
            }}
          </Query>
        </FilterItem>
        <Separator />
        <FilterItem>
          <CheckBoxList
            options={this.state.profile_DOT_speaker_DOT_join}
            getValue={selected =>
              this.addFilters(
                "profile_DOT_speaker_DOT_join",
                selected,
                this.state.profile_DOT_speaker_DOT_join
              )
            }
          />
        </FilterItem>
        <Query query={GetFollowFollowers} fetchPolicy={"cache-and-network"}>
          {({ loading, error, data }) => {
            if (loading) return <div />;
            if (error) return <div>Error</div>;
            return (
              <CheckBoxList
                placeholderText={"My Follows"}
                options={this.state.usersFilters.map((item, key) => ({
                  ...item,
                  number:
                    key === 0
                      ? data.followFollowers.myFollowings.length
                      : data.followFollowers.myFollowers.length
                }))}
                getValue={selected =>
                  this.userFollowFilters(
                    selected,
                    data.followFollowers.myFollowings,
                    data.followFollowers.myFollowers
                  )
                }
              />
            );
          }}
        </Query>
      </FiltersContainer>
    );
  }
}

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
)(MembersFilters);
