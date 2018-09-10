import React from 'react';
import {TextArea, Input, UploadFileButton,} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';

class SixthStep extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            media: {
            }
        }

        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(model, name, value) {

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