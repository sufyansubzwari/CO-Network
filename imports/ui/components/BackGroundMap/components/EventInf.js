import React from "react";
import PropTypes from "prop-types";
import { GetEvent } from "../../../apollo-client/event";
import { Query } from "react-apollo";
import { SType, STitle, SContent } from "./assets";
import { Container, Layout } from "btech-layout";
import Dates from "../../Preview/components/Dates";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the EventInf
 */
const EventInf = function(props) {
  const { location } = props;
  return (
    <Query
      fetchPolicy={"cache-and-network"}
      query={GetEvent}
      variables={{
        id: location && location.owner
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div />;
        const { event } = data;
        const { startDate, endDate } = event || {};
        return event ? (
          <Layout rowGap={"5px"}>
            <SType uppercase>{location.entity}</SType>
            <STitle>{event.title}</STitle>
            <Dates size={"11px"} startDate={startDate} endDate={endDate} />
            <SContent>{location && location.location.address}</SContent>
          </Layout>
        ) : null;
      }}
    </Query>
  );
};

EventInf.defaultProps = {
  location: {}
};

EventInf.propTypes = {
  location: PropTypes.object
};

export default EventInf;
