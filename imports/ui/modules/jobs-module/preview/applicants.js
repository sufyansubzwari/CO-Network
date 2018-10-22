import React from "react";
import {Container, Layout, mixins} from "btech-layout";
import {Button} from "btech-base-forms-component";
import { Card } from "btech-card-list-component";
import Styled from "styled-components";
import PropsTypes from "prop-types";
import {CardItem} from "../../../components/index";
import { PlaceHolder } from "btech-placeholder-component";
import {Location} from "../../../components/Preview/components/index"


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
    
  ${mixins.media.desktop`margin-left: 15px;`}
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


class AppplicantsCard extends CardItem {

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
                >
                    <Container>
                        <Layout customTemplateRows={"1fr"}>
                            <TitleCardContainer isActive={this.props.isActive}>
                                {this.props.name || "No User"}
                            </TitleCardContainer>
                        </Layout>
                    </Container>
                    <Container>
                        <Layout customTemplateRows={"1fr"}>
                            <Location location={this.props.location || "Location" }/>
                        </Layout>
                    </Container>
                    <Container>
                        <Button secondary={true} onClick={this.props.onFollowClick && this.props.onFollowClick()} >Follow</Button>
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

export default AppplicantsCard

AppplicantsCard.propTypes = {
    ...CardItem.props,
    onFollowClick: PropsTypes.func
}



