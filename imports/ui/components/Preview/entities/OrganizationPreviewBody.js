import React from "react";
import { Layout, Container } from "btech-layout";
import {
  Text,
  TagsAdd,
  ProductService,
  Location,
  Title,
  Social,
  Media
} from "../components/index";

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
        organization: nextProps.organization
      });
    }
  }

  handleProducts() {
    let products = [];
    if (this.state.organization && this.state.organization.products)
      products = this.state.organization.products.map((prod, index) => (
        <Container key={index}>
          <Text header={`${prod.type}s`} marginBottom={"0px"} />
          <ProductService data={prod} files={prod.files} type={prod.type} />
        </Container>
      ));
    return products;
  }

  handleMedia() {
    let media = [];
    if (this.state.organization && this.state.organization.media)
      media = this.state.organization.media.map((med, index) => (
        <Container key={index}>
          <Text header={`Media`} marginBottom={"0px"} />
          <Media data={med} file={med.files} />
        </Container>
      ));
    return media;
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

  render() {
    // social information
    let socials = this.handleSocialInfo();
    // tags
    let description = this.handleDescriptionTags();
    // stacks
    let stacks = this.handleTechElements("stack");
    // industry
    let industry = this.handleTechElements("industry");
    // job Types
    let jobType = this.handleTechElements("jobType");
    // products
    let products = this.handleProducts();
    // checkboxes
    let organizationTypes = this.handleOrgType();
    //media
    let media = this.handleMedia();

    let actively =
      this.state.organization &&
      this.state.organization.actively &&
      this.state.organization.actively.map((item, index) => (
        <div key={index}>{item.label}</div>
      ));

    return (
      <Layout rowGap={"15px"}>
        {this.state.organization ? (
          <Container>
            <Container>
              <Title text={this.state.organization.name} />
            </Container>
            <Container>
              <Location location={this.state.organization.place} />
            </Container>
            <Social socials={socials} />
            {organizationTypes && organizationTypes.length ? (
              <Text header={"Organization Type"}>
                {organizationTypes.map((type, index) => (
                  <div key={index}>{type.label}</div>
                ))}
              </Text>
            ) : null}
            <Layout templateColumns={2}>
              {this.state.organization.contact.email !== "" ? (
                <Text
                  header={"Verification Email"}
                  text={this.state.organization.contact.email}
                />
              ) : null}
              {this.state.organization.contact.phone !== "" ? (
                <Text
                  header={"Contact Number"}
                  text={this.state.organization.contact.phone}
                />
              ) : null}
            </Layout>
            {this.state.organization.reason.bio ? (
              <Text
                header={"Org Bio"}
                text={this.state.organization.reason.bio}
              />
            ) : null}
            {this.state.organization.reason.vision !== "" ? (
              <Text
                header={"Vision | Mission"}
                text={this.state.organization.reason.vision}
              />
            ) : null}
            {this.state.organization.reason.orgDefine !== "" ? (
              <Text
                header={"How does the organization define / measure success?"}
                text={this.state.organization.reason.orgDefine}
              />
            ) : null}
            {actively && actively.length ? (
              <Text header={"Does your organization actively"}>{actively}</Text>
            ) : null}
            {description && description.length ? (
              <TagsAdd
                header={"Tags that best describe your organization"}
                tags={description}
              />
            ) : null}
            <Layout templateColumns={2}>
              {this.state.organization.tech.salaryRange &&
              (this.state.organization.tech.salaryRange.min !== "" ||
                this.state.organization.tech.salaryRange.max !== "") ? (
                <Text
                  header={"Salary Range"}
                  text={`${
                    this.state.organization.tech.salaryRange.min !== null
                      ? this.state.organization.tech.salaryRange.min
                      : null
                  } - ${
                    this.state.organization.tech.salaryRange.max !== null
                      ? this.state.organization.tech.salaryRange.max
                      : null
                  }`}
                />
              ) : null}
              {jobType && jobType.length ? (
                <Text header={"Job Type"}>
                  {jobType.map((job, index) => (
                    <div key={index}>{job && job.label}</div>
                  ))}
                </Text>
              ) : null}
            </Layout>
            <Layout templateColumns={2}>
              {stacks && stacks.length ? (
                <TagsAdd
                  header={"Languages, Libraries, Skills Tags"}
                  tags={stacks}
                />
              ) : null}
              {industry && industry.length ? (
                <TagsAdd header={"Industry | Sector"} tags={industry} />
              ) : null}
            </Layout>
            {products}
            {media}
          </Container>
        ) : null}
      </Layout>
    );
  }
}

export default OrganizationPreviewBody;
