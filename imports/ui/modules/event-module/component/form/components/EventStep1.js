import React, { Component } from "react";
import { Container, Layout } from "btech-layout";
import PropTypes from "prop-types";
import {
  Input,
  TextArea,
  CheckBoxList,
  InputAutoComplete,
  TagList
} from "btech-base-forms-component";
import { COMMUNITYEVENTCATEGORIES } from "../constants/community-event-categories";

/**
 * @module Event
 * @category EventStep1
 */
class EventStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: this.props.data,
      categories: COMMUNITYEVENTCATEGORIES
    };
  }

  componentWillMount() {
    if (this.props.data && this.props.data.categories)
      this.setState({
        categories: COMMUNITYEVENTCATEGORIES.map(e => {
          e["active"] = this.props.data.categories.some(
            element => e.label === element
          );
          return e;
        })
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) this.setState({ event: nextProps.data });
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.event);
  }

  changeCategoryEvents(actives) {
    const selected = this.state.categories.map((category, index) => {
      category["active"] = actives[index];
      return category;
    });
    const categories = selected
      .filter(element => element.active)
      .map(e => e.label);
    const temp = this.state.event;
    temp["categories"] = categories;
    this.setState({ categories: selected, event: temp }, () =>
      this.notifyParent()
    );
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <Container>
          <Input
            placeholderText={"Title"}
            name={"title"}
            model={this.state.event}
            getValue={this.notifyParent.bind(this)}
          />
        </Container>
        <Container>
          <TextArea
            placeholderText={"Summary"}
            name={"summary"}
            model={this.state.event}
            getValue={this.notifyParent.bind(this)}
          />
        </Container>
        <Container>
          <Layout templateColumns={2}>
            <Container>date 1</Container>
            <Container>date 2</Container>
          </Layout>
        </Container>
        <Container>
          <CheckBoxList
            columns={2}
            checkboxVerticalSeparation={"10px"}
            placeholderText={"Community Event Categories"}
            options={this.state.categories}
            getValue={actives => this.changeCategoryEvents(actives)}
          />
        </Container>
        <Container>
          <Layout rowGap={"10px"}>
            <Container>
              <InputAutoComplete
                placeholderText={"Other"}
                getAddedOptions={data => console.log(data)}
                name={"others"}
                model={this.state.event}
                getValue={this.notifyParent.bind(this)}
                options={[
                  { label: "option1", value: "option1" },
                  { label: "option2", value: "option2" },
                  { label: "option3", value: "option3" }
                ]}
              />
            </Container>
            <Container>
              <TagList
                tags={[
                  { name: "option1", active: true },
                  { name: "option2", active: true },
                  { name: "option3", active: true }
                ]}
                onSelect={tag => alert(`you select the tag '${tag.name}'`)}
                closeable={true}
                onClose={tag => alert(`you close the tag '${tag.name}'`)}
              />
            </Container>
          </Layout>
        </Container>
      </Layout>
    );
  }
}

EventStep1.defaultProps = {
  data: {}
};

EventStep1.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

export default EventStep1;
