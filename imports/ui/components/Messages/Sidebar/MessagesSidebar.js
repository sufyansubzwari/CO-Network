import React from "react";
import PropTypes from "prop-types";
import { cleanFilters, setFilters } from "../../../actions/SideBarActions";
import { connect } from "react-redux";
import Notification from "../../Notifications/Sidebar/Notification";
import NotificationContainer from "../../Notifications/Sidebar/NotificationContainer";
import { Layout, Container } from "btech-layout";
import { Separator, Label } from "../../../components";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from "reactstrap";
import { theme } from "../../../theme";
import { MESSAGES_SIDEBAR_OPTIONS } from "../../../constants";
import { Query } from "react-apollo";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import MessagesCollection from "../../../../api/messages/collection";
import { userQuery } from "../../../apollo-client/user";
import moment from "moment/moment";

const SLabel = styled(Label)`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: ${props => (props.active ? "#000000" : "rgba(0,0,0,0.5)")};
`;

const Span = styled.span`
  font-family: Roboto Mono;
  font-size: 14px;
  line-height: 12px;
  padding-right: 5px;
  margin-bottom: 0;
`;

const SDropdownItem = styled(DropdownItem)`
  cursor: pointer;
  font-size: 12px;

  :hover {
    background-color: ${props =>
      props.optionBackColor
        ? props.optionBackColor
        : theme.color.dropDownHover} !important;
    outline: none;
  }
`;

const RLayout = styled(Layout)`
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

class MessagesSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      selectedItem: -1,
      type: "direct",
      read: "All",
      dropDownOpen: false
    };
    this.handleClear = this.handleClear.bind(this);
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages) {
      this.setState({
        messages: nextProps.messages
      });
    }
  }

  handleClear() {
    this.setState({
      messages: []
    });
  }

  render() {
    return (
      <NotificationContainer
        title={"Messages"}
        onClose={() => this.props.onClose && this.props.onClose()}
        onClear={this.handleClear}
      >
        <Container>
          <RLayout padding={"10px 20px"} customTemplateColumns={"1fr auto"}>
            <Layout customTemplateColumns={"auto auto 1fr"} colGap={"20px"}>
              <SLabel
                active={this.state.type === "direct"}
                text={"Direct"}
                onClick={() =>
                  this.setState({ type: "direct", selectedItem: -1 })
                }
              />
              <SLabel
                active={this.state.type === "related"}
                text={"Related"}
                onClick={() =>
                  this.setState({ type: "related", selectedItem: -1 })
                }
              />
              <div />
            </Layout>
            <Container>
              <Dropdown
                isOpen={this.state.dropDownOpen}
                toggle={() =>
                  this.setState({ dropDownOpen: !this.state.dropDownOpen })
                }
              >
                <DropdownToggle
                  size="sm"
                  style={{
                    padding: this.props.padding
                      ? this.props.padding
                      : "initial",
                    color: "black",
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent"
                  }}
                >
                  <Span>{this.state.read}</Span>
                  <MaterialIcon type={"chevron-down"} />
                </DropdownToggle>
                <DropdownMenu>
                  {MESSAGES_SIDEBAR_OPTIONS.map((option, index) => (
                    <SDropdownItem
                      key={index}
                      onClick={() => this.setState({ read: option })}
                    >
                      {option}
                    </SDropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Container>
          </RLayout>
          <Separator />
        </Container>

        {this.state.messages &&
          this.state.messages.length > 0 &&
          this.state.messages
            .filter(
              item =>
                (this.state.type === "direct" && !item.replies) ||
                (this.state.type === "related" && item.replies)
            )
            .map((message, index) => (
              <Query
                key={index}
                query={userQuery}
                variables={{ id: message.owner }}
                fetchPolicy={"cache-and-network"}
              >
                {({ loading, error, data }) => {
                  if (loading) return <div />;
                  if (error) return <div />;
                  const owner = data.user;
                  return (
                    <Notification
                      hasIcon={true}
                      key={index}
                      title={owner.profile.name}
                      description={message.text}
                      entity={"ML Society"}
                      time={moment(message.createdAt).format("hh:mm")}
                      image={owner.profile.image}
                      selected={this.state.selectedItem === index}
                      onClick={() => this.setState({ selectedItem: index })}
                    />
                  );
                }}
              </Query>
            ))}
      </NotificationContainer>
    );
  }
}

const mapStateToProps = state => {
  const {} = state;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setFilters: (type, filters) => dispatch(setFilters(type, filters)),
    cleanFilters: () => dispatch(cleanFilters())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTracker(() => {
    const limit = 20;
    const subscription = Meteor.subscribe(
      "messages.myNewMessages",
      limit || 20
    );
    let messages = MessagesCollection.find(
      {},
      { sort: { createdAt: -1 }, limit: limit || 20 }
    ).fetch();
    return {
      loading: !subscription.ready(),
      messages: messages
    };
  })(MessagesSidebar)
);
