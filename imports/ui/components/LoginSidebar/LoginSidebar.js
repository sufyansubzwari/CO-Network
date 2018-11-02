import React from "react";
import { Container, Layout, mixins } from "btech-layout";
import styled from "styled-components";
import PropsTypes from "prop-types";
import { Button } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import ReactSVG from "react-svg";
import { LoginButtons } from "../../pages/home/components";
import Authorization from "../../services/authorization/index";

const Header = styled(Container)`
  width: 100%;
  height: 100px;
  position: relative;
  background: linear-gradient(0deg, #f92672, #e826f9);
`;

const SBottomSvg = styled(Container)`
  position: absolute;
  bottom: -1px;

  ${mixins.media.desktop`
    bottom: -2px;
  `};
`;

const SHeaderContent = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: middle;
    height: 100px;
    zoom: 100%;
    
    @media (min-width: 62em) {
      zoom: 80%;
    }
  
    @media (min-width: 86em) {
      zoom: 100%;
    }
    
    label {
        font-family: ${props =>
          props.theme
            ? props.theme.create.heading.family
            : "Helvetica Neue LT Std"}:
        color: ${props =>
          props.theme ? props.theme.create.heading.color : "white"}:
        font-size: ${props =>
          props.theme ? props.theme.create.heading.size : "24px"}:
        text-align: ${props =>
          props.theme ? props.theme.create.heading.align : "center"}:       
    } 
    
    span {
        font-family: ${props =>
          props.theme ? props.theme.create.subheading.family : "Roboto Mono"}:
        color: ${props =>
          props.theme ? props.theme.create.subheading.color : "white"}:
        font-size: ${props =>
          props.theme ? props.theme.create.subheading.size : "12px"}:
        text-align: ${props =>
          props.theme ? props.theme.create.subheading.align : "center"}:       
    } 
`;

const CButton = styled(Button)`
  width: 34px;
  height: 34px;
  border-radius: 3px;
  background-color: white;
  position: absolute;
  top: 40px;
  left: 20px;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  border: none;
`;

const SBodyContainer = styled(Container)`
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const SNoteDescription = styled(Container)`
  font-family: Roboto Mono;
  color: #d1d1d1;
  font-size: 12px;
`;

const SNote = styled(SNoteDescription)`
  font-weight: bold;
  color: initial;
  font-size: 14px;
`;

const SPageTitle = styled(Container)`
  text-align: center;
  font-size: 26px;
  font-family: ${props => props.theme.texts.title.fontFamily};
  letter-spacing: 1px;
  color: ${props => props.theme.color.default};
  text-transform: uppercase;

  ${mixins.media.desktop`
    text-align: initial;
  `};
`;

const SBlackTitle = styled.span`
  color: black;
`;

const SBorderedTitle = styled.span`
  color: black;
  -webkit-text-fill-color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  display: block;
`;

const SSymbolTitle = styled.span`
  display: none;

  ${mixins.media.desktop`
    display: initial;
  `};
`;

const SLoginText = styled(Container)`
  font-size: 13px;
  font-family: ${props => props.theme.texts.title.fontFamily};
  margin-bottom: 5px;

  ${mixins.media.desktop`
    font-size: 20px;
    display: initial;
  `};
`;

class LoginSidebar extends React.Component {
  processAuthRequest(service) {
    Authorization.login(service);
  }

  render() {
    this.props.curUser && this.props.onClose && this.props.onClose();
    return (
      <Layout fullY customTemplateRows={"auto 1fr"}>
        <Header>
          <SBottomSvg fullX>
            <ReactSVG src={"/images/sidebar/border.svg"} />
          </SBottomSvg>
          <SHeaderContent>
            <CButton
              primary
              secondary={true}
              onClick={() => this.props.onClose && this.props.onClose()}
              color={"black"}
            >
              <MaterialIcon type={"chevron-left"} />
            </CButton>
          </SHeaderContent>
        </Header>
        <SBodyContainer paddingX={"45px"} paddingY={"35px"} paddingT={"25px"}>
          <Layout fullY customTemplateRows={"1fr auto auto"}>
            <SPageTitle>
              <SBlackTitle>Connect</SBlackTitle>
              <SBorderedTitle>
                Physically
                <SSymbolTitle>,</SSymbolTitle>
              </SBorderedTitle>
              <SBlackTitle> Collaborate</SBlackTitle>
              <SBorderedTitle>Digitally</SBorderedTitle>
            </SPageTitle>
            <Container>
              <Container mb={{ md: "15px" }}>
                <SLoginText>
                  Log into the COnscious Network
                </SLoginText>
              </Container>
              <Container>
                <LoginButtons
                  showTitle={false}
                  show
                  onSelect={service => this.processAuthRequest(service)}
                />
              </Container>
            </Container>
            <Container hide={!this.props.noteText || this.props.hideNote}>
              <SNote>{this.props.noteLabel}</SNote>
              <SNoteDescription>{this.props.noteText}</SNoteDescription>
            </Container>
          </Layout>
        </SBodyContainer>
      </Layout>
    );
  }
}

LoginSidebar.defaultProps = {
  noteLabel: "Note",
  hideNote: true
};

LoginSidebar.propTypes = {
  noteText: PropsTypes.string
};

export default LoginSidebar;
