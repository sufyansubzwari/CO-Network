import React from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import ButtonMenu from "../../components/ButtonMenu/ButtonMenu";
import LineSeparator from "./LineSeparator";
import AchievementList from "./AchievementList";
import styled from "styled-components";
import { ACHIEVEMENTS_TYPES } from "./constants";

class Achievements extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      achievements:
        this.props.achievements && this.props.achievements.length
          ? this.props.achievements
          : [],
      editIndex: -1,
      menuOptions: ACHIEVEMENTS_TYPES
    };

    this.onSelectToAdd = this.onSelectToAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  notifyParent() {
    this.props.onChange && this.props.onChange(this.state.achievements);
  }

  handleChange(ach) {
    this.setState(
      {
        achievements: ach
      },
      () => this.notifyParent()
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.achievements) {
      this.setState({
        achievements: nextProps.achievements
      });
    }
  }

  onSelectToAdd(achievement, key) {
    // this.setState({ tickets: list, editIndex: list.length - 1 });

    const list = this.state.achievements;
    list.push({
      type: achievement.type,
      edit: true
    });
    this.setState({ achievements: list });
  }

  render() {
    return (
      <Container>
        <Layout rowGap={"10px"}>
          <Container mt={"10px"}>
            <Layout customTemplateColumns={"auto 1fr"}>
              <ButtonMenu
                title={"Add Achievement"}
                options={this.state.menuOptions}
                onSelect={(item, key) => this.onSelectToAdd(item, key)}
              />
              <LineSeparator />
            </Layout>
          </Container>
          {ACHIEVEMENTS_TYPES.map((item, index) => {
            const elements = this.state.achievements
              ? this.state.achievements.filter(
                  archiv => archiv.type === item.type
                )
              : [];
            return (
              <Container key={index} hide={!elements.length}>
                <AchievementList
                  data={this.state.achievements}
                  onChange={this.handleChange}
                  type={item.type}
                />
              </Container>
            );
          })}
        </Layout>
      </Container>
    );
  }
}

Achievements.defaultProps = {};

Achievements.propTypes = {
  achievements: PropTypes.array,
  onChange: PropTypes.func,
  type: PropTypes.func
};

export default Achievements;
