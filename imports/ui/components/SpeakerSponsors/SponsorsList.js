import React from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { Button, Input, Select, TextArea } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import Speaker from './Speaker';
import Sponsor from './Sponsor';
import LineSeparator from "./LineSeparator";

const SLabel = styled.div`
  font-size: 12px;
  font-family: Roboto Mono, serif;
  margin-left: 10px;
  font-weight: bold;
`;

const SContainer = styled(Container)`
  font-size: 14px;
`;

const SItemContainer = styled(Container)`
  border-radius: 3px;
`;

class SponsorsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sponsors:
        this.props.data && this.props.data.length ? this.props.data : [],
      isEditable: false
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
          sponsors:
          nextProps.data && nextProps.data.length ? nextProps.data : []
      });
    }
  }

  handleRemove(index) {
    let sta = this.state.sponsors;
    let aux = sta.splice(index, 1);

    this.setState(
      {
        sponsors: sta
      },
      () => this.notifyParent()
    );
  }
  handleDelete() {
    let arr = this.state.sponsors.filter(
      item => item.type !== this.props.type
    );
    this.setState(
      {
          sponsors: arr
      },
      () => this.notifyParent()
    );
  }
  handleSave(index) {
    let spo = this.state.sponsors;
    spo[index] = { ...spo[index], edit: false };
    this.setState(
      {
          sponsors: spo
      },
      () => this.notifyParent()
    );
  }

  handleChange(index) {
    let spo = this.state.sponsors;
    spo[index] = { ...spo[index], edit: true };
    this.props.onChange && this.props.onChange(spo);
  }

  handleAdd() {
    let list = this.state.sponsors;
    list.push({
      type: this.props.type,
      edit: true
    });
    this.setState(
      {
          sponsors: list
      },
      () => this.notifyParent()
    );
  }

  onAdd(index, label,name){
    if(label){
        let spo = this.state.sponsors;
        spo[index][name] = label;

      this.setState({
          sponsors: spo
      },
          () => this.notifyParent())
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
      <Container style={{display: elements.length ? 'block' : 'none'}} >
        {elements.length ? (
          <Layout
            customTemplateColumns={"1fr auto"}
            style={{ paddingRight: "10px" }}
          >
            <SLabel>{this.props.type}</SLabel>
            <Layout customTemplateColumns={"auto auto auto"} colGap={"5px"}>
              <Button
                secondary
                height={"auto"}
                color={"black"}
                opacity={"0.5"}
                border={"none"}
                hoverBackground={"transparent"}
                hoverColor={"initial"}
                onClick={this.handleAdd}
              >
                <MaterialIcon type={"plus-circle"} />
              </Button>
              <Button
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
              >
                <MaterialIcon type={"edit"} />
              </Button>
              <Button
                secondary
                height={"auto"}
                color={"black"}
                opacity={"0.5"}
                border={"none"}
                hoverBackground={"transparent"}
                hoverColor={"initial"}
                onClick={this.handleDelete}
              >
                <MaterialIcon type={"delete"} />
              </Button>
            </Layout>
          </Layout>
        ) : null}
        <SItemContainer padding={"10px"} background={this.props.background}>
          <Container>
            {this.state.sponsors.map(
              (item, index) =>
                item.type === this.props.type ? (
                  item.edit ? (
                    item.type === 'Speakers' ? <Speaker users={this.props.users} model={this.state.sponsors[index]} handleSave={() => this.handleSave(index)} onInvite={this.props.onInviteSpeaker} onAdd={(label,name) => this.onAdd(index,label,name)} /> :
                    item.type === 'Sponsors' ? <Sponsor users={this.props.users} model={this.state.sponsors[index]} handleSave={() => this.handleSave(index)} onInvite={this.props.onInviteSponsor} onAdd={(label,name) => this.onAdd(index,label,name)} /> : null
                ): (
                    <Layout
                      paddingY={"10px"}
                      customTemplateColumns={"1fr auto"}
                    >
                      <Container>{item.name}</Container>
                      {this.state.isEditable ? (
                        <Layout
                          customTemplateColumns={"auto auto"}
                          colGap={"5px"}
                        >
                          <Button
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
                      ) : null}
                    </Layout>
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
  maxField: "max",
};

SponsorsList.propTypes = {
  data: PropTypes.array,
  background: PropTypes.string,
  isEditable: PropTypes.bool,
  onInviteSpeaker: PropTypes.func,
  onInviteSponsor: PropTypes.func,
  users: PropTypes.func
};

export default SponsorsList;
