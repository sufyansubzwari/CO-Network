import React from "react";
import { CheckBoxList, SalaryRange, TagList } from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import { JOB_TYPE, TAG_LEVEL } from "../../../../../constants";
import { GetTags } from "../../../../../apollo-client/tag";
import { Query } from "react-apollo";
import {
  FormMainLayout,
  IndustrySector,
  MLTagsInput
} from "../../../../../components";

class FourthStep extends React.Component {
  constructor(props) {
    super(props);
    let data = props.data ? props.data : {};
    this.state = {
      organization: data,
      industry: [],
      jobType: JOB_TYPE
    };
  }

  componentWillMount() {
    if (this.props.data && this.props.data.tech.jobType)
      this.setState({
        jobType: JOB_TYPE.map(e => {
          e["active"] = this.props.data.tech.jobType.some(
            element => e.label === element.label
          );
          return e;
        })
      });
  }

  changeJobTypes(actives) {
    const selected = this.state.jobType.map((job, index) => {
      job["active"] = actives[index];
      return job;
    });
    const jobTypes = selected.filter(element => element.active);
    const temp = this.state.organization;
    temp["tech"]["jobType"] = jobTypes;
    this.setState({ jobType: selected, organization: temp }, () =>
      this.notifyParent()
    );
  }

  handleIndustry(obj) {
    let newTags = obj.map(element => ({
      name: element.name,
      value: element.name,
      label: element.name,
      type: "INDUSTRY"
    }));

    let organization = this.state.organization;
    organization["tech"]["industry"] = newTags;
    this.setState(
      {
        organization: organization
      },
      () => this.notifyParent(this.state.organization)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.organization)
      this.setState({ organization: nextProps.data });
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.organization);
  }

  onAddTags(name, tag) {
    if (tag.label && tag.label.length > 0) {
      let newTag = Object.assign({}, { tag: { ...tag } });
      let tags = this.state.organization.tech[name] || [];
      !newTag.name ? (newTag.name = newTag.label) : null;
      newTag.tag.type = "Languages";
      tags.push(newTag);
      this.state.organization.tech[name] = tags;
      this.setState({ organization: this.state.organization }, () =>
        this.notifyParent()
      );
    }
  }

  onCloseTags(e, tag, index, name) {
    this.state.organization.tech[name].splice(index, 1);
    this.setState({ organization: this.state.organization }, () =>
      this.notifyParent()
    );
  }

  tagsSuggested(tags, name) {
    let sug = JSON.parse(JSON.stringify(tags));
    if (
      name &&
      this.state.organization.tech &&
      this.state.organization.tech[name]
    ) {
      return sug
        .filter(
          tag =>
            !this.state.organization ||
            !this.state.organization.tech ||
            this.state.organization.tech[name].length === 0 ||
            this.state.organization.tech[name].findIndex(
              item => item.tag._id === tag._id
            ) === -1
        )
        .sort((a, b) => b.used - a.used)
        .map(tag => ({
          ...tag,
          active:
            this.state.organization &&
            this.state.organization.tech &&
            this.state.organization.tech[name].findIndex(
              item => item.tag._id === tag._id
            ) > -1
        }))
        .slice(0, 5);
    }
  }

  handleCategoryChange(index, value, color, icon, name) {
    if (
      value &&
      this.state.organization.tech &&
      this.state.organization.tech[name] &&
      this.state.organization.tech[name][index]
    ) {
      this.state.organization.tech[name][index] = {
        ...this.state.organization.tech[name][index],
        levelColor: color,
        icon: icon,
        level: value
      };
      this.setState({ organization: this.state.organization }, () =>
        this.notifyParent()
      );
    }
  }

  render() {
    return (
      <FormMainLayout>
        <Container>
          <Query query={GetTags} variables={{ tags: { type: "Languages" } }}>
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div />;
              return (
                <Container mt={"25px"}>
                  <MLTagsInput
                    placeholderText={
                      "Tech Stack: Languages, Libraries, Skills Tags"
                    }
                    getAddedOptions={this.onAddTags.bind(this, "stack")}
                    getNewAddedOptions={this.onAddTags.bind(this, "stack")}
                    options={data.tags}
                    model={{ others: [] }}
                    name={"others"}
                    useIcon={true}
                    tags={
                      this.state.organization.tech &&
                      this.state.organization.tech.stack
                        ? this.state.organization.tech.stack.map(item => ({
                            active: true,
                            useIcon: true,
                            levelColor: item.levelColor || "",
                            icon: item.icon || "",
                            level: item.level || "",
                            ...item.tag,
                            showOptions: !item.levelColor
                          }))
                        : []
                    }
                    levelOptions={TAG_LEVEL}
                    defaultLevel={{
                      value: "expert",
                      label: "Expert",
                      levelColor: "#FF1493",
                      icon: "/images/icons/line3.svg"
                    }}
                    onCategoryChange={(index, value, color, icon) =>
                      this.handleCategoryChange(
                        index,
                        value,
                        color,
                        icon,
                        "stack"
                      )
                    }
                    onCloseTags={(e, tag, index) =>
                      this.onCloseTags(e, tag, index, "stack")
                    }
                  />
                  <Container mt={"10px"}>
                    <TagList
                      tags={this.tagsSuggested(data.tags, "stack")}
                      onSelect={(event, tag, index) => {
                        if (!tag.active) {
                          delete tag.active;
                          this.onAddTags("stack", tag);
                        } else {
                          const pos = this.state.organization.tech.stack.findIndex(
                            item => item.tag._id === tag._id
                          );
                          this.onCloseTags(event, tag, pos, "stack");
                        }
                      }}
                    />
                  </Container>
                </Container>
              );
            }}
          </Query>
          {/*<Container mt={"10px"}>*/}
          {/*<TagList*/}
          {/*tags={*/}
          {/*this.state.organization.tech.stack &&*/}
          {/*this.state.organization.tech.stack.length > 0*/}
          {/*? this.state.organization.tech.stack.map(item => ({*/}
          {/*active: true,*/}
          {/*...item*/}
          {/*}))*/}
          {/*: []*/}
          {/*}*/}
          {/*closeable={true}*/}
          {/*onClose={(e, tag, index) =>*/}
          {/*this.onCloseTags(e, tag, index, "stack")*/}
          {/*}*/}
          {/*/>*/}
          {/*</Container>*/}
        </Container>
        <Layout
          mdCustomTemplateColumns={"70% auto"}
          mdColGap={"20px"}
          rowGap={"5px"}
        >
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
              const { min, max } = data;
              const org = this.state.organization;
              org.tech.salaryRange = { min: min, max: max };
              this.setState(
                {
                  organization: org
                },
                () => this.notifyParent()
              );
            }}
          />
        </Layout>
        <IndustrySector
          tags={
            this.state.organization.tech &&
            this.state.organization.tech.industry &&
            this.state.organization.tech.industry
          }
          handleTags={obj => this.handleIndustry(obj)}
        />
        <CheckBoxList
          placeholderText={"Job Type"}
          options={this.state.jobType}
          columns={2}
          checkboxVerticalSeparation={"10px"}
          checkboxSize={"15px"}
          getValue={actives => this.changeJobTypes(actives)}
        />
      </FormMainLayout>
    );
  }
}

export default FourthStep;
