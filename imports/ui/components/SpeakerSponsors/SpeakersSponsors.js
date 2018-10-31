import React from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import ButtonMenu from "../../components/ButtonMenu/ButtonMenu";
import LineSeparator from "./LineSeparator";
import SponsorsList from "./SponsorsList";
import styled from "styled-components";
import { SPEAKERS_SPONSORS } from "./constants";
import { userList as users } from "../../apollo-client/user";
import { GetOrg as orgList } from "../../apollo-client/organization";
import { Query } from "react-apollo";

const SLabel = styled.div`
  font-size: 13px;
  font-family: Roboto Mono, serif;
  margin-left: 10px;
  font-weight: bold;
`;

class SpeakersSponsor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sponsors:
        this.props.sponsors && this.props.sponsors.length
          ? this.props.sponsors
          : [],
      editIndex: -1,
      menuOptions: SPEAKERS_SPONSORS
    };

    this.onSelectToAdd = this.onSelectToAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.sponsors);
  }

  handleChange(spo) {
    this.setState({ sponsors: spo }, () => this.notifyParent());
  }

  onSelectToAdd(achievement, key) {
    const list = this.state.sponsors;
    list.push({ type: achievement.type, edit: true });
    this.setState({ sponsors: list });
  }

  render() {
    return (
      <Container>
        <Layout rowGap={"10px"}>
          <Container mt={"10px"}>
            <Layout customTemplateColumns={"auto 1fr"}>
              <ButtonMenu
                title={"Add Speakers or Sponsors"}
                options={this.state.menuOptions}
                onSelect={(item, key) => this.onSelectToAdd(item, key)}
              />
              <LineSeparator />
            </Layout>
          </Container>
          <Container>
            <Query query={users}>
              {({ loading, error, data }) => {
                if (error) return <div>Error loading the information</div>;
                return (
                  <SponsorsList
                    users={data && data.users}
                    data={this.state.sponsors}
                    onChange={this.handleChange}
                    type={"Speakers"}
                  />
                );
              }}
            </Query>
          </Container>
          <Container>
            <Query query={orgList}>
              {({ loading, error, data }) => {
                if (error) return <div>Error loading the information</div>;
                return (
                  <SponsorsList
                    organizations={data && data.organizations}
                    data={this.state.sponsors}
                    onChange={this.handleChange}
                    type={"Sponsors"}
                  />
                );
              }}
            </Query>
          </Container>
        </Layout>
      </Container>
    );
  }
}

SpeakersSponsor.defaultProps = {};

SpeakersSponsor.propTypes = {
  sponsors: PropTypes.array,
  onChange: PropTypes.func,
  type: PropTypes.func
};

export default SpeakersSponsor;
