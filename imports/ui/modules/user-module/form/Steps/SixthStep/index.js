import React from "react";
import { CheckBoxList, SwitchButton } from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import {
  LOOKING_FOR_DEFAULT_SPEAKER,
  PREFERRED_STAGE
} from "../../../../../constants";
import { GetTags } from "../../../../../apollo-client/tag";
import { Query } from "react-apollo";
import { FormMainLayout, MLTagsInput } from "../../../../../components";

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

  onAddTags(name, type, tag) {
    if (tag.label && tag.label.length > 0) {
      let newTag = Object.assign({}, { ...tag });
      let tags =
        (this.state.user.speaker && this.state.user.speaker[name]) || [];
      !newTag.name ? (newTag.name = newTag.label) : null;
      newTag.type = type;
      tags.push(newTag);
      this.state.user.speaker[name] = tags;
      this.setState({ speaker: this.state.user }, () => this.notifyParent());
    }
  }

  onCloseTags(e, tag, index, name) {
    this.state.user.speaker[name].splice(index, 1);
    this.setState({ user: this.state.user }, () => this.notifyParent());
  }

  render() {
    return (
      <FormMainLayout>
        <Container mt={"15px"}>
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
        </Container>
        <Container hide={!this.state.user.speaker.join}>
          <Container>
            <CheckBoxList
              placeholderText={"Looking for"}
              options={this.state.lookingfor}
              checkboxVerticalSeparation={"10px"}
              checkboxSize={"15px"}
              getValue={actives => this.changeCategoryEvents(actives)}
              columns={2}
            />
            <Layout mdCustomTemplateColumns={"1fr 1fr"}>
              <Container>
                <Query
                  query={GetTags}
                  variables={{ tags: { type: "LookingFor" } }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <div />;
                    if (error) return <div />;
                    return (
                      <Container mt={"25px"}>
                        <MLTagsInput
                          placeholderText={"Other"}
                          getAddedOptions={this.onAddTags.bind(
                            this,
                            "otherlooking",
                            "LookingFor"
                          )}
                          getNewAddedOptions={this.onAddTags.bind(
                            this,
                            "otherlooking",
                            "LookingFor"
                          )}
                          options={data.tags}
                          model={{ others: [] }}
                          name={"others"}
                          tags={
                            this.state.user.speaker &&
                            this.state.user.speaker.otherlooking
                              ? this.state.user.speaker.otherlooking.map(
                                  item => ({
                                    active: true,
                                    useIcon: true,
                                    levelColor: item.levelColor || "",
                                    icon: item.icon || "",
                                    level: item.level || "",
                                    ...item,
                                    showOptions: !item.levelColor
                                  })
                                )
                              : []
                          }
                          onCloseTags={(e, tag, index) =>
                            this.onCloseTags(e, tag, index, "otherlooking")
                          }
                        />
                      </Container>
                    );
                  }}
                </Query>
              </Container>
              <div />
            </Layout>
            <div />
          </Container>
          <Container>
            <Query query={GetTags} variables={{ tags: { type: "Topic" } }}>
              {({ loading, error, data }) => {
                if (loading) return <div />;
                if (error) return <div />;
                return (
                  <Container mt={"25px"}>
                    <MLTagsInput
                      placeholderText={"Topics you speak about"}
                      getAddedOptions={this.onAddTags.bind(
                        this,
                        "topic",
                        "Topic"
                      )}
                      getNewAddedOptions={this.onAddTags.bind(
                        this,
                        "topic",
                        "Topic"
                      )}
                      options={data.tags}
                      model={{ others: [] }}
                      name={"others"}
                      tags={
                        this.state.user.speaker && this.state.user.speaker.topic
                          ? this.state.user.speaker.topic.map(item => ({
                              active: true,
                              useIcon: true,
                              levelColor: item.levelColor || "",
                              icon: item.icon || "",
                              level: item.level || "",
                              ...item,
                              showOptions: !item.levelColor
                            }))
                          : []
                      }
                      onCloseTags={(e, tag, index) =>
                        this.onCloseTags(e, tag, index, "topic")
                      }
                    />
                  </Container>
                );
              }}
            </Query>
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
            <Layout mdCustomTemplateColumns={"1fr 1fr"}>
              <Container>
                <Query
                  query={GetTags}
                  variables={{ tags: { type: "Preferred" } }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <div />;
                    if (error) return <div />;
                    return (
                      <Container mt={"25px"}>
                        <MLTagsInput
                          placeholderText={"Other"}
                          getAddedOptions={this.onAddTags.bind(
                            this,
                            "otherpreferred",
                            "Preferred"
                          )}
                          getNewAddedOptions={this.onAddTags.bind(
                            this,
                            "otherpreferred",
                            "Preferred"
                          )}
                          options={data.tags}
                          model={{ others: [] }}
                          name={"others"}
                          tags={
                            this.state.user.speaker &&
                            this.state.user.speaker.otherpreferred
                              ? this.state.user.speaker.otherpreferred.map(
                                  item => ({
                                    active: true,
                                    useIcon: true,
                                    levelColor: item.levelColor || "",
                                    icon: item.icon || "",
                                    level: item.level || "",
                                    ...item,
                                    showOptions: !item.levelColor
                                  })
                                )
                              : []
                          }
                          onCloseTags={(e, tag, index) =>
                            this.onCloseTags(e, tag, index, "otherpreferred")
                          }
                        />
                      </Container>
                    );
                  }}
                </Query>
              </Container>
              <div />
            </Layout>
            <div />
          </Container>
        </Container>
      </FormMainLayout>
    );
  }
}

export default SixthStep;
