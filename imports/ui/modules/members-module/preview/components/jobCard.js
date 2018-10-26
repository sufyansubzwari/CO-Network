import React from "react";
import {Container, Layout, mixins} from "btech-layout";
import {Button} from "btech-base-forms-component";
import { Card } from "btech-card-list-component";
import Styled from "styled-components";
import PropsTypes from "prop-types";
import {CardItem} from "../../../../components/index";
import { PlaceHolder } from "btech-placeholder-component";
import {Location} from "../../../../components/Preview/components/index"
import {Link} from "react-router-dom";


const SCardContainer = Styled(Container)`
  zoom: 100%;
  cursor: pointer;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  
  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const TitleCardContainer = Styled.div`
  font-family: Helvetica Neue LT Std;
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.isActive ? "#ffffff" : "#000000")};
  line-height: 1;    
  
  ${mixins.media.desktop`
    font-size: 18px;
  `};
`;

const SubTitleCardContainer = Styled.div`
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => (props.isActive ? "#ffffff" : "#000000")};
  line-height: 1;
  
  ${mixins.media.desktop`
    font-size: 14px;
  `};
`;

const SImage = Styled.div`
  position: absolute;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  background: url(${props => (props.src ? props.src : null)}) no-repeat center;
  background-size: cover;
  width: 100%;
  height: 100%;
`;


class JobCard extends CardItem {

    constructor(props){
        super(props)

        this.state = {

        }
    }


    renderLeftSide() {
        return (
            <Layout
                fullY
                customTemplateRows={"auto auto auto"}
                minH={"90px"}
            >
                <Container>
                    <Layout customTemplateRows={"1fr"}>
                        <TitleCardContainer isActive={this.props.isActive}>
                            {this.props.name || "No Job"}
                        </TitleCardContainer>
                    </Layout>
                </Container>
                <Container>
                    <Layout customTemplateRows={"1fr"}>
                        <Location cut={true} location={this.props.location || "Location" }/>
                    </Layout>
                </Container>
                <Container>
                    { this.props.hideButton ? null : <Link to={"/apply-job"}><Button secondary={true} onClick={() => this.props.onApplyClick && this.props.onApplyClick()} >{"Apply"}</Button></Link> }
                </Container>
            </Layout>
        );
    }


    getRightSide() {
        const loading =
            this.props.loading || (this.props.image && this.state.loadingImage);
        const imageElement = loading ? (
            <PlaceHolder rect loading={loading} height={280} width={240} />
        ) : (
            <SImage src={this.handleImage(this.props.image)} />
        );
        return this.props.image && this.props.image ? (
            <Container relative fullView>
                {imageElement}
            </Container>
        ) : null
    }

    render() {
        return (
            <SCardContainer>
                <Card
                    className={"card"}
                    onSelect={() =>
                        this.props.onSelect && this.props.onSelect({ ...this.props.data })
                    }
                    isActive={this.props.isActive}
                    loading={this.props.loading}
                    {...this.props}
                    {...this.props.data}
                    renderRightSide={this.getRightSide.bind(this)}
                    renderLeftSide={this.renderLeftSide.bind(this)}
                />
            </SCardContainer>
        )
    }

}

export default JobCard

JobCard.propTypes = {
    ...CardItem.propTypes,
    onApplyClick: PropsTypes.func,
    hideButton: PropsTypes.bool
}



