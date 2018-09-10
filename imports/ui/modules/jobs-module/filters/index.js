import React from "react";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { GeoInputLocation } from "btech-location";
import FilterContainer from "../../../components/FiltersContainer/FiltersContainer";
import BigTag from "./../../../components/BigTag/BigTag";
import {
  SalaryRange,
  CheckBoxList,
  InputAutoComplete
} from "btech-base-forms-component";
import {
  JOB_TYPE_NUMBER,
  EXPERIENCE_REQUIERED_NUMBER
} from "../form/constants/constants";
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

class JobsFilters extends React.Component {
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
        <Filter>
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
        </Filter>
        <Separator />
        <Filter>
          <SalaryRange labelText={"Salary Range"} placeholder={"000"} />
        </Filter>
        <Separator />
        <Filter>
          <CheckBoxList
            placeholderText={"Job Type"}
            options={JOB_TYPE_NUMBER}
          />
        </Filter>
        <Separator />
        <Filter>
          <CheckBoxList
            placeholderText={"Experience Requiered"}
            options={EXPERIENCE_REQUIERED_NUMBER}
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
          <Layout
            mt={"10px"}
            customTemplateColumns={"80px 80px 80px"}
            colGap={"10px"}
          >
            <BigTag text={"Biotechnology"} icon={"label"} connected={false} />
            <BigTag text={"Oil & Gas"} icon={"label"} connected={true} />
            <BigTag
              text={"Application & BioInformatics"}
              icon={"label"}
              connected={true}
            />
          </Layout>
        </Filter>
        <Separator />
        <Filter>
          <CheckBoxList
            placeholderText={"My Jobs"}
            options={[
              {
                label: "My Applications",
                active: true,
                number: 12
              },
              { label: "Interested Employers", active: false, number: 3 }
            ]}
          />
        </Filter>
        <Separator />
      </FilterContainer>
    );
  }
}

JobsFilters.propTypes = {
  onClose: PropsTypes.func
};

export default JobsFilters;
