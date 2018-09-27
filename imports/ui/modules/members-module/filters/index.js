import React from "react";
import { Layout } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import {
  BigTag,
  FilterItem,
  FiltersContainer,
  Separator
} from "./../../../components";
import { CheckBoxList, Button } from "btech-base-forms-component";

class MembersFilters extends React.Component {
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
      <FiltersContainer
        onClose={() => this.props.onClose && this.props.onClose()}
      >
        <FilterItem>
          <GeoInputLocation
            name={"location"}
            model={this.state}
            placeholder={"Location"}
          />
          <Layout
            mt={"10px"}
            customTemplateColumns={"80px 80px 80px"}
            colGap={"10px"}
          >
            <BigTag text={"New York"} icon={"pin"} connected={false} />
            <BigTag text={"United States"} icon={"pin"} connected={true} />
            <BigTag text={"California"} icon={"pin"} connected={true} />
          </Layout>
        </FilterItem>
        <Separator />
        <FilterItem>
          <CheckBoxList
            placeholderText={"Seeking"}
            options={[
              {
                label: "Co-Founders",
                active: true,
                number: 12
              },
              { label: "Competitions Teammate", active: false, number: 3 },
              { label: "Mentorship", active: false, number: 22 }
            ]}
          />
        </FilterItem>
        <Separator />
        <FilterItem>
          <CheckBoxList
            placeholderText={"Seeking"}
            options={[{ label: "On Speaker Directory", active: false }]}
          />
        </FilterItem>
        <Separator />
      </FiltersContainer>
    );
  }
}

export default MembersFilters;
