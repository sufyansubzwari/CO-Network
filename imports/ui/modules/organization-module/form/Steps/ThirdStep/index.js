import React from "react";
import { CheckBoxList } from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import { ACTIVELY } from "../../../../../constants";
import { GetTags } from "../../../../../apollo-client/tag";
import { Query } from "react-apollo";
import { MLTagsInput, FormMainLayout } from "../../../../../components";

class ThirdStep extends React.Component {
  constructor(props) {
    super(props);

    let data = props.data ? props.data : {};

    this.state = {
      organization: data,
      actively: ACTIVELY
    };
  }

  componentWillMount() {
    if (this.props.data && this.props.data.actively)
      this.setState({
        orgtype: ACTIVELY.map(e => {
          e["active"] = this.props.data.actively.some(
            element => e.label === element.label
          );
          return e;
        })
      });
  }

  changeActively(actives) {
    const selected = this.state.actively.map((act, index) => {
      act["active"] = actives[index];
      return act;
    });
    const activelys = selected.filter(element => element.active);
    const temp = this.state.organization;
    temp["actively"] = activelys;
    this.setState({ actively: selected, organization: temp }, () =>
      this.notifyParent()
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.organization)
      this.setState({ organization: nextProps.data });
  }

  notifyParent(model, name, value) {
    if (model && name && value) {
      let organization = this.state.organization;
      organization[name] = value;
      this.setState(
        { organization: organization },
        () =>
          this.props.onChange && this.props.onChange(this.state.organization)
      );
    } else this.props.onChange && this.props.onChange(this.state.organization);
  }

  onAddTags(name, tag) {
    if (tag.label && tag.label.length > 0) {
      let newTag = Object.assign({}, tag);
      let tags = this.state.organization[name];
      !newTag.name ? (newTag.name = newTag.label) : null;
      newTag.type = "OrgDesc";
      tags.push(newTag);
      this.state.organization[name] = tags;
      this.setState({ organization: this.state.organization }, () =>
        this.notifyParent()
      );
    }
  }

  onCloseTags(e, tag, index, name) {
    this.state.organization[name].splice(index, 1);
    this.setState({ organization: this.state.organization }, () =>
      this.notifyParent()
    );
  }

  render() {
    return (
      <FormMainLayout>
        <Container>
          <CheckBoxList
            placeholderText={"Does your organization actively..."}
            options={this.state.actively}
            checkboxVerticalSeparation={"10px"}
            checkboxSize={"15px"}
            getValue={actives => this.changeActively(actives)}
          />
        </Container>
        <Container>
          <Query query={GetTags} variables={{ tags: { type: "OrgDesc" } }}>
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div>Error</div>;
              return (
                <Container mt={"25px"}>
                  <MLTagsInput
                    requiered={true}
                    placeholderText={
                      "Tags that best describe your organization"
                    }
                    getAddedOptions={this.onAddTags.bind(this, "description")}
                    getNewAddedOptions={this.onAddTags.bind(
                      this,
                      "description"
                    )}
                    options={data.tags}
                    model={{ others: [] }}
                    name={"others"}
                    tags={
                      this.state.organization.description &&
                      this.state.organization.description.length
                        ? this.state.organization.description.map(item => ({
                            active: true,
                            useIcon: true,
                            levelColor: item.levelColor || "",
                            icon: item.icon || "",
                            level: item.level || "",
                            ...item,
                            showOptions: !item.levelColor
                          }))
                        : []
                    }
                    onCloseTags={(e, tag, index) =>
                      this.onCloseTags(e, tag, index, "description")
                    }
                  />
                </Container>
              );
            }}
          </Query>
        </Container>
      </FormMainLayout>
    );
  }
}

export default ThirdStep;
