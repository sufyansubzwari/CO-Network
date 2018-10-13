import React from 'react';
import {Container, Layout} from 'btech-layout';
import PropTypes from 'prop-types';
import MaterialIcon from 'react-material-iconic-font';
import {Attachment, Header, Link} from "./styledComponents";

export default AttachedFile = props  => {

    return (
        <Container>
            <Header>{props.filename}</Header>
            <Attachment customTemplateColumns={'1fr auto'}>
                <Layout padding={'15px'} customTemplateColumns={'auto 1fr'} colGap={'10px'}>
                    <span>
                        <MaterialIcon type={'attachment'}/>
                    </span>
                    <Container flex style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', alignItems: 'center'}}>{props.filename}</Container>
                </Layout>
                <Link download={props.filename} target="_blank" href={props.link}>
                    <Container style={{cursor: 'pointer'}} padding={"15px"}>
                        <MaterialIcon type={'download'}/>
                     </Container>
                </Link>
            </Attachment>
        </Container>
    );
}

AttachedFile.propTypes = {
    filename: PropTypes.string,
    link: PropTypes.string
}