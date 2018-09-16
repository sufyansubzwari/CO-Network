import React from 'react';
import {Input, CheckBoxList, SocialButton, Steeper, PlanCard} from 'btech-base-forms-component';
// import {GeoInputLocation} from "btech-location";
import {Container, Layout} from 'btech-layout';

import {ORGANIZATION_TYPE,EMAIL_REGEX,PHONE_REGEX} from "../../constants/constants";

class SeventhStep extends React.Component {

    constructor(props) {
        super(props)

        let data = props.data ? props.data : {}

        this.state = {
            organization: data,
        }

    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.state.organization)
            this.setState({organization: nextProps.data});
    }

    notifyParent(model, name, value) {
        if (model && name && value) {
            let organization = this.state.organization;
            organization[name] = value;
            this.setState(
                {organization: organization},
                () => this.props.onChange && this.props.onChange(this.state.organization)
            );
        } else this.props.onChange && this.props.onChange(this.state.organization);
    }

    render() {

        return (

            <Layout rowGap={'25px'}>
                <Container style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Steeper steps={['Pick plan', 'Check out', 'Pay']} step={0}
                         getClicked={(index) => console.log('the radio clicked is: ' + index)} />
                </Container>
                <Layout templateColumns={3} colGap={'10px'} >
                    <PlanCard
                        name={'Org Profile'}
                        price={'Free'}
                        priceDescription={'monthly'}
                        profileType={'Basic Profile'}
                        info={[
                            '10 Downloads',
                            '25 Uploads',
                            '2 Features'
                        ]}
                        active={this.state.organization.plan === 0}
                    />
                    <PlanCard
                        name={'Events'}
                        price={'4%'}
                        priceDescription={'of ticket price'}
                        profileType={'Basic Profile'}
                        info={['10 Downloads', '25 Uploads', '2 Features']}
                        active={false}
                        onClick={() => console.log('plancard clicked')}
                    />
                    <PlanCard
                        name={'Recruitment'}
                        price={'$129.99'}
                        priceDescription={'yearly'}
                        profileType={'Basic Profile'}
                        info={['10 Downloads', '25 Uploads', '2 Features']}
                        active={false}
                        loading={this.state.loading}
                    />
                </Layout>
            </Layout>
        );
    }
}

export default SeventhStep