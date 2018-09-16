import React from 'react';
import {WizardStepForm, Input, CheckBoxList, SocialButton} from 'btech-base-forms-component';
import {GeoInputLocation} from "btech-location";
import {Container, Layout} from 'btech-layout';

import {ORGANIZATION_TYPE, EMAIL_REGEX, PHONE_REGEX} from "../../constants/constants";
import {COMMUNITYEVENTCATEGORIES} from "../../../../event-module/form/constants/community-event-categories";

class FirstStep extends React.Component {

  constructor(props) {
    super(props)

    let data = props.data ? props.data : {}

    this.state = {
      organization: data,
      orgType: ORGANIZATION_TYPE
    }

  }

  componentWillMount() {
    if (this.props.data && !this.props.data.place) {
      let organization = this.props.data;
      organization.place = {
        location: {
          address: "",
          location: {lng: "", lat: ""}
        }
      };
      this.setState({organization: organization});
    }
    if (this.props.data && this.props.data.info.orgType)
      this.setState({
        orgType: ORGANIZATION_TYPE.map(e => {
          e["active"] = this.props.data.info.orgType.some(
            element => e.label === element.label
          );
          return e;
        })
      });
  }

  changeOrgTypes(actives) {
    const selected = this.state.orgType.map((org, index) => {
      org["active"] = actives[index];
      return org;
    });
    const orgstype = selected.filter(element => element.active);
    const temp = this.state.organization;
    temp["info"]["orgType"] = orgstype;
    this.setState({orgType: selected, organization: temp}, () =>
      this.notifyParent()
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.organization)
      this.setState({organization: nextProps.data});
  }

  notifyParent(section, model, name, value) {
    if (model && name && value) {
      let organization = this.state.organization;
      organization[section][name] = value;
      this.setState(
        {organization: organization},
        () => this.props.onChange && this.props.onChange(this.state.organization)
      );
    } else this.props.onChange && this.props.onChange(this.state.organization);
  }

  notifyParentLocation(model, name, value) {
    if (model && name && value) {
      let organization = this.state.organization;
      organization.place[name] = value;
      this.setState({organization: organization}, () => this.props.onChange && this.props.onChange(this.state.organization));
    }
    else
      this.props.onChange && this.props.onChange(this.state.organization);
  }

  render() {

    return (

      <Layout rowGap={'25px'}>
        <Layout templateColumns={2} colGap={'20px'}>
          <Input name={'name'} model={this.state.organization.info} placeholderText={'Organization Name'}
                 getValue={this.notifyParent.bind(this, "info")}/>
          <GeoInputLocation
            model={this.state.organization.place}
            name={'location'}
            placeholder={"Location"}
            isGeoLocationAvailable={true}
            onChange={(model, name, value) => this.notifyParentLocation(model, name, value)}
          />
        </Layout>
        <CheckBoxList
          placeholderText={'Organization Type'}
          options={this.state.orgType}
          columns={2}
          checkboxVerticalSeparation={'10px'}
          checkboxSize={'15px'}
          getValue={actives => this.changeOrgTypes(actives)}
        />
        <Layout templateColumns={2} colGap={'20px'}>
          <Input name={'email'} model={this.state.organization.contact} placeholderText={'Verification Email'}
                 getValue={this.notifyParent.bind(this, "contact")} validate={EMAIL_REGEX}/>
          <Input name={'phone'} model={this.state.organization.contact} placeholderText={'Contact Number'}
                 getValue={this.notifyParent.bind(this, "contact")} validate={PHONE_REGEX}/>
        </Layout>
        <Layout templateColumns={4} colGap={'10px'} height={'90px'}>
          <SocialButton
            social={'github'}
            connected={!!this.state.organization.social.github}
            data={this.state.organization.social.github}
            onClick={() => console.log('trying to log for github')}
          />
          <SocialButton
            social={'google'}
            data={this.state.organization.social.google}
            onClick={this.handleGoogle}
            onPlus={() => console.log('plus')}
            connected={!!this.state.organization.social.google}
          />
          <SocialButton
            social={'facebook'}
            data={this.state.organization.social.facebook}
            onClick={() => console.log('trying to log for facebook')}
            fields={['account']}
            connected={!!this.state.organization.social.facebook}
          />
          <SocialButton
            social={'twitter'}
            data={this.state.organization.social.twitter}
            onClick={() => console.log('trying to log for twitter')}
            loading={false}
            connected={!!this.state.organization.social.twitter}
          />
        </Layout>
      </Layout>
    );
  }
}

export default FirstStep