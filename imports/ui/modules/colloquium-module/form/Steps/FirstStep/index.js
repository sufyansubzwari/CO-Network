import React from "react";
import {
  Input,
  TextArea,
  CheckBoxList,
  InputAutoComplete,
  TagList
} from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import { COLLOQUIUM_LEVEL } from "../../../../../constants";
import styled from "styled-components";
import { Mutation, Query } from "react-apollo";
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
      level["type"] = "COLLOQUIUM";
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
      let categories = this.state.colloquium.categories || [];
      !newTag.name ? (newTag.name = newTag.label) : null;
      newTag.type = "Colloquiums";
      categories.push(newTag);
      this.state.colloquium.categories = categories;
      this.setState({ colloquium: this.state.colloquium }, () =>
        this.notifyParent()
      );
    }
  }

  onCloseTags(e, tag, index, name) {
    this.state.colloquium.categories.splice(index, 1);
    this.setState({ colloquium: this.state.colloquium }, () =>
      this.notifyParent()
    );
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <Layout templateColumns={2} colGap={"20px"}>
          <Input
            name={"name"}
            model={this.state.colloquium}
            placeholderText={"Title"}
            getValue={this.notifyParent.bind(this)}
          />
          <GeoInputLocation
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
            placeholderText={"Competence"}
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
                <InputAutoComplete
                  placeholderText={"Category Tags"}
                  getAddedOptions={this.onAddTags.bind(this)}
                  getNewAddedOptions={this.onAddTags.bind(this)}
                  options={data.tags}
                  model={this.state.colloquium}
                  name={"categories"}
                />
              );
            }}
          </Query>
          <Container mt={"10px"}>
            <TagList
              tags={
                this.state.colloquium.cateories &&
                this.state.organization.tech.stack.map(item => ({
                  active: true,
                  ...item
                }))
              }
              closeable={true}
              onClose={(e, tag, index) => this.onCloseTags(e, tag, index)}
            />
          </Container>
        </Container>
      </Layout>
    );
  }
}

export default FirstStep;
