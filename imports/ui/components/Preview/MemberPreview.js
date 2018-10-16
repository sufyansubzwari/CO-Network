import React from "react";
import { connect } from "react-redux";
import Preview from "./Preview";
import { closeChatView, openChatView } from "../../actions/ChatView";

class MemberPreview extends Preview {
  constructor(props) {
    super(props);
  }

  render() {
    return super.render();
  }
}

MemberPreview.defaultProps = {
  ...Preview.defaultProps
};

MemberPreview.propTypes = {
  ...Preview.defaultProps
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    closeChatView: () => dispatch(closeChatView()),
    openChatView: () => dispatch(openChatView())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);
