import React from "react";
import {Layout, Container} from "btech-layout";
import styled from "styled-components";
import {GeoInputLocation} from "btech-location";
import FilterContainer from "../../../components/FiltersContainer/FiltersContainer";
import BigTag from "./../../../components/BigTag/BigTag";
import {SalaryRange, CheckBoxList, Button, DatePickerRange} from "btech-base-forms-component";
import PropsTypes from "prop-types";
import {connect} from "react-redux";
import {setFilters, cleanFilters} from "../../../actions/SideBarActions";
import * as type from "../../../actions/SideBarActions/types";
import {GetTags} from "../../../apollo-client/tag";
import {Query, graphql} from "react-apollo";

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

class EventsFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        address: "",
        location: {lat: "", lng: ""},
        fullLocation: {}
      },
      locationTags: [],
      industry: "",
      filters: {},
      category: [],
    };

  }

  componentWillMount() {
    this.props.cleanFilters();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && !nextProps.data.loading && nextProps.data.tags) {
      let category = JSON.parse(JSON.stringify(nextProps.data.tags));
      this.setState({category: category})
    }
  }

  addFilters(type, actives) {
    let filters = this.state.filters;
    const selected = this.state[type].map((category, index) => {
      category["active"] = actives[index];
      return category;
    });
    const activeSelected = selected.filter(element => element.active);
    activeSelected.length> 0 ? filters.category = {"in": activeSelected.map(item => item._id)} : delete filters.category;
    this.setState({filters: filters}, () => this.props.setFilters("events", filters));
  }

  notifyParentLocation(model, name, value) {
    if (model && name && value) {
      delete value.fullLocation;
      let locationArray = this.state.locationTags;
      locationArray.push(value);
      this.setState({locationTags: locationArray});
    }
  }

  tagSelection(key) {
    let tags = this.state.locationTags;
    tags[key].active = !tags[key].active;
    this.setState({locationTags: tags}, () => this.checkFilters())

  }

  checkFilters(){
    let actives = this.state.locationTags.filter(item => item.active);
    let filters = this.state.filters;
    actives.length > 0 ? filters.location = actives : delete filters.location;
    this.setState({filters: filters}, () => this.props.setFilters("events", filters));
  }

  render() {
    return (
      <FilterContainer
        onClose={() => this.props.onClose && this.props.onClose()}
      >
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
            {this.state.locationTags.length > 0 ? this.state.locationTags.map((item, key) =>
              <BigTag key={key} text={item.address} icon={"pin"} connected={item.active}
                      onClick={this.tagSelection.bind(this, key)}/>
            ) : null}
          </Layout>
        </Filter>
        <Separator/>
        <Filter>
          <DatePickerRange
            format={'DD-MM'}
            labelText={'Dates'}
            placeholder={'dd/mm'}
            getValue={(startDate, endDate) => {
              let filters = this.state.filters;
              startDate ? filters.startDate = {gte: startDate.toISOString()} : delete filters.startDate;
              endDate ? filters.endDate = {lte: endDate.toISOString()} : delete filters.endDate;

              this.setState(
                {
                  filters: filters,
                },
                () => this.props.setFilters("events", this.state.filters)
              );
            }}
          />
        </Filter>
        <Separator/>
        <Filter>
          <SalaryRange
            labelText={"Prices"}
            placeholder={"000"}
            min={this.state.price && this.state.price.min}
            max={this.state.price && this.state.price.max}
            getValue={data => {
              let filters = this.state.filters;
              let options = {};
              data.min ? options.min = {gte: data.min} : null;
              data.max ? options.max = {lte: data.max} : null;
              filters.tickets = {
                elemMatch: {
                  ...options,
                }
              };
              this.setState(
                {
                  filters: filters, price: data
                },
                () => this.props.setFilters("events", this.state.filters)
              );
            }}
          />
        </Filter>
        <Separator/>
        <Filter>
          <CheckBoxList
            placeholderText={"Event Category"}
            options={this.state.category}
            getValue={(selected) => this.addFilters("category", selected)}
          />
        </Filter>
        <Separator/>
      </FilterContainer>
    )
      ;
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
)(graphql(GetTags, {
  options: () => ({
    variables: {
      tags: {type: "EVENT"}
    },
  }),
})(EventsFilters));
