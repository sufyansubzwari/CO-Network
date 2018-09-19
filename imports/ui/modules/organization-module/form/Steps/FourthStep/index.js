import React from "react";
import {
  TagList,
  SalaryRange,
  CheckBoxList,
  InputAutoComplete
} from "btech-base-forms-component";
import {Container, Layout} from "btech-layout";
import SelectTag from "../../../../../components/SelectTag/SelectTag";
import {
  ORGANIZATION_TAGS,
  INDUSTRY_SECTOR_OPTIONS,
  JOB_TYPE,
  ORGANIZATION_TYPE
} from "../../constants/constants";
import {GetTags} from "../../../../../apollo-client/tag";
import {Query} from "react-apollo";

class FourthStep extends React.Component {
  constructor(props) {
    super(props);

    let data = props.data ? props.data : {};

    this.state = {
      organization: data,
      industry: [],
      jobtype: JOB_TYPE
    };
  }

  componentWillMount() {
    if (this.props.data && this.props.data.tech.jobType)
      this.setState({
        jobtype: JOB_TYPE.map(e => {
          e["active"] = this.props.data.tech.jobType.some(
            element => e.label === element.label
          );
          return e;
        })
      });
  }

  changeJobTypes(actives) {
    const selected = this.state.jobtype.map((job, index) => {
      job["active"] = actives[index];
      return job;
    });
    const jobtypes = selected.filter(element => element.active);
    const temp = this.state.organization;
    temp["tech"]["jobType"] = jobtypes;
    this.setState({jobtype: selected, organization: temp}, () =>
      this.notifyParent()
    );
  }

  handleIndustry(obj) {
    let newtags = obj.map(element => ({
      name: element.name,
      value: element.name,
      label: element.name,
      type: "INDUSTRY"
    }));

    let organization = this.state.organization;
    organization["tech"]["industry"] = newtags;
    this.setState(
      {
        organization: organization
      },
      () => this.notifyParent(this.state.organization)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.organization)
      this.setState({organization: nextProps.data});
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.organization);
  }

  onAddTags(name, tag) {
    let newTag = Object.assign({}, tag);
    let tags = this.state.organization.tech[name];
    !newTag.name ? (newTag.name = newTag.label) : null;
    newTag.type = "Languages";
    tags.push(newTag);
    this.state.organization.tech[name] = tags;
    this.setState({organization: this.state.organization}, () =>
      this.notifyParent()
    );
  }

  onCloseTags(e, tag, index, name) {
    this.state.organization.tech[name].splice(index, 1);
    this.setState({organization: this.state.organization}, () =>
      this.notifyParent()
    );
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <Container>
          <Query query={GetTags} variables={{tags: {type: "Languages"}}}>
            {({loading, error, data}) => {
              if (loading) return <div>Fetching</div>;
              if (error) return <div>Error</div>;
              return (
                <InputAutoComplete
                  placeholderText={"Tech Stack: Languages, Libraries, Skills Tags"}
                  getAddedOptions={this.onAddTags.bind(this, "stack")}
                  getNewAddedOptions={this.onAddTags.bind(this, "stack")}
                  options={data.tags}
                  model={{others: []}}
                  name={"others"}
                />
              );
            }}
          </Query>
          <Container mt={"10px"}>
            <TagList
              tags={
                this.state.organization.tech.stack &&
                this.state.organization.tech.stack.length > 0
                  ? this.state.organization.tech.stack.map(item => ({
                    active: true,
                    ...item
                  }))
                  : []
              }
              closeable={true}
              onClose={(e, tag, index) =>
                this.onCloseTags(e, tag, index, "stack")
              }
            />
          </Container>
        </Container>
        <Layout templateColumns={2}>
          <SalaryRange
            labelText={"Salary Range"}
            placeholder={"000"}
            min={
              this.state.organization &&
              this.state.organization.tech &&
              this.state.organization.tech.salaryRange.min
            }
            max={
              this.state.organization &&
              this.state.organization.tech &&
              this.state.organization.tech.salaryRange.max
            }
            getValue={data => {
              const {min, max} = data;
              const org = this.state.organization;
              org.tech.salaryRange = {min: min, max: max};
              this.setState(
                {
                  organization: org
                },
                () => this.notifyParent()
              );
            }}
          />
          <div/>
        </Layout>
        <Query query={GetTags} variables={{tags: {type: "INDUSTRY"}}}>
          {({loading, error, data}) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error</div>;
            return (
              <SelectTag
                placeholderText={"Industry | Sector"}
                tags={this.state.organization.tech && this.state.organization.tech.industry &&this.state.organization.tech.industry.map(element => ({
                  name: element.name,
                  active: true,
                  userAdd: true,
                  closable: true,
                  useIcon: true
                }))}
                selectOptions={data.tags}
                getTags={obj => this.handleIndustry(obj)}
                model={{obj: []}}
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
          columns={2}
          checkboxVerticalSeparation={"10px"}
          checkboxSize={"15px"}
          getValue={actives => this.changeJobTypes(actives)}
        />
      </Layout>
    );
  }
}

export default FourthStep;
