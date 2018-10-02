import React from "react";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";
import PropsTypes from "prop-types";

const SBigTag = styled.div`
  cursor: pointer;
  font-family: ${props =>
    props.theme.bigtag ? props.theme.bigtag.font.family : null};
  font-weight: ${props =>
    props.theme.bigtag ? props.theme.bigtag.font.weight : null};
  text-align: ${props =>
    props.theme.bigtag ? props.theme.bigtag.font.align : "left"};
  font-size: ${props =>
    props.theme.bigtag ? props.theme.bigtag.font.size : "12px"};
  background: ${props =>
    props.connected
      ? props.theme.bigtag.color.lightblue
      : props.theme.bigtag.color.gray};

  color: ${props =>
    props.connected
      ? props.theme.bigtag.color.primary
      : props.theme.bigtag.color.black};

  display: flex;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 12px 0;
`;

const Icon = styled.span`
  padding-bottom: 10px;
  font-size: 18px;
`;

const SText = styled.span`
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    height: 35px;
    display: inline-block;
`;

class BigTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false
    };
  }

  render() {
    let values = [];
    if (this.props.fields) {
      values = this.props.fields.map((field, index) => {
        return this.props.data && this.props.data[field] ? (
          <div>
            <label key={index}>{this.props.data[field]}</label>
          </div>
        ) : null;
      });
    }
    return (
      <SBigTag
        connected={this.props.connected}
        width={this.props.width}
        height={this.props.height}
        onClick={this.props.onClick}
      >
        <Icon>
          <MaterialIcon type={this.props.icon} />
        </Icon>
        <SText>{this.props.text}</SText>
      </SBigTag>
    );
  }
}

export default BigTag;

BigTag.propTypes = {
  connected: PropsTypes.bool,
  icon: PropsTypes.string,
  text: PropsTypes.string,
  onClick: PropsTypes.func
};
