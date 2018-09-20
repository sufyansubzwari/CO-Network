import React from "react";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import PropsTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = styled.div`
    background-image: url("/images/create-head.png");
    background-size: cover;
    width: 100%;
    height: 175px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: middle;
    
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
        onBlur={() => this.prop.onBlur && this.prop.onBlur()}
      >
        <Header>
          <SHeading>CREATE</SHeading>
          <SSubHeading>Nice & easy!</SSubHeading>
        </Header>
        <Container paddingX={"45px"} paddingY={"35px"} paddingT={"25px"}>
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
        </Container>
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
  onBlur: PropsTypes.func
};
