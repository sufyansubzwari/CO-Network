import React from "react";
import {
  cleanFilters,
  setFilters,
  toggleSideBar
} from "../../../actions/SideBarActions";
import { connect } from "react-redux";
import Notification from "../../Notifications/Sidebar/Notification";
import NotificationBack from "../../Notifications/Sidebar/NotificationBack";
import NotificationContainer from "../../Notifications/Sidebar/NotificationContainer";
import { Container, Layout, mixins } from "btech-layout";
import { Label, Separator } from "../../../components";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { theme } from "../../../theme";
import { MESSAGES_SIDEBAR_OPTIONS } from "../../../constants";
import { Query } from "react-apollo";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import MessagesCollection from "../../../../api/messages/collection";
import { userQuery } from "../../../apollo-client/user";
import moment from "moment/moment";
import { withRouter } from "react-router-dom";
import posed from "react-pose/lib/index";
import { Utils } from "../../../services";
import { PlaceHolder } from "btech-placeholder-component";

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
  transition: background-color 0.3s ease-out;
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

const SMessageStyled = styled(Container)`
  ${mixins.media.desktop`
    transform:none !important;
  `};
`;

const SDragContainer = posed(SMessageStyled)({
  hoverable: true,
  draggable: "x",
  dragBounds: { left: "0%", right: "100%" },
  dragEnd: { transition: "spring" }
});

class MessagesSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      selectedItem: -1,
      type: "direct",
      read: "Unread",
      dropDownOpen: false,
      isDeleting: false,
      deleteAction: false,
      dragValue: null
    };

    this.deleteMessage = this.deleteMessage.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.dragValue === nextState.dragValue;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages) {
      this.setState({
        messages: nextProps.messages
      });
    }
    if (nextProps.loading !== this.props.loading) {
      this.forceUpdate();
    }
  }

  handleClear() {
    Meteor.call(
      "messages.markAsRead",
      this.state.messages.map(item => item._id),
      (error, result) => {
        if (error) return console.log("ERROR - ", error);
      }
    );
  }

  handleSelect(index) {
    const selectIndex = index >= 0 ? index : this.state.selectedItem;
    this.state.messages = this.state.messages.filter(
      item =>
        (this.state.type === "direct" &&
          !item.replies &&
          (this.state.read === "All"
            ? true
            : this.state.read === "Read"
              ? item.read
              : !item.read)) ||
        (this.state.type === "related" &&
          item.replies &&
          (this.state.read === "All"
            ? true
            : this.state.read === "Read"
              ? item.read
              : !item.read))
    );
    let message = this.state.messages && this.state.messages[selectIndex];
    if (message && !message.read) {
      Meteor.call("messages.markAsRead", [message._id], error => {
        if (error) return console.log("ERROR - ", error);
      });
    }
    this.props.closeSideBar();
    if (message && message.type === "private")
      this.props.history.push("/innovators/preview", {
        target: message.owner,
        openMsg: true
      });
    if (message && message.type === "public")
      this.props.history.push("/colloquiums/preview", {
        target: message.receptor,
        openMsg: true
      });
  }

  setTimeFormat(date) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date >= today) return moment(date).fromNow();
    return moment(date).calendar();
  }

  deleteMessage(msg, index) {
    this.setState(
      {
        isDeleting: true
      },
      () => {
        let messages = msg;
        messages.deleted = true;
        Meteor.call("messages.update", messages, (error, result) => {
          if (error) return console.log("ERROR - ", error);
        });
        setTimeout(() => {
          this.setState({ isDeleting: false });
        }, 1000);
      }
    );
  }

  observerDragBoundaries(x, index, message) {
    let value = Utils.getPercentOfDrag(x);
    if (value >= 65 && this.props.isMobile && !this.state.isDeleting) {
      this.setState({ deleteAction: true });
      this.deleteMessage(message, index);
    }
    this.setState({ dragValue: value });
  }

  render() {
    return (
      <NotificationContainer
        title={"Messages"}
        onClose={() => this.props.onClose && this.props.onClose()}
        onClear={() => this.handleClear()}
        childrens={this.state.messages.length}
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
                (this.state.type === "direct" &&
                  !item.replies &&
                  (this.state.read === "All"
                    ? true
                    : this.state.read === "Read"
                      ? item.read
                      : !item.read)) ||
                (this.state.type === "related" &&
                  item.replies &&
                  (this.state.read === "All"
                    ? true
                    : this.state.read === "Read"
                      ? item.read
                      : !item.read))
            )
            .map((message, index) => (
              <Query
                key={index}
                query={userQuery}
                variables={{ id: message.owner }}
                fetchPolicy={"cache-and-network"}
              >
                {({ loading, error, data }) => {
                  if (error) return <div />;
                  const owner = data.user;
                  return this.props.loading || loading ? (
                    <div style={{ padding: "15px" }}>
                      <PlaceHolder
                        facebook
                        loading={this.props.loading || loading}
                        height={280}
                        width={390}
                      />
                    </div>
                  ) : (
                    <Container relative>
                      <NotificationBack />
                      <SDragContainer
                        relative
                        onValueChange={{
                          x: x => this.observerDragBoundaries(x, index, message)
                        }}
                        onDragEnd={() => {
                          if (
                            this.props.isMobile &&
                            !this.state.deleteAction &&
                            this.state.dragValue === 0
                          )
                            this.handleSelect(index);
                          this.setState({ deleteAction: false });
                        }}
                      >
                        <Notification
                          hasIcon={true}
                          key={index}
                          viewed={message.read}
                          title={owner.profile.name}
                          description={message.text}
                          // entity={"ML Society"}
                          time={this.setTimeFormat(message.createdAt)}
                          image={owner.profile.image}
                          selected={this.state.selectedItem === index}
                          onSelect={this.handleSelect.bind(this, index)}
                          onDelete={this.deleteMessage.bind(
                            this,
                            message,
                            index
                          )}
                        />
                      </SDragContainer>
                    </Container>
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
    cleanFilters: () => dispatch(cleanFilters()),
    closeSideBar: () => dispatch(toggleSideBar(false, false, false))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    withTracker(() => {
      const limit = 20;
      const userId = Meteor.userId();
      const subscription = Meteor.subscribe(
        "messages.myNewMessages",
        limit || 20
      );
      let messages = MessagesCollection.find(
        {
          $or: [
            { receptor: userId },
            { owner: userId, replies: { $exists: true } }
          ]
        },
        { sort: { createdAt: -1 }, limit: limit || 20 }
      ).fetch();
      return {
        loading: !subscription.ready(),
        messages: messages.filter(item => !item.deleted)
      };
    })(MessagesSidebar)
  )
);
