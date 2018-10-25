import React from "react";
import {Container, Layout} from "btech-layout";
import {Location, Social, TagsAdd, Text, Title, PreviewSection, SalaryRangePreview, CollapseList} from "../../../components/Preview/components/index";
import services from "../../../components/LoginModal/service.constant";
import Separator from "../../../components/FiltersContainer/Separator";
import CheckedLabel from "./components/CheckedLabel"
import ProfessionalExperiencePreview from "./components/PExperiencePreview";
import PatentPreview from "./components/PatentPreview";
import AcademicBackgroundPreview from "./components/AcademicBackgroundPreview";
import PublicationsPreview from "./components/PublicationsPreview";

class UserPreviewBody extends React.Component {
    constructor(props) {
        super(props);
        this.servicesSocial = services;
        this.state = {
            user: props.user ? props.user : {},
            showMoreAbout: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({
                user: nextProps.user
            });
        }
    }

    handleMoreAbout = () => {
        this.setState({
            showMoreAbout: !this.state.showMoreAbout
        })
    }


    renderSummarySection = () => {

        let user = this.state.user;
        let name = `${this.state.user.name} ${this.state.user.lastName}`;
        let website = user && user.website && [{website: user.website, link: user.website}];
        const identities = user.identities
        let socials = [];
        if (this.state.user && this.state.user.identities) {
            socials =
                identities &&
                identities.length &&
                identities.map(iden => ({
                    element: iden.provider === "google-oauth2" ? "google" : iden.provider,
                    link: this.getLinkForSocial(iden)
                }));
        }
        const render = name || name !== " " || user.place || socials.length || website || user.aboutMe || user.aboutMe.yourPassion;
        const aboutMe = user.aboutMe;
        return render ? (
            <PreviewSection>
                {name && name !== " " ? <Title text={name}/> : null}
                {user.place ? <Location location={user.place}/> : null}
                {socials.length || website ? <Social socials={socials} links={website}/> : null}
                <Separator/>
                {user.aboutMe && user.aboutMe.yourPassion ? (
                    <Container>
                        <Text
                            header={"About"}
                            text={aboutMe && aboutMe.yourPassion}
                            showMore={true}
                            extraTexts={[aboutMe.existingProblem, aboutMe.steps]}
                            moreClicked={this.handleMoreAbout}
                        />
                    </Container>
                ) : null}
            </PreviewSection>
        ) : null
    }

    renderKnowledgeSection = () => {
        let user = this.state.user;
        let knowledge = user.knowledge;

        let languages =
            knowledge &&
            knowledge.languages &&
            knowledge.languages.map(lang => ({
                ...lang.tag,
                active: true
            }));
        let curious =
            knowledge &&
            knowledge.curiosity &&
            knowledge.curiosity.map(cur => ({
                ...cur.tag,
                active: true
            }));
        let lookingfor =
            knowledge &&
            knowledge.lookingFor &&
            knowledge.lookingFor.map((look, index) => ({
                ...look,
                active: true
            }));

        const render = languages && languages.length || curious && curious.length || lookingfor && lookingfor.length;

        return render ? (
            <PreviewSection title={"Knowledge | Community"}>
                {languages && languages.length ? (
                    <TagsAdd header={"Domain Expertise | Languages"} tags={languages}/>
                ) : null}
                {curious && curious.length ? (
                    <TagsAdd header={"Intellectually Curious About"} tags={curious}/>
                ) : null}
                {lookingfor && lookingfor.length ?
                    <TagsAdd hideBorder={true} activeColor={"white"} backgroundTagColor={"#202225"}
                             borderColor={"#202225"} header={'Looking For'} tags={lookingfor}/> : null}
            </PreviewSection>
        ) : null
    }

    renderProfessionalSection = () => {
        let user = this.state.user;
        let professional = user.professional;
        let achievements = user.achievements

        let min = professional && professional.salaryRange && professional.salaryRange.min !== "";
        let max = professional && professional.salaryRange && professional.salaryRange.max !== "";

        let jobType =
            professional &&
            professional.jobType &&
            professional.jobType.map((job) => ({
                ...job,
                active: true
            }));
        let industry =
            professional &&
            professional.industry &&
            professional.industry.map(ind => ({
                ...ind,
                active: true
            }));

        const profesionalexp = achievements && achievements.length && achievements.filter(item => item.type === "Professional Experience");
        const patents = achievements && achievements.length && achievements.filter(item => item.type === "Patents");
        const render = jobType && jobType.length || industry && industry.length || min || max || patents && patents.length || profesionalexp && profesionalexp.length;

        return render ? (
            <PreviewSection title={"Professional"}>
                <CheckedLabel seeking={professional.seeking} />
                {
                    professional.seeking && (min || max) ?
                    <Container>
                    <SalaryRangePreview
                            min={ min ? professional.salaryRange.min : null}
                            max={ max ? professional.salaryRange.max : null}/>
                    </Container> : null
                }
                {jobType && professional.seeking && jobType.length ?
                    <TagsAdd hideBorder={true} activeColor={"white"} backgroundTagColor={"#202225"}
                             borderColor={"#202225"} header={'Job Type'} tags={jobType}/> : null}
                {industry && industry.length ? (
                    <TagsAdd header={"Industry | Sector"} tags={industry}/>
                ) : null}
                <CollapseList cutElements={3} title={"Professional Experience"} >
                    {profesionalexp && profesionalexp.length && profesionalexp.map((item, index) =>
                        <ProfessionalExperiencePreview key={index} position={item.position} organization={item.name} level={item.level && item.level.label} description={item.help} />
                    )}
                </CollapseList>
                <CollapseList cutElements={3} title={"Patents"} >
                    {patents && patents.length && patents.map((item, index) =>
                        <PatentPreview key={index} name={item.name} id={item.id} link={item.link} tags={item.category && item.category.length > 0 && item.category.map((tag) => ({...tag, active: true}))} />
                    )}
                </CollapseList>
            </PreviewSection>
        ) : null
    }

    renderAcademicSection = () => {
        let user = this.state.user;
        let achievements = user.achievements

        const academic = achievements && achievements.length && achievements.filter(item => item.type === "Academic Background");
        const publications = achievements && achievements.length && achievements.filter(item => item.type === "Publications");
        const render =  academic && academic.length || publications && publications.length;

        return render ? (
            <PreviewSection title={"Academic"}>
                <CollapseList cutElements={3} title={"Academic Background"} >
                    {academic && academic.length && academic.map((item, index) =>
                        <AcademicBackgroundPreview key={index} name={item.name} study={item.study} level={item.degree && item.degree.label} description={item.story} />
                    )}
                </CollapseList>
                <CollapseList cutElements={3} title={"Publications"} >
                    {publications && publications.length && publications.map((item, index) =>
                        <PublicationsPreview key={index} name={item.name} year={item.year} link={item.link} details={item.explain} tags={item.category && item.category.length > 0 && item.category.map((tag) => ({...tag, active: true}))} />
                    )}
                </CollapseList>
            </PreviewSection>
        ) : null
    }

    getService(provider) {
        return this.servicesSocial.find(element => {
            return provider === element.service;
        });
    }

    getLinkForSocial(iden) {
        if (!iden.profileData)
            return `${this.getService(iden.provider).link}/${
                this.state.user.nickName
                }`;
        else {
            const data = iden.profileData;
            if (data.link) return data.link;
            return `${this.getService(iden.provider).link}/${data.screen_name ||
            data.nickName}`;
        }
    }

    render() {
        let socials = [];
        if (this.state.user && this.state.user.identities) {
            socials =
                this.state.user.identities &&
                this.state.user.identities.length &&
                this.state.user.identities.map(iden => ({
                    element: iden.provider === "google-oauth2" ? "google" : iden.provider,
                    link: this.getLinkForSocial(iden)
                }));
        }
        let website = this.state.user &&
            this.state.user.website && [
                {website: this.state.user.website, link: this.state.user.website}
            ];

        //tags
        let languages =
            this.state.user.knowledge &&
            this.state.user.knowledge.languages &&
            this.state.user.knowledge.languages.map(lang => ({
                ...lang.tag,
                active: true
            }));
        let curious =
            this.state.user.knowledge &&
            this.state.user.knowledge.curiosity &&
            this.state.user.knowledge.curiosity.map(cur => ({
                ...cur.tag,
                active: true
            }));
        let industry =
            this.state.user.professional &&
            this.state.user.professional.industry &&
            this.state.user.professional.industry.map(ind => ({
                ...ind,
                active: true
            }));
        let otherlook =
            this.state.user.speaker &&
            this.state.user.speaker.otherlooking &&
            this.state.user.speaker.otherlooking.map(look => ({
                ...look,
                active: true
            }));
        let otherpre =
            this.state.user.speaker &&
            this.state.user.speaker.otherpreferred &&
            this.state.user.speaker.otherpreferred.map(pre => ({
                ...pre,
                active: true
            }));
        let topics =
            this.state.user.speaker &&
            this.state.user.speaker.topic &&
            this.state.user.speaker.topic.map(top => ({...top, active: true}));
        //checkboxes
        let lookingfor =
            this.state.user.knowledge &&
            this.state.user.knowledge.lookingFor &&
            this.state.user.knowledge.lookingFor.map((look, index) => (
                <div key={index}>{look.label}</div>
            ));
        let jobtype =
            this.state.user.professional &&
            this.state.user.professional.jobType &&
            this.state.user.professional.jobType.map((job, index) => (
                <div key={index}>{job.label}</div>
            ));
        let lookingforS =
            this.state.user.speaker &&
            this.state.user.speaker.lookingFor &&
            this.state.user.speaker.lookingFor.map((look, index) => (
                <div key={index}>{look.label}</div>
            ));
        let preferred =
            this.state.user.speaker &&
            this.state.user.speaker.stage &&
            this.state.user.speaker.stage.map((stage, index) => (
                <div key={index}>{stage.label}</div>
            ));
        return (
            <Layout mdRowGap={"20px"}>
                {this.renderSummarySection()}
                {this.renderKnowledgeSection()}
                {this.renderProfessionalSection()}
                {this.renderAcademicSection()}



                <Title text={this.state.user.name + " " + this.state.user.lastName}/>
                <Location location={this.state.user.place}/>
                {<Social socials={socials} links={website}/>}
                {(languages && languages.length) ||
                (industry && industry.length) ||
                (curious && curious.length) ? (
                    <Container>
                        <Layout mdTemplateColumns={2} mdRowGap={"15px"}>
                            {languages && languages.length ? (
                                <TagsAdd header={"Languages"} tags={languages}/>
                            ) : null}
                            {industry && industry.length ? (
                                <TagsAdd header={"Industry | Sector"} tags={industry}/>
                            ) : null}
                        </Layout>
                        {curious && curious.length ? (
                            <TagsAdd header={"Curiosity"} tags={curious}/>
                        ) : null}
                    </Container>
                ) : null}
                {this.state.user.aboutMe && this.state.user.aboutMe.yourPassion ? (
                    <Text
                        header={"About Me | Passion"}
                        text={
                            this.state.user.aboutMe && this.state.user.aboutMe.yourPassion
                        }
                    />
                ) : null}
                {this.state.user.aboutMe && this.state.user.aboutMe.existingProblem ? (
                    <Text
                        header={"What is the most exciting problem you want to solve?"}
                        text={
                            this.state.user.aboutMe && this.state.user.aboutMe.existingProblem
                        }
                    />
                ) : null}
                {this.state.user.aboutMe && this.state.user.aboutMe.steps ? (
                    <Text
                        header={
                            "What steps have you already taken towards achieving this mission?"
                        }
                        text={this.state.user.aboutMe && this.state.user.aboutMe.steps}
                    />
                ) : null}
                {lookingfor && lookingfor.length ? (
                    <Text header={"Looking For"}>{lookingfor}</Text>
                ) : null}
                <Layout mdRowGap={"15px"} mdTemplateColumns={3}>
                    {this.state.user.professional &&
                    this.state.user.professional.seeking !== undefined ? (
                        <Text
                            header={"Seeking Employment"}
                            text={this.state.user.professional.seeking ? "Yes" : "No"}
                        />
                    ) : null}
                    {(this.state.user.professional &&
                        this.state.user.professional.salaryRange &&
                        this.state.user.professional.salaryRange.min !== null) ||
                    (this.state.user.professional &&
                        this.state.user.professional.salaryRange &&
                        this.state.user.professional.salaryRange.max !== null) ? (
                        <Text
                            header={"Salary Range"}
                            text={`${
                                this.state.user.professional.salaryRange.min !== null
                                    ? this.state.user.professional.salaryRange.min
                                    : null
                                } - ${
                                this.state.user.professional.salaryRange.max !== null
                                    ? this.state.user.professional.salaryRange.max
                                    : null
                                }`}
                        />
                    ) : null}
                    {jobtype && jobtype.length ? (
                        <Text header={"Job Type"}>{jobtype}</Text>
                    ) : null}
                </Layout>
                {this.state.user.speaker &&
                this.state.user.speaker.join !== undefined ? (
                    <Text
                        header={"Join the Speaker Directory"}
                        text={this.state.user.speaker.join ? "Yes" : "No"}
                    />
                ) : null}
                <Layout mdRowGap={"15px"} mdTemplateColumns={2}>
                    {lookingforS && lookingforS.length ? (
                        <Text header={"Looking For"}>{lookingforS}</Text>
                    ) : null}
                    {otherlook && otherlook.length ? (
                        <TagsAdd header={"Other"} tags={otherlook}/>
                    ) : null}
                </Layout>
                {topics && topics.length ? (
                    <TagsAdd header={"Topics you speak about"} tags={topics}/>
                ) : null}
                <Layout mdRowGap={"15px"} mdTemplateColumns={2}>
                    {preferred && preferred.length ? (
                        <Text header={"Preferred Stage"}>{preferred}</Text>
                    ) : null}
                    {otherpre && otherpre.length ? (
                        <TagsAdd header={"Other"} tags={otherpre}/>
                    ) : null}
                </Layout>
            </Layout>
        );
    }
}

export default UserPreviewBody;
