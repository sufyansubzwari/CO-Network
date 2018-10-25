import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import { FormMainLayout } from "../../../../../ui/components";
import TextAreaButton from "./assets/TextAreaButton";
import OrganizationItem from "./components/OrganizationItem";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";
import { graphql } from "react-apollo";
import { GetOrg } from "../../../../apollo-client/organization";
import { InfoChatBox } from "../../../../components";
import SimpleOrgCreateForm from "./components/SimpleOrgCreateForm";

const SYesNoOption = styled.span`
  margin-right: 5px;
  font-weight: bold;
`;

const STextOpacity = styled.span`
  opacity: 0.8;
`;

const SPlusICon = styled.span`
  margin-right: 5px;

  i {
    font-size: 20px;
  }
`;

const SLabel = styled.label`
  font-weight: bold;
`;

/**
 * @module Event
 * @category EventStep0 Association with a organization
 */
class EventStep0 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: this.props.data,
      orgSelected: null,
      isFormOpen: false
    };
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.event)
      this.setState({ event: nextProps.data });
  }

  notifyParent(name, value, model) {
    if (name) {
      let event = this.state.event;
      event[name] = value;
      this.setState(
        { event: event },
        () => this.props.onChange && this.props.onChange(this.state.event)
      );
    } else this.props.onChange && this.props.onChange(this.state.event);
  }

  onSelectOrganization(name, value, element) {
    this.setState({ orgSelected: element, isFormOpen: false }, () =>
      this.notifyParent(name, value)
    );
  }

  onCreationButtonClick(value) {
    let event = this.state.event;
    event["organization"] = null;
    this.setState(
      { isFormOpen: value, orgSelected: null, event: event },
      () => this.props.onChange && this.props.onChange(this.state.event)
    );
  }

  onNewOrgCreation(data) {
    console.log(data);
  }

  render() {
    const { event, orgSelected } = this.state;
    const { organizations } = this.props.organizations || {};
    return (
      <FormMainLayout>
        <Container mt={"5px"}>
          <Container mb={"5px"}>Is this your Event?</Container>
          <Layout mdTemplateColumns={2} mdColGap={"10px"} rowGap={"10px"}>
            <TextAreaButton
              pointer
              isActive={event.organizer}
              onClick={() => {
                this.notifyParent("organizer", !event.organizer);
              }}
            >
              <div>
                <SYesNoOption>Yes</SYesNoOption>
                <STextOpacity>I am the organizer</STextOpacity>
              </div>
            </TextAreaButton>
            <TextAreaButton
              pointer
              isActive={!event.organizer}
              onClick={() =>
                this.onSelectOrganization("organizer", !event.organizer, null)
              }
            >
              <div>
                <div>
                  <SYesNoOption>Not</SYesNoOption>
                  <STextOpacity>I am submitting on</STextOpacity>
                </div>
                <div>
                  <STextOpacity>behalf of the community</STextOpacity>
                </div>
              </div>
            </TextAreaButton>
          </Layout>
          <Container hide={event.organizer}>
            <Layout mt={"10px"} rowGap={"10px"}>
              <InfoChatBox>
                To ensure event quality and control, we ask event organizers to
                establish a (Free) Organization Profile.
              </InfoChatBox>
              <InfoChatBox>
                If you have the event organizers contact information. Please add
                any details and we will reach out to them (Optional)
              </InfoChatBox>
            </Layout>
          </Container>
        </Container>
        <Container>
          <Container mb={"5px"}>Please select your Organization</Container>
          <Layout mdTemplateColumns={2} mdColGap={"10px"} rowGap={"10px"}>
            {organizations &&
              event.organizer &&
              organizations.map((element, index) => {
                return (
                  <OrganizationItem
                    data={element}
                    pointer
                    key={index}
                    isSelected={event.organization === element._id}
                    onSelect={() =>
                      this.onSelectOrganization(
                        "organization",
                        element._id,
                        element
                      )
                    }
                  >
                    Create Organization
                  </OrganizationItem>
                );
              })}
          </Layout>
          <Container
            mt={"10px"}
            hide={!orgSelected || orgSelected.checkStatus === "approved"}
          >
            <InfoChatBox>
              <Container>
                <SLabel>Note</SLabel>
                <Container>
                  Until this organization is verified, this Event will be
                  available to the public but ticket sales or RSVP will not be
                  activated.
                </Container>
              </Container>
            </InfoChatBox>
          </Container>
        </Container>
        <Layout mt={"10px"} mdTemplateColumns={2}>
          <TextAreaButton
            isExpanded={this.state.isFormOpen}
            borderType={"dashed"}
            pointer
            onClick={() =>
              !this.state.isFormOpen && this.onCreationButtonClick(true)
            }
          >
            <Container hide={this.state.isFormOpen}>
              <SPlusICon>
                <MaterialIcon type={"plus"} />
              </SPlusICon>
              {event.organizer ? "Create Organization" : "Add Organizer Info"}
            </Container>
            <Container hide={!this.state.isFormOpen}>
              <SimpleOrgCreateForm
                handleCancel={() => this.onCreationButtonClick(false)}
                onSave={data => this.onNewOrgCreation(data)}
              />
            </Container>
          </TextAreaButton>
        </Layout>
      </FormMainLayout>
    );
  }
}

EventStep0.defaultProps = {
  data: {}
};

EventStep0.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

export default graphql(GetOrg, {
  name: "organizations",
  options: props => {
    return {
      variables: {
        organizations: { owner: props.curUser ? props.curUser._id : "" }
      },
      fetchPolicy: "cache-and-network",
      errorPolicy: "all"
    };
  }
})(EventStep0);
