import React, { Component } from "react";
import styled from "styled-components";
import PropsTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import {
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupAddon
} from "reactstrap";
import { Input, TagList } from "btech-base-forms-component";

const SDropDownMenu = styled(DropdownMenu)`
  font-size: ${props => props.fontSize || "12px"} !important;
  font-family: ${props => props.fontFamily || "Roboto Mono"};
  font-weight: ${props => props.fontWeight || "normal"};
`;

const SContainer = styled.div`
  margin-top: 25px;
  position: relative;
  background: #ffffff;
  height: auto;
  width: 100%;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
`;

const SInput = styled.input`
  flex-grow: 1;
  transition-duration: 334ms;
  transition-delay: 0.2s;
  transition-property: border-color, box-shadow;
  box-sizing: border-box;
  border: 0px;
  width: ${props => props.width || "auto"};
  height: ${props => props.height || "34px"};
  color: ${props => (props.inactive ? "#D1D1D1" : "#2B2B2B")};
  background: ${props =>
    props.valid ? (props.inactive ? "#EDEDED" : "#ffffff") : "#FEEBEB"};
  padding: 0 10px;
  border-radius: 3px;
  box-shadow: none;

  font-size: ${props => (props.fontSize ? props.fontSize : "12px")};
  font-family: ${props =>
    props.fontFamily ? props.fontFamily : "Roboto Mono"};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : "normal")};

  outline: none;

  :active {
    border-color: "transparent";
  }
  :focus {
    border: "red";
  }
`;

const SLabel = styled.label`
  position: absolute;
  top: ${props => (props.inactive ? "8px" : "-22px")};
  left: ${props => (props.inactive ? "10px" : "10px")};
  font-size: ${props => (props.fontSize ? props.fontSize : null)};
  font-family: ${props => (props.fontFamily ? props.fontFamily : null)};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : null)};
  color: ${props => (props.inactive ? "#D1D1D1" : "#2B2B2B")};
  transition: all 0.2s ease-out;
`;

export default class TagsInputAutoComplete extends Component {
  InputRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      value: "",
      active: props.active ? props.active : props.value !== "",
      valid: true,
      dropDownOpen: false,
      options: this.props.options,
      activeOption: -1,
      tags: this.props.tags
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onAddOption = this.onAddOption.bind(this);
    this.onAddNewOption = this.onAddNewOption.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tags && nextProps.tags !== this.state.tags) {
      this.setState({ tags: nextProps.tags });
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    let filters = this.props.options.filter(item => {
      return (
        item.label.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
    });
    this.setState({ dropDownOpen: filters.length > 0, options: filters });
  }

  onFocus() {
    this.InputRef && this.InputRef.current && this.InputRef.current.focus();
    // this.setState({
    //   active: true
    // });
  }

  toggleDropDown() {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen,
      activeOption: -1
    });
  }

  onAddOption(item) {
    this.props.getAddedOptions && this.props.getAddedOptions(item);
    !this.props.keepText ? this.setState({ value: "" }) : null;
  }

  onAddNewOption() {
    const tag = {
      label: this.state.value,
      value: this.state.value,
      name: this.state.value
    };
    this.props.getNewAddedOptions && this.props.getNewAddedOptions(tag);
    !this.props.keepText ? this.setState({ value: "" }) : null;
  }

  onKeyDown(event) {
    if (event) {
      if (
        event.key === "ArrowDown" &&
        this.state.dropDownOpen &&
        this.state.activeOption < this.state.options.length - 1
      ) {
        event.preventDefault();
        this.setState({ activeOption: this.state.activeOption + 1 });
      }
      if (
        event.key === "ArrowUp" &&
        this.state.dropDownOpen &&
        this.state.activeOption > 0
      ) {
        event.preventDefault();
        this.setState({ activeOption: this.state.activeOption - 1 });
      }
      if (
        event.key === "Enter" &&
        this.state.dropDownOpen &&
        this.state.activeOption !== -1
      ) {
        event.preventDefault();
        this.onAddOption(this.state.options[this.state.activeOption]);
        this.toggleDropDown();
      }
    }
  }

  render() {
    return (
      <SContainer onClick={() => this.onFocus()}>
        <SLabel inactive={!this.state.active} onClick={() => this.onFocus()}>
          {this.props.placeholderText}
          {this.props.required ? <SRequiredLabel>*</SRequiredLabel> : null}
        </SLabel>
        <InputGroup style={{ height: "auto", padding: "4px 8px" }}>
          <InputGroupAddon addonType="prepend">
            <TagListuseIcon={this.props.useIcon} onCategoryChange={this.props.onCategoryChange} style={{marginTop: "5px"}}levelOptions={this.props.levelOptions} closeable={true} tags={this.state.tags} onClose={(e,tag,index) => this.props.onCloseTags && this.props.onCloseTags(e,tag,index)}/>
          </InputGroupAddon>
          <InputGroupButtonDropdown
            addonType="append"
            isOpen={this.state.dropDownOpen}
            toggle={() => this.toggleDropDown()}
          >
            <DropdownToggle
              style={{ padding: "0", border: "0" }}
              className={"btn-transparent text-robo text-normal"}
            >
              {""}
            </DropdownToggle>
            <SDropDownMenu
              fontWeight={this.props.fontWeight}
              fontFamily={this.props.fontFamily}
              fontSize={this.props.fontSize}
            >
              {this.state.options
                ? this.state.options
                    .slice(0, this.props.optionsLimit || 9)
                    .map((item, key) => {
                      return (
                        <DropdownItem
                          key={key}
                          active={this.state.activeOption === key}
                          onMouseOver={() => {
                            this.setState({ activeOption: key });
                          }}
                          style={
                            this.state.activeOption === key
                              ? {
                                  backgroundColor:
                                    this.props.dropBackground || "#f92672"
                                }
                              : null
                          }
                          className={`text-robo text-normal ${
                            this.state.option === item ? "text-primary" : ""
                          }`}
                          onClick={() => this.onAddOption(item)}
                        >
                          {item.label}
                        </DropdownItem>
                      );
                    })
                : null}
            </SDropDownMenu>
            <SInput
              ref={this.InputRef}
              type={"text"}
              onFocus={this.onFocus}
              placeholder={this.props.inputPlaceholder}
              autoFocus={this.props.autoFocus}
              onChange={this.handleChange}
              disabled={this.props.disabled}
              placeholderModel={this.props.placeholder}
              inactive={!this.state.active}
              fixLabel={this.props.fixLabel}
              value={this.state.value}
              valid={this.state.valid}
              width={this.props.width}
              onKeyDown={e => {
                if (this.state.dropDownOpen) {
                  this.onKeyDown && this.onKeyDown(e);
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  this.onAddNewOption();
                }
              }}
            />
          </InputGroupButtonDropdown>
        </InputGroup>
      </SContainer>
    );
  }
}

TagsInputAutoComplete.defaultProps = {
  iconClass: "plus",
  fixLabel: false
};


TagsInputAutoComplete.propTypes = {
  options: PropsTypes.array,
  fixLabel: PropsTypes.bool,
  iconClass: PropsTypes.string,
  getAddedOptions: PropsTypes.func,
  getNewAddedOptions: PropsTypes.func,
  onCloseTags: PropsTypes.func,
  tags: PropsTypes.array,
  dropBackground: PropsTypes.string,
  optionsLimit: PropsTypes.number,
  keepText: PropsTypes.bool,
  fontSize: PropsTypes.string,
  fontFamily: PropsTypes.string,
  fontWeight: PropsTypes.string,
  inputPlaceholder: PropsTypes.string,
  onCategoryChange: PropsTypes.func,
  levelOptions: PropsTypes.array
};
