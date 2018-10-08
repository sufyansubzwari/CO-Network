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
import {theme} from "../../../theme";
import {MESSAGES_SIDEBAR_OPTIONS} from "../../../constants";

const SLabel = styled(Label)`
    display: flex;
    align-items: center;
    font-weight: bold;    
    color: ${props => props.active ? '#000000' : 'rgba(0,0,0,0.5)'};
`

const Span = styled.span`
  font-family: Roboto Mono;
  font-size: 14px;
  line-height: 12px;
  padding-right: 5px;
  margin-bottom: 0;
`

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

class MessagesSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {
          type: "direct",
          read: 'Unread',
          image:
            "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=977488369126162&height=50&width=50&ext=1540656370&hash=AeQ0pwHoOv1S_-06",
          user: "Tristen",
          description:
            "Lorem ipsum dolor nostra, per inceptos himenaeos lorem upsum dolorem.",
          entity: "ML Society",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        },
        {
          type: "direct",
          read: 'Read',
          image: "",
          user: "Tristen1",
          description:
            "Lorem ipsum dolor nostra, per inceptos himenaeos.",
          entity: "ML Society",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        },
        {
          type: "direct",
          read: 'Read',
          image: "",
          user: "Tristen2",
          description: "Lorem ipsum dolor nostra, per inceptos himenaeos.",
          entity: "ML Society",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        },
        {
          type: "related",
          read: 'Read',
          image: "",
          user: "Tristen3",
          description: "Lorem ipsum dolor nostra, per inceptos himenaeos.",
          entity: "ML Society",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        },
        {
          type: "related",
          read: 'Unread',
          image: "",
          user: "Tristen4",
          description: "Lorem ipsum dolor nostra, per inceptos himenaeos.",
          entity: "ML Society",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        },
        {
          type: "direct",
          read: 'Unread',
          image: "",
          user: "Tristen5",
          description: "Lorem ipsum dolor nostra, per inceptos himenaeos.",
          entity: "ML Society",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        }
      ],
      selectedItem: -1,
      type: 'direct',
      read: 'All',
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
        <Container >
          <Layout padding={'10px 20px'} customTemplateColumns={"1fr auto"}>
            <Layout customTemplateColumns={'auto auto 1fr'}  colGap={'20px'}>
              <SLabel active={this.state.type === 'direct'} text={'Direct'} onClick={() => this.setState({type: 'direct', selectedItem: -1})} />
              <SLabel active={this.state.type === 'related'} text={'Related'} onClick={() => this.setState({type: 'related', selectedItem: -1})} />
              <div/>
            </Layout>
            <Container>
                <Dropdown isOpen={this.state.dropDownOpen} toggle={() => this.setState({dropDownOpen: !this.state.dropDownOpen})}>
                  <DropdownToggle
                      size="sm"
                      style={{
                          padding: this.props.padding ? this.props.padding : "initial",
                          color: 'black',
                          border: "none",
                          boxShadow: "none",
                          backgroundColor: "transparent"
                      }}
                  >
                      <Span>{this.state.read}</Span>
                      <MaterialIcon type={'chevron-down'}/>
                  </DropdownToggle>
                  <DropdownMenu>
                      {MESSAGES_SIDEBAR_OPTIONS.map( (option, index) => <SDropdownItem key={index} onClick={() => this.setState({read: option})}>{option}</SDropdownItem> )}
                  </DropdownMenu>
                </Dropdown>
            </Container>
          </Layout>
          <Separator/>
        </Container>
        {this.state.messages &&
          this.state.messages.length > 0 &&
          this.state.messages.filter(item => item.type === this.state.type && (item.read === this.state.read || this.state.read === 'All' )).map((message, index) => (
            <Notification
              hasIcon={true}
              key={index}
              title={message.user}
              description={message.description}
              entity={message.entity}
              time={message.time}
              image={message.image}
              selected={this.state.selectedItem === index}
              onClick={() => this.setState({ selectedItem: index })}
            />
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
)(MessagesSidebar);
