import React from "react";
import { Layout } from "btech-layout";
import Media from "../../../../../components/Media/Media"


class SixthStep extends React.Component {
  constructor(props) {
    super(props);

    let data = props.data ? props.data : {};

    this.state = {
      organization: data
    };

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.organization)
      this.setState({ organization: nextProps.data });
  }

    handleChange(media) {
        this.setState(
            {
                organization: {
                    ...this.state.organization,
                    media: media
                }
            },
            () => this.notifyParent()
        );
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

  render() {
    return <Layout rowGap={"25px"}><Media
        onChange={this.handleChange}
        media={this.state.organization.media}
    /></Layout>;
  }
}

export default SixthStep;
