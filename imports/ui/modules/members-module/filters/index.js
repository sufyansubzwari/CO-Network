import React from "react";
import { Layout } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import {
  BigTag,
  FilterItem,
  FiltersContainer,
  Separator
} from "./../../../components";
import { Query } from 'react-apollo';
import { CheckBoxList, Button, CheckBox } from "btech-base-forms-component";
import { UsersFieldCounts } from "../../../apollo-client/user";
import {cleanFilters, setFilters} from "../../../actions/SideBarActions";
import {connect} from "react-redux";

class MembersFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        address: "",
        location: { lat: "", lng: "" },
        fullLocation: {}
      },
      filters: {},
      profile_DOT_knowledge_DOT_lookingFor: [],
      profile_DOT_speaker_DOT_join: [{ label: "On Speaker Directory", active: false }]
    };
    this.handleScroll = this.handleScroll(this);
    this.handleClose = this.handleClose(this);
  }

  handleScroll() {}

  handleClose() {}

  addFilters(type, actives, options) {
    const obj = JSON.parse(JSON.stringify(options));
    const selected = obj.map((category, index) => {
      category["active"] = actives[index];
      return category;
    });
    const activeSelected = selected.filter(element => element.active);
    const temp = this.state.filters;
    const checked = activeSelected.map(item => ({
      label: item.label,
      value: item.label
    }));
    temp[type] = type === "profile_DOT_speaker_DOT_join" ? true : { elemMatch: { or: checked } };
    checked.length === 0 ? delete temp[type] : null;
    this.setState({[type]: selected, filters: temp }, () =>
      this.props.setFilters("members", this.state.filters)
    );
  }

  render() {
    return (
      <FiltersContainer
        onClose={() => this.props.onClose && this.props.onClose()}
      >
        <FilterItem>
          <GeoInputLocation
            required={false}
            name={"location"}
            model={this.state}
            placeholder={"Location"}
          />
          <Layout
            mt={"10px"}
            customTemplateColumns={"80px 80px 80px"}
            colGap={"10px"}
          >
            <BigTag text={"New York"} icon={"pin"} connected={false} />
            <BigTag text={"United States"} icon={"pin"} connected={true} />
            <BigTag text={"California"} icon={"pin"} connected={true} />
          </Layout>
        </FilterItem>
        <Separator />
        <FilterItem>
          <Query query={UsersFieldCounts} variables={{ field: "profile.knowledge.lookingFor" }}>
            {({ loading, error, data }) => {
              if (loading) return <div />;
              if (error) return <div>Error</div>;
              return (
                <CheckBoxList
                  placeholderText={"Seeking"}
                  options={data.usersFieldCounts.map((item,key) => ({
                    ...item,
                    label: item._id,
                    value: item._id,
                    name: item._id,
                    active: this.state.profile_DOT_knowledge_DOT_lookingFor[key] && this.state.profile_DOT_knowledge_DOT_lookingFor[key].active
                  }))}
                  getValue={selected => this.addFilters("profile_DOT_knowledge_DOT_lookingFor", selected, data.usersFieldCounts)}
                />
              );
            }}
          </Query>
        </FilterItem>
        <Separator />
        <FilterItem>
          <CheckBoxList
            options={this.state.profile_DOT_speaker_DOT_join}
            getValue={selected => this.addFilters("profile_DOT_speaker_DOT_join", selected, this.state.profile_DOT_speaker_DOT_join)}
          />
        </FilterItem>
      </FiltersContainer>
    );
  }
}

const mapStateToProps = state => {
  const {} = state;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setFilters: (type, filters) => dispatch(setFilters(type, filters)),
    cleanFilters: () => dispatch(cleanFilters())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersFilters);
