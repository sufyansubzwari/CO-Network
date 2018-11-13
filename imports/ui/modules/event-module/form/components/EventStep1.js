import React, {Component} from "react";
import {Container, Layout} from "btech-layout";
import PropTypes from "prop-types";
import {
  CheckBoxList,
  DatePickerRange,
  Input,
  TagList,
  TextArea
} from "btech-base-forms-component";
import {EVENT_TYPE} from "../../../../constants";
import {Query} from "react-apollo";
import {TagsFilters as tags} from "../../../../apollo-client/tag";
import {MLTagsInput, FormMainLayout} from "../../../../../ui/components";
import moment from "moment";
import isMobile from "../../../../constants/isMobile";

/**
 * @module Event
 * @category EventStep1
 */
class EventStep1 extends Component {
  constructor(props) {
    super(props);
    this.isMobile = isMobile;
    const lowResolution =
      this.isMobile() || window.document.body.clientWidth <= 376;
    this.state = {
      event: this.props.data,
      category: EVENT_TYPE,
      dateFormat: lowResolution ? "MM/DD/YY HH:mm" : "MM/DD/YYYY HH:mm A"
    };
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      const lowResolution =
        this.isMobile() || window.document.body.clientWidth <= 376;
      this.setState({
        dateFormat: lowResolution ? "MM/DD/YY HH:mm" : "MM/DD/YYYY HH:mm A"
      });
    });
    if (this.props.data && this.props.data.category) {
      //this.handleCategory(this.props);
    }
  }

  handleCategory = props => {
    let event = props.data;
    event.others = props.data.category.filter(
      item => EVENT_TYPE.findIndex(c => c.label === item.label) === -1
    );
    this.setState({
      category: EVENT_TYPE.map(e => {
        e["active"] = props.data.category.some(
          element => e.label === element.label
        );
        return e;
      })
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.event)
      this.setState({event: nextProps.data});
    if (nextProps.data && nextProps.data.category) {
      //this.handleCategory(nextProps);
    }
  }

  notifyParent(model, name, value) {
    if (model && name && value) {
      let event = this.state.event;
      event[name] = value;
      this.setState(
        {event: event},
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

    //let others = this.state.event.others;

    const category = selected.filter(element => element.active);
    //others && others.map(tag => category.push(tag));
    const temp = this.state.event;
    temp["category"] = category;
    this.setState({category: selected, event: temp}, () =>
      this.notifyParent()
    );
  }

  onAddTags(type, section, tag) {
    if (tag.label && tag.label.length > 0) {
      let newTag = Object.assign({}, { ...tag });
      let tags = (this.state.event && this.state.event[section]) || [];
      !newTag.name ? (newTag.name = newTag.label) : null;
      newTag.type = type;
      tags.push(newTag);
      this.state.event[section] = tags;
      this.setState({ event: this.state.event }, () => this.notifyParent());
    }
  }

  onCloseTags(e, tag, index) {
    this.state.event.tags.splice(index, 1);
    let eventTags = this.state.event.tags;
    let i =
      eventTags.length && eventTags.findIndex(cate => cate.label === tag.label);
    if (i > -1) eventTags.splice(i, 1);
    this.state.event.tags = eventTags;
    this.setState({event: this.state.event}, () => this.notifyParent());
  }

  onDatesChange(startDate, endDate) {
    let event = this.state.event;
    event.startDate = startDate;
    event.endDate = endDate;
    this.setState(
      {event: event},
      () => this.props.onChange && this.props.onChange(this.state.event)
    );
  }

  tagsSuggested(tags) {
    let sug = JSON.parse(JSON.stringify(tags));
    let exist = !this.state.event || !this.state.event.tags || this.state.event.tags.length === 0;
    return (exist ? sug : sug
        .filter(
          tag =>
            this.state.event.tags.findIndex(item => item._id === tag._id) === -1
        )
    ).slice(0, 5);
  }

  render() {
    const {category} = this.state;
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
            format={this.state.dateFormat}
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
              <Query query={tags} variables={{ type: "EVENT", entity: "EVENT", field: "tags" }}>
                {({loading, error, data}) => {
                  if (loading) return <div/>;
                  if (error) return <div/>;
                  return (
                    <div>
                      <MLTagsInput
                        inputPlaceholder={"Discover..."}
                        placeholderText={"Event Tags"}
                        getAddedOptions={this.onAddTags.bind(this, "EVENT", "tags")}
                        getNewAddedOptions={this.onAddTags.bind(this, "EVENT", "tags")}
                        onCloseTags={(e, tag, index) =>
                          this.onCloseTags(e, tag, index)
                        }
                        options={data.tagsFilters}
                        tags={
                          this.state.event &&
                          this.state.event.tags &&
                          this.state.event.tags.length > 0
                            ? this.state.event.tags.map(item => ({
                              active: true,
                              ...item
                            }))
                            : []
                        }
                      />
                      <Container mt={"10px"}>
                        <TagList
                          tags={this.tagsSuggested(data.tagsFilters)}
                          onSelect={(event, tag, index) => {
                            if (!tag.active) {
                              delete tag.active;
                              this.onAddTags("EVENT", "tags", tag);
                            } else {
                              const pos = this.state.event.tags.findIndex(
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
