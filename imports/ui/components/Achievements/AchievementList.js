import React from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "btech-layout";
import styled from "styled-components";
import { Button, Input, Select, TextArea } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import ProfessionalExperience from "./ProfessionalExperience";
import AcademicBackground from "./AcademicBackground";
import AuditedCourse from "./AuditedCourse";
import Publications from "./Publications";
import Patents from "./Patents";
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

class AchievementsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      achievements:
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
        achievements:
          nextProps.data && nextProps.data.length ? nextProps.data : []
      });
    }
  }

  handleRemove(index) {
    let sta = this.state.achievements;
    let aux = sta.splice(index, 1);

    this.setState(
      {
        achievement: aux
      },
      () => this.notifyParent()
    );
  }
  handleDelete() {
    let arr = this.state.achievements.filter(
      item => item.type !== this.props.type
    );
    this.setState(
      {
        achievements: arr
      },
      () => this.notifyParent()
    );
  }
  handleSave(index) {
    let ach = this.state.achievements;
    ach[index] = { ...ach[index], edit: false };
    this.setState(
      {
        achievements: ach
      },
      () => this.notifyParent()
    );
  }

  handleChange(index) {
    let ach = this.state.achievements;
    ach[index] = { ...ach[index], edit: true };
    this.props.onChange && this.props.onChange(ach);
  }

  handleAdd() {
    let list = this.state.achievements;
    list.push({
      type: this.props.type,
      edit: true
    });
    this.setState(
      {
        achievements: list
      },
      () => this.notifyParent()
    );
  }

  onAddTags(index, tag) {
    if (tag.label && tag.label.length > 0) {
      let tags =
        this.state.achievements[index] &&
        this.state.achievements[index].category
          ? this.state.achievements[index].category
          : [];
      !tag.name ? (tag.name = tag.label) : null;
      let newTag = { ...tag, type: this.props.type };
      tags.push(newTag);
      this.state.achievements[index].category = tags;
      this.setState({ achievements: this.state.achievements }, () =>
        this.notifyParent()
      );
    }
  }

  onCloseTags(e, tag, i, index) {
    this.state.achievements[index].category.splice(i, 1);
    this.setState({ achievements: this.state.achievements }, () =>
      this.notifyParent()
    );
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.achievements);
  }

  render() {
    let elements = this.state.achievements.filter(
      item => item.type === this.props.type
    );

    let edit = elements.filter(item => item.edit === true);

    return (
      <Container style={{ display: elements.length ? "block" : "none" }}>
        {elements.length ? (
          <Layout
            customTemplateColumns={"1fr auto"}
            style={{ paddingRight: "10px" }}
          >
            <SLabel>{this.props.type}</SLabel>
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
            {this.state.achievements.map(
              (item, index) =>
                item.type === this.props.type ? (
                  item.edit ? (
                    item.type === "Academic Background" ? (
                      <AcademicBackground
                        model={this.state.achievements[index]}
                        handleSave={() => this.handleSave(index)}
                      />
                    ) : item.type === "Professional Experience" ? (
                      <ProfessionalExperience
                        model={this.state.achievements[index]}
                        handleSave={() => this.handleSave(index)}
                      />
                    ) : item.type === "Audited Courses" ? (
                      <AuditedCourse
                        model={this.state.achievements[index]}
                        handleSave={() => this.handleSave(index)}
                        onAddTags={this.onAddTags.bind(this, index)}
                        onCloseTags={(e, tag, i) =>
                          this.onCloseTags(e, tag, i, index)
                        }
                        options={[]}
                      />
                    ) : item.type === "Publications" ? (
                      <Publications
                        model={this.state.achievements[index]}
                        handleSave={() => this.handleSave(index)}
                        onAddTags={this.onAddTags.bind(this, index)}
                        onCloseTags={(e, tag, i) =>
                          this.onCloseTags(e, tag, i, index)
                        }
                        options={[]}
                      />
                    ) : item.type === "Patents" ? (
                      <Patents
                        model={this.state.achievements[index]}
                        handleSave={() => this.handleSave(index)}
                        onAddTags={this.onAddTags.bind(this, index)}
                        onCloseTags={(e, tag, i) =>
                          this.onCloseTags(e, tag, i, index)
                        }
                        options={[]}
                      />
                    ) : null
                  ) : (
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
                  )
                ) : null
            )}
          </Container>
        </SItemContainer>
      </Container>
    );
  }
}

AchievementsList.defaultProps = {
  data: [],
  background: "#E9EFF0",
  countField: "available",
  titleField: "name",
  minField: "min",
  showFields: true,
  maxField: "max",
  descriptionField: "description"
};

AchievementsList.propTypes = {
  data: PropTypes.array,
  isPaid: PropTypes.bool,
  countField: PropTypes.string,
  titleField: PropTypes.string,
  showFields: PropTypes.bool,
  minField: PropTypes.string,
  maxField: PropTypes.string,
  moneySymbol: PropTypes.string,
  descriptionField: PropTypes.string,
  background: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  isEditable: PropTypes.bool
};

export default AchievementsList;
