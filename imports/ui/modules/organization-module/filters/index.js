import React from "react";
import { Container, Layout } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import { CheckBoxList, TagList } from "btech-base-forms-component";
import { LOCATION_RANGE_OPTIONS, ORG_TYPE_NUMBER } from "../../../constants";
import PropsTypes from "prop-types";
import {
  BigTag,
  FilterItem,
  FiltersContainer,
  MLCheckBoxList,
  MLTagsInput,
  Separator
} from "../../../components";
import { cleanFilters, setFilters } from "../../../actions/SideBarActions";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { GetTags as tags } from "../../../apollo-client/tag";
import { Meteor } from "meteor/meteor";
import { GetOrgFilters } from "../../../apollo-client/organization";

class OrganizationFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        address: "",
        location: { lat: "", lng: "" },
        fullLocation: {}
      },
      locationTags: [],
      orgType: ORG_TYPE_NUMBER.map(item => ({
        label: item.label,
        active: item.active,
        number: item.number
      })),
      filters: {},
      tech_DOT_industry: [],
      description: [],
      limit: 4,
      orgFilters: [
        {
          label: "My Organizations",
          active: false
        },
        { label: "Hosting Events", active: false }
      ],
      locationOptions: LOCATION_RANGE_OPTIONS,
      activeOption: LOCATION_RANGE_OPTIONS[0]
    };

    this.handleLocationMiles = this.handleLocationMiles.bind(this);
  }

  componentWillMount() {
    this.props.cleanFilters();
  }

  addFilters(type, actives) {
    const selected = this.state[type].map((category, index) => {
      category["active"] = actives[index];
      return category;
    });
    const activeSelected = selected.filter(element => element.active);
    const temp = this.state.filters;
    const checked = activeSelected.map(item => ({ label: item.label }));
    temp[type] = { elemMatch: { or: checked } };
    checked.length === 0 ? delete temp[type] : null;
    this.setState({ [type]: selected, filters: temp }, () =>
      this.props.setFilters("organizations", this.state.filters)
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

  onAddTags(type, tag) {
    if (tag.label && tag.label.length > 0) {
      let newTag = Object.assign({}, tag);
      let tags = this.state[type];
      tags.push(newTag);
      this.state.filters[type] = { in: this.state[type].map(item => item._id) };
      this.setState(
        {
          [type]: tags,
          filters: this.state.filters
        },
        () => this.props.setFilters("organizations", this.state.filters)
      );
    }
  }

  onCloseTags(e, tag, index, type) {
    this.state[type].splice(index, 1);
    if (this.state[type].length > 0)
      this.state.filters[type] = {
        in: this.state[type].map(item => item._id)
      };
    else {
      delete this.state.filters[type];
    }
    this.setState(
      {
        [type]: this.state[type],
        filters: this.state.filters
      },
      () => this.props.setFilters("organizations", this.state.filters)
    );
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
      this.props.setFilters("organizations", filters)
    );
  }

  handleShowMore() {
    if (this.state.limit < this.state.orgType.length) {
      const newLimit = this.state.limit + 5;
      this.setState({ limit: newLimit });
    } else this.setState({ limit: 5 });
  }

  tagsSuggested(tags, type) {
    let sug = JSON.parse(JSON.stringify(tags));
    return sug
      .filter(
        tag =>
          !this.state[type] ||
          this.state[type].length === 0 ||
          this.state[type].findIndex(item => item._id === tag._id) === -1
      )
      .sort((a, b) => b.used - a.used)
      .map(tag => ({
        ...tag,
        active:
          this.state[type] &&
          this.state[type].findIndex(item => item._id === tag._id) > -1
      }))
      .slice(0, 5);
  }

  orgFilters(actives, org, host) {
    console.log(actives);
    const selected = this.state.orgFilters.map((category, index) => {
      category["active"] = actives[index];
      return category;
    });
    let filter = this.state.filters;
    filter["_id"] = { in: [] };
    if (actives[0]) {
      filter["_id"]["in"] = filter["_id"]["in"].concat(org);
    }
    if (actives[1]) {
      filter["_id"]["in"] = filter["_id"]["in"].concat(host);
    }
    !actives[0] && !actives[1] ? delete filter["_id"] : null;
    this.setState({ orgFilters: selected, filters: filter }, () =>
      this.props.setFilters("organizations", this.state.filters)
    );
  }

  onSearch(value, tags) {
    let filters = this.state.filters;
    tags.length
      ? (filters.description = { in: tags.map(item => item._id) })
      : delete filters.description;
    this.setState({ filters: filters }, () =>
      this.props.setFilters("organizations", filters)
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
        <Separator />
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
                    onClick={this.tagSelection.bind(this, key)}
                  />
                ))
              : null}
          </Layout>
        </FilterItem>
        <Separator />
        <FilterItem>
          <Query
            query={tags}
            variables={{ tags: { type: "OrgDesc" } }}
            fetchPolicy={"cache-and-network"}
          >
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div/>
              return (
                <div>
                  <MLTagsInput
                    fontSize={"12px"}
                    fontFamily={"Roboto Mono"}
                    fontWeight={"normal"}
                    placeholderText={"Tags"}
                    getAddedOptions={tag => this.onAddTags("description", tag)}
                    getNewAddedOptions={tag =>
                      this.onAddTags("description", tag)
                    }
                    onCloseTags={(e, tag, index) =>
                      this.onCloseTags(e, tag, index, "description")
                    }
                    options={data && data.tags}
                    tags={
                      this.state.description && this.state.description.length
                        ? this.state.description.map(item => ({
                            active: true,
                            ...item
                          }))
                        : []
                    }
                  />
                  <Container mt={"10px"}>
                    <TagList
                      tags={this.tagsSuggested(data.tags, "description")}
                      onSelect={(event, tag, index) => {
                        if (!tag.active) {
                          delete tag.active;
                          this.onAddTags("description", tag);
                        } else {
                          const pos = this.state.description.findIndex(
                            item => item._id === tag._id
                          );
                          this.onCloseTags(event, tag, pos, "description");
                        }
                      }}
                    />
                  </Container>
                </div>
              );
            }}
          </Query>
        </FilterItem>
        <Separator />
        <FilterItem>
          <MLCheckBoxList
            showMore
            limit={this.state.limit}
            title={"Org Type"}
            sizeList={this.state.orgType.length}
            options={this.state.orgType
              .slice(0, this.state.limit)
              .map(item => ({
                ...item,
                number: item.used || 0
              }))}
            onSelect={selected => this.addFilters("orgType", selected)}
            onMoreAction={this.handleShowMore.bind(this)}
          />
        </FilterItem>
        <Separator />
        <FilterItem>
          <Query
            query={tags}
            variables={{ tags: { type: "INDUSTRY" } }}
            fetchPolicy={"cache-and-network"}
          >
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div/>
              return (
                <div>
                  <MLTagsInput
                    fontSize={"12px"}
                    fontFamily={"Roboto Mono"}
                    fontWeight={"normal"}
                    placeholderText={"Industry | Sector"}
                    getAddedOptions={tag =>
                      this.onAddTags("tech_DOT_industry", tag)
                    }
                    getNewAddedOptions={tag =>
                      this.onAddTags("tech_DOT_industry", tag)
                    }
                    onCloseTags={(e, tag, index) =>
                      this.onCloseTags(e, tag, index, "tech_DOT_industry")
                    }
                    options={data && data.tags}
                    tags={
                      this.state.tech_DOT_industry &&
                      this.state.tech_DOT_industry.length
                        ? this.state.tech_DOT_industry.map(item => ({
                            active: true,
                            ...item
                          }))
                        : []
                    }
                  />
                  <Container mt={"10px"}>
                    <TagList
                      tags={this.tagsSuggested(data.tags, "tech_DOT_industry")}
                      onSelect={(event, tag, index) => {
                        if (!tag.active) {
                          delete tag.active;
                          this.onAddTags("tech_DOT_industry", tag);
                        } else {
                          const pos = this.state.tech_DOT_industry.findIndex(
                            item => item._id === tag._id
                          );
                          this.onCloseTags(
                            event,
                            tag,
                            pos,
                            "tech_DOT_industry"
                          );
                        }
                      }}
                    />
                  </Container>
                </div>
              );
            }}
          </Query>
        </FilterItem>
        <Separator />
        <FilterItem>
          <Query
            query={GetOrgFilters}
            variables={{ owner: Meteor.userId() }}
            fetchPolicy={"cache-and-network"}
          >
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div/>;
              return (
                <CheckBoxList
                  placeholderText={""}
                  options={this.state.orgFilters.map((item, key) => ({
                    ...item,
                    number:
                      key === 0
                        ? data.orgFilters.myOrg.length
                        : data.orgFilters.hosting.length
                  }))}
                  getValue={selected =>
                    this.orgFilters(
                      selected,
                      data.orgFilters.myOrg,
                      data.orgFilters.hosting
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

OrganizationFilters.propTypes = {
  onClose: PropsTypes.func
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
)(OrganizationFilters);
