import React from "react";
import { Container, Layout, mixins } from "btech-layout";
import styled from "styled-components";
import PropsTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import ReactSVG from "react-svg";

const Header = styled(Container)`
  width: 100%;
  height: 150px;
  position: relative;
  background: linear-gradient(0deg, #f92672, #e826f9);

  ${mixins.media.desktop`
    height: 175px;
  `};
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
    zoom: 100%;
    height: 130px;
    
    ${mixins.media.desktop`
      height: 175px;
    `};
    
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

const SHeading = styled.label`
  font-family: Helvetica Neue LT Std;
  color: white;
  font-size: 24px;
  margin-bottom: 0;
  text-align: center;
`;

const SSubHeading = styled.span`
  font-family: Roboto Mono;
  color: white;
  font-size: 12px;
  text-align: center;
`;
const Name = styled.label`
  font-family: Helvetica Neue LT Std;
  color: black;
  font-size: 20px;
  text-align: center;
  width: 100%;
  cursor: pointer;
  transition: color 0.3s ease-out;
  :hover {
    color: #f92672;
  }
`;
const Description = styled.span`
  font-family: Roboto Mono;
  color: #d1d1d1;
  font-size: 12px;
  text-align: center;
`;

const SNoteDescription = styled.div`
  font-family: Roboto Mono;
  color: #d1d1d1;
  font-size: 12px;
`;

const SNote = styled(SNoteDescription)`
  font-weight: bold;
  color: initial;
  font-size: 14px;
`;

const Option = props => {
  return (
    <Container>
      <Link to={props.link} onClick={() => props.onSelect && props.onSelect()}>
        <Name>{props.name}</Name>
      </Link>
      {props.description ? (
        <Description>{props.description}</Description>
      ) : null}
    </Container>
  );
};

class Create extends React.Component {
  render() {
    let elements =
      this.props.options &&
      this.props.options.map((element, index) => (
        <Option
          key={index}
          link={element.link}
          name={element.name}
          onSelect={this.props.onChangeRoute && this.props.onChangeRoute}
          description={element.description}
        />
      ));
    return (
      <Layout
        fullY
        customTemplateRows={"auto 1fr"}
        onBlur={() => this.props.onBlur && this.props.onBlur()}
      >
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
              {/*<Icon>*/}
              <MaterialIcon type={"chevron-left"} />
              {/*</Icon>*/}
            </CButton>
            <SHeading>CREATE</SHeading>
            <SSubHeading>Nice & easy!</SSubHeading>
          </SHeaderContent>
        </Header>
        <SBodyContainer paddingX={"45px"} paddingY={"35px"} paddingT={"25px"}>
          <Container fullY>
            <Layout fullY customTemplateRows={"1fr auto"}>
              <Container>
                <Layout style={{ textAlign: "center", rowGap: 20 }}>
                  {elements}
                </Layout>
              </Container>
              <Container hide={!this.props.noteText || this.props.hideNote}>
                <Container>
                  <SNote>{this.props.noteLabel}</SNote>
                </Container>
                <Container>
                  <SNoteDescription>{this.props.noteText}</SNoteDescription>
                </Container>
              </Container>
            </Layout>
          </Container>
        </SBodyContainer>
      </Layout>
    );
  }
}

export default Create;

Create.defaultProps = {
  noteLabel: "Note",
  hideNote: true
};

Create.propTypes = {
  options: PropsTypes.array,
  noteText: PropsTypes.string,
  hideNote: PropsTypes.bool,
  noteLabel: PropsTypes.string,
  onChangeRoute: PropsTypes.func,
  onBlur: PropsTypes.func,
  onClose: PropsTypes.func
};
