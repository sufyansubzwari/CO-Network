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
import { Query } from "react-apollo";
import { GetTags as tags } from "../../../../apollo-client/tag";

/**
 * @module Event
 * @category EventStep1
 */
class EventStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: this.props.data,
      category: COMMUNITYEVENTCATEGORIES
    };
  }

  componentWillMount() {
    if (this.props.data && this.props.data.category) {
      let event = this.props.data;
      event.others = this.props.data.category.filter(item => COMMUNITYEVENTCATEGORIES.findIndex(c => c.label===item.label) === -1);
      this.setState({
        category: COMMUNITYEVENTCATEGORIES.map(e => {
          e["active"] = this.props.data.category.some(
            element => e.label === element.label
          );
          return e;
        })
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.event)
      this.setState({ event: nextProps.data });
  }

  notifyParent(model, name, value) {
    if (model && name && value) {
      let event = this.state.event;
      event[name] = value;
      this.setState(
        { event: event },
        () => this.props.onChange && this.props.onChange(this.state.event)
      );
    } else this.props.onChange && this.props.onChange(this.state.event);
  }

  changeCategoryEvents(actives) {
    const selected = this.state.category.map((category, index) => {
      category["active"] = actives[index];
      return category;
    });
    const category = selected.filter(element => element.active);
    const temp = this.state.event;
    temp["category"] = category;
    this.setState({category: selected, event: temp}, () =>
      this.notifyParent()
    );
  }

  onAddTags(tag) {
    let tags = this.state.event.others || [];
    !tag.name ? (tag.name = tag.label) : null;
    tags.push(tag);
    this.state.event.others = tags;
    this.setState({ event: this.state.event }, () => this.notifyParent());
  }

  onCloseTags(e, tag, index) {
    this.state.event.others.splice(index, 1);
    this.setState({ event: this.state.event }, () => this.notifyParent());
  }

  render() {
    const { category } = this.state;
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
            name={"description"}
            model={this.state.event}
            getValue={this.notifyParent.bind(this)}
          />
        </Container>
        {/*<Container>*/}
        {/*<Layout templateColumns={2}>*/}
        {/*<Container>date 1</Container>*/}
        {/*<Container>date 2</Container>*/}
        {/*</Layout>*/}
        {/*</Container>*/}
        <Container>
          <CheckBoxList
            columns={2}
            checkboxVerticalSeparation={"10px"}
            placeholderText={"Community Event Categories"}
            options={this.state.category}
            getValue={actives => this.changeCategoryEvents(actives)}
          />
        </Container>
        <Container>
          <Layout rowGap={"10px"}>
            <Container>
              <Query query={tags} pollInterval={5000}>
                {({ loading, error, data }) => {
                  if (loading) return <div>Fetching</div>;
                  if (error) return <div>Error</div>;
                  return (
                    <InputAutoComplete
                      placeholderText={"Other"}
                      getAddedOptions={this.onAddTags.bind(this)}
                      getNewAddedOptions={this.onAddTags.bind(this)}
                      options={data.tags}
                      model={{ others: [] }}
                      name={"others"}
                    />
                  );
                }}
              </Query>
            </Container>
            <Container>
              <TagList
                tags={
                  this.state.event.others && this.state.event.others.length > 0
                    ? this.state.event.others.map(item => ({
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

EventStep1.defaultProps = {
  data: {}
};

EventStep1.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

export default EventStep1;
