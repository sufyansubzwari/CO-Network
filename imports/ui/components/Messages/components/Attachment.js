import React from "react";
import { Container, Layout, mixins } from "btech-layout";
import PropTypes from "prop-types";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";
import { Utils } from "../../../services";

const Attach = styled(Container)`
  border-top: ${props => (props.hideBorder ? null : "1px solid #E4E4E4")};
`;

const SLayout = styled(Layout)`
  padding: 7px 10px;

  ${mixins.media.desktop`
    padding: 7px 45px;
  `};
`;

const File = styled.span`
  color: #000000;
  font-family: "Roboto Mono";
  font-size: 12px;
  opacity: ${props => (props.loading ? "0.5" : "1")};
`;

const Icon = styled.span`
  font-size: 18px;
  line-height: 24px;
  cursor: pointer;
`;

const Size = styled.span`
  opacity: 0.5;
  color: #000000;
  font-family: "Roboto Mono";
  font-size: 12px;
`;

const FlexContainer = styled(Container)`
  display: flex;
  align-items: center;
`;

const SImage = styled.div`
  border: 1px solid #bfbfbf;
  border-radius: 4px;
  background: url(${props => (props.src ? props.src : null)}) no-repeat center;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const Attachment = props => {
  return (
    <Attach hideBorder={props.hideBorder}>
      <SLayout
        customTemplateColumns={
          props.isImage ? "40px auto auto 1fr auto" : "auto auto 1fr auto"
        }
        colGap={"10px"}
      >
        {props.isImage ? (
          <Container>
            <SImage src={props.link} />
          </Container>
        ) : null}
        <FlexContainer>
          <File>{props.filename}</File>
        </FlexContainer>
        <FlexContainer>
          <Size>{Utils.formatSize(props.size)}</Size>
        </FlexContainer>
        <Container />
        <FlexContainer>
          <Icon
            onClick={() =>
              props.loading ? null : props.onClose && props.onClose()
            }
          >
            <MaterialIcon
              type={props.loading ? "chart-donut" : "close"}
              spin={props.loading}
            />
          </Icon>
        </FlexContainer>
      </SLayout>
    </Attach>
  );
};

Attachment.propTypes = {
  filename: PropTypes.string,
  size: PropTypes.number,
  onClose: PropTypes.func,
  loading: PropTypes.bool,
  link: PropTypes.string,
  isImage: PropTypes.bool,
  hideBorder: PropTypes.bool
};

export default Attachment;
