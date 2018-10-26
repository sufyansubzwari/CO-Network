import React from "react";
import {Layout, Container} from "btech-layout";
import {
    Text,
    TagsAdd,
    ProductService,
    Location,
    Title,
    Social,
    Media,
    PreviewSection,
    SalaryRangePreview,
    CollapseList
} from "../../../components/Preview/components/index";
import {PlaceHolder} from "btech-placeholder-component";
import Separator from "../../../components/FiltersContainer/Separator";
import ProductPreview from "./components/ProductPreview";
import MediaPreview from "./components/MediaPreview";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";


const Span = styled.span`
    color: ${props => props.theme ? props.theme.color.primary : null};
    margin-left: 8px;
    font-size: 20px;
`


class OrganizationPreviewBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            organization: props.organization ? props.organization : null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.organization) {
            this.setState({
                organization: nextProps.organization,
                showMoreVision: false
            });
        }
    }

    handleProducts() {
        // let products = [];
        // if (this.state.organization && this.state.organization.products)
        //     products = this.state.organization.products.map((prod, index) => (
        //         <Container key={index}>
        //             <Text header={`${prod.type}s`} marginBottom={"0px"}/>
        //             <ProductService data={prod} files={prod.files} type={prod.type}/>
        //         </Container>
        //     ));
        // return products;
    }

    handleSocialInfo() {
        let socials = [];
        if (this.state.organization && this.state.organization.social)
            Object.keys(this.state.organization.social).forEach((social, index) => {
                if (this.state.organization.social[social])
                    socials.push({
                        element: social,
                        link: this.state.organization.social[social]
                    });
            });
        return socials;
    }

    handleDescriptionTags() {
        let tags = [];
        if (this.state.organization && this.state.organization.description)
            tags = this.state.organization.description.map(item => ({
                ...item,
                active: true
            }));
        return tags;
    }

    handleTechElements(elementName) {
        let elements = [];
        if (
            this.state.organization &&
            this.state.organization.tech &&
            this.state.organization.tech[elementName]
        )
            if (elementName === "stack")
                elements = this.state.organization.tech[elementName].map(element => ({
                    ...element.tag,
                    active: true
                }));
            else
                elements = this.state.organization.tech[elementName].map(element => ({
                    ...element,
                    active: true
                }));
        return elements;
    }

    handleOrgType() {
        let elements = [];
        if (this.state.organization) elements = this.state.organization.orgType;
        return elements;
    }

    handleMoreAbout = () => {
        this.setState({
            showMoreVision: !this.state.showMoreVision
        })
    }

    renderSummarySection = () => {

        let organization = this.state.organization;
        let name = `${organization.name}`;
        let orgType = this.handleOrgType();
        orgType =
            orgType &&
            orgType.length &&
            orgType.map(org => ({
                ...org,
                active: true
            }));
        let description = this.handleDescriptionTags();
        const reason = organization.reason;

        return (
            <PreviewSection>
                <PlaceHolder
                    loading={!organization.name && !organization._id}
                    height={35}
                    width={300}
                >
                    <Title>
                        {name}
                        {organization.checked ? <Span><MaterialIcon type={'shield-check'} /></Span> : null}
                    </Title>
                </PlaceHolder>
                <PlaceHolder
                    loading={!organization.place && !organization._id}
                    height={35}
                    width={300}
                >
                    {organization.place ? <Location location={organization.place}/> : null}
                </PlaceHolder>
                <PlaceHolder
                    loading={!orgType || !orgType.length && !organization._id}
                    height={35}
                    width={300}
                >
                    {orgType && orgType.length ?
                        <TagsAdd hideBorder={true} activeColor={"white"} backgroundTagColor={"#202225"}
                                 borderColor={"#202225"} tags={orgType}/> : null}
                    <Separator/>
                </PlaceHolder>
                <PlaceHolder
                    loading={!description || !description.length && !organization._id}
                    height={35}
                    width={300}
                >
                    {description && description.length ? <TagsAdd header={"Description"} tags={description}/> : null}
                </PlaceHolder>
                <PlaceHolder
                    loading={(!reason || !reason.vision) && !organization._id}
                    height={35}
                    width={300}>
                    {reason && reason.vision ? <Container>
                        <Text
                            header={"Vision"}
                            text={reason && reason.vision}
                            showMore={true}
                            extraTexts={[reason && reason.bio, reason && reason.orgDefine]}
                            moreClicked={this.handleMoreAbout}
                        />
                    </Container> : null}
                </PlaceHolder>
            </PreviewSection>
        )
    }

    renderTechnicalSection = () => {

        let organization = this.state.organization;
        let tech = organization.tech;

        let min = tech && tech.salaryRange && tech.salaryRange.min !== "";
        let max = tech && tech.salaryRange && tech.salaryRange.max !== "";

        let jobType = this.handleTechElements("jobType");
        let industry = this.handleTechElements("industry");
        let stacks = this.handleTechElements("stack");

        return (
            <PreviewSection title={"Technical Recruitment"} lineSeparation={"30px"}>
                <PlaceHolder
                    loading={!organization.name && !organization._id}
                    height={35}
                    width={300}
                >
                    <SalaryRangePreview
                        label={"Salary Range"}
                        min={min ? tech.salaryRange.min : null}
                        max={max ? tech.salaryRange.max : null}/>
                </PlaceHolder>
                <PlaceHolder
                    loading={!jobType || !jobType.length && !organization._id}
                    height={35}
                    width={300}
                >
                    {jobType && jobType.length ?
                        <TagsAdd hideBorder={true} activeColor={"white"} backgroundTagColor={"#202225"}
                                 borderColor={"#202225"} header={"Job Type"} tags={jobType}/> : null}
                    <Separator/>
                </PlaceHolder>
                <PlaceHolder
                    loading={!stacks || !stacks.length && !organization._id}
                    height={35}
                    width={300}
                >
                    {stacks && stacks.length ?
                        <TagsAdd header={"Languages, Libraries, Skills"} tags={stacks}/> : null}
                </PlaceHolder>
                <PlaceHolder
                    loading={!industry || !industry.length && !organization._id}
                    height={35}
                    width={300}
                >
                    {industry && industry.length ? <TagsAdd header={"Industry | Sector"} tags={industry}/> : null}
                </PlaceHolder>
            </PreviewSection>
        )
    }

    renderProductsServicesSection = () => {
        let organization = this.state.organization;
        let products = organization.products;

        const product = products && products.length > 0 && products.filter(item => item.type === "Product");
        const service = products && products.length > 0 && products.filter(item => item.type === "Service");

        return (
            <PreviewSection title={"Products & Services"}>
                <PlaceHolder
                    loading={!product || !product.length  && !organization._id}
                    height={35}
                    width={300}
                >
                    <CollapseList cutElements={3} title={"Products"}>
                        {product && product.length > 0 && product.map((item, index) =>
                            <ProductPreview key={index} name={item.name} link={item.link}
                                                       files={item.files}
                                                       explain={item.explain}/>
                        )}
                    </CollapseList>
                </PlaceHolder>
                <PlaceHolder
                    loading={!service || !service.length  && !organization._id}
                    height={35}
                    width={300}
                >
                    <CollapseList cutElements={3} title={"Services"}>
                        {service &&  service.length > 0 && service.map((item, index) =>
                            <ProductPreview key={index} name={item.name} link={item.link}
                                            files={item.files}
                                            explain={item.explain}/>
                        )}
                    </CollapseList>
                </PlaceHolder>
            </PreviewSection>
        )
    }

    renderMediaSection = () => {
        let organization = this.state.organization;
        let media = organization.media;

        return (
            <PreviewSection title={"Media"}>
                <PlaceHolder
                    loading={!media || !media.length  && !organization._id}
                    height={35}
                    width={300}
                >
                    <CollapseList cutElements={3}>
                        {media && media.length > 0 && media.map((item, index) =>
                            <MediaPreview key={index} name={item.name} link={item.link}
                                            file={item.files}
                                            explain={item.explain}/>
                        )}
                    </CollapseList>
                </PlaceHolder>
            </PreviewSection>
        )
    }

    render() {

        return this.state.organization ? (
            <Layout mdRowGap={"20px"}>
                {this.renderSummarySection()}
                {this.renderTechnicalSection()}
                {this.renderProductsServicesSection()}
                {this.renderMediaSection()}

            </Layout>
        ) : (
            <Container/>
        );
    }
}

export default OrganizationPreviewBody;
