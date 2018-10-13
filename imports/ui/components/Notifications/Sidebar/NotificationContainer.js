import React from "react";
import { Container, Layout, mixins } from "btech-layout";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import BackButton from "../../BackButton/BackButton";
import { Button } from "btech-base-forms-component";
import PropTypes from "prop-types";

const SContainer = styled(Layout)`
  overflow: hidden;
`;

const Title = styled.label`
  font-family: Helvetica Neue LT Std;
  font-weight: bold;
  font-size: 14px;
  color: black;
  margin-bottom: 0;
`;

const SubTitle = styled.label`
  font-family: Roboto Mono;
  color: rgba(0, 0, 0, 0.5);
  font-size: 11px;
`;

const STitle = styled(Layout)`
  margin-top: 15px;
  display: inline-grid;
  grid-auto-rows: max-content;

  ${mixins.media.desktop`
    margin-top: 25px;
  `};
`;

const SCleanButton = styled(Button)`
  margin-top: 17px;
`;

const RLayout = styled(Layout)`
  border-bottom: 1px solid #dbdbdb;
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const BLayout = styled(Layout)`
  border-top: 1px solid #dbdbdb;
  display: none;
  zoom: 100%;

  ${mixins.media.desktop`
    display: initial;
  `};

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const ItemsContainer = function(props) {
  return (
    <SContainer
      fullY
      customTemplateRows={"68px 1fr"}
      mdCustomTemplateRows={"66px 1fr 40px"}
    >
      <RLayout
        customTemplateColumns={"1fr auto auto"}
        mdCustomTemplateColumns={"1fr auto"}
        padding={{ xs: "0px 10px", md: "0px 20px" }}
      >
        <STitle>
          <Title>{props.title}</Title>
          <SubTitle>{props.subtitle}</SubTitle>
        </STitle>
        <BackButton onClick={() => props.onClose && props.onClose()} />
        <Container ml={"5px"} mdHide>
          <SCleanButton
            secondary={true}
            onClick={() => props.onClear && props.onClear()}
          >
            Clear
          </SCleanButton>
        </Container>
      </RLayout>
      <Layout style={{ overflow: "hidden" }} fullY>
        <Scrollbars
          universal
          autoHide
          autoHideDuration={props.autoHideDuration}
          style={{ height: "100%", overflow: "display" }}
        >
          {props.children}
        </Scrollbars>
      </Layout>
      <BLayout customTemplateRows={"auto 1fr"}>
        <Container paddingX={"20px"}>
          <Layout customTemplateColumns={"1fr auto"} mt={"5px"}>
            <div />
            <Button
              secondary={true}
              onClick={() => props.onClear && props.onClear()}
            >
              Clear
            </Button>
          </Layout>
        </Container>
      </BLayout>
    </SContainer>
  );
};

export default ItemsContainer;

ItemsContainer.defaultProps = {
  title: "Notifications",
  subtitle: "Across my network"
};

ItemsContainer.propTypes = {
  onClear: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  childrens: PropTypes.number
};
