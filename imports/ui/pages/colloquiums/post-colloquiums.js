import React, { Component } from "react";
import { PostLayout, ColloquiumPreview } from "../../../ui/components";
import { withRouter } from "react-router-dom";
import ColloquiumForm from "../../modules/colloquium-module/form";
import { CreateColloquium } from "../../apollo-client/colloquium";
import { Mutation } from "react-apollo";
import {ConfirmPopup} from "../../services";

/**
 * @module Colloquiums
 * @category post
 */
class PostColloquiums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPreview: false,
      colloquium: {
        title: null,
        description: null,
        isPublic: true,
        place: {
          location: {
            address: "",
            location: { lat: "", lng: "" },
            fullLocation: {}
          }
        },
        competences: [],
        tags: []
      },
      formChange: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (document.body.offsetWidth > 992) this.setState({ openPreview: true });
    }, 200);
  }

  onCancel() {
    this.props.history.push("/colloquiums");
  }

  handleBackgroundChange(src) {
    const colloquium = this.state.colloquium;
    if (src) colloquium.image = src;
    this.setState({ colloquium: colloquium });
  }

  onPostAction(createColloquium, query) {
    const isEditMode = this.state.colloquium && this.state.colloquium._id;
    this.setState({
      formChange: false,
      redirect: true //!this.state.formChange || !isEditMode // is only one step
    });
    let queryColloquium = Object.assign({}, query);
    //todo: remove when location improvement
    queryColloquium.place &&
    queryColloquium.place.location &&
    queryColloquium.place.location.fullLocation
      ? delete queryColloquium.place.location.fullLocation
      : null;
    delete queryColloquium.followerList;
    let colloquium = { ...queryColloquium };
    if (this.props.curUser) {
      colloquium.owner = this.props.curUser._id;
      createColloquium({ variables: { entity: colloquium } });
    } else {
      // todo login the user and then create the colloquium or notify the user must login
      alert("You must be logged");
    }
  }

  render() {
    return (
      <PostLayout>
        <Mutation
          key={"leftSide"}
          mutation={CreateColloquium}
          onCompleted={() =>
            this.state.redirect &&
            this.props.history.push("/colloquiums", { postColloquium: true })
          }
          onError={error => console.log("Error: ", error)}
        >
          {(createColloquium, { colloquiumCreated }) => (
            <ColloquiumForm
              key={"leftSide"}
              onFinish={data => {
                this.onPostAction(createColloquium, data);
              }}
              onCancel={() => this.onCancel()}
              {...this.props}
              handleChange={(colloquium, loading) =>
                this.setState({
                  colloquium: { ...this.state.colloquium, ...colloquium },
                  formChange: !loading && true
                })
              }
              colloquium={this.state.colloquium}
              formChange={this.state.formChange}
            />
          )}
        </Mutation>
        <ColloquiumPreview
            key={"rightSide"}
            isOpen={this.state.openPreview}
            onClose={() => this.setState({ openPreview: false })}
            data={this.state.colloquium}
            isColloquium
            curUser={this.props.curUser}
            isMobile={this.props.isMobile}
            isPost={true}
        />
      </PostLayout>
    );
  }
}

export default withRouter(PostColloquiums);
