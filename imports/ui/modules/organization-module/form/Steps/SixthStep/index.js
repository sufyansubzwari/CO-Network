import React from 'react';
import {TextArea, Input, UploadFileButton,} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';

class SixthStep extends React.Component {

    constructor(props) {
        super(props)

        let data = props.data ? props.data : {}

        this.state = {
            organization: data
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

            <Layout rowGap={'40px'}>
                <Layout templateColumns={2} colGap={'20px'}>
                    <Input name={'title'} model={this.state.media} placeholderText={'Title'}
                           getValue={this.handleInput}/>
                    <Input name={'source'} model={this.state.media} placeholderText={'Link to media source'}
                           getValue={this.handleInput}/>
                </Layout>
                <Container width={'125px'}>
                    <UploadFileButton placeholderText='Upload file' getValue={files => console.log(files)} />
                </Container>
                <Container >
                    <TextArea height={'150px'} value={'organization test text'} placeholderText={'Org Bio'}/>
                </Container>
            </Layout>
        );
    }
}

export default SixthStep