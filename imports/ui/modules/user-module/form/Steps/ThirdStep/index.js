import React from "react";
import {
  CheckBoxList,
  InputAutoComplete,
  TagList
} from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";

import { LOOKING_FOR_DEFAULT, TAG_LEVEL } from "../../../../../constants";
import { GetTags } from "../../../../../apollo-client/tag";
import { Query } from "react-apollo";

class ThirdStep extends React.Component {
  constructor(props) {
    super(props);

    let data = props.data ? props.data : {};

    this.state = {
      user: data,
      lookingFor: LOOKING_FOR_DEFAULT
    };
  }

  componentWillMount() {
    if (this.props.data && this.props.data.knowledge.lookingFor)
      this.setState({
        lookingFor: LOOKING_FOR_DEFAULT.map(e => {
          e["active"] = this.props.data.knowledge.lookingFor.some(
            element => e.label === element.label
          );
          return e;
        })
      });
  }

  changeCategoryEvents(actives) {
    const selected = this.state.lookingFor.map((looking, index) => {
      looking["active"] = actives[index];
      return looking;
    });
    const lookings = selected.filter(element => element.active);
    const temp = this.state.user;
    temp["knowledge"]["lookingFor"] = lookings;
    this.setState({ lookingFor: selected, user: temp }, () =>
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
      let newTag = Object.assign({}, { tag: { ...tag } });
      let tags =
        (this.state.user.knowledge && this.state.user.knowledge[name]) || [];
      !newTag.tag.name ? (newTag.tag.name = newTag.tag.label) : null;
      newTag.tag.type = type;
      tags.push(newTag);
      this.state.user.knowledge[name] = tags;
      this.setState({ user: this.state.user }, () => this.notifyParent());
    }
  }

  onCloseTags(e, tag, index, name) {
    this.state.user.knowledge[name].splice(index, 1);
    this.setState({ user: this.state.user }, () => this.notifyParent());
  }

  handleCategoryChange(index, value, color, icon, name) {
    if (
      value &&
      this.state.user.knowledge &&
      this.state.user.knowledge[name] &&
      this.state.user.knowledge[name][index]
    ) {
      let newTag = {
        ...this.state.user.knowledge[name][index],
        levelColor: color,
        icon: icon,
        level: value
      };
      this.state.user.knowledge[name][index] = newTag;
      this.setState({ user: this.state.user }, () => this.notifyParent());
    }
  }

  tagsSuggested(tags, name) {
    let sug = JSON.parse(JSON.stringify(tags));
    return sug
      .sort((a, b) => b.used - a.used)
      .map(tag => ({
        ...tag,
        active:
          this.state.user &&
          this.state.user.knowledge &&
          this.state.user.knowledge[name].findIndex(
            item => item.tag._id === tag._id
          ) > -1
      }))
      .slice(0, 5);
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <Container>
          <Query query={GetTags} variables={{ tags: { type: "Languages" } }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>;
              if (error) return <div>Error</div>;
              return (
                <div>
                  <InputAutoComplete
                    placeholderText={"Languages & Libraries"}
                    getAddedOptions={this.onAddTags.bind(
                      this,
                      "languages",
                      "Languages"
                    )}
                    getNewAddedOptions={this.onAddTags.bind(
                      this,
                      "languages",
                      "Languages"
                    )}
                    options={data.tags}
                    model={{ others: [] }}
                    name={"others"}
                  />
                  <Container mt={"10px"}>
                    <TagList
                      tags={this.tagsSuggested(data.tags, "languages")}
                      onSelect={(event, tag, index) => {
                        if (!tag.active) {
                          delete tag.active;
                          this.onAddTags("languages", "Languages", tag);
                        } else {
                          const pos = this.state.user.knowledge.languages.findIndex(
                            item => item.tag._id === tag._id
                          );
                          this.onCloseTags(event, tag, pos, "languages");
                        }
                      }}
                    />
                  </Container>
                </div>
              );
            }}
          </Query>
          <Container mt={"10px"}>
            <TagList
              tags={
                this.state.user.knowledge && this.state.user.knowledge.languages
                  ? this.state.user.knowledge.languages.map(item => ({
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
              closeable={true}
              onClose={(e, tag, index) =>
                this.onCloseTags(e, tag, index, "languages")
              }
              levelOptions={TAG_LEVEL}
              onCategoryChange={(index, value, color, icon) =>
                this.handleCategoryChange(
                  index,
                  value,
                  color,
                  icon,
                  "languages"
                )
              }
            />
          </Container>
        </Container>
        <Container>
          <Query query={GetTags} variables={{ tags: { type: "Curiosity" } }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>;
              if (error) return <div>Error</div>;
              return (
                <div>
                  <InputAutoComplete
                    placeholderText={"Curiosity & Experience"}
                    getAddedOptions={this.onAddTags.bind(
                      this,
                      "curiosity",
                      "Curiosity"
                    )}
                    getNewAddedOptions={this.onAddTags.bind(
                      this,
                      "curiosity",
                      "Curiosity"
                    )}
                    options={data.tags}
                    model={{ others: [] }}
                    name={"others"}
                  />
                  <Container mt={"10px"}>
                    <TagList
                      tags={this.tagsSuggested(data.tags, "curiosity")}
                      onSelect={(event, tag, index) => {
                        if (!tag.active) {
                          delete tag.active;
                          this.onAddTags("curiosity", "Curiosity", tag);
                        } else {
                          const pos = this.state.user.knowledge.curiosity.findIndex(
                            item => item.tag._id === tag._id
                          );
                          this.onCloseTags(event, tag, pos, "curiosity");
                        }
                      }}
                    />
                  </Container>
                </div>
              );
            }}
          </Query>
          <Container mt={"10px"}>
            <TagList
              tags={
                this.state.user.knowledge.curiosity &&
                this.state.user.knowledge.curiosity.length > 0
                  ? this.state.user.knowledge.curiosity.map(item => ({
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
              closeable={true}
              onClose={(e, tag, index) =>
                this.onCloseTags(e, tag, index, "curiosity")
              }
              levelOptions={TAG_LEVEL}
              onCategoryChange={(index, value, color, icon) =>
                this.handleCategoryChange(
                  index,
                  value,
                  color,
                  icon,
                  "curiosity"
                )
              }
            />
          </Container>
        </Container>
        <CheckBoxList
          placeholderText={"Looking for"}
          options={this.state.lookingFor}
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
