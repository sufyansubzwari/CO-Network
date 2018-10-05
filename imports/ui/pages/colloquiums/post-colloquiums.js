import React, { Component } from "react";
import { Preview, PostLayout } from "../../../ui/components";
import { withRouter } from "react-router-dom";
import ColloquiumForm from "../../modules/colloquium-module/form";
import { CreateColloquium } from "../../apollo-client/colloquium";
import { Mutation } from "react-apollo";

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

      if(this.state.formChange){
          this.setState({
              formChange: false
          })
      }
      else{
          this.setState({
              redirect: true
          })
      }

    let queryColloquium = Object.assign({}, query);
    //todo: remove when location improvement
    queryColloquium.place &&
    queryColloquium.place.location &&
    queryColloquium.place.location.fullLocation
      ? delete queryColloquium.place.location.fullLocation
      : null;
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
              this.state.redirect && this.props.history.push("/colloquiums", { postColloquium: true })
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
        <Preview
          isOpen={this.state.openPreview}
          onClose={() => this.setState({ openPreview: false })}
          key={"rightSide"}
          navClicked={index => console.log(index)}
          navOptions={[
            {
              text: "Remove",
              icon: "delete",
              checkVisibility: () => {
                return this.state.selectedItem && this.state.selectedItem.id;
              },
              onClick: function() {
                console.log("Remove");
              }
            }
          ]}
          index={this.state.selectedIndex}
          data={this.state.selectedItem}
          allowChangeImages
          backGroundImage={this.state.colloquium && this.state.colloquium.image}
          onBackgroundChange={imageSrc => this.handleBackgroundChange(imageSrc)}
        >
          dasdasdasd
        </Preview>
      </PostLayout>
    );
  }
}

export default withRouter(PostColloquiums);
