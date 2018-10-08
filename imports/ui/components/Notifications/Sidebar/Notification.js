import React from "react";
import { Container, Layout } from "btech-layout";
import { FilterItem, Separator } from "../../../components";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HButtom } from "btech-horizantal-navbar";

const Title = styled.label`
  font-family: ${props =>
    props.theme ? props.theme.texts.title.fontFamily : "Roboto Mono"};
  font-weight: ${props =>
    props.theme ? props.theme.texts.title.titleWeight : "bold"};
  font-size: ${props =>
    props.theme ? props.theme.texts.title.titleSize : "14px"};
  color: ${props =>
    props.selected
      ? "white"
      : props.theme
        ? props.theme.texts.title.titleColor
        : "black"};
  margin-bottom: 0;
  cursor: pointer;
`;

const Description = styled.label`
  font-family: ${props =>
    props.theme ? props.theme.texts.textFamily : "Roboto Mono"};
  color: ${props => (props.selected ? "white" : "black")};
  font-size: 12px;
  line-height: ${props =>
    props.theme ? props.theme.texts.textLineHeight : "1"};
  margin-bottom: 0;
  cursor: pointer;
`;

const SubTitle = styled.label`
  font-family: ${props =>
    props.theme ? props.theme.texts.textFamily : "Roboto Mono"};
  color: ${props => (props.selected ? "white" : "rgba(0, 0, 0, 0.5)")};
  font-size: 12px;
  margin-bottom: 0;
  cursor: pointer;
`;

const SNotification = styled(Container)`
  background: ${props =>
    props.selected
      ? "#000000"
      : props.theme
        ? props.theme.color.innerBackground
        : "#fbfbf9"};

  :hover {
    background: ${props =>
      props.selected
        ? "#000000"
        : props.theme
          ? props.theme.color.background
          : "#dadada"};
  }
  cursor: pointer;
`;

const Icon = styled(Container)`
  padding-left: 20px;
`;

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title ? props.title : "",
      description: props.description ? props.description : "",
      entity: props.entity ? props.entity : "",
      time: props.time ? props.time : ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title) this.setState({ title: nextProps.title });
    if (nextProps.description)
      this.setState({ description: nextProps.description });
    if (nextProps.entity) this.setState({ entity: nextProps.entity });
    if (nextProps.time) this.setState({ time: nextProps.time });
  }

  render() {
    return (
      <SNotification
        onClick={() => this.props.onClick && this.props.onClick()}
        selected={this.props.selected}
      >
        <Layout customTemplateColumns={this.props.hasIcon ? "auto 1fr" : null}>
          {this.props.hasIcon ? (
            <Icon mt={"20px"}>
              <HButtom
                image={
                  this.props.image && this.props.image !== ""
                    ? this.props.image
                    : ""
                }
                size={{ width: 23, height: 29 }}
                // primary={!user}
              />
            </Icon>
          ) : null}
          <FilterItem>
            <Container>
              <Container>
                <Title selected={this.props.selected}>{this.state.title}</Title>
              </Container>
              <Container>
                <Description selected={this.props.selected}>
                  {this.state.description}
                </Description>
              </Container>
              <Layout mt={"5px"} customTemplateColumns={"1fr auto"}>
                <SubTitle selected={this.props.selected}>
                  {this.state.entity}
                </SubTitle>
                <SubTitle selected={this.props.selected}>
                  {this.state.time}
                </SubTitle>
              </Layout>
            </Container>
          </FilterItem>
        </Layout>
        <Separator />
      </SNotification>
    );
  }
}

export default Notification;

Notification.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  entity: PropTypes.string,
  time: PropTypes.string,
  onClick: PropTypes.func,
  hasIcon: PropTypes.bool,
  image: PropTypes.string,
  selected: PropTypes.bool
};
