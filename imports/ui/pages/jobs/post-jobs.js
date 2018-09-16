import React, {Component} from "react";
import {Container} from "btech-layout";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import JobForm from "../../modules/jobs-module/form";
import {Preview} from "../../../ui/components";
import {withRouter} from "react-router-dom";
import {CreateJob} from "../../apollo-client/job";
import {Mutation} from "react-apollo";

/**
 * @module Jobs
 * @category post
 */
class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {},
    };
  }

  onCancel() {
    this.props.history.push(`/jobs`);
  }

  onPostAction(createJob, query) {
    let queryJob = Object.assign({}, query);
    //todo: remove when location improvement
    queryJob.place && queryJob.place.location && queryJob.place.location.fullLocation ?  delete queryJob.place.location.fullLocation : null;
    let job = {
      ...queryJob,
      owner: "Qt5569uuKKd6YrDwS" //Meteor.userId(),
    };
    createJob({variables: {entity: job}});
  }

  render() {
    return (
      <InternalLayout>
        <Container fullY key={"leftSide"}>
          <Mutation
            mutation={CreateJob}
            onCompleted={() => this.props.history.push("/jobs")}
            onError={(error) => console.log("Error: ", error)}
          >
            {(createJob, {jobCreated}) => (
              <JobForm
                onFinish={data => {
                  this.onPostAction(createJob, data)
                }
                }
                onCancel={() => this.onCancel()}
                {...this.props}
              />
            )}
          </Mutation>
        </Container>
        <Preview
          key={"rightSide"}
          navClicked={index => console.log(index)}
          navOptions={[
            {
              text: "Remove",
              icon: "delete",
              checkVisibility: () => {
                return this.state.selectedItem && this.state.selectedItem.id;
              },
              onClick: function () {
                console.log("Remove");
              }
            }
          ]}
          index={this.state.selectedIndex}
          data={this.state.selectedItem}
          backGroundImage={
            this.state.selectedItem ? this.state.selectedItem.image : null
          }
        >
          job preview data for job
        </Preview>
      </InternalLayout>
    );
  }
}

export default withRouter(PostJob);
