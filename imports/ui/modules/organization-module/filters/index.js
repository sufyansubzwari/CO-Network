import React from "react";
import { Layout, Container } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import {
  CheckBoxList,
  InputAutoComplete,
  TagList
} from "btech-base-forms-component";
import { ORG_TYPE_NUMBER } from "../../../constants";
import PropsTypes from "prop-types";
import {
  FiltersContainer,
  BigTag,
  Separator,
  FilterItem,
  MLCheckBoxList
} from "../../../components";
import { cleanFilters, setFilters } from "../../../actions/SideBarActions";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { GetTags as tags } from "../../../apollo-client/tag";
import { MLTagsInput } from "../../../components";

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
      limit: 4
    };
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
    actives.length > 0 ? (filters.location = actives) : delete filters.location;
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

  render() {
    return (
      <FiltersContainer
        onClose={() => this.props.onClose && this.props.onClose()}
      >
        <Separator />
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
            query={tags}
            variables={{ tags: { type: "OrgDesc" } }}
            fetchPolicy={"cache-and-network"}
          >
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div>Error</div>;
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
                    options={data.tags}
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
              if (error) return <div>Error</div>;
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
                    options={data.tags}
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
          <CheckBoxList
            placeholderText={"My Organizations"}
            options={[
              {
                label: "My Looking for Talent",
                active: true
              },
              { label: "Hosting Events", active: false }
            ]}
          />
        </FilterItem>
        <Separator />
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
