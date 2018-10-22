import React from "react";
import { Container, Layout, mixins } from "btech-layout";
import { Separator } from "../../../components";
import styled from "styled-components";
import PropTypes from "prop-types";
import NotificationItem from "./NotificationItem";
import { HButtom } from "btech-horizantal-navbar";
import MaterialIcon from "react-material-iconic-font";

const Title = styled.label`
  font-family: ${props =>
    props.theme ? props.theme.texts.title.fontFamily : "Roboto Mono"};
  font-weight: ${props =>
    props.theme ? props.theme.texts.title.titleWeight : "bold"};
  font-size: ${props =>
    props.theme ? props.theme.texts.title.titleSize : "12px"};
  color: ${props =>
    props.selected
      ? "white"
      : props.theme
        ? props.theme.texts.title.titleColor
        : "black"};
  margin-bottom: 0;
  cursor: pointer;

  ${mixins.media.desktop`
    font-size: ${props =>
      props.theme ? props.theme.texts.title.titleSize : "14px"};
  `};
`;

const Description = styled.label`
  font-family: ${props =>
    props.theme ? props.theme.texts.textFamily : "Roboto Mono"};
  color: ${props => (props.selected ? "white" : "black")};
  font-size: 10px;
  line-height: ${props =>
    props.theme ? props.theme.texts.textLineHeight : "1"};
  margin-bottom: 0;
  cursor: pointer;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.linesCut || 2};
  -webkit-box-orient: vertical;

  ${mixins.media.desktop`
    font-size: 12px;
  `};
`;

const SubTitle = styled.label`
  font-family: ${props =>
    props.theme ? props.theme.texts.textFamily : "Roboto Mono"};
  color: ${props => (props.selected ? "white" : "rgba(0, 0, 0, 0.5)")};
  font-size: 10px;
  margin-bottom: 0;
  cursor: pointer;

  ${mixins.media.desktop`
    font-size: 12px;
  `};
`;

const SNotification = styled(Container)`
  background: ${props =>
    props.selected
      ? "#000000"
      : props.viewed
        ? "white"
        : props.theme
          ? props.theme.color.innerBackground
          : "#fbfbf9"};

  .deleteNotification {
    opacity: 0;
  }

  :hover {
    background: ${props =>
      props.selected
        ? "#000000"
        : props.theme
          ? props.theme.color.background
          : "#dadada"};

    .deleteNotification {
      opacity: 1;
      transition: all 200ms ease-out;
    }
  }
  cursor: pointer;
`;

const Icon = styled(Container)`
  padding-left: 20px;
`;

const SDeleteText = styled.span`
  font-size: 12px;
  margin-left: 5px;
`;

const SItemContainer = styled(Container)`
  line-height: 15px;

  ${mixins.media.desktop`
    line-height: 20px;
  `};
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
        viewed={this.props.viewed}
      >
        <Layout customTemplateColumns={this.props.hasIcon ? "auto 1fr" : null}>
          {this.props.hasIcon ? (
            <Icon mt={{ xs: "10px", md: "20px" }}>
              <HButtom
                image={
                  this.props.image && this.props.image !== ""
                    ? this.props.image
                    : ""
                }
                size={{ width: 23, height: 29 }}
              />
            </Icon>
          ) : null}
          <NotificationItem>
            <SItemContainer>
              <Layout customTemplateColumns={"1fr auto"}>
                <Container>
                  <Title selected={this.props.selected}>
                    {this.state.title}
                  </Title>
                </Container>
                <Container mdHide>
                  <SubTitle selected={this.props.selected}>
                    {this.state.time}
                  </SubTitle>
                </Container>
                <Container
                  className="deleteNotification"
                  hide
                  mdShow
                  onClick={event => {
                    event.stopPropagation();
                    event.preventDefault();
                    this.props.onDelete && this.props.onDelete();
                  }}
                >
                  <MaterialIcon type={"delete"} />
                  <SDeleteText>Delete</SDeleteText>
                </Container>
              </Layout>
              <Container>
                <Description
                  selected={this.props.selected}
                  linesCut={this.props.linesCut}
                >
                  {this.state.description}
                </Description>
              </Container>
              <Container hide mdShow>
                <Layout mt={"5px"} customTemplateColumns={"1fr auto"}>
                  <SubTitle selected={this.props.selected}>
                    {this.state.entity}
                  </SubTitle>
                  <SubTitle selected={this.props.selected}>
                    {this.state.time}
                  </SubTitle>
                </Layout>
              </Container>
            </SItemContainer>
          </NotificationItem>
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
  selected: PropTypes.bool,
  onDelete: PropTypes.func,
  linesCut: PropTypes.number
};
