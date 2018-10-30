import React from "react";
import {Layout, Container} from "btech-layout";
import {
    Location,
    PreviewSection,
    SalaryRangePreview,
    TagsAdd,
    Text,
    Title,
    Social,
    CollapseList
} from "../../../components/Preview/components/index";
import CheckedRemote from "./components/CheckedRemote";
import Separator from "../../../components/FiltersContainer/Separator";
import {GetJobApply} from "../../../apollo-client/jobApply/index";
import {userQuery} from "../../../apollo-client/user/index";
import {Mutation, Query} from "react-apollo";
import {Meteor} from "meteor/meteor";
import {FollowAction} from "../../../apollo-client/follow/index";
import LevelDegree from "./components/LevelDegree";
import WorkExperiencePreview from "./components/WorkExperiencePreview";
import {PlaceHolder} from "btech-placeholder-component";

import PublicationsPreview from "../../members-module/preview/components/PublicationsPreview";
import AcademicBackgroundPreview from "../../members-module/preview/components/AcademicBackgroundPreview";
import PatentPreview from "../../members-module/preview/components/PatentPreview";
import ProfessionalExperiencePreview from "../../members-module/preview/components/PExperiencePreview";

class ApplyJobPreviewBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            apply: props.apply ? props.apply : {},
            showMoreAbout: false
        };
    }

  componentWillReceiveProps(nextProps) {
    if (nextProps.apply) {
      this.setState({
          apply: nextProps.apply
      });
    }
  }

    renderSummarySection = () => {
        const apply = this.state.apply;
        const aboutMe = apply.jobSpecific;
        const website = apply &&
            apply.website && [{website: apply.website, link: apply.website}];
        let city = "";
        if(apply && apply.country)
            city += apply.country;
        if(apply && apply.cities)
            city += ` ${apply.cities}`;

        const canRender = true

        return canRender ? (
            <PreviewSection previewRef={this.SummarySection}>
                <PlaceHolder loading={!apply.name && !apply.lastName} height={35} width={300}>
                    <Title text={apply.name + " " + apply.lastName}/>
                </PlaceHolder>
                <PlaceHolder loading={!apply.email} height={35} width={300}>
                    <Location location={apply.email}/>
                </PlaceHolder>
                <PlaceHolder loading={apply.remote !== true && apply.remote !== false} height={35} width={300}>
                    <CheckedRemote seeking={apply && apply.remote}/>
                </PlaceHolder>
                <PlaceHolder
                    loading={!website}
                    height={35}
                    width={300}
                >
                    <Social links={website}/>
                    <Separator/>
                </PlaceHolder>
                <PlaceHolder loading={!apply.country && !apply.cities} height={35} width={300}>
                    <Location location={city}/>
                </PlaceHolder>

                <PlaceHolder
                    loading={!aboutMe || !aboutMe.passion}
                    height={35}
                    width={300}
                >
                    {aboutMe && aboutMe.passion ? <Container>
                        <Text
                            header={"About"}
                            text={aboutMe.passion}
                            showMore={true}
                            extraTexts={[
                                aboutMe && aboutMe.existingProblem,
                                aboutMe && aboutMe.steps,
                                aboutMe && aboutMe.candidate,
                                aboutMe && aboutMe.questions
                            ]}
                            moreClicked={this.handleMoreAbout}
                        />
                    </Container> : null}
                </PlaceHolder>
            </PreviewSection>
        ) : null;
    };

    renderWorkExperienceSection = () => {
        let apply = this.state.apply;
        let workexperience = apply.experience;

        const render =
            (workexperience && workexperience.length > 0)

        return render ? (
            <PreviewSection title={"Work Experience"}>
                <PlaceHolder
                    loading={!workexperience || !workexperience.length}
                    height={35}
                    width={300}
                >
                    {workexperience &&
                    workexperience.length > 0 ? <CollapseList cutElements={3}>
                        {
                            workexperience.map((item, index) => (
                                <WorkExperiencePreview
                                    key={index}
                                    employer={item.employer}
                                    position={item.position}
                                    years={item.years && item.years.label}
                                    description={item.description}
                                />
                            ))}
                    </CollapseList> : null}
                </PlaceHolder>
            </PreviewSection>
        ) : null
    };

    renderProfessionalSection = () => {

        const apply = this.state.apply
        const professional = apply.professional

        const min =
            professional &&
            professional.salaryRange &&
            professional.salaryRange.min;
        const max =
            professional &&
            professional.salaryRange &&
            professional.salaryRange.max;

        const expertise =
            professional &&
            professional.expertise &&
            professional.expertise.length > 0 &&
            professional.expertise.map(exp => ({
                ...exp.tag,
                active: true
            }));
        const languages =
            professional &&
            professional.languages &&
            professional.languages.length > 0 &&
            professional.languages.map(lan => ({
                ...lan.tag,
                active: true
            }));
        const industry =
            professional &&
            professional.industry &&
            professional.industry.length > 0 &&
            professional.industry.map(ind => ({
                ...ind,
                active: true
            }));

        const degree = professional && professional.degree && professional.degree.label;

        const render = (expertise && expertise.length > 0) ||
            (languages && languages.length > 0) ||
            (industry && industry.length > 0) ||
            (min || max)

        return render ? (
            <PreviewSection title={"Professional Experience"}>
                <PlaceHolder
                    loading={!min && !max}
                    height={35}
                    width={300}
                >
                    { (min || max) ? <SalaryRangePreview
                        label={"Salary Range"}
                        min={min ? professional.salaryRange.min : null}
                        max={max ? professional.salaryRange.max : null}/> : null }
                </PlaceHolder>
                <PlaceHolder
                    loading={!min && !max}
                    height={35}
                    width={300}
                >
                    <LevelDegree level={degree} />
                </PlaceHolder>
                {expertise && expertise.length ? (
                    <TagsAdd
                        header={"Expertise Domain"}
                        tags={expertise}
                    />
                ) : null}
                {languages && languages.length ? (
                    <TagsAdd
                        header={"Languages | Skills"}
                        tags={languages}
                    />
                ) : null}
                {industry && industry.length ? (
                    <TagsAdd
                        header={"Industry | Sector"}
                        tags={industry}
                    />
                ) : null}
            </PreviewSection>
        ) : null;
    };


    renderAchievementsSection = () => {
        let apply = this.state.apply;
        let achievements = apply.achievements;

        const academic =
            achievements &&
            achievements.length > 0 &&
            achievements.filter(item => item.type === "Academic Background");
        const pexperience =
            achievements &&
            achievements.length > 0 &&
            achievements.filter(item => item.type === "Professional Experience");
        const patents =
            achievements &&
            achievements.length > 0 &&
            achievements.filter(item => item.type === "Patents");
        const publications =
            achievements &&
            achievements.length > 0 &&
            achievements.filter(item => item.type === "Publications");
        const render =
            (academic && academic.length > 0) ||
            (pexperience && pexperience.length > 0) ||
            (patents && patents.length > 0) ||
            (publications && publications.length);

        return render ? (
            <PreviewSection title={"Achievements"} >
                <PlaceHolder
                    loading={!academic || !academic.length}
                    height={35}
                    width={300}
                >
                    {academic &&
                    academic.length > 0 ? <CollapseList cutElements={3} title={"Academic Background"}>
                        {
                            academic.map((item, index) => (
                                <AcademicBackgroundPreview
                                    key={index}
                                    name={item.name}
                                    study={item.study}
                                    level={item.degree && item.degree.label}
                                    description={item.story}
                                />
                            ))}
                    </CollapseList> : null}
                </PlaceHolder>
                <PlaceHolder
                    loading={!publications || !publications.length }
                    height={35}
                    width={300}
                >
                    {publications &&
                    publications.length > 0 ? <CollapseList cutElements={3} title={"Publications"}>
                        {
                            publications.map((item, index) => (
                                <PublicationsPreview
                                    key={index}
                                    name={item.name}
                                    year={item.year}
                                    link={item.link}
                                    details={item.explain}
                                    tags={
                                        item.category &&
                                        item.category.length > 0 &&
                                        item.category.map(tag => ({
                                            ...tag,
                                            active: true
                                        }))
                                    }
                                    onSelectTag={this.props.onSelectTag}
                                />
                            ))}
                    </CollapseList> : null}
                </PlaceHolder>
                <PlaceHolder
                    loading={!pexperience || !pexperience.length}
                    height={35}
                    width={300}
                >
                    {pexperience &&
                    pexperience.length > 0 ? <CollapseList cutElements={3} title={"Professional Experience"}>
                        {pexperience.map((item, index) => (
                            <ProfessionalExperiencePreview
                                key={index}
                                position={item.position}
                                organization={item.name}
                                level={item.level && item.level.label}
                                description={item.help}
                            />
                        ))}
                    </CollapseList> : null}
                </PlaceHolder>
                <PlaceHolder
                    loading={!patents || !patents.length}
                    height={35}
                    width={300}
                >
                    {patents &&
                    patents.length > 0 ? <CollapseList cutElements={3} title={"Patents"}>
                        {
                            patents.map((item, index) => (
                                <PatentPreview
                                    key={index}
                                    name={item.name}
                                    id={item.id}
                                    link={item.link}
                                    tags={
                                        item.category &&
                                        item.category.length > 0 &&
                                        item.category.map(tag => ({
                                            ...tag,
                                            active: true
                                        }))
                                    }
                                    onSelectTag={this.props.onSelectTag}
                                />
                            ))}
                    </CollapseList> : null}
                </PlaceHolder>
            </PreviewSection>
        ) : null
    };

    render() {
        return (
            <Layout mdRowGap={"20px"} rowGap={"10px"}>
                {this.renderSummarySection()}
                {this.renderProfessionalSection()}
                {this.renderWorkExperienceSection()}
                {this.renderAchievementsSection()}
            </Layout>
        );
    }
}

export default ApplyJobPreviewBody;
