import React from "react";
import PropsTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { ItemList } from "../../../../components/Preview/components";
import MaterialIcon from "react-material-iconic-font";
import ReactSVG from "react-svg";
import LightBox from "react-images";
import { Utils } from "../../../../services";
import theme from "../../../../theme";

const SImage = styled(Container)`
  background: ${props => (props.src ? `url(${props.src})` : "#32363D")};
  background-size: cover;
  border-radius: 3px;
  height: 57px;
  cursor: ${props => (props.src ? "pointer" : "default")};
`;

const STitle = styled.label`
  color: #2b2b2b;
  font-family: "Helvetica Neue LT Std";
  font-size: 16px;
  line-height: 1;
  margin-bottom: 0;
`;

const SOrganization = styled(Layout)`
  color: #2b2b2b;
  opacity: 0.7;
  font-family: "Roboto Mono";
  font-size: 12px;
  i {
    margin-left: 3px;
    line-height: 1.5;
  }
`;

const Text = styled.span`
  color: #2b2b2b;
  font-family: "Roboto Mono";
  font-size: 12px;
  font-weight: 300;
  line-height: 20px;
`;

const SVGContainer = styled(Container)`
  line-height: 13px;
`;

class ProfessionalExperiencePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightBoxIsOpen: false
    };
  }

  handleImage = (image, type) => {
    return image
      ? image.startsWith("http") || image.startsWith("data:")
        ? image
        : Utils.getImageFromS3(image, type)
      : null;
  };

  renderLeftSide = () => {
    return (
      <SImage
        onClick={() => this.setState({ lightBoxIsOpen: true })}
        src={this.handleImage(this.props.image, "chat")}
      >
        {this.props.image ? (
          <LightBox
            images={[{ src: this.handleImage(this.props.image, "base") }]}
            isOpen={this.state.lightBoxIsOpen}
            onClose={() => this.setState({ lightBoxIsOpen: false })}
            theme={theme.theme.lightBoxTheme}
          />
        ) : null}
      </SImage>
    );
  };

  getLevelSvg = level => {
    switch (level) {
      case "Advance":
        return (
          <ReactSVG
            src={"/images/icons/line3.svg"}
            svgStyle={{ fill: "#FF1493" }}
          />
        );
      case "Intermediate":
        return (
          <ReactSVG
            src={"/images/icons/line2.svg"}
            svgStyle={{ fill: "#464646" }}
          />
        );
      case "Beginneer":
        return (
          <ReactSVG
            src={"/images/icons/line1.svg"}
            svgStyle={{ fill: "#8e8a8a" }}
          />
        );
      default:
        return null;
    }
  };

  renderRightSide = () => {
    return (
      <Layout rowGap={"10px"}>
        <Container>
          <STitle>{this.props.position}</STitle>
          <SOrganization customTemplateColumns={"auto auto 1fr"}>
            {this.props.organization && this.props.organization.toUpperCase()}
            {this.props.checkedOrganization ? (
              <MaterialIcon type={"shield-check"} />
            ) : null}
            <div />
          </SOrganization>
          <Layout customTemplateColumns={"11px auto"} colGap={"3px"}>
            <SVGContainer>{this.getLevelSvg(this.props.level)}</SVGContainer>
            <SOrganization>
              {this.props.level && this.props.level.toUpperCase()}
            </SOrganization>
          </Layout>
        </Container>
        <Container>
          <Text>{this.props.description}</Text>
        </Container>
      </Layout>
    );
  };

  render() {
    return (
      <ItemList
        renderLeftSide={this.renderLeftSide}
        renderRightSide={this.renderRightSide}
      />
    );
  }
}

export default ProfessionalExperiencePreview;

ProfessionalExperiencePreview.defaultProps = {};

ProfessionalExperiencePreview.propTypes = {
  description: PropsTypes.string,
  level: PropsTypes.string,
  organization: PropsTypes.string,
  position: PropsTypes.string,
  checkedOrganization: PropsTypes.bool,
  image: PropsTypes.string
};
