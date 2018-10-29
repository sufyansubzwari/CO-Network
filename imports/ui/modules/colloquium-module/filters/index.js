import React from "react";
import { Layout } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import {
  BigTag,
  FilterItem,
  FiltersContainer,
  Separator
} from "../../../components";
import { CheckBoxList } from "btech-base-forms-component";
import PropsTypes from "prop-types";
import { cleanFilters, setFilters } from "../../../actions/SideBarActions";
import { connect } from "react-redux";
import { COLLOQUIUM_LEVEL, LOCATION_RANGE_OPTIONS } from "../../../constants";

class ColloquiumFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        address: "",
        location: { lat: "", lng: "" },
        fullLocation: {}
      },
      locationTags: [],
      privacy: false,
      competences: [],
      filters: {},
      locationOptions: LOCATION_RANGE_OPTIONS,
      activeOption: LOCATION_RANGE_OPTIONS[0]
    };

    this.handleLocationMiles = this.handleLocationMiles.bind(this);
  }

  componentWillMount() {
    this.props.cleanFilters();
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

  changeLevel(actives) {
    const selected = COLLOQUIUM_LEVEL.map((level, index) => {
      level["active"] = actives[index];
      return level;
    });
    const levels = selected.filter(element => element.active);
    const temp = this.state.filters;
    const checked = levels.map(item => ({
      label: item.label
    }));
    temp.competences = { elemMatch: { or: checked } };
    checked.length === 0 ? delete temp.competences : null;
    this.setState({ competences: levels, filters: temp }, () =>
      this.props.setFilters("colloquiums", this.state.filters)
    );
  }

  handleChangePrivacy(status) {
    const temp = this.state.filters;
    temp.isPublic = status;
    this.setState(
      {
        privacy: status,
        filters: temp
      },
      () => this.props.setFilters("colloquiums", this.state.filters)
    );
  }

  onSearch(value, tags) {
    let filters = this.state.filters;
    tags.length
      ? (filters.tags = { in: tags.map(item => item._id) })
      : delete filters.tags;
    this.setState({ filters: filters }, () =>
      this.props.setFilters("colloquiums", filters, value)
    );
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
      this.props.setFilters("colloquiums", filters)
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
                    onClick={this.tagSelection.bind(this, key)}
                  />
                ))
              : null}
          </Layout>
        </FilterItem>
        <Separator />
        {/*<FilterItem>*/}
        {/*<SwitchButton*/}
        {/*checked={this.state.privacy}*/}
        {/*text={`Show ${*/}
        {/*!this.state.privacy ? "Public" : "Private"*/}
        {/*} Colloquiums`}*/}
        {/*onChange={status => this.handleChangePrivacy(status)}*/}
        {/*/>*/}
        {/*</FilterItem>*/}
        {/*<Separator />*/}
        <FilterItem>
          <CheckBoxList
            placeholderText={"Competences"}
            options={COLLOQUIUM_LEVEL}
            checkboxVerticalSeparation={"10px"}
            checkboxSize={"15px"}
            getValue={actives => this.changeLevel(actives)}
          />
        </FilterItem>
      </FiltersContainer>
    );
  }
}

ColloquiumFilters.propTypes = {
  onClose: PropsTypes.func
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
)(ColloquiumFilters);
