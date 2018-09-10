import React from "react";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { GeoInputLocation } from "btech-location";
import {
  CheckBoxList,
  InputAutoComplete,
  TagList,
  Button
} from "btech-base-forms-component";
import {
  ORGANIZATION_TAGS,
  ORG_TYPE_NUMBER
} from "../form/constants/constants";
import PropsTypes from "prop-types";
import FilterContainer from "../../../components/FiltersContainer/FiltersContainer";

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
      location: "",
      industry: ""
    };
  }

  render() {
    return (
      <FilterContainer
        onClose={() => this.props.onClose && this.props.onClose()}
      >
        <Separator />
        <Filter>
          <GeoInputLocation
            name={"location"}
            model={this.state}
            placeholder={"Location"}
          />
        </Filter>
        <Separator />
        <Filter>
          <InputAutoComplete
            placeholderText={"Tags"}
            name={"tags"}
            model={this.state}
            options={[
              { label: "option1", value: "option1" },
              { label: "option2", value: "option2" },
              { label: "option3", value: "option3" }
            ]}
          />
          <Container mt={"10px"}>
            <TagList
              tags={ORGANIZATION_TAGS}
              closeable={true}
              checkCloseableItem={(tag, index) => {
                return tag.userAdd === true;
              }}
              onClose={(tag, index) => console.log("close Item", tag)}
            />
          </Container>
        </Filter>
        <Separator />
        <Filter>
          <CheckBoxList
            placeholderText={"Org Type"}
            options={ORG_TYPE_NUMBER}
          />
        </Filter>
        <Separator />
        <Filter>
          <InputAutoComplete
            placeholderText={"Industry | Sector"}
            name={"industry"}
            model={this.state}
            options={[
              { label: "option1", value: "option1" },
              { label: "option2", value: "option2" },
              { label: "option3", value: "option3" }
            ]}
          />
        </Filter>
        <Separator />
        <Filter>
          <CheckBoxList
            placeholderText={"My Jobs"}
            options={[
              {
                label: "My Looking for Talent",
                active: true
              },
              { label: "Hosting Events", active: false }
            ]}
          />
        </Filter>
        <Separator />
      </FilterContainer>
    );
  }
}

OrganizationFilters.propTypes = {
  onClose: PropsTypes.func
};

export default OrganizationFilters;
