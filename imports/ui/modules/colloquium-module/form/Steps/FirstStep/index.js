import React from "react";
import {
  CheckBoxList,
  Input,
  SwitchButton,
  TagList,
  TextArea
} from "btech-base-forms-component";
import MLTagsInput from "../../../../../components/TagsInputAutoComplete/TagsInputAutoComplete";
import { Container, Layout } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import { COLLOQUIUM_LEVEL } from "../../../../../constants";
import { Query } from "react-apollo";
import { GetTags } from "../../../../../apollo-client/tag";

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    let data = props.data ? props.data : {};
    this.state = { colloquium: data, competences: COLLOQUIUM_LEVEL };
  }

  componentWillMount() {
    if (this.props.data && this.props.data.competences) {
      this.setState({
        competences: COLLOQUIUM_LEVEL.map(e => {
          e["active"] = this.props.data.competences.some(
            element => e.label === element.label
          );
          return e;
        })
      });
    }
  }

  changeLevel(actives) {
    const selected = this.state.competences.map((level, index) => {
      level["active"] = actives[index];
      return level;
    });
    const levels = selected.filter(element => element.active);
    const temp = this.state.colloquium;
    temp.competences = levels;
    this.setState({ competences: selected, colloquium: temp }, () =>
      this.notifyParent()
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.colloquium)
      this.setState({ colloquium: nextProps.data });
  }

  notifyParent(model, name, value) {
    if (model && name && value) {
      let colloquium = this.state.colloquium;
      colloquium[name] = value;
      this.setState(
        { colloquium: colloquium },
        () => this.props.onChange && this.props.onChange(this.state.colloquium)
      );
    } else this.props.onChange && this.props.onChange(this.state.colloquium);
  }

  notifyParentLocation(model, name, value) {
    if (model && name && value) {
      let colloquium = this.state.colloquium;
      colloquium.place[name] = value;
      this.setState(
        { colloquium: colloquium },
        () => this.props.onChange && this.props.onChange(this.state.colloquium)
      );
    } else this.props.onChange && this.props.onChange(this.state.colloquium);
  }

  onAddTags(tag) {
    if (tag) {
      let newTag = Object.assign({}, tag);
      let tags = this.state.colloquium.tags || [];
      !newTag.name ? (newTag.name = newTag.label) : null;
      newTag.type = "Colloquiums";
      tags.push(newTag);
      this.state.colloquium.tags = tags;
      this.setState({ colloquium: this.state.colloquium }, () =>
        this.notifyParent()
      );
    }
  }

  onCloseTags(e, tag, index) {
    this.state.colloquium.tags.splice(index, 1);
    this.setState({ colloquium: this.state.colloquium }, () =>
      this.notifyParent()
    );
  }

  tagsSuggested(tags) {
    if (tags) {
      let sug = tags.map(element => {
        return { ...element };
      });
      const entityTags = this.state.colloquium.tags || [];
      return sug
        .filter(
          tag =>
            !this.state.colloquium ||
            !entityTags.length ||
            entityTags.findIndex(item => item._id === tag._id) === -1
        )
        .sort((a, b) => b.used - a.used)
        .map(tag => ({
          ...tag,
          active: entityTags && entityTags.some(item => item._id === tag._id)
        }))
        .slice(0, 5);
    } else return [];
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <Layout templateColumns={2} colGap={"20px"}>
          <Input
            name={"title"}
            model={this.state.colloquium}
            placeholderText={"Title"}
            getValue={this.notifyParent.bind(this)}
          />
          <GeoInputLocation
            required={false}
            model={this.state.colloquium.place}
            name={"location"}
            placeholder={"Location"}
            onChange={this.notifyParentLocation.bind(this)}
          />
        </Layout>
        <Container>
          <TextArea
            model={this.state.colloquium}
            name={"description"}
            placeholderText={"Describe this chat room"}
            getValue={this.notifyParent.bind(this)}
          />
        </Container>
        <Container>
          <CheckBoxList
            placeholderText={"Competences"}
            options={this.state.competences}
            checkboxVerticalSeparation={"10px"}
            checkboxSize={"15px"}
            getValue={actives => this.changeLevel(actives)}
          />
        </Container>
        <Container>
          <Query query={GetTags} variables={{ tags: { type: "Colloquiums" } }}>
            {({ loading, error, data }) => {
              if (error) return <div>Error</div>;
              return (
                <Container>
                  <MLTagsInput
                    placeholderText={"Category Tags"}
                    getAddedOptions={this.onAddTags.bind(this)}
                    getNewAddedOptions={this.onAddTags.bind(this)}
                    onCloseTags={(e, tag, index) =>
                      this.onCloseTags(e, tag, index)
                    }
                    options={data.tags || []}
                    tags={
                      this.state.colloquium.tags &&
                      this.state.colloquium.tags.map(item => ({
                        active: true,
                        ...item
                      }))
                    }
                  />
                  <Container mt={"10px"}>
                    <TagList
                      tags={this.tagsSuggested(data.tags)}
                      onSelect={(event, tag, index) => {
                        if (!tag.active) {
                          delete tag.active;
                          this.onAddTags(tag);
                        } else {
                          const pos = this.state.colloquium.tags.findIndex(
                            item => item._id === tag._id
                          );
                          this.onCloseTags(event, tag, pos);
                        }
                      }}
                    />
                  </Container>
                </Container>
              );
            }}
          </Query>
        </Container>
        {/*<Container>*/}
          {/*<SwitchButton*/}
            {/*checked={this.state.colloquium.isPublic}*/}
            {/*text={"Make Public this Colloquium"}*/}
            {/*onChange={status =>*/}
              {/*this.notifyParent(this.state.colloquium, "isPublic", status)*/}
            {/*}*/}
            {/*description={*/}
              {/*"Allow access for the exchange of transformation ideas in Science, Technology, Culture and Others."*/}
            {/*}*/}
          {/*/>*/}
        {/*</Container>*/}
      </Layout>
    );
  }
}

export default FirstStep;
