import React from "react";
import {Layout, Container} from "btech-layout";
import styled from "styled-components";
import {GeoInputLocation} from "btech-location";
import {
  CheckBoxList,
  InputAutoComplete,
  TagList,
  Button
} from "btech-base-forms-component";
import {
  ORG_TYPE_NUMBER
} from "../form/constants/constants";
import PropsTypes from "prop-types";
import FilterContainer from "../../../components/FiltersContainer/FiltersContainer";
import {cleanFilters, setFilters} from "../../../actions/SideBarActions";
import {connect} from "react-redux";
import BigTag from "./../../../components/BigTag/BigTag";
import {Query} from "react-apollo";
import {GetTags} from "../../../apollo-client/tag";

const Filter = styled(Container)`
  padding: 20px 10px;
`;

const Separator = styled.div`
  height: 1px;
  width: 100%;
  opacity: 0.5;
  background-color: ${props =>
  props.theme ? props.theme.filter.separatorColor : "black"};
`;

class OrganizationFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        address: "",
        location: {lat: "", lng: ""},
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
    const checked = activeSelected.map(item => ({label: item.label}));
    temp[type] = {elemMatch: {or: checked}};
    checked.length === 0 ? delete temp[type] : null;
    this.setState({[type]: selected, filters: temp}, () =>
      this.props.setFilters("organizations", this.state.filters)
    );
  }

  notifyParentLocation(model, name, value) {
    if (model && name && value) {
      delete value.fullLocation;
      let locationNew = Object.assign({}, value);
      let locationArray = this.state.locationTags;
      locationArray.push(locationNew);
      this.setState({locationTags: locationArray});
    }
  }

  tagSelection(key) {
    let tags = this.state.locationTags;
    tags[key].active = !tags[key].active;
    this.setState({locationTags: tags}, () => this.checkFilters());
  }

  onAddTags(type, tag) {
    if (tag.label && tag.label.length > 0) {
      let newTag = Object.assign({}, tag);
      let tags = this.state[type];
      tags.push(newTag);
      this.state.filters[type] = {'in': this.state[type].map(item => item._id)};
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
        'in': this.state[type].map(item => item._id)
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
    this.setState({filters: filters}, () =>
      this.props.setFilters("organizations", filters)
    );
  }

  render() {
    return (
      <FilterContainer
        onClose={() => this.props.onClose && this.props.onClose()}
      >
        <Separator/>
        <Filter>
          <GeoInputLocation
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
        </Filter>
        <Separator/>
        <Filter>
          <Query
            query={GetTags}
            variables={{tags: {type: "OrgDesc"}}}
          >
            {({loading, error, data}) => {
              if (loading) return <div>Fetching</div>;
              if (error) return <div>Error</div>;
              return (
                <InputAutoComplete
                  placeholderText={"Tags"}
                  name={"other"}
                  model={{other: []}}
                  options={data.tags}
                  getAddedOptions={this.onAddTags.bind(this, "description")}
                  getNewAddedOptions={this.onAddTags.bind(this, "description")}
                />
              );
            }}
          </Query>
          <Container mt={"10px"}>
            <TagList
              tags={this.state.description || []}
              closeable={true}
              // checkCloseableItem={(tag, index) => {
              //   return tag.userAdd === true;
              // }}
              onClose={(e, tag, index) => this.onCloseTags(e, tag, index, "description")}
            />
          </Container>
        </Filter>
        <Separator/>
        <Filter>
          <CheckBoxList
            placeholderText={"Org Type"}
            options={this.state.orgType}
            getValue={selected => this.addFilters("orgType", selected)}
          />
        </Filter>
        <Separator/>
        <Filter>
          <Query
            query={GetTags}
            variables={{tags: {type: "INDUSTRY"}}}
          >
            {({loading, error, data}) => {
              if (loading) return <div>Fetching</div>;
              if (error) return <div>Error</div>;
              return (
                <InputAutoComplete
                  placeholderText={"Industry | Sector"}
                  name={"other"}
                  model={{other: []}}
                  options={data.tags}
                  getAddedOptions={this.onAddTags.bind(this, "tech_DOT_industry")}
                  getNewAddedOptions={this.onAddTags.bind(this, "tech_DOT_industry")}
                />
              );
            }}
          </Query>
          <Container mt={"10px"}>
            <TagList
              tags={this.state.tech_DOT_industry || []}
              closeable={true}
              // checkCloseableItem={(tag, index) => {
              //   return tag.userAdd === true;
              // }}
              onClose={(e, tag, index) => this.onCloseTags(e, tag, index, "tech_DOT_industry")}
            />
          </Container>
        </Filter>
        <Separator/>
        <Filter>
          <CheckBoxList
            placeholderText={"My Jobs"}
            options={[
              {
                label: "My Looking for Talent",
                active: true
              },
              {label: "Hosting Events", active: false}
            ]}
          />
        </Filter>
        <Separator/>
      </FilterContainer>
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
