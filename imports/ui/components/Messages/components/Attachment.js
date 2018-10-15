import React from 'react';
import {Container, Layout} from 'btech-layout';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MaterialIcon from 'react-material-iconic-font';
import {SAttachment, Header, Link} from "./styledComponents";
import AttachedImage from "./Image";

const Attach = styled(Container)`
    border-top: ${props => props.hideBorder ? null : '1px solid #E4E4E4'};
`

const SLayout = styled(Layout)`
    padding-left: 40px;
    padding-right: 50px;
    padding-top: 7px;
    padding-bottom: 7px;
`

const File = styled.span`
    color: #000000;
    font-family: "Roboto Mono";
    font-size: 12px;    
    opacity: ${props => props.loading ? '0.5' : '1'};
`;

const Icon = styled.span`
	font-size: 18px;
    line-height: 24px;
    cursor: pointer;
`;

const Size = styled.span`
    opacity: 0.5;
    color: #000000;
    font-family: "Roboto Mono";
    font-size: 12px;
    
`

const FlexContainer = styled(Container)`
    display: flex;
    align-items: center;
`

const SImage = styled.div`
  border: 1px solid #bfbfbf;
  border-radius: 4px;  
  background: url(${props => props.src ? props.src : null}) no-repeat center;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

FormatSize = (size) => {

    let sizeMb = size / (1024 * 1024) ;
    if(sizeMb > 1.0) return sizeMb.toFixed(1) + " MB";
    else {
        let sizeKb = sizeMb * 1024;
        if(sizeKb > 1.0) return sizeKb.toFixed(1) + " KB";
        else return sizeKb * 1024 + " bytes";
    }
}

export default Attachment = props  => {

    return (
        <Attach hideBorder={props.hideBorder}>
            <SLayout customTemplateColumns={ props.isImage ? '40px auto auto 1fr auto' : 'auto auto 1fr auto'} colGap={'10px'} >
                {props.isImage ? <Container>
                    <SImage src={props.link} />
                </Container> : null}
                <FlexContainer><File>{props.filename}</File></FlexContainer>
                <FlexContainer><Size>{FormatSize(props.size)}</Size></FlexContainer>
                <Container />
                <FlexContainer><Icon onClick={() => props.loading ? null : props.onClose && props.onClose()} >
                    <MaterialIcon type={ props.loading ? 'chart-donut' : 'close'} spin={props.loading}/>
                </Icon></FlexContainer>
            </SLayout>
        </Attach>
    );
}

Attachment.propTypes = {
    filename: PropTypes.string,
    size: PropTypes.number,
    onClose: PropTypes.func,
    loading: PropTypes.bool,
    link: PropTypes.string,
    isImage: PropTypes.bool,
    hideBorder: PropTypes.bool
}