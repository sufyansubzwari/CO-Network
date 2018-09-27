import React, { Component } from "react";
import ApplyJobForm from "../../modules/apply-jobs-module/form/index";
import { Preview, PostLayout } from "../../../ui/components";
import JobPreviewBody from "../../components/Preview/JobPreviewBody";
import { withRouter } from "react-router-dom";
// import { CreateJob } from "../../apollo-client/job";
import { Mutation } from "react-apollo";

/**
 * @module Jobs
 * @category post
 */
class ApplyJob extends Component {
    constructor(props) {

        let user = props.curUser && props.curUser.profile;
        let userId = props.curUser && props.curUser._id;
        let lang = props.curUser && props.curUser.profile && props.curUser.profile.knowledge && props.curUser.profile.knowledge.languages

        super(props);
        this.state = {
            openPreview:false,
            apply: {
                ...user,
                userId: userId,
                phone: "",
                remote: "",
                jobSpecific: {
                    candidate: "",
                    questions: "",
                    passion: "",
                    problem: "",
                    steps: ""
                },
                professional:{
                    expertise: [],
                    salaryRange: {
                        min: "",
                        max: ""
                    },
                    degree: {},
                    languages: lang && lang.length ? lang : [],
                    industry: []
                }
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data ) {
            console.log(nextProps.data)
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            if(document.body.offsetWidth>992)
                this.setState({openPreview:true})
        },200)
    }

    onCancel() {
        this.props.history.push(`/jobs`);
    }

    handleBackgroundChange(src) {
        const job = this.state.job;
        if (src) job.image = src;
        this.setState({ job: job });
    }

    onPostAction(createJob, query) {
        let queryJob = Object.assign({}, query);
        //todo: remove when location improvement
        queryJob.place &&
        queryJob.place.location &&
        queryJob.place.location.fullLocation
            ? delete queryJob.place.location.fullLocation
            : null;
        let job = { ...queryJob };
        if (this.props.curUser) {
            job.owner = this.props.curUser._id;
            createJob({ variables: { entity: job } });
        } else {
            // todo login the user and then create the event or notify the user must login
            alert("You must be logged");
        }
    }

    render() {
        return (
            <PostLayout>
                <ApplyJobForm
                    key={"leftSide"}
                    onFinish={data => {
                        this.onPostAction(() => console.log('create application'), data);
                    }}
                    onCancel={() => this.onCancel()}
                    {...this.props}
                    handleApplyChange={apply =>
                        this.setState({ apply: { ...this.state.apply, ...apply } })
                    }
                    apply={this.state.apply}
                />
                <Preview
                    isOpen={this.state.openPreview}
                    onClose={()=>this.setState({openPreview:false})}
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
                    navlinks={["Details"]}
                    index={this.state.selectedIndex}
                    data={this.state.selectedItem}
                    allowChangeImages
                    backGroundImage={this.state.job && this.state.job.image}
                    onBackgroundChange={imageSrc => this.handleBackgroundChange(imageSrc)}
                >
                    <div>Here goes the preview for apply job</div>
                </Preview>
            </PostLayout>
        );
    }
}

export default withRouter(ApplyJob);
