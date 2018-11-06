import React from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import { Button } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
import ProfessionalExperience from "./ProfessionalExperience";
import AcademicBackground from "./AcademicBackground";
import AuditedCourse from "./AuditedCourse";
import Publications from "./Publications";
import Patents from "./Patents";
import {ConfirmPopup} from "../../services";

const SLabel = styled.div`
  font-size: 12px;
  font-family: Roboto Mono, serif;
  font-weight: bold;
`;

const SItemContainer = styled(Container)`
  border-radius: 3px;
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

class AchievementsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      achievements:
        this.props.data && this.props.data.length ? this.props.data : [],
      achievementsCopy:
        this.props.data && this.props.data.length ? this.props.data : [],
      isEditable: false
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        achievements:
          nextProps.data && nextProps.data.length ? nextProps.data : [],
        achievementsCopy:
          nextProps.data && nextProps.data.length
            ? JSON.parse(JSON.stringify(nextProps.data))
            : []
      });
    }
  }

  handleCancel = index => {
    let ach = this.state.achievementsCopy;
    Object.keys(ach[index]).forEach(
      key => !ach[index][key] && delete ach[index][key]
    );
    Object.keys(ach[index]).filter(item => item !== "type" && item !== "edit")
      .length === 0
      ? ach.splice(index, 1)
      : (ach[index] = { ...ach[index], edit: false });
    this.setState(
      {
        achievements: ach
      },
      () => this.notifyParent()
    );
  };

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
      this.setState({ achievements: this.state.achievements });
    }
  }

  onCloseTags(e, tag, i, index) {
    this.state.achievements[index].category.splice(i, 1);
    this.setState({ achievements: this.state.achievements });
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.achievements);
  }

  render() {
    let elements = this.state.achievements.filter(
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
        <SItemContainer paddingX={"10px"} background={this.props.background}>
          <Container>
            {this.state.achievements.map(
              (item, index) =>
                item.type === this.props.type ? (
                  item.edit ? (
                    item.type === "Academic Background" ? (
                      <AcademicBackground
                        key={index}
                        model={this.state.achievements[index]}
                        handleSave={() => this.handleSave(index)}
                        handleCancel={() => this.handleCancel(index)}
                      />
                    ) : item.type === "Professional Experience" ? (
                      <ProfessionalExperience
                        key={index}
                        model={this.state.achievements[index]}
                        handleSave={() => this.handleSave(index)}
                        handleCancel={() => this.handleCancel(index)}
                      />
                    ) : item.type === "Audited Courses" ? (
                      <AuditedCourse
                        key={index}
                        model={this.state.achievements[index]}
                        handleSave={() => this.handleSave(index)}
                        onAddTags={this.onAddTags.bind(this, index)}
                        onCloseTags={(e, tag, i) =>
                          this.onCloseTags(e, tag, i, index)
                        }
                        options={[]}
                        handleCancel={() => this.handleCancel(index)}
                      />
                    ) : item.type === "Publications" ? (
                      <Publications
                        key={index}
                        model={this.state.achievements[index]}
                        handleSave={() => this.handleSave(index)}
                        onAddTags={this.onAddTags.bind(this, index)}
                        onCloseTags={(e, tag, i) =>
                          this.onCloseTags(e, tag, i, index)
                        }
                        options={[]}
                        handleCancel={() => this.handleCancel(index)}
                      />
                    ) : item.type === "Patents" ? (
                      <Patents
                        key={index}
                        model={this.state.achievements[index]}
                        handleSave={() => this.handleSave(index)}
                        onAddTags={this.onAddTags.bind(this, index)}
                        onCloseTags={(e, tag, i) =>
                          this.onCloseTags(e, tag, i, index)
                        }
                        options={[]}
                        handleCancel={() => this.handleCancel(index)}
                      />
                    ) : null
                  ) : (
                    <SItem
                      key={index}
                      paddingY={"10px"}
                      customTemplateColumns={"1fr auto"}
                    >
                      <Container>{item.name}</Container>
                      <Layout
                        className={"buttons"}
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
                          onClick={() => ConfirmPopup.confirmPopup(() =>  this.handleRemove(index),() => console.log(""),{title: `Remove this ${item.type}`, message: `Are you sure to want delete this ${item.type}`})}
                          style={{ fontSize: "14px" }}
                          title={"Delete"}
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
