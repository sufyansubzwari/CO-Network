import React from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import { Button } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import WorkItem from "./WorkItem";

const SItemContainer = styled(Container)`
  border-radius: 3px;
`;

const SWorkItem = styled(Layout)`
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

class WorkList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      experience:
        this.props.data && this.props.data.length ? this.props.data : [],
      experienceCopy:
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
          nextProps.data && nextProps.data.length ? nextProps.data : [],
        experienceCopy:
          nextProps.data && nextProps.data.length
            ? JSON.parse(JSON.stringify(nextProps.data))
            : []
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

  handleCancel = index => {
    let xp = this.state.experienceCopy;
    Object.keys(xp[index]).forEach(
      key => !xp[index][key] && delete xp[index][key]
    );
    Object.keys(xp[index]).filter(item => item !== "type" && item !== "edit")
      .length === 0
      ? xp.splice(index, 1)
      : (xp[index] = { ...xp[index], edit: false });
    this.setState(
      {
        experience: xp
      },
      () => this.notifyParent()
    );
  };

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
    let edit =
      this.state.experience &&
      this.state.experience.length &&
      this.state.experience.filter(item => item.edit === true);

    return (
      <Container
        style={{ display: this.state.experience.length ? "block" : "none" }}
      >
        <SItemContainer paddingX={"10px"} background={this.props.background}>
          <Container>
            {this.state.experience.map(
              (item, index) =>
                item.edit ? (
                  <WorkItem
                    model={this.state.experience[index]}
                    handleSave={() => this.handleSave(index)}
                    handleCancel={() => this.handleCancel(index)}
                  />
                ) : (
                  <SWorkItem
                    paddingY={"10px"}
                    customTemplateColumns={"1fr auto"}
                  >
                    <Container>{item.employer}</Container>
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
                        title={"Edit"}
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
                        title={"Delete"}
                      >
                        <MaterialIcon type={"delete"} />
                      </Button>
                    </Layout>
                  </SWorkItem>
                )
            )}
          </Container>
        </SItemContainer>
      </Container>
    );
  }
}

WorkList.defaultProps = {
  data: [],
  background: "#E9EFF0"
};

WorkList.propTypes = {
  data: PropTypes.array,
  background: PropTypes.string,
  onAdd: PropTypes.func,
  isEditable: PropTypes.bool
};

export default WorkList;
