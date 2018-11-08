import React from "react";
import PropTypes from "prop-types";
import { GetOrg } from "../../../apollo-client/organization";
import { Query } from "react-apollo";
import { SContent, STitle, SType } from "./assets";
import { Layout } from "btech-layout";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the EventInf
 */
const OrgInf = function(props) {
  const { location } = props;
  return (
    <Query
      fetchPolicy={"cache-and-network"}
      query={GetOrg}
      variables={{
        id: location && location.owner
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div />;
        const { organization } = data;
        return organization ? (
          <Layout rowGap={"5px"}>
            <SType uppercase>{location.entity}</SType>
            <STitle>{organization.name}</STitle>
            <SContent>{location && location.location.address}</SContent>
          </Layout>
        ) : null;
      }}
    </Query>
  );
};

OrgInf.defaultProps = {
  location: {}
};

OrgInf.propTypes = {
  location: PropTypes.object
};

export default OrgInf;
