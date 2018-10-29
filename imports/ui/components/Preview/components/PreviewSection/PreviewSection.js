import React from "react";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import PropsTypes from "prop-types";

const PreviewSectionContainer = styled(Layout)`
  padding: 20px 10px;

  @media (min-width: 62em) {
    padding: 20px 40px;
  }

  background: ${props =>
    props.theme ? props.theme.preview.background : "white"};
  border-top: ${props =>
    props.theme ? `1px solid ${props.theme.preview.borderColor}` : null};
  border-bottom: ${props =>
    props.theme ? `1px solid ${props.theme.preview.borderColor}` : null};
`;

const STitle = styled.span`
  font-family: ${props =>
    props.theme ? props.theme.preview.section.titleFamily : "Roboto Mono"};
  color: ${props =>
    props.theme ? props.theme.preview.section.titleColor : "black"};
  font-weight: bold;
  font-size: 16px;
`;
const Number = styled.span`
  font-family: ${props =>
    props.theme ? props.theme.preview.fontFamily : "Roboto Mono"};
  font-size: 14px;
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.5);
`;

class PreviewSection extends React.Component{



  componentWillReceiveProps(nextProps) {
    if (nextProps.activePreview !== this.props.activePreview) {
        this.scrollToDomRef();
    }
  }

  scrollToDomRef = () => {
    const currentRef = this.getRef(this.props.activePreview);
    // this.props.scrollRef.scrollToTop();
    currentRef.scrollIntoView();
    // const myDomNode = ReactDOM.findDOMNode(currentRef);
    // myDomNode.scrollTo(0, myDomNode.offsetTop);
  };

  render() {
    const {props} = this;
    return (
      <PreviewSectionContainer innerRef={props.previewRef} rowGap={props.lineSeparation || "10px"}>
        {props.title || props.number ? <Container>
          {props.title ? <STitle>{props.title}</STitle> : null}
          {props.number ? <Number>({props.number})</Number> : null}
        </Container> : null}
        {props.children}
      </PreviewSectionContainer>
    )
  }
}

export default PreviewSection;

PreviewSection.propTypes = {
  title: PropsTypes.string,
  lineSeparation: PropsTypes.string,
  number: PropsTypes.number,
  previewRef: PropsTypes.any
};
