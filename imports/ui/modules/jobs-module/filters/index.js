import React from "react";
import { Layout } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import {
  FiltersContainer,
  BigTag,
  Separator,
  FilterItem
} from "../../../components";
import {
  SalaryRange,
  CheckBoxList,
  InputAutoComplete
} from "btech-base-forms-component";
import {
  JOB_TYPE_NUMBER,
  EXPERIENCE_REQUIERED_NUMBER
} from "../../../constants";
import PropsTypes from "prop-types";
import { cleanFilters, setFilters } from "../../../actions/SideBarActions";
import { connect } from "react-redux";
import { JobCounts, GetMyJobs } from "../../../apollo-client/job";
import { Query } from "react-apollo";
import { Meteor } from "meteor/meteor";

class JobsFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        address: "",
        location: { lat: "", lng: "" },
        fullLocation: {}
      },
      locationTags: [],
      industry: "",
      jobType: JOB_TYPE_NUMBER.map(item => ({
        label: item.label,
        active: item.active,
        number: item.number
      })),
      jobExperience: EXPERIENCE_REQUIERED_NUMBER.map(item => ({
        label: item.label,
        active: item.active,
        number: item.number
      })),
      filters: {},
      jobsFilters: [
        {
          label: "My Jobs",
          active: false
        },
        {
          label: "My Jobs Applied",
          active: false
        }
      ]
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
    const checked = activeSelected.map(item => ({
      label: item.label,
      value: item.label
    }));
    temp[type] = { elemMatch: { or: checked } };
    checked.length === 0 ? delete temp[type] : null;
    this.setState({ [type]: selected, filters: temp }, () =>
      this.props.setFilters("jobs", this.state.filters)
    );
  }

  jobOwnerFilters(actives, jobs, applies) {
    console.log(actives);
    const selected = this.state.jobsFilters.map((category, index) => {
      category["active"] = actives[index];
      return category;
    });
    let filter = this.state.filters;
    filter["_id"] = { in: [] };
    if (actives[0]) {
      filter["_id"]["in"] = filter["_id"]["in"].concat(jobs);
    }
    if (actives[1]) {
      filter["_id"]["in"] = filter["_id"]["in"].concat(applies);
    }
    !actives[0] && !actives[1] ? delete filter["_id"] : null;
    this.setState({ jobsFilters: selected, filters: filter }, () =>
      this.props.setFilters("jobs", this.state.filters)
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

  checkFilters() {
    let actives = this.state.locationTags.filter(item => item.active);
    let filters = this.state.filters;
    actives.length > 0 ? (filters.location = actives) : delete filters.location;
    this.setState({ filters: filters }, () =>
      this.props.setFilters("events", filters)
    );
  }

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
          <SalaryRange
            labelText={"Salary Range"}
            placeholder={"000"}
            min={this.state.salary && this.state.salary.min}
            max={this.state.salary && this.state.salary.max}
            getValue={data => {
              let filters = this.state.filters;
              data.min
                ? (filters.salaryRange_DOT_min = { gte: data.min })
                : delete filters.salaryRange_DOT_max;
              data.max
                ? (filters.salaryRange_DOT_max = { lte: data.max })
                : delete filters.salaryRange_DOT_min;

              this.setState(
                {
                  filters: filters,
                  salary: data
                },
                () => this.props.setFilters("jobs", this.state.filters)
              );
            }}
          />
        </FilterItem>
        <Separator />
        <FilterItem>
          <Query query={JobCounts} variables={{ field: "jobType" }}>
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div>Error</div>;
              return (
                <CheckBoxList
                  placeholderText={"Job Type"}
                  options={data.jobCounts.map((item, key) => ({
                    ...item,
                    label: item._id,
                    value: item._id,
                    name: item._id,
                    active:
                      this.state.jobType[key] && this.state.jobType[key].active
                  }))}
                  getValue={selected => this.addFilters("jobType", selected)}
                />
              );
            }}
          </Query>
        </FilterItem>
        <Separator />
        <FilterItem>
          <Query query={JobCounts} variables={{ field: "jobExperience" }}>
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div>Error</div>;
              return (
                <CheckBoxList
                  placeholderText={"Experience Required"}
                  options={data.jobCounts.map((item, key) => ({
                    ...item,
                    label: item._id,
                    value: item._id,
                    name: item._id,
                    active:
                      this.state.jobExperience[key] &&
                      this.state.jobExperience[key].active
                  }))}
                  getValue={selected =>
                    this.addFilters("jobExperience", selected)
                  }
                />
              );
            }}
          </Query>
        </FilterItem>
        <Separator />
        <FilterItem>
          <Query query={GetMyJobs} variables={{ owner: Meteor.userId() }}>
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div>Error</div>;
              return (
                <CheckBoxList
                  placeholderText={"My Jobs"}
                  options={this.state.jobsFilters.map((item, key) => ({
                    ...item,
                    number:
                      key === 0
                        ? data.myJobs.myJobs.length
                        : data.myJobs.myApplies.length
                  }))}
                  getValue={selected =>
                    this.jobOwnerFilters(
                      selected,
                      data.myJobs.myJobs,
                      data.myJobs.myApplies
                    )
                  }
                />
              );
            }}
          </Query>
        </FilterItem>
        <Separator />
      </FiltersContainer>
    );
  }
}

JobsFilters.propTypes = {
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
)(JobsFilters);
