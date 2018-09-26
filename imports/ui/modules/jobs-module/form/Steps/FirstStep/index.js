import React from "react";
import {
  WizardStepForm,
  Input,
  CheckBoxList,
  SalaryRange,
  TextArea,
  InputAutoComplete,
  TagList
} from "btech-base-forms-component";
import { GeoInputLocation } from "btech-location";
import { Container, Layout } from "btech-layout";
import { JOB_TYPE, POSITION_TAGS } from "../../../../../constants";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { GetTags as tags } from "../../../../../apollo-client/tag";
import MLTagsInput from '../../../../../components/TagsInputAutoComplete/TagsInputAutoComplete'

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: this.props.data,
      jobType: JOB_TYPE,
      posTagsList: POSITION_TAGS.map(item => ({
        label: item.name,
        value: item.name,
        name: item.name
      }))
    };
  }

  componentWillMount() {
    if (this.props.data && this.props.data.jobType)
      this.setState({
        jobType: JOB_TYPE.map(e => {
          e["active"] = this.props.data.jobType.some(
            element => e.label === element.label
          );
          return e;
        })
      });
    if (this.props.data && !this.props.data.place) {
      let job = this.props.data;
      job.place = {
        location: {
          address: "",
          location: { lng: "", lat: "" }
        }
      };
      this.setState({ job: job });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.job)
      this.setState({ job: nextProps.data });
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

  notifyParentLocation(model, name, value) {
    if (model && name && value) {
      let job = this.state.job;
      job.place[name] = value;
      this.setState(
        { job: job },
        () => this.props.onChange && this.props.onChange(this.state.job)
      );
    } else this.props.onChange && this.props.onChange(this.state.job);
  }

  changeCategory(actives) {
    const selected = this.state.jobType.map((category, index) => {
      category["active"] = actives[index];
      return category;
    });
    const jobType = selected.filter(element => element.active);
    const temp = this.state.job;
    temp["jobType"] = jobType.map(item => ({
      label: item.label,
      name: item.label,
      value: item.label
    }));
    this.setState({ jobType: selected, job: temp }, () => this.notifyParent());
  }

  onAddTags(tag) {
    if (tag.label && tag.label.length > 0) {
      let newTag = Object.assign({}, tag);
      let tags = this.state.job.positionTags || [];
      !newTag.name ? (newTag.name = newTag.label) : null;
      newTag.type = "JobPosition";
      tags.push(newTag);
      this.state.job.positionTags = tags;
      this.setState({ job: this.state.job }, () => this.notifyParent());
    }
  }

  onCloseTags(e, tag, index) {
    this.state.job.positionTags.splice(index, 1);
    this.setState({ job: this.state.job }, () => this.notifyParent());
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <Layout templateColumns={2} colGap={"20px"}>
          <Input
            name={"title"}
            required
            model={this.state.job}
            placeholderText={"Position Title"}
            getValue={this.notifyParent.bind(this)}
          />
          <GeoInputLocation
            name={"location"}
            model={this.state.job.place}
            placeholder={"Location"}
            isGeoLocationAvailable={true}
            onChange={this.notifyParentLocation.bind(this)}
          />
        </Layout>
        <TextArea
          height={"100px"}
          placeholderText={"Job Description"}
          model={this.state.job}
          name={"description"}
          getValue={this.notifyParent.bind(this)}
        />
        <CheckBoxList
          placeholderText={"Job Type"}
          checkboxVerticalSeparation={"10px"}
          checkboxSize={"15px"}
          options={this.state.jobType}
          getValue={actives => this.changeCategory(actives)}
        />
        <Container width={"250px"}>
          <SalaryRange
            placeholder={"000"}
            labelText={"Salary Range"}
            min={
              this.state.job &&
              this.state.job.salaryRange &&
              this.state.job.salaryRange.min
            }
            max={
              this.state.job &&
              this.state.job.salaryRange &&
              this.state.job.salaryRange.max
            }
            getValue={data => {
              const { min, max } = data;
              const job = this.state.job;
              job.salaryRange = { min: min, max: max };
              this.setState(
                {
                  job: job
                },
                () => this.notifyParent()
              );
            }}
          />
        </Container>
        <Container>
          <Layout rowGap={"10px"}>
            <Container>
              <Query query={tags} variables={{ tags: { type: "JobPosition" } }}>
                {({ loading, error, data }) => {
                  if (loading) return <div>Fetching</div>;
                  if (error) return <div>Error</div>;
                  return (
                    <MLTagsInput
                      placeholderText={"Position Tags"}
                      getAddedOptions={this.onAddTags.bind(this)}
                      getNewAddedOptions={this.onAddTags.bind(this)}
                      options={data.tags}
                      model={{ positionTags: [] }}
                      name={"positionTags"}
                    />
                  );
                }}
              </Query>
            </Container>
            <Container>
              <TagList
                tags={
                  this.state.job.positionTags &&
                  this.state.job.positionTags.length > 0
                    ? this.state.job.positionTags.map(item => ({
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
      </Layout>
    );
  }
}

FirstStep.defaultProps = {
  data: {}
};

FirstStep.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

export default FirstStep;
