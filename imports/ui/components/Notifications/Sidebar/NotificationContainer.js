import React from "react";
import { Layout, Container } from "btech-layout";
import styled, { ThemeProvider } from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import { FilterItem, Separator } from "../../../components";
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
  margin-top: 25px;
  display: inline-grid;
  grid-auto-rows: max-content;
`;

const RLayout = styled(Layout)`
    zoom: 100%;
    @media (min-width: 62em) {
        zoom: 80%;
      }
    
      @media (min-width: 86em) {
        zoom: 100%;
      }
`

const ItemsContainer = function(props) {
    return (
        <SContainer fullY customTemplateRows={"75px 1fr 60px"}>
            <RLayout customTemplateColumns={"1fr auto"} paddingX={"20px"}>
                <STitle>
                    <Title>Notifications</Title>
                    <SubTitle>Across my network</SubTitle>
                </STitle>
                <BackButton onClick={() => props.onClose && props.onClose()} />
            </RLayout>
            <Layout style={{ overflow: "hidden" }} customTemplateRows={'1px auto'}>
                <Separator />
                <Scrollbars
                    universal
                    autoHide
                    autoHideDuration={props.autoHideDuration}
                    style={{ height: "100%", overflow: "display" }}
                >
                    {props.children}
                </Scrollbars>
            </Layout>
            <RLayout>
                <Separator />
                <Container paddingX={"20px"}>
                    <Layout customTemplateColumns={"1fr auto"} mt={"10px"}>
                        <div />
                        <Button
                            secondary={true}
                            onClick={() => props.onClear && props.onClear()}
                        >
                            Clear
                        </Button>
                    </Layout>
                </Container>
            </RLayout>
        </SContainer>
    );
};

export default ItemsContainer

ItemsContainer.propTypes = {
    onClear: PropTypes.func,
    onClose: PropTypes.func
}
