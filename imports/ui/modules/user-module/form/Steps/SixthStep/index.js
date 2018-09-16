import React from "react";
import {
  CheckBoxList,
  InputAutoComplete,
  TagList,
  SwitchButton
} from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";

import {
  USER_TAGS,
  LOOKING_FOR,
  PREFERRED_STAGE,
    LOOKING_FOR_DEFAULT_SPEAKER
} from "../../constants/constants";

class SixthStep extends React.Component {
  constructor(props) {
    super(props);

    let data = props.data ? props.data : {};

    this.state = {
      user: data,
      lookingfor: LOOKING_FOR_DEFAULT_SPEAKER,
      preferred: PREFERRED_STAGE
    };
  }

  componentWillMount() {
    if (this.props.data && this.props.data.speaker.lookingFor)
      this.setState({
        lookingfor: LOOKING_FOR_DEFAULT_SPEAKER.map(e => {
          e["active"] = this.props.data.speaker.lookingFor.some(
            element => e.label === element.label
          );
          return e;
        })
      });

      if (this.props.data && this.props.data.speaker.stage)
          this.setState({
              preferred: PREFERRED_STAGE.map(e => {
                  e["active"] = this.props.data.speaker.stage.some(
                      element => e.label === element.label
                  );
                  return e;
              })
          });


  }

  changeCategoryEvents(actives) {
    const selected = this.state.lookingfor.map((looking, index) => {
      looking["active"] = actives[index];
      return looking;
    });
    const lookings = selected.filter(element => element.active);
    const temp = this.state.user;
    temp["speaker"]["lookingFor"] = lookings;
    this.setState({ lookingfor: selected, user: temp }, () =>
      this.notifyParent()
    );
  }

    changePreferredStages(actives) {
        const selected = this.state.preferred.map((preferred, index) => {
            preferred["active"] = actives[index];
            return preferred;
        });
        const stages = selected.filter(element => element.active);
        const temp = this.state.user;
        temp["speaker"]["stage"] = stages;
        this.setState({ preferred: selected, user: temp }, () =>
            this.notifyParent()
        );
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

  onAddTags(name, tag) {
    let tags = this.state.user.speaker[name];
    !tag.name ? (tag.name = tag.label) : null;
    tags.push(tag);
    this.state.user.speaker[name] = tags;
    this.setState({ speaker: this.state.user }, () => this.notifyParent());
  }

  onCloseTags(e, tag, index, name) {
    this.state.user.speaker[name].splice(index, 1);
    this.setState({ user: this.state.user }, () => this.notifyParent());
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <SwitchButton
          onChange={value => {
            const user = this.state.user;
            user.speaker.join = value;
            this.setState({ user: user }, () => this.notifyParent());
          }}
          checked={this.state.user.speaker.join}
          text={"Join the Speaker Directory"}
          description={
            "A forum for the exchange of transformation ideas in Science, Technology and Culture"
          }
        />
        <Container>
          <CheckBoxList
            placeholderText={"Looking for"}
            options={this.state.lookingfor}
            checkboxVerticalSeparation={"10px"}
            checkboxSize={"15px"}
            getValue={actives => this.changeCategoryEvents(actives)}
            columns={2}
          />
          <Layout customTemplateColumns={"1fr 1fr"}>
            <Container>
              <InputAutoComplete
                placeholderText={"Other"}
                getAddedOptions={this.onAddTags.bind(this, "otherlooking")}
                getNewAddedOptions={this.onAddTags.bind(this, "otherlooking")}
                options={[
                  { label: "option1", value: "option1" },
                  { label: "option2", value: "option2" },
                  { label: "option3", value: "option3" }
                ]}
                model={{ others: [] }}
                name={"others"}
              />
              <Container mt={"10px"}>
                <TagList
                  tags={
                    this.state.user.speaker.otherlooking &&
                    this.state.user.speaker.otherlooking.length > 0
                      ? this.state.user.speaker.otherlooking.map(item => ({
                          active: true,
                          ...item
                        }))
                      : []
                  }
                  closeable={true}
                  onClose={(e, tag, index) =>
                    this.onCloseTags(e, tag, index, "otherlooking")
                  }
                />
              </Container>
            </Container>
            <div />
          </Layout>
          <div />
        </Container>
        <Container>
          <InputAutoComplete
            placeholderText={"Topics you speak about"}
            getAddedOptions={this.onAddTags.bind(this, "topic")}
            getNewAddedOptions={this.onAddTags.bind(this, "topic")}
            options={[
              { label: "option1", value: "option1" },
              { label: "option2", value: "option2" },
              { label: "option3", value: "option3" }
            ]}
            model={{ others: [] }}
            name={"others"}
          />
          <Container mt={"10px"}>
            <TagList
              tags={
                this.state.user.speaker.topic &&
                this.state.user.speaker.topic.length > 0
                  ? this.state.user.speaker.topic.map(item => ({
                      active: true,
                      ...item
                    }))
                  : []
              }
              closeable={true}
              onClose={(e, tag, index) =>
                this.onCloseTags(e, tag, index, "topic")
              }
            />
          </Container>
        </Container>
          <Container>
              <CheckBoxList
                  placeholderText={"Preferred stage"}
                  options={this.state.preferred}
                  checkboxVerticalSeparation={"10px"}
                  checkboxSize={"15px"}
                  getValue={actives => this.changePreferredStages(actives)}
                  columns={2}
              />
              <Layout customTemplateColumns={"1fr 1fr"}>
                  <Container>
                      <InputAutoComplete
                          placeholderText={"Other"}
                          getAddedOptions={this.onAddTags.bind(this, "otherpreferred")}
                          getNewAddedOptions={this.onAddTags.bind(this, "otherpreferred")}
                          options={[
                              { label: "option1", value: "option1" },
                              { label: "option2", value: "option2" },
                              { label: "option3", value: "option3" }
                          ]}
                          model={{ others: [] }}
                          name={"others"}
                      />
                      <Container mt={"10px"}>
                          <TagList
                              tags={
                                  this.state.user.speaker.otherpreferred &&
                                  this.state.user.speaker.otherpreferred.length > 0
                                      ? this.state.user.speaker.otherpreferred.map(item => ({
                                          active: true,
                                          ...item
                                      }))
                                      : []
                              }
                              closeable={true}
                              onClose={(e, tag, index) =>
                                  this.onCloseTags(e, tag, index, "otherpreferred")
                              }
                          />
                      </Container>
                  </Container>
                  <div />
              </Layout>
              <div />
          </Container>
      </Layout>
    );
  }
}

export default SixthStep;
