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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: ${props => (props.loading ? "0.5" : "1")};
`;

const Icon = styled.span`
  font-size: 18px;
  line-height: 24px;
  cursor: ${props => (!props.loading ? "pointer" : null)};
`;

const Size = styled.span`
  opacity: 0.5;
  color: #000000;
  font-family: "Roboto Mono";
  font-size: 12px;
`;

const SImage = styled.div`
  border: 1px solid #bfbfbf;
  border-radius: 4px;
  background: url(${props => (props.src ? props.src : null)}) no-repeat center;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

handleImage = image => {
  return image
    ? image.startsWith("http") || image.startsWith("data:")
      ? image
      : Utils.getImageFromS3(image, "chat")
    : null;
};

const Attachment = props => {
  return (
    <Attach hideBorder={props.hideBorder}>
      <SLayout
        customTemplateColumns={
          props.isImage ? "40px 1fr auto auto" : "1fr auto auto"
        }
        colGap={"10px"}
      >
        {props.isImage ? (
          <Container>
            <SImage src={this.handleImage(props.link)} />
          </Container>
        ) : null}
        <Container cutText>
          <File>{props.filename}</File>
        </Container>
        <Container>
          <Size>{Utils.formatSize(props.size)}</Size>
        </Container>
        <Container>
          <Icon
            onClick={() =>
              props.loading ? null : props.onClose && props.onClose()
            }
            loading={props.loading}
          >
            <MaterialIcon
              type={props.loading ? "chart-donut" : "close"}
              spin={props.loading}
            />
          </Icon>
        </Container>
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
