import React from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import { Button } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import Speaker from "./Speaker";
import Sponsor from "./Sponsor";

const SLabel = styled.div`
  font-size: 12px;
  font-family: Roboto Mono, serif;
  font-weight: bold;
`;

const SContainer = styled(Container)`
  font-size: 14px;
`;

const SItemContainer = styled(Container)`
  border-radius: 3px;
  margin-top: 5px;
`;

const SItem = styled(Layout)`
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

class SponsorsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sponsors:
        this.props.data && this.props.data.length ? this.props.data : [],
      sponsorsCopy:
        this.props.data && this.props.data.length ? this.props.data : [],
      isEditable: false,
      editingChild: false
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        sponsors: nextProps.data && nextProps.data.length ? nextProps.data : [],
        sponsorsCopy:
          nextProps.data && nextProps.data.length
            ? JSON.parse(JSON.stringify(nextProps.data))
            : []
      });
    }
  }

  handleRemove(index) {
    let sta = this.state.sponsors;
    let aux = sta.splice(index, 1);
    this.setState({ sponsors: sta }, () => this.notifyParent());
  }

  handleDelete() {
    let arr = this.state.sponsors.filter(item => item.type !== this.props.type);
    this.setState({ sponsors: arr }, () => this.notifyParent());
  }

  handleSave(index) {
    let spo = this.state.sponsors;
    spo[index] = { ...spo[index], edit: false };
    this.setState({ sponsors: spo, editingChild: false }, () =>
      this.notifyParent()
    );
  }

  handleCancel = index => {
    let sponsors = this.state.sponsorsCopy;
    Object.keys(sponsors[index]).forEach(
      key => !sponsors[index][key] && delete sponsors[index][key]
    );
    Object.keys(sponsors[index]).filter(
      item => item !== "type" && item !== "edit"
    ).length === 0
      ? sponsors.splice(index, 1)
      : (sponsors[index] = { ...sponsors[index], edit: false });
    this.setState(
      {
        sponsors: sponsors,
        editingChild: false
      },
      () => this.notifyParent()
    );
  };

  handleChange(index) {
    let spo = this.state.sponsors;
    spo[index] = { ...spo[index], edit: true };
    this.setState({ editingChild: true });
    this.props.onChange && this.props.onChange(spo);
  }

  handleAdd() {
    let list = this.state.sponsors;
    list.push({
      type: this.props.type,
      edit: true
    });
    this.setState({ sponsors: list, editingChild: true }, () =>
      this.notifyParent()
    );
  }

  onAdd(index, label, name) {
    if (label) {
      let spo = this.state.sponsors;
      spo[index][name] = label;
      this.setState({ sponsors: spo, editingChild: false });
    }
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.sponsors);
  }

  render() {
    let elements = this.state.sponsors.filter(
      item => item.type === this.props.type
    );

    return (
      <Container style={{ display: elements.length ? "block" : "none" }}>
        {elements.length ? (
          <Layout
            customTemplateColumns={"1fr"}
            style={{ paddingRight: "10px" }}
            mb={"5px"}
          >
            <SLabel>{this.props.type}</SLabel>
          </Layout>
        ) : null}
        <SItemContainer background={this.props.background}>
          <Container>
            {this.state.sponsors.map(
              (item, index) =>
                item.type === this.props.type ? (
                  item.edit ? (
                    item.type === "Speakers" ? (
                      <Speaker
                        key={index}
                        users={this.props.users}
                        model={this.state.sponsors[index]}
                        handleSave={() => this.handleSave(index)}
                        onAdd={(label, name) => this.onAdd(index, label, name)}
                        handleCancel={() => this.handleCancel(index)}
                      />
                    ) : item.type === "Sponsors" ? (
                      <Sponsor
                        key={index}
                        users={this.props.users}
                        model={this.state.sponsors[index]}
                        handleSave={() => this.handleSave(index)}
                        onAdd={(label, name) => this.onAdd(index, label, name)}
                        handleCancel={() => this.handleCancel(index)}
                      />
                    ) : null
                  ) : (
                    <SItem
                      padding={"10px"}
                      customTemplateColumns={"1fr auto"}
                      key={index}
                    >
                      <Container>{item.name}</Container>
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
                          onClick={() => this.handleChange(index)}
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
                        >
                          <MaterialIcon type={"delete"} />
                        </Button>
                      </Layout>
                    </SItem>
                  )
                ) : null
            )}
          </Container>
        </SItemContainer>
      </Container>
    );
  }
}

SponsorsList.defaultProps = {
  data: [],
  background: "#E9EFF0",
  countField: "available",
  minField: "min",
  maxField: "max"
};

SponsorsList.propTypes = {
  data: PropTypes.array,
  background: PropTypes.string,
  isEditable: PropTypes.bool,
  onInviteSpeaker: PropTypes.func, // todo: support invite a user not in the system
  onInviteSponsor: PropTypes.func, // todo: support invite a user not in the system
  users: PropTypes.func
};

export default SponsorsList;
