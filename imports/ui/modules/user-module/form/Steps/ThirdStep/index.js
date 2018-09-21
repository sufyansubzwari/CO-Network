import React from "react";
import {
  CheckBoxList,
  InputAutoComplete,
  TagList
} from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";

import {
  USER_TAGS,
  LOOKING_FOR,
  LOOKING_FOR_DEFAULT
} from "../../constants/constants";
import { GetTags } from "../../../../../apollo-client/tag";
import { Query } from "react-apollo";

class ThirdStep extends React.Component {
  constructor(props) {
    super(props);

    let data = props.data ? props.data : {};

    this.state = {
      user: data,
      lookingfor: LOOKING_FOR_DEFAULT
    };
  }

  componentWillMount() {
    if (this.props.data && this.props.data.knowledge.lookingFor)
      this.setState({
        lookingfor: LOOKING_FOR_DEFAULT.map(e => {
          e["active"] = this.props.data.knowledge.lookingFor.some(
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
    temp["knowledge"]["lookingFor"] = lookings;
    this.setState({ lookingfor: selected, user: temp }, () =>
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
    let tags = this.state.user.knowledge[name];
    !tag.name ? (tag.name = tag.label) : null;
    tags.push(tag);
    tag.type = type;
    this.state.user.knowledge[name] = tags;
    this.setState({ user: this.state.user }, () => this.notifyParent());
  }

  onCloseTags(e, tag, index, name) {
    this.state.user.knowledge[name].splice(index, 1);
    this.setState({ user: this.state.user }, () => this.notifyParent());
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
              );
            }}
          </Query>
          <Container mt={"10px"}>
            <TagList
              tags={
                this.state.user.knowledge.languages &&
                this.state.user.knowledge.languages.length > 0
                  ? this.state.user.knowledge.languages.map(item => ({
                      active: true,
                      ...item
                    }))
                  : []
              }
              closeable={true}
              onClose={(e, tag, index) =>
                this.onCloseTags(e, tag, index, "languages")
              }
            />
          </Container>
        </Container>
        <Container>
          <Query query={GetTags} variables={{ tags: { type: "Languages" } }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>;
              if (error) return <div>Error</div>;
              return (
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
                      ...item
                    }))
                  : []
              }
              closeable={true}
              onClose={(e, tag, index) =>
                this.onCloseTags(e, tag, index, "curiosity")
              }
            />
          </Container>
        </Container>
        <CheckBoxList
          placeholderText={"Looking for"}
          options={this.state.lookingfor}
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
