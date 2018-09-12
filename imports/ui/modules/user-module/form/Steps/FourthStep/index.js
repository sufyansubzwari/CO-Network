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
    if (
      this.props.data &&
      this.props.data.professional.industry &&
      this.props.data.professional.industry.length > 0
    ) {
      let tags = this.props.data.professional.industry.map(element => ({
        name: element,
        active: true,
        userAdd: true,
        closable: true,
        useIcon: true
      }));
      this.setState({
        tags: tags
      });
    }
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
    let newtags = obj.map(element => element.name);

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
      <Layout rowGap={"40px"}>
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
        <SelectTag
          placeholderText={"Industry | Sector"}
          tags={this.state.tags}
          selectOptions={INDUSTRY_SECTOR_OPTIONS}
          getTags={obj => this.handleTags(obj)}
          model={{ obj: [] }}
          name={"obj"}
          tagsCloseable={true}
        />
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
