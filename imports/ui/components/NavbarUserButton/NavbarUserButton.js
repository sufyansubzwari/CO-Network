import React, { Component } from "react";
import { HButtom } from "btech-horizantal-navbar";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { connect } from 'react-redux';
import UserRedux  from '../../redux/user';
import MaterialIcon from "react-material-iconic-font";


/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the react-table
 */
class NavbarUserButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { user } = this.props;
    this.props.setUser(user);
    return (
      <HButtom image={!!user ? user.profile.image : ""} size={this.props.size} primary={!user}>
        {!user ?
            <span style={{fontSize:20}}>
               <MaterialIcon type={"square-right"} />
            </span>
          : ""}
      </HButtom>
    );
  }
}


const mapStateToProps = (state) => {
  return { };
};

const mapDispatchToProps = dispatch => ({
  setUser: status => dispatch(UserRedux.Actions.setUser(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTracker(() => {
  return {
    user: Meteor.user()
  };
})(NavbarUserButton));


