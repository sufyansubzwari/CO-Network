import React from "react";
import PropTypes from "prop-types";
import { GetColloquium } from "../../../apollo-client/colloquium";
import { Query } from "react-apollo";
import { SContent, STitle, SType } from "./assets";
import { Layout } from "btech-layout";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the EventInf
 */
const ColloquiumInf = function(props) {
  const { location } = props;
  return (
    <Query
      fetchPolicy={"cache-and-network"}
      query={GetColloquium}
      variables={{
        id: location && location.owner
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div />;
        const { colloquium } = data;
        return colloquium ? (
          <Layout rowGap={"5px"}>
            <SType uppercase>{location.entity}</SType>
            <STitle>{colloquium.title}</STitle>
            <SContent>{location && location.location.address}</SContent>
          </Layout>
        ) : null;
      }}
    </Query>
  );
};

ColloquiumInf.defaultProps = {
  location: {}
};

ColloquiumInf.propTypes = {
  location: PropTypes.object
};

export default ColloquiumInf;
