import React from "react";
import { Layout } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import {
  BigTag,
  FilterItem,
  FiltersContainer,
  Separator
} from "./../../../components";
import { Query } from 'react-apollo';
import { CheckBoxList, Button, CheckBox } from "btech-base-forms-component";
import { UsersFieldCounts } from "../../../apollo-client/user";

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
            required={false}
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
          <Query query={UsersFieldCounts} variables={{ field: "profile.knowledge.lookingFor" }}>
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div>Error</div>;
              return (
                <CheckBoxList
                  placeholderText={"Seeking"}
                  options={data.usersFieldCounts.map(item => ({
                    ...item,
                    label: item._id,
                    value: item._id,
                    name: item._id
                  }))}
                  // getValue={selected => this.addFilters("jobExperience", selected)}
                />
              );
            }}
          </Query>
        </FilterItem>
        <Separator />
        <FilterItem>
          <CheckBoxList
            options={[{ label: "On Speaker Directory", active: false }]}
          />
        </FilterItem>
      </FiltersContainer>
    );
  }
}

export default MembersFilters;
