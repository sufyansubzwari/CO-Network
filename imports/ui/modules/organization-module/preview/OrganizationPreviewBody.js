import React from "react";
import { Container, Layout } from "btech-layout";
import {
  CollapseList,
  Location,
  PreviewSection,
  SalaryRangePreview,
  TagsAdd,
  Text,
  Title
} from "../../../components/Preview/components/index";
import { PlaceHolder } from "btech-placeholder-component";
import Separator from "../../../components/FiltersContainer/Separator";
import { OrgStatusIcon } from "../../../components";
import ProductPreview from "./components/ProductPreview";
import MediaPreview from "./components/MediaPreview";
import styled from "styled-components";

const Span = styled.span`
  color: ${props => (props.theme ? props.theme.color.primary : null)};
  margin-left: 8px;
  font-size: 20px;
`;

class OrganizationPreviewBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      organization: props.organization ? props.organization : null
    };

    this.SummarySection = React.createRef();
    this.RecruitmentSection = React.createRef();
    this.ProductSection = React.createRef();
    this.MediaSection = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organization) {
      this.setState({
        organization: nextProps.organization,
        showMoreVision: false
      });
    }
    if (nextProps.activePreview !== this.props.activePreview) {
      this.scrollToDomRef(nextProps.activePreview);
    }
  }

  scrollToDomRef = activePreview => {
    const currentRef = this.getRef(activePreview);
    currentRef &&
      this.props.onScroll &&
      this.props.onScroll(currentRef.offsetTop);
  };

  getRef(link) {
    switch (link) {
      case "Summary":
        return this.SummarySection.current;
      case "Technical Recruitment":
        return this.RecruitmentSection.current;
      case "Product & Service":
        return this.ProductSection.current;
      case "Media":
        return this.MediaSection.current;
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
      tags = this.state.organization.description;
    return tags.map(item => ({
      ...item,
      active: true
    }));
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
    return elements.map(e => ({
      ...e,
      active: true
    }));
  }

  handleMoreAbout = () => {
    this.setState({
      showMoreVision: !this.state.showMoreVision
    });
  };

  renderSummarySection = () => {
    let organization = this.state.organization;
    let name = `${organization.name}`;
    const orgType = this.handleOrgType();
    let description = this.handleDescriptionTags();
    const reason = organization.reason;
      const biography = {title : "Biography", text: reason && reason.bio};
      const orgDefine = {title : "Organization Define", text: reason && reason.orgDefine};
    return (
      <PreviewSection previewRef={this.SummarySection}>
        <PlaceHolder
          loading={!organization.name && !organization._id}
          height={35}
          width={300}
        >
          <Title>
            {name}
            <OrgStatusIcon status={organization.checkStatus} />
          </Title>
        </PlaceHolder>
        <PlaceHolder
          loading={!organization.place && !organization._id}
          height={35}
          width={300}
        >
          {organization.place ? (
            <Location location={organization.place} />
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={(!orgType || !orgType.length) && !organization._id}
          height={35}
          width={300}
        >
          {orgType && orgType.length ? (
            <TagsAdd
              hideBorder={true}
              activeColor={"white"}
              backgroundTagColor={"#202225"}
              borderColor={"#202225"}
              tags={orgType}
            />
          ) : null}
          <Separator />
        </PlaceHolder>
        <PlaceHolder
          loading={(!description || !description.length) && !organization._id}
          height={35}
          width={300}
        >
          {description && description.length ? (
            <TagsAdd
              onSelectTag={this.props.onSelectTag}
              header={"Description"}
              tags={description}
            />
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={(!reason || !reason.vision) && !organization._id}
          height={35}
          width={300}
        >
          {reason && reason.vision ? (
            <Container>
              <Text
                header={"Vision"}
                text={reason && reason.vision}
                showMore={true}
                extraTexts={[biography, orgDefine]}
                moreClicked={this.handleMoreAbout}
              />
            </Container>
          ) : null}
        </PlaceHolder>
      </PreviewSection>
    );
  };

  renderTechnicalSection = () => {
    let organization = this.state.organization;
    let tech = organization.tech;

    let min = tech && tech.salaryRange && tech.salaryRange.min;
    let max = tech && tech.salaryRange && tech.salaryRange.max;

    let jobType = this.handleTechElements("jobType");
    let industry = this.handleTechElements("industry");
    let stacks = this.handleTechElements("stack");

    const render =
      organization.name ||
      (min || max) ||
      jobType ||
      (stacks && stacks.length) ||
      (industry && industry.length) ||
      !organization._id;

    return render ? (
      <PreviewSection
        title={"Technical Recruitment"}
        lineSeparation={"30px"}
        previewRef={this.RecruitmentSection}
      >
        <PlaceHolder
          loading={!organization.name && !organization._id}
          height={35}
          width={300}
        >
          {min || max ? (
            <SalaryRangePreview
              label={"Salary Range"}
              min={min ? tech.salaryRange.min : null}
              max={max ? tech.salaryRange.max : null}
            />
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={(!jobType || !jobType.length > 0) && !organization._id}
          height={35}
          width={300}
        >
          {jobType && jobType.length > 0 ? (
            <TagsAdd
              hideBorder={true}
              activeColor={"white"}
              backgroundTagColor={"#202225"}
              borderColor={"#202225"}
              header={"Job Type"}
              tags={jobType}
            />
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={(!stacks || !stacks.length > 0) && !organization._id}
          height={35}
          width={300}
        >
          {stacks && stacks.length > 0 ? (
            <TagsAdd
              onSelectTag={this.props.onSelectTag}
              header={"Languages, Libraries, Skills"}
              tags={stacks}
            />
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={(!industry || !industry.length > 0) && !organization._id}
          height={35}
          width={300}
        >
          {industry && industry.length > 0 ? (
            <TagsAdd
              onSelectTag={this.props.onSelectTag}
              header={"Industry | Sector"}
              tags={industry}
            />
          ) : null}
        </PlaceHolder>
      </PreviewSection>
    ) : null;
  };

  renderProductsServicesSection = () => {
    let organization = this.state.organization;
    let products = organization.products;

    const product =
      products &&
      products.length > 0 &&
      products.filter(item => item.type === "Product");
    const service =
      products &&
      products.length > 0 &&
      products.filter(item => item.type === "Service");

    const render =
      (products && products.length > 0) ||
      (service && service.length > 0) ||
      !organization._id;

    return render ? (
      <PreviewSection
        title={"Products & Services"}
        previewRef={this.ProductSection}
      >
        <PlaceHolder
          loading={(!product || !product.length) && !organization._id}
          height={35}
          width={300}
        >
          {product && product.length > 0 ? (
            <CollapseList cutElements={3} title={"Products"}>
              {product.map((item, index) => (
                <ProductPreview
                  key={index}
                  name={item.name}
                  link={item.link}
                  files={item.files}
                  explain={item.explain}
                />
              ))}
            </CollapseList>
          ) : null}
        </PlaceHolder>
        <PlaceHolder
          loading={(!service || !service.length) && !organization._id}
          height={35}
          width={300}
        >
          {service && service.length > 0 ? (
            <CollapseList cutElements={3} title={"Services"}>
              {service.map((item, index) => (
                <ProductPreview
                  key={index}
                  name={item.name}
                  link={item.link}
                  files={item.files}
                  explain={item.explain}
                />
              ))}
            </CollapseList>
          ) : null}
        </PlaceHolder>
      </PreviewSection>
    ) : null;
  };

  renderMediaSection = () => {
    let organization = this.state.organization;
    let media = organization.media;

    const render = (media && media.length > 0) || !organization._id;

    return render ? (
      <PreviewSection title={"Media"} previewRef={this.MediaSection}>
        <PlaceHolder
          loading={!media || (!media.length && !organization._id)}
          height={35}
          width={300}
        >
          {media && media.length > 0 ? (
            <CollapseList cutElements={3}>
              {media.map((item, index) => (
                <MediaPreview
                  key={index}
                  name={item.name}
                  link={item.link}
                  file={item.files}
                  explain={item.explain}
                />
              ))}
            </CollapseList>
          ) : null}
        </PlaceHolder>
      </PreviewSection>
    ) : null;
  };

  render() {
    return this.state.organization ? (
      <Layout mdRowGap={"20px"} rowGap={"10px"}>
        {this.renderSummarySection()}
        {this.renderTechnicalSection()}
        {this.renderProductsServicesSection()}
        {this.renderMediaSection()}
      </Layout>
    ) : (
      <Container />
    );
  }
}

export default OrganizationPreviewBody;
