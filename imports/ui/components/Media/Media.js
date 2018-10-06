import React from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import { Button } from "btech-base-forms-component";
import LineSeparator from "./LineSeparator";
import MediaList from "./MediaList";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";

const SLabel = styled.div`
  font-size: 12px;
  margin: 0 5px;
  cursor: pointer;
`;

const SButtonContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Media extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      media:
        this.props.media && this.props.media.length
          ? this.props.media
          : [{ edit: true }],
      menuOptions: [{ label: "Media", value: "Media" }]
    };

    this.onSelectToAdd = this.onSelectToAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.media);
  }

  handleChange(med) {
    this.setState(
      {
        media: med
      },
      () => this.notifyParent()
    );
  }

  onSelectToAdd(media, key) {
    const list = this.state.media;
    list.push({
      type: media.type,
      edit: true
    });
    this.setState({ media: list });
  }

  onAdd() {
    const list = this.state.media;
    list.push({ edit: true });
    this.setState({ media: list });
  }

  render() {
    return (
      <Container>
        <Layout rowGap={"10px"}>
          <Container mt={"10px"}>
            <Layout customTemplateColumns={"auto 1fr"}>
              <SButtonContainer onClick={() => this.onAdd()}>
                <MaterialIcon type={"plus-circle"} />
                <SLabel>Media Files</SLabel>
              </SButtonContainer>
              <LineSeparator />
            </Layout>
          </Container>
          <Container>
            <MediaList data={this.state.media} onChange={this.handleChange} />
          </Container>
        </Layout>
      </Container>
    );
  }
}

Media.defaultProps = {};

Media.propTypes = {
  products: PropTypes.array,
  onChange: PropTypes.func,
  type: PropTypes.func
};

export default Media;
