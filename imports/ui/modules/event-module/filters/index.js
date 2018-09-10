import React from "react";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { GeoInputLocation } from "btech-location";
import FilterContainer from "../../../components/FiltersContainer/FiltersContainer";
import BigTag from "./../../../components/BigTag/BigTag";
import { SalaryRange, CheckBoxList, Button } from "btech-base-forms-component";
import PropsTypes from "prop-types";

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
        location: { lat: "", lng: "" },
        fullLocation: {}
      },
      industry: ""
    };
    this.handleScroll = this.handleScroll(this);
    this.handleClose = this.handleClose(this);
  }

  handleScroll() {}

  handleClose() {}

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
            <BigTag text={"New York"} icon={"pin"} connected={false} />
            <BigTag text={"United States"} icon={"pin"} connected={true} />
            <BigTag text={"California"} icon={"pin"} connected={true} />
          </Layout>
        </Filter>
        <Separator />
        <Filter>
          <SalaryRange labelText={"Dates"} placeholder={"000"} />
        </Filter>
        <Separator />
        <Filter>
          <SalaryRange labelText={"Prices"} placeholder={"000"} />
        </Filter>
        <Separator />
        <Filter>
          <CheckBoxList
            placeholderText={"Event Category"}
            options={[
              {
                label: "Hackthon",
                active: true,
                number: 12
              },
              { label: "Data Center", active: false, number: 3 },
              { label: "Carrer Fair", active: false, number: 22 }
            ]}
          />
        </Filter>
        <Separator />
      </FilterContainer>
    );
  }
}

export default EventsFilters;

EventsFilters.propTypes = {
  onClose: PropsTypes.func
};
