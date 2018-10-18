import React from "react";
import { CheckBoxList, TagList, TextArea } from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import { EXPERIENCE_REQUIERED, TAG_LEVEL } from "../../../../../constants";
import { GetTags } from "../../../../../apollo-client/tag";
import { Query } from "react-apollo";
import PropTypes from "prop-types";
import { MLTagsInput, FormMainLayout } from "../../../../../components";

class SecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: this.props.data,
      jobExperience: EXPERIENCE_REQUIERED
    };
  }

  componentWillMount() {
    if (this.props.data && this.props.data.jobExperience)
      this.setState({
        jobExperience: EXPERIENCE_REQUIERED.map(e => {
          e["active"] = this.props.data.jobExperience.some(
            element => e.label === element.label
          );
          return e;
        })
      });
  }

  changeCategory(actives) {
    const selected = this.state.jobExperience.map((category, index) => {
      category["active"] = actives[index];
      return category;
    });
    const jobExperience = selected.filter(element => element.active);
    const temp = this.state.job;
    temp["jobExperience"] = jobExperience;
    this.setState({ jobExperience: selected, job: temp }, () =>
      this.notifyParent()
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.job)
      this.setState({ job: nextProps.data });
  }

  onAddTags(tag) {
    if (tag.label && tag.label.length > 0) {
      let newTag = Object.assign({}, { tag: { ...tag } });
      let tags = this.state.job.languages || [];
      !newTag.name ? (newTag.name = newTag.label) : null;
      newTag.tag.type = "Languages";
      tags.push(newTag);
      this.state.job.languages = tags;
      this.setState({ job: this.state.job }, () => this.notifyParent());
    }
  }

  onCloseTags(e, tag, index) {
    this.state.job.languages.splice(index, 1);
    this.setState({ job: this.state.job }, () => this.notifyParent());
  }

  tagsSuggested(tags) {
    let sug = JSON.parse(JSON.stringify(tags));
    return sug
      .filter(
        tag =>
          !this.state.job ||
          !this.state.job.languages ||
          this.state.job.languages.length === 0 ||
          this.state.job.languages.findIndex(
            item => item.tag._id === tag._id
          ) === -1
      )
      .sort((a, b) => b.used - a.used)
      .map(tag => ({
        ...tag,
        active:
          this.state.job &&
          this.state.job.languages &&
          this.state.job.languages.findIndex(item => item.tag._id === tag._id) >
            -1
      }))
      .slice(0, 5);
  }

  handleCategoryChange(index, value, color, icon) {
    if (
      value &&
      this.state.job &&
      this.state.job.languages &&
      this.state.job.languages[index]
    ) {
      let newTag = {
        ...this.state.job.languages[index],
        levelColor: color,
        icon: icon,
        level: value
      };
      this.state.job.languages[index] = newTag;
      this.setState({ job: this.state.job }, () => this.notifyParent());
    }
  }

  notifyParent(model, name, value) {
    if (model && name && value) {
      let job = this.state.job;
      job[name] = value;
      this.setState(
        { job: job },
        () => this.props.onChange && this.props.onChange(this.state.job)
      );
    } else this.props.onChange && this.props.onChange(this.state.job);
  }

  render() {
    return (
      <FormMainLayout>
        <TextArea
          placeholderText={"Responsibilities"}
          model={this.state.job}
          name={"jobResponsibility"}
          getValue={this.notifyParent.bind(this)}
        />
        <Container>
          <Query query={GetTags} variables={{ tags: { type: "Languages" } }}>
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div />;
              return (
                <div>
                  <MLTagsInput
                    placeholderText={
                      "Technical Requirement | Languages & Libraries"
                    }
                    getAddedOptions={this.onAddTags.bind(this)}
                    getNewAddedOptions={this.onAddTags.bind(this)}
                    onCloseTags={(e, tag, index) =>
                      this.onCloseTags(e, tag, index)
                    }
                    options={data.tags}
                    tags={
                      this.state.job &&
                      this.state.job.languages &&
                      this.state.job.languages.length > 0
                        ? this.state.job.languages.map(item => ({
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
                    onCategoryChange={(index, value, color, icon) =>
                      this.handleCategoryChange(index, value, color, icon)
                    }
                    useIcon={true}
                  />
                  <Container mt={"10px"}>
                    <TagList
                      tags={this.tagsSuggested(data.tags)}
                      onSelect={(event, tag, index) => {
                        if (!tag.active) {
                          delete tag.active;
                          this.onAddTags(tag);
                        } else {
                          const pos = this.state.job.languages.findIndex(
                            item => item.tag._id === tag._id
                          );
                          this.onCloseTags(event, tag, pos);
                        }
                      }}
                    />
                  </Container>
                </div>
              );
            }}
          </Query>
        </Container>
        <CheckBoxList
          columns={2}
          checkboxVerticalSeparation={"10px"}
          placeholderText={"Skill Required"}
          options={this.state.jobExperience}
          getValue={actives => this.changeCategory(actives)}
        />
      </FormMainLayout>
    );
  }
}

SecondStep.defaultProps = {
  data: {}
};

SecondStep.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

export default SecondStep;
