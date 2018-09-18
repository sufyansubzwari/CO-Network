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
      industry: "",
      filters: {},
    };

  }

  componentWillMount() {
    this.props.cleanFilters();
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
          />
          <Layout
            mt={"10px"}
            customTemplateColumns={"70px 70px 70px"}
            colGap={"10px"}
          >
            <BigTag text={"New York"} icon={"pin"} connected={false}/>
            <BigTag text={"United States"} icon={"pin"} connected={true}/>
            <BigTag text={"California"} icon={"pin"} connected={true}/>
          </Layout>
        </Filter>
        <Separator/>
        <Filter>
          <DatePickerRange format={'DD-MM'} labelText={'Dates'} placeholder={'dd/mm'} />
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
            options={[
              {
                label: "Hackthon",
                active: true,
                number: 12
              },
              {label: "Data Center", active: false, number: 3},
              {label: "Carrer Fair", active: false, number: 22}
            ]}
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
)(EventsFilters);
