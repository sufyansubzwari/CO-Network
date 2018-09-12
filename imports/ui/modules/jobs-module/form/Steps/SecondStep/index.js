import React from "react";
import {
  WizardStepForm,
  TextArea,
  TagList,
  CheckBoxList,
  InputAutoComplete
} from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import { JOB_TYPE, EXPERIENCE_REQUIERED } from "../../constants/constants";
import { GetTags } from "../../../../../apollo-client/tag";
import { Query } from "react-apollo";
import PropTypes from "prop-types";
import EventStep1 from "../../../../event-module/form/components/EventStep1";

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
        jobExperience: JOB_TYPE.map(e => {
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
    let tags = this.state.job.languages;
    !tag.name ? (tag.name = tag.label) : null;
    tags.push(tag);
    this.state.job.languages = tags;
    this.setState({ job: this.state.job }, () => this.notifyParent());
  }

  onCloseTags(e, tag, index) {
    this.state.job.languages.splice(index, 1);
    this.setState({ job: this.state.job }, () => this.notifyParent());
  }

  notifyParent(model, name, value) {
    if (model && name && value) {
      let job = this.state.job;
      job[name] = value;
      this.setState(
        {job: job},
        () => this.props.onChange && this.props.onChange(this.state.job)
      );
    } else this.props.onChange && this.props.onChange(this.state.job);
  }

  render() {
    return (
      <Layout rowGap={"40px"}>
        <TextArea
          placeholderText={"Job Responsibilities"}
          model={this.state.job}
          name={"jobResponsibility"}
          getValue={this.notifyParent.bind(this)}
        />
        <Container>
          <Layout rowGap={"10px"}>
            <Container>
              <Query query={GetTags}>
                {({ loading, error, data }) => {
                  if (loading) return <div>Fetching</div>;
                  if (error) return <div>Error</div>;
                  return (
                    <InputAutoComplete
                      placeholderText={
                        "Technical Requirement | Languages & Libraries"
                      }
                      model={{languages: []}}
                      name={'languages'}
                      getAddedOptions={this.onAddTags.bind(this)}
                      getNewAddedOptions={this.onAddTags.bind(this)}
                      options={data.tags}
                    />
                  );
                }}
              </Query>
            </Container>
            <Container>
              <TagList
                tags={
                  this.state.job.languages &&
                  this.state.job.languages.length > 0
                    ? this.state.job.languages.map(item => ({
                        active: true,
                        ...item
                      }))
                    : []
                }
                // onSelect={tag => alert(`you select the tag '${tag.name}'`)}
                closeable={true}
                onClose={(e, tag, index) => this.onCloseTags(e, tag, index)}
              />
            </Container>
          </Layout>
        </Container>
        <CheckBoxList
          columns={2}
          checkboxVerticalSeparation={"10px"}
          placeholderText={"Experience Required"}
          options={this.state.jobExperience}
          getValue={actives => this.changeCategory(actives)}
        />
      </Layout>
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
