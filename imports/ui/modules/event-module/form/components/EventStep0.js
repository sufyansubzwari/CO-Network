import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import { FormMainLayout } from "../../../../../ui/components";
import TextAreaButton from "./assets/TextAreaButton";
import OrganizationItem from "./components/OrganizationItem";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";
import { graphql } from "react-apollo";
import { GetOrgs } from "../../../../apollo-client/organization";
import { InfoChatBox } from "../../../../components";
import { STEP_TEXTS } from "./constants/StepsTexts";
import SimpleOrgCreateForm from "./components/SimpleOrgCreateForm";
import v1 from "uuid/v1";
import _ from "lodash";

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
      texts: STEP_TEXTS,
      orgSelected: this.props.data && this.props.data.organization,
      temporalData: null,
      organizations: [],
      isFormOpen: false
    };
  }

  componentDidMount() {
    const { organizations } = this.props;
    if (
      organizations &&
      !organizations.loading &&
      organizations.organizations
    ) {
      const list = _.uniqBy(
        this.state.organizations.concat(
          organizations.organizations.map(e => e),
          "_id"
        )
      );
      this.setState({
        organizations: list
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { organizations, data, orgAdded } = nextProps;
    let eventReceived = {};
    let organizationsReceived = [];
    let orgAddedReceived = [];
    if (data) eventReceived = data;
    if (
      organizations &&
      !organizations.loading &&
      organizations.organizations
    ) {
      organizationsReceived = this.state.organizations.concat(
        organizations.organizations.map(e => e)
      );
    }
    if (orgAdded && orgAdded.length)
      orgAddedReceived = this.state.organizations.concat(orgAdded);
    this.setState({
      event: eventReceived,
      organizations: _.uniqBy(
        organizationsReceived.concat(orgAddedReceived),
        "_id"
      )
    });
  }

  notifyParent(name, value) {
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
    let event = this.state.event;
    if (
      !event.organization ||
      !element ||
      (element && element._id !== event.organization._id)
    ) {
      event["organization"] = element;
      this.setState(
        { orgSelected: element, event: event, isFormOpen: false },
        () => this.notifyParent(name, value)
      );
    }
  }

  onCreationButtonClick(value) {
    let event = this.state.event;
    event["organization"] = null;
    this.setState(
      { isFormOpen: value, event: event, orgSelected: null },
      () => this.props.onChange && this.props.onChange(event)
    );
  }

  checkIfHaveNewOrg() {
    return this.state.organizations.some(item => item.isNew);
  }

  onNewOrgCreation(data) {
    const { event } = this.state;
    let orgQuery = Object.assign({}, data);
    orgQuery.enable = event.organizer;
    orgQuery.checkStatus = "approved";
    let organization = { ...orgQuery };
    if (this.props.curUser) {
      organization.owner = this.props.curUser._id;
      organization.isNew = true;
      // temporal id to select the organization
      organization._id = v1();
      // adding to the list
      this.props.onOrgAdded && this.props.onOrgAdded(organization);
      // selecting the organization
      this.onSelectOrganization("organization", organization, organization);
    } else {
      // todo login the user and then create the event or notify the user must login
      alert("You must be logged");
    }
  }

  render() {
    const { event, orgSelected, texts } = this.state;
    const organizations = event.organizer ? this.state.organizations : [];
    return (
      <FormMainLayout>
        <Container mt={"5px"}>
          <Container mb={"5px"}>Is this your Event?</Container>
          <Layout mdTemplateColumns={2} mdColGap={"10px"} rowGap={"10px"}>
            <TextAreaButton
              pointer
              isActive={event.organizer}
              onClick={() => {
                this.notifyParent("organizer", true);
              }}
            >
              <div>
                <SYesNoOption>Yes</SYesNoOption>
                <STextOpacity>I am the organizer</STextOpacity>
              </div>
            </TextAreaButton>
            <TextAreaButton
              pointer
              disabled
              isActive={!event.organizer}
              // onClick={() =>
              //   this.onSelectOrganization("organizer", false, null)
              // }
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
              <InfoChatBox>{texts.ensureQuality}</InfoChatBox>
              <InfoChatBox>{texts.giveMoreInfo}</InfoChatBox>
            </Layout>
          </Container>
        </Container>
        <Container hide={!event.organizer || !organizations.length}>
          <Container mb={"10px"}>Please select your Organization</Container>
          <Layout mdTemplateColumns={2} mdColGap={"10px"} rowGap={"10px"}>
            {organizations &&
              organizations.map((element, index) => {
                return (
                  <OrganizationItem
                    data={element}
                    // showOptions={element.isNew}
                    pointer
                    key={index}
                    isSelected={
                      event.organization &&
                      event.organization._id === element._id
                    }
                    onSelect={() =>
                      this.onSelectOrganization(
                        "organization",
                        element,
                        element
                      )
                    }
                    onDelete={() =>
                      this.props.onOrgDeleted &&
                      this.props.onOrgDeleted(index, element)
                    }
                  />
                );
              })}
          </Layout>
        </Container>
        <Container hide={!event.organizer && orgSelected}>
          <Layout mdTemplateColumns={2}>
            <TextAreaButton
              isExpanded={this.state.isFormOpen}
              center={!this.state.isFormOpen}
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
                  allowUpload={event.organizer}
                  handleCancel={() => this.onCreationButtonClick(false)}
                  onSave={data => this.onNewOrgCreation(data)}
                />
              </Container>
            </TextAreaButton>
          </Layout>
        </Container>
        <Container hide={event.organizer || !orgSelected}>
          <Layout mdTemplateColumns={2} mdColGap={"10px"} rowGap={"10px"}>
            <OrganizationItem
              data={orgSelected}
              pointer
              isSelected={
                event.organization &&
                orgSelected &&
                event.organization._id === orgSelected._id
              }
            />
          </Layout>
          <Container mt={"10px"}>
            <InfoChatBox>
              <Container>
                <SLabel>Note</SLabel>
                <Container>{texts.organizerNeedVerification}</Container>
              </Container>
            </InfoChatBox>
          </Container>
        </Container>
        <Container
          mt={"10px"}
          hide={
            !event.organizer ||
            !orgSelected ||
            orgSelected.checkStatus === "approved"
          }
        >
          <InfoChatBox>
            <Container>
              <SLabel>Note</SLabel>
              <Container>{texts.orgNeedVerification}</Container>
            </Container>
          </InfoChatBox>
        </Container>
        <Container
          mt={"10px"}
          hide
          // hide={!orgSelected || !orgSelected.isNew}
        >
          <InfoChatBox isActive>
            <Container>
              <SLabel>Congratulations</SLabel>
              <Container>{texts.orgOnProgress}</Container>
            </Container>
          </InfoChatBox>
        </Container>
      </FormMainLayout>
    );
  }
}

EventStep0.defaultProps = {
  data: {}
};

EventStep0.propTypes = {
  data: PropTypes.object,
  orgAdded: PropTypes.array,
  onOrgAdded: PropTypes.func,
  onOrgDeleted: PropTypes.func,
  onChange: PropTypes.func
};

export default graphql(GetOrgs, {
  name: "organizations",
  options: props => {
    return {
      variables: {
        organizations: {
          owner: props.curUser ? props.curUser._id : "",
          enable: true
        }
      },
      fetchPolicy: "cache-and-network",
      errorPolicy: "all"
    };
  }
})(EventStep0);
