import React from "react";
import {
  CheckBoxList,
  InputAutoComplete,
  TagList,
  SalaryRange,
  CheckBox
} from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import SelectTag from "./../../../../../components/SelectTag/SelectTag";

import {
  USER_TAGS,
  LOOKING_FOR,
  INDUSTRY_SECTOR_OPTIONS,
  JOB_TYPE,
  JOB_TYPE_DEFAULT
} from "../../constants/constants";
import { GetTags } from "../../../../../apollo-client/tag";
import { Query } from "react-apollo";

class ThirdStep extends React.Component {
  constructor(props) {
    super(props);

    let data = props.data ? props.data : {};

    this.state = {
      user: data,
      jobtype: JOB_TYPE_DEFAULT,
      tags: []
    };
  }

  componentWillMount() {
    if (this.props.data && this.props.data.professional.jobType)
      this.setState({
        jobtype: JOB_TYPE_DEFAULT.map(e => {
          e["active"] = this.props.data.professional.jobType.some(
            element => e.label === element.label
          );
          return e;
        })
      });
  }

  changeCategoryEvents(actives) {
    const selected = this.state.jobtype.map((job, index) => {
      job["active"] = actives[index];
      return job;
    });
    const jobtypes = selected.filter(element => element.active);
    const temp = this.state.user;
    temp["professional"]["jobType"] = jobtypes;
    this.setState({ jobtype: selected, user: temp }, () => this.notifyParent());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.user)
      this.setState({ user: nextProps.data });
  }

  notifyParent(model, name, value) {
    if (model && name && value) {
      let user = this.state.user;
      user[name] = value;
      this.setState(
        { user: user },
        () => this.props.onChange && this.props.onChange(this.state.user)
      );
    } else this.props.onChange && this.props.onChange(this.state.user);
  }

  handleTags(obj) {
    let newtags = obj.map(element => ({
      name: element.name,
      value: element.name,
      label: element.name,
      active: true,
      userAdd: true,
      closable: true,
      useIcon: true,
      type: "INDUSTRY"
    }));

    let user = this.state.user;
    user["professional"]["industry"] = newtags;
    this.setState(
      {
        user: user
      },
      () => this.notifyParent(this.state.user)
    );
  }

  handleSeeking(index, event) {
    const user = this.state.user;
    user.professional.seeking = index === 0;
    this.setState(
      {
        user: user
      },
      () => this.notifyParent()
    );
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <Container>
          <CheckBoxList
            placeholderText={"Are you actively seeking employment?"}
            options={[]}
          />
          <CheckBox
            text={"Yes"}
            active={this.state.user.professional.seeking}
            onSelected={this.handleSeeking.bind(this, 0)}
          />
          <CheckBox
            text={"No"}
            active={!this.state.user.professional.seeking}
            onSelected={this.handleSeeking.bind(this, 1)}
          />
        </Container>
        <Layout customTemplateColumns={"1fr 1fr"}>
          <SalaryRange
            labelText={"Expected Salary Range"}
            placeholder={"000"}
            min={
              this.state.user &&
              this.state.user.professional &&
              this.state.user.professional.salaryRange.min
            }
            max={
              this.state.user &&
              this.state.user.professional &&
              this.state.user.professional.salaryRange.max
            }
            getValue={data => {
              const { min, max } = data;
              const user = this.state.user;
              user.professional.salaryRange = { min: min, max: max };
              this.setState(
                {
                  user: user
                },
                () => this.notifyParent()
              );
            }}
          />
          <div />
        </Layout>
        <Query query={GetTags} variables={{ tags: { type: "INDUSTRY" } }}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error</div>;
            return (
              <SelectTag
                placeholderText={"Industry | Sector"}
                tags={
                  this.state.user.professional &&
                  this.state.user.professional.industry
                }
                selectOptions={data.tags}
                getTags={obj => this.handleTags(obj)}
                model={{ obj: [] }}
                name={"obj"}
                tagsCloseable={true}
                tagsIcon={"star"}
                tagsUseIcon={true}
              />
            );
          }}
        </Query>
        <CheckBoxList
          placeholderText={"Job Type"}
          options={this.state.jobtype}
          checkboxVerticalSeparation={"10px"}
          checkboxSize={"15px"}
          getValue={actives => this.changeCategoryEvents(actives)}
          columns={2}
        />
      </Layout>
    );
  }
}

export default ThirdStep;
