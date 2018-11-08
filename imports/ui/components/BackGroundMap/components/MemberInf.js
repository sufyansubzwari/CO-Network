import React from "react";
import PropTypes from "prop-types";
import { userQuery } from "../../../apollo-client/user";
import { Query } from "react-apollo";
import { SContent, STitle, SType } from "./assets";
import { Layout } from "btech-layout";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the EventInf
 */
const MemberInf = function(props) {
  const { location } = props;
  return (
    <Query
      fetchPolicy={"cache-and-network"}
      query={userQuery}
      variables={{
        id: location && location.owner
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div />;
        const { user } = data;
        const { profile } = user || {};
        return user ? (
          <Layout rowGap={"5px"}>
            <SType uppercase>{"MEMBER" || location.entity}</SType>
            <STitle>{profile && `${profile.name} ${profile.lastName}`}</STitle>
            <SContent>{location && location.location.address}</SContent>
          </Layout>
        ) : null;
      }}
    </Query>
  );
};

MemberInf.defaultProps = {
  location: {}
};

MemberInf.propTypes = {
  location: PropTypes.object
};

export default MemberInf;
