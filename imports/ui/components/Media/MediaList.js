import React from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import { Button } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import MediaItem from "./MediaItem";
import { UploadToS3FromClient } from "../../services";

const SMediaItem = styled(Layout)`
  .buttons {
    opacity: 1;
    transition: all 200ms ease-out;
  }

  :hover {
    .buttons {
      opacity: 1;
    }
  }

  @media (min-width: 62em) {
    .buttons {
      opacity: 0;
    }
  }
`;

const SItemContainer = styled(Container)`
  border-radius: 3px;
`;

class MediaList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      media: this.props.data && this.props.data.length ? this.props.data : []
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        media: nextProps.data && nextProps.data.length ? nextProps.data : []
      });
    }
  }

  handleRemove(index) {
    let sta = this.state.media;
    let aux = sta.splice(index, 1);

    this.setState(
      {
        media: sta
      },
      () => this.notifyParent()
    );
  }

  handleClose(pos) {
    let sta = this.state.media;
    sta[pos]["files"] = "";
    this.setState({
      media: sta
    });
  }

  async handleUpload(files, index) {
    if (files) {
      if (files.size <= 10 * 1024 * 1024) {
        let media = this.state.media;
        let result = await UploadToS3FromClient.uploadFromClient(files);
        if (result !== -1)
          media[index]["files"] = { name: files.name, link: result };
        this.setState({ media: media }, () => this.notifyParent());
      } else alert("File shouldn't be bigger than 10Mb"); // todo: integrate with the notification alerts
    }
  }

  handleDelete() {
    let arr = this.state.media.filter(item => item.type !== this.props.type);
    this.setState(
      {
        media: arr
      },
      () => this.notifyParent()
    );
  }

  handleSave(index) {
    let med = this.state.media;
    med[index] = { ...med[index], edit: false };
    this.setState(
      {
        media: med
      },
      () => this.notifyParent()
    );
  }

  handleChange(index) {
    let med = this.state.media;
    med[index] = { ...med[index], edit: true };
    this.props.onChange && this.props.onChange(med);
  }

  handleAdd() {
    let list = this.state.media;
    list.push({
      edit: true
    });
    this.setState(
      {
        media: list
      },
      () => this.notifyParent()
    );
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.media);
  }

  render() {
    return (
      <Container
        style={{ display: this.state.media.length ? "block" : "none" }}
      >
        <SItemContainer paddingX={"10px"} background={this.props.background}>
          <Container>
            {this.state.media.map(
              (item, index) =>
                item.edit ? (
                  <MediaItem
                    model={this.state.media[index]}
                    handleSave={() => this.handleSave(index)}
                    handleUpload={file => this.handleUpload(file, index)}
                    onClose={() => this.handleClose(index)}
                  />
                ) : (
                  <SMediaItem
                    paddingY={"10px"}
                    customTemplateColumns={"1fr auto"}
                  >
                    <Container>{item.title}</Container>
                    <Layout
                      customTemplateColumns={"auto auto"}
                      colGap={"5px"}
                      className={"buttons"}
                    >
                      <Button
                        type={"button"}
                        secondary
                        height={"auto"}
                        color={"black"}
                        opacity={"0.5"}
                        border={"none"}
                        hoverBackground={"transparent"}
                        hoverColor={"initial"}
                        onClick={event => {
                          event.preventDefault();
                          this.handleChange(index);
                        }}
                        style={{ fontSize: "14px" }}
                      >
                        <MaterialIcon type={"edit"} />
                      </Button>
                      <Button
                        type={"button"}
                        secondary
                        height={"auto"}
                        color={"black"}
                        opacity={"0.5"}
                        border={"none"}
                        hoverBackground={"transparent"}
                        hoverColor={"initial"}
                        onClick={() => this.handleRemove(index)}
                        style={{ fontSize: "14px" }}
                      >
                        <MaterialIcon type={"delete"} />
                      </Button>
                    </Layout>
                  </SMediaItem>
                )
            )}
          </Container>
        </SItemContainer>
      </Container>
    );
  }
}

MediaList.defaultProps = {
  data: [],
  background: "#E9EFF0"
};

MediaList.propTypes = {
  data: PropTypes.array,
  background: PropTypes.string,
  onAdd: PropTypes.func
};

export default MediaList;
