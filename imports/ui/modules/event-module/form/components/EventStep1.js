import React, { Component } from "react";
import { Container, Layout } from "btech-layout";
import PropTypes from "prop-types";
import {
  CheckBoxList,
  DatePickerRange,
  Input,
  TagList,
  TextArea
} from "btech-base-forms-component";
import { EVENT_TYPE } from "../../../../constants";
import { Query } from "react-apollo";
import { GetTags as tags } from "../../../../apollo-client/tag";
import { MLTagsInput, FormMainLayout } from "../../../../../ui/components";
import moment from "moment";

/**
 * @module Event
 * @category EventStep1
 */
class EventStep1 extends Component {
  constructor(props) {
    super(props);
    this.dateFormat = "MM/DD/YYYY HH:mm A";
    this.state = {
      event: this.props.data,
      category: EVENT_TYPE
    };
  }

  componentWillMount() {
    if (this.props.data && this.props.data.category) {
      let event = this.props.data;
      event.others = this.props.data.category.filter(
        item => EVENT_TYPE.findIndex(c => c.label === item.label) === -1
      );
      this.setState({
        category: EVENT_TYPE.map(e => {
          e["active"] = this.props.data.category.some(
            element => e.label === element.label
          );
          return e;
        })
      });
    }
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
      category["type"] = "EVENT";
      return category;
    });
    const category = selected.filter(element => element.active);
    const temp = this.state.event;
    temp["category"] = category;
    this.setState({ category: selected, event: temp }, () =>
      this.notifyParent()
    );
  }

  onAddTags(tag) {
    if (tag.label && tag.label.length > 0) {
      let newTag = Object.assign({}, tag);
      let tags = this.state.event.others || [];
      let category = this.state.event.category || [];
      !newTag.name ? (newTag.name = newTag.label) : null;
      newTag.type = "EVENT";
      tags.push(newTag);
      category.push(newTag);
      this.state.event.others = tags;
      this.state.event.category = category;
      this.setState({ event: this.state.event }, () => this.notifyParent());
    }
  }

  onCloseTags(e, tag, index) {
    this.state.event.others.splice(index, 1);
    let category = this.state.event.category;
    let i = category.length && category.findIndex(cate => cate.label === tag.label);
    if(i > -1)
      category.splice(i,1);
    this.state.event.category = category;
    this.setState({ event: this.state.event }, () => this.notifyParent());
  }

  onDatesChange(startDate, endDate) {
    let event = this.state.event;
    event.startDate = startDate;
    event.endDate = endDate;
    this.setState(
      { event: event },
      () => this.props.onChange && this.props.onChange(this.state.event)
    );
  }

  tagsSuggested(tags) {
    let sug = JSON.parse(JSON.stringify(tags));
    return sug
      .filter(
        tag =>
          !this.state.event ||
          !this.state.event.others ||
          this.state.event.others.length === 0 ||
          this.state.event.others.findIndex(item => item._id === tag._id) === -1
      )
      .sort((a, b) => b.used - a.used)
      .map(tag => ({
        ...tag,
        active:
          this.state.event &&
          this.state.event.others &&
          this.state.event.others.findIndex(item => item._id === tag._id) > -1
      }))
      .slice(0, 5);
  }

  render() {
    const { category } = this.state;
    return (
      <FormMainLayout>
        <Container>
          <Input
            required
            placeholderText={"Title"}
            name={"title"}
            model={this.state.event}
            getValue={this.notifyParent.bind(this)}
          />
        </Container>
        <Container>
          <TextArea
            placeholderText={"Summary"}
            required
            name={"description"}
            model={this.state.event}
            getValue={this.notifyParent.bind(this)}
          />
        </Container>
        <Container>
          <DatePickerRange
            required
            minDate={moment()}
            labelText={"Dates"}
            reverse={true}
            placeholderStartDate={"Start Date"}
            placeholderEndDate={"End Date"}
            startDate={this.state.event && this.state.event.startDate}
            endDate={this.state.event && this.state.event.endDate}
            format={this.dateFormat}
            showTimeSelect
            getValue={(startDate, endDate) =>
              this.onDatesChange(startDate, endDate)
            }
          />
        </Container>
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
              <Query query={tags} variables={{ tags: { type: "EVENT" } }}>
                {({ loading, error, data }) => {
                  if (loading) return <div />;
                  if (error) return <div>Error</div>;
                  return (
                    <div>
                      <MLTagsInput
                        inputPlaceholder={"Discover..."}
                        placeholderText={"Other"}
                        getAddedOptions={this.onAddTags.bind(this)}
                        getNewAddedOptions={this.onAddTags.bind(this)}
                        onCloseTags={(e, tag, index) =>
                          this.onCloseTags(e, tag, index)
                        }
                        options={data.tags}
                        tags={
                          this.state.event &&
                          this.state.event.others &&
                          this.state.event.others.length > 0
                            ? this.state.event.others.map(item => ({
                                active: true,
                                ...item
                              }))
                            : []
                        }
                      />
                      <Container mt={"10px"}>
                        <TagList
                          tags={this.tagsSuggested(data.tags.filter(tag => this.state.category.findIndex(item => item.label === tag.label) === -1))}
                          onSelect={(event, tag, index) => {
                            if (!tag.active) {
                              delete tag.active;
                              this.onAddTags(tag);
                            } else {
                              const pos = this.state.event.others.findIndex(
                                item => item._id === tag._id
                              );
                              this.onCloseTags(event, tag, pos);
                            }
                          }}
                        />
                      </Container>
                    </div>
                  );
                }}
              </Query>
            </Container>
          </Layout>
        </Container>
      </FormMainLayout>
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
