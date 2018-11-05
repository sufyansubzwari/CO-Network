import React from "react";
import { GetTags } from "../../apollo-client/tag";
import { Query } from "react-apollo";
import SelectTag from "../SelectTag/SelectTag";
import PropsTypes from "prop-types";

class IndustrySector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: props.tags && props.tags.length ? props.tags : []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tags) {
      this.setState({
        tags: nextProps.tags
      });
    }
  }

  compare(a, b){
    var nameA = a.label.toUpperCase(); // ignore upper and lowercase
    var nameB = b.label.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  }

  render() {
    return (
      <Query query={GetTags} variables={{ tags: { type: "INDUSTRY" } }}>
        {({ loading, error, data }) => {
          if (loading) return <div />;
          if (error) return <div/>
          const tags = data.tags && JSON.parse(JSON.stringify(data.tags));
          return (
            <SelectTag
              placeholderText={"Industry | Sector"}
              tags={this.state.tags.map(tag => ({
                ...tag,
                active: true
              }))}
              selectOptions={tags.sort((a,b) => this.compare(a, b))}
              getTags={obj => this.props.handleTags(obj)}
              model={{ obj: [] }}
              name={"obj"}
              tagsCloseable={true}
              hideValue={true}
            />
          );
        }}
      </Query>
    );
  }
}

export default IndustrySector;

IndustrySector.defaultProps = {
  inputValue: ""
};

IndustrySector.propTypes = {
  tags: PropsTypes.array,
  handleTags: PropsTypes.func
};
