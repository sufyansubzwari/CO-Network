import React from "react";
import { Layout, Container } from "btech-layout";
import styled, { ThemeProvider } from "styled-components";
import PropsTypes from "prop-types";
import { theme } from "./../../theme";
import { Link } from "react-router-dom";

const Header = styled.div`
    background: linear-gradient(180deg, #E826F9, #F92672);
    width: 100%;
    height: 160px;
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

const Option = props => {
  return (
    <Container>
      <Link to={props.link}>
        <Name>{props.name}</Name>
      </Link>
      <Description>{props.description}</Description>
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
          description={element.description}
        />
      ));
    return (
      <ThemeProvider theme={theme}>
        <Layout fullY customTemplateRows={"auto 1fr"}>
          <Header>
            <SHeading>CREATE</SHeading>
            <SSubHeading>Nice & easy!</SSubHeading>
          </Header>
          <Container paddingX={"45px"} paddingY={"35px"} paddingT={"45px"}>
            <Container fullY>
              <Layout fullY customTemplateRows={"1fr auto"}>
                <Container>
                  <Layout style={{ textAlign: "center", rowGap: 20 }}>
                    {elements}
                  </Layout>
                </Container>
                <Container hide={!this.props.noteText}>
                  <Container>{this.props.noteLabel}</Container>
                  <Container>{this.props.noteText} </Container>
                </Container>
              </Layout>
            </Container>
          </Container>
        </Layout>
      </ThemeProvider>
    );
  }
}

export default Create;

Create.defaultProps = {
  noteLabel: "Note"
};

Create.propTypes = {
  options: PropsTypes.array,
  noteText: PropsTypes.string,
  noteLabel: PropsTypes.string
};
