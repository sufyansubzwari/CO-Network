import React from "react";
import styled from "styled-components";
import PropsTypes from "prop-types";
import { Select, TagList } from "btech-base-forms-component";

const TagsContainer = styled.div`
  margin-top: 10px;
  width: 100%;
`;

class MlSelectTag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectoptions:
        props.selectOptions && props.selectOptions.length > 0
          ? props.selectOptions
          : [],
      tags: props.tags && props.tags.length > 0 ? props.tags : []
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectTag = this.handleSelectTag.bind(this);
    this.handleTagClose = this.handleTagClose.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tags){
    this.setState({
        tags: nextProps.tags
    })
    }
  }

  handleSelectChange(obj) {
    let selectOpt = this.state.selectoptions.filter(
      option => option.value !== obj.value
    );
    let tags = this.state.tags;
    let tag = {
      name: obj.label,
      active: true,
      userAdd: true,
      closable: true,
      useIcon: this.props.tagsUseIcon,
      iconClass: this.props.tagsIcon
    };
    tags.push(tag);
    this.setState(
      {
        selectoptions: selectOpt,
        tags: tags
      },
      () => (this.props.getTags ? this.props.getTags(tags) : null)
    );
  }

  handleSelectTag(tag, index) {}

  handleTagClose(context,tag, index) {
    let newValue = { value: tag.name, label: tag.name };
    let tags = this.state.tags;
    let removedTag = tags.splice(index, 1);
    let newOptions = this.state.selectoptions;
    newOptions.push(newValue);
    this.setState(
      {
        tags: tags,
        selectoptions: [...this.state.selectoptions]
      },
      () => (this.props.getTags ? this.props.getTags(tags) : null)
    );
    this.forceUpdate();
  }

  render() {
    // let tags = (
    // );
    return (
      <div>
        <Select
          placeholderText={this.props.placeholderText}
          disabled={this.props.disabled}
          isSearchable={this.props.isSearchable}
          active={this.props.active}
          getValue={this.handleSelectChange}
          options={this.state.selectoptions}
          model={this.props.model}
          name={this.props.name}
        />
        <TagsContainer>
          <TagList
            tags={this.state.tags}
            onSelect={this.handleSelectTag}
            closeable={this.props.tagsCloseable}
            onClose={this.handleTagClose}
          />
        </TagsContainer>
      </div>
    );
  }
}

export default MlSelectTag;

MlSelectTag.defaultProps = {
  inputValue: ""
};

MlSelectTag.propTypes = {
  placeholderText: PropsTypes.string,
  disabled: PropsTypes.bool,
  isSearchable: PropsTypes.bool,
  active: PropsTypes.bool,
  selectOptions: PropsTypes.array,
  inputValue: PropsTypes.inputValue,
  tags: PropsTypes.array,
  tagsCloseable: PropsTypes.bool,
  tagsIcon: PropsTypes.string,
  tagsUseIcon: PropsTypes.bool,
  getTags: PropsTypes.func
};
