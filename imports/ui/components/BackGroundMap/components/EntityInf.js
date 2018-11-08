import React from "react";
import PropTypes from "prop-types";
import EventInf from "./EventInf";
import JobInf from "./JobInf";
import MemberInf from "./MemberInf";
import OrgInf from "./OrgInf";
import ColloquiumInf from "./ColloquiumInf";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the EntityInf
 */
const EntityInf = function(props) {
  const { location } = props;
  switch (location.entity) {
    case "USER":
      return <MemberInf location={location} />;
    case "COLLOQUIUM":
      return <ColloquiumInf location={location} />;
    case "EVENT":
      return <EventInf location={location} />;
    case "ORGANIZATION":
      return <OrgInf location={location} />;
    case "JOB":
      return <JobInf location={location} />;
    default:
      return <div>We must implement the {location.entity} entity type</div>;
  }
};

EntityInf.propTypes = {
  location: PropTypes.object
};

export default EntityInf;
