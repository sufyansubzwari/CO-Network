import React from "react";
import {Container, Layout, mixins} from "btech-layout";
import {Button} from "btech-base-forms-component";
import {Card} from "btech-card-list-component";
import Styled from "styled-components";
import PropsTypes from "prop-types";
import {CardItem} from "../../../../components/index";
import {PlaceHolder} from "btech-placeholder-component";
import {Location, Dates} from "../../../../components/Preview/components/index"
import MaterialIcon from "react-material-iconic-font";


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

const Span = Styled.span`
	font-size: 16px;
    line-height: 26px;
    color: #2B2B2B;
    
    i{
        margin-right: 5px;
    }
`

const AdminButton = Styled(Layout)`
    background-color: #EDEDED;
    border-radius: 3px
`

class OrganizationCard extends CardItem {

    constructor(props) {
        super(props)

        this.state = {}
    }


    renderLeftSide() {
        return (
            <Layout
                fullY
                customTemplateRows={"auto auto auto"}
                minH={"90px"}
            >
                <Container>
                    <Layout customTemplateRows={this.props.checkedOrganization ? "1fr auto" : "1fr"}>
                        <TitleCardContainer isActive={this.props.isActive}>
                            {this.props.name || "No Organization"}
                        </TitleCardContainer>
                        {this.props.checkedOrganization ? <Span><MaterialIcon type={'shield-check'}/></Span> : null}
                    </Layout>
                </Container>
                <Container>
                    <Layout customTemplateRows={"1fr"}>
                        { this.props.isEventCard ?
                            <Dates cut={true} startDate={this.props.startDate} endDate={this.props.endDate} />
                            :<Location cut={true} location={this.props.collaborators || "Collaborators"}/>}
                    </Layout>
                </Container>
                <Container>
                    <Layout customTemplateColumns={"auto 1fr"}>
                        {this.props.hideButton ? null : <Button secondary={true}
                                                                onClick={() => this.props.onFollowClick && this.props.onFollowClick()}>{this.props.following ? "Unfollow" : "Follow"}</Button>}
                        {this.props.isAdmin ? <AdminButton customTempalteColumns={"auto auto"}><Span><MaterialIcon
                            type={"shield-security"}/>Admin</Span></AdminButton> : null}
                    </Layout>
                </Container>
            </Layout>
        );
    }


    getRightSide() {
        const loading =
            this.props.loading || (this.props.image && this.state.loadingImage);
        const imageElement = loading ? (
            <PlaceHolder rect loading={loading} height={280} width={240}/>
        ) : (
            <SImage src={this.handleImage(this.props.image)}/>
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
                        this.props.onSelect && this.props.onSelect({...this.props.data})
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

export default OrganizationCard

OrganizationCard.propTypes = {
    ...CardItem.propTypes,
    onFollowClick: PropsTypes.func,
    hideButton: PropsTypes.bool,
    checkedOrganization: PropsTypes.bool,
    isAdmin: PropsTypes.bool,
    collaborators: PropsTypes.string,
    isEventCard: PropsTypes.bool,
    startDate: PropsTypes.string,
    endDate: PropsTypes.string

}



