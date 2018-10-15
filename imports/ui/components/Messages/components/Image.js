import React from 'react';
import {Container, Layout} from 'btech-layout';
import PropTypes from 'prop-types';
import {Header} from "./styledComponents";

export default AttachedImage = props  => {

    return (
        <Container>
            <Header>{props.filename}</Header>
            <Layout customTemplateColumns={'1fr'} mdCustomTemplateColumns={'1fr 1fr'}>
                <img style={{width: '100%'}} src={props.link} />
            </Layout>
        </Container>
    );
}

AttachedImage.propTypes = {
    filename: PropTypes.string,
    link: PropTypes.string
}