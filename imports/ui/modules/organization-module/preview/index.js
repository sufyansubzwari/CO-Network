import React, { Component } from "react";
import { Preview } from "../../../../ui/components";
import PropTypes from "prop-types";

/**
 * @module Data
 * @category index
 */
class PreviewOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.data)
      this.setState({ data: nextProps.data });
  }

  render() {
    return (
      <Preview
        navlinks={[]}
        navClicked={index => console.log(index)}
        navOptions={[
          {
            text: "Remove",
            icon: "delete",
            checkVisibility: () => {
              return this.state.data && this.state.data.id;
            },
            onClick: function() {
              console.log("Remove");
            }
          },
          {
            text: "Follow",
            icon: "plus",
            checkVisibility: () => {
              return this.state.data && this.state.data.id;
            },
            onClick: () => {
              console.log("Adding");
            }
          }
        ]}
        backGroundImage={"/images/lordvader.jpg"}
        image={"/favicon.png"}
      >
        dasdasdasdasdasdasdasd
      </Preview>
    );
  }
}

PreviewOrganization.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number
};

export default PreviewOrganization;
