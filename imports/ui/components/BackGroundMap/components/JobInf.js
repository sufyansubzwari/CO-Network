import React from "react";
import PropTypes from "prop-types";
import { GetJob } from "../../../apollo-client/job";
import { Query } from "react-apollo";
import { SContent, STitle, SType } from "./assets";
import { Layout } from "btech-layout";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the JobInf
 */
const JobInf = function(props) {
  const { location } = props;
  return (
    <Query
      fetchPolicy={"cache-and-network"}
      query={GetJob}
      variables={{
        id: location && location.owner
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div />;
        const { job } = data;
        return job ? (
          <Layout rowGap={"5px"}>
            <SType uppercase>{location.entity}</SType>
            <STitle>{job.title}</STitle>
            <SContent>{location && location.location.address}</SContent>
          </Layout>
        ) : null;
      }}
    </Query>
  );
};

JobInf.defaultProps = {
  location: {}
};

JobInf.propTypes = {
  location: PropTypes.object
};

export default JobInf;
