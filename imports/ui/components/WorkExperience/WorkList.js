import React from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { Button, Input, Select, TextArea } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import WorkItem from "./WorkItem"

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

class WorkList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      experience:
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
        experience:
          nextProps.data && nextProps.data.length ? nextProps.data : []
      });
    }
  }

  handleRemove(index) {
    let sta = this.state.experience;
    let aux = sta.splice(index, 1);

    this.setState(
      {
        experience: sta
      },
      () => this.notifyParent()
    );
  }

    handleDelete() {
    let arr = this.state.experience.filter(
      item => item.type !== this.props.type
    );
    this.setState(
      {
        experience: arr
      },
      () => this.notifyParent()
    );
  }
  handleSave(index) {
    let exp = this.state.experience;
      exp[index] = { ...exp[index], edit: false };
    this.setState(
      {
        experience: exp
      },
      () => this.notifyParent()
    );
  }

  handleChange(index) {
    let exp = this.state.experience;
      exp[index] = { ...exp[index], edit: true };
    this.props.onChange && this.props.onChange(exp);
  }

  handleAdd() {
    let list = this.state.experience;
    list.push({
      edit: true
    });
    this.setState(
      {
        experience: list
      },
      () => this.notifyParent()
    );
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.experience);
  }

  render() {
    let edit = this.state.experience && this.state.experience.length && this.state.experience.filter(item => item.edit === true);

    return (
      <Container style={{ display: this.state.experience.length ? "block" : "none" }}>
        {this.state.experience.length ? (
          <Layout
            customTemplateColumns={"1fr auto"}
            style={{ paddingRight: "10px" }}
            mb={'5px'}
          >
            <SLabel>Work Experience</SLabel>
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
            {this.state.experience.map(
              (item, index) =>
                  item.edit ? (
                      <WorkItem
                          model={this.state.experience[index]}
                          handleSave={() => this.handleSave(index)}
                          handleRemove={() => this.handleRemove(index)}
                      />
                  ) : (
                    <Layout
                      paddingY={"10px"}
                      customTemplateColumns={"1fr auto"}
                    >
                      <Container>{item.employer}</Container>
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

WorkList.defaultProps = {
  data: [],
  background: "#E9EFF0",
};

WorkList.propTypes = {
  data: PropTypes.array,
  background: PropTypes.string,
  onAdd: PropTypes.func,
  isEditable: PropTypes.bool
};

export default WorkList;
