import React from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { Button, Input, Select, TextArea } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import MediaItem from "./MediaItem"

const SLabel = styled.div`
  font-size: 12px;
  font-family: Roboto Mono, serif;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const SContainer = styled(Container)`
  font-size: 14px;
`;

const SItemContainer = styled(Container)`
  border-radius: 3px;
`;

class MediaList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      media:
        this.props.data && this.props.data.length ? this.props.data : [],
      isEditable: false
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
        media:
          nextProps.data && nextProps.data.length ? nextProps.data : []
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

  handleClose(pos){
      let sta = this.state.media;
      sta[pos]['files'] = '';
      this.setState({
              media: sta
          },
          () => this.notifyParent())
  }

  handleUpload(file, index) {
    if(file){
      let media = this.state.media;
      let files = this.state.media.files
          ? this.state.media.files
          : '';
      if (file.length) {
          files = file[0].name
      } else files =  file.name;
      media[index]["files"] = files;
      this.setState(
          {
              media: media
          },
          () => this.notifyParent()
      );
    }
  }

    handleDelete() {
    let arr = this.state.media.filter(
      item => item.type !== this.props.type
    );
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
    let edit = this.state.media && this.state.media.length && this.state.media.filter(item => item.edit === true);

    return (
      <Container style={{ display: this.state.media.length ? "block" : "none" }}>
        {this.state.media.length ? (
          <Layout
            customTemplateColumns={"1fr auto"}
            style={{ paddingRight: "10px" }}
            mb={'5px'}
          >
            <SLabel>Media</SLabel>
            {edit.length === 0 ? (
              <Layout customTemplateColumns={"auto auto auto"}>
                <Button
                  type={"button"}
                  secondary
                  height={"auto"}
                  color={"black"}
                  opacity={"0.5"}
                  border={"none"}
                  hoverBackground={"transparent"}
                  hoverColor={"initial"}
                  onClick={this.handleAdd}
                  style={{ fontSize: "14px" }}
                >
                  <MaterialIcon type={"plus-circle"} />
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
                  onClick={() =>
                    this.setState({ isEditable: !this.state.isEditable })
                  }
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
                  onClick={this.handleDelete}
                  style={{ fontSize: "14px" }}
                >
                  <MaterialIcon type={"delete"} />
                </Button>
              </Layout>
            ) : null}
          </Layout>
        ) : null}
        <SItemContainer paddingX={"10px"} background={this.props.background}>
          <Container>
            {this.state.media.map(
              (item, index) =>
                  item.edit ? (
                      <MediaItem
                          model={this.state.media[index]}
                          handleSave={() => this.handleSave(index)}
                          handleUpload={(file) => this.handleUpload(file, index)}
                          onClose ={ () => this.handleClose(index) }
                      />
                  ) : (
                    <Layout
                      paddingY={"10px"}
                      customTemplateColumns={"1fr auto"}
                    >
                      <Container>{item.title}</Container>
                      {this.state.isEditable ? (
                        <Layout
                          customTemplateColumns={"auto auto"}
                          colGap={"5px"}
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
                      ) : null}
                    </Layout>
                  ))
            }
          </Container>
        </SItemContainer>
      </Container>
    );
  }
}

MediaList.defaultProps = {
  data: [],
  background: "#E9EFF0",
};

MediaList.propTypes = {
  data: PropTypes.array,
  background: PropTypes.string,
  onAdd: PropTypes.func,
  isEditable: PropTypes.bool
};

export default MediaList;
