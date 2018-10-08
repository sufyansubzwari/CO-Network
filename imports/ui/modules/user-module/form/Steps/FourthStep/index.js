import React from "react";
import {
  CheckBox,
  CheckBoxList,
  SalaryRange
} from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import IndustrySector from "../../../../../components/IndustrySector/IndustrySector";
import { JOB_TYPE_DEFAULT } from "../../../../../constants";
import { FormMainLayout } from "../../../../../components";

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
      <FormMainLayout>
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
        <Layout mdCustomTemplateColumns={"1fr 1fr"}>
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
        <IndustrySector
          tags={
            this.state.user.professional &&
            this.state.user.professional.industry &&
            this.state.user.professional.industry.length &&
            this.state.user.professional.industry
          }
          handleTags={obj => this.handleTags(obj)}
        />
        <CheckBoxList
          placeholderText={"Job Type"}
          options={this.state.jobtype}
          checkboxVerticalSeparation={"10px"}
          checkboxSize={"15px"}
          getValue={actives => this.changeCategoryEvents(actives)}
          columns={2}
        />
      </FormMainLayout>
    );
  }
}

export default ThirdStep;
