import React from "react";
import { Layout, Container } from "btech-layout";
import styled, {ThemeProvider} from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import {FilterItem, Separator} from "../../../components"
import {Button} from "btech-base-forms-component";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {LogoutBtn} from "../../../components/smart/auth";
import {cleanFilters, setFilters} from "../../../actions/SideBarActions";
import { connect } from "react-redux";
import {theme} from "../../../theme";
import SideBarLink from "../../../components/Navbar/SideBarLink";
import ReactSVG from 'react-svg'

const SContainer = styled(Layout)`
    overflow: hidden
`;

const STitleLayout = styled(Layout)`
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const Photo = styled(Container)`
  position: relative;
  background: ${props =>
    props.image
        ? "url(" + props.image + ") no-repeat center"
        : props.theme
        ? "linear-gradient(180deg, " +
        props.theme.preview.photo.topcolor +
        ", " +
        props.theme.preview.photo.bottomcolor +
        ")"
        : " linear-gradient(180deg,#32363D, #202225)"};
  background-size: cover;
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const Username = styled.label`
    font-family: Helvetica Neue LT Std;
    font-weight: bold;
    font-size: 16px;
    color: black;    
    margin-bottom: 0;
`;

const Website = styled.label`
    font-family: Roboto Mono;
    color: rgba(0,0,0, 0.5);
    font-size: 12px;    
`;

const ItemsContainer = function(props) {
    return (
        <SContainer fullY customTemplateRows={"160px 1fr 72px"}>
            <Photo image={ props.curUser && props.curUser.profile && props.curUser.profile.cover !== "" ? props.curUser.profile.cover : null }>
                <Container fullX style={{bottom: '-2px', position: 'absolute'}}>
                    <ReactSVG src={'/images/sidebar/bordercreate.svg'} />
                </Container>
            </Photo>
            <SContainer>
                <Scrollbars
                    universal
                    autoHide
                    autoHideDuration={props.autoHideDuration}
                    style={{ height: "100%", overflow: "display" }}
                >
                    {props.children}
                </Scrollbars>
            </SContainer>
            <Container>
                <Separator/>
                <Container ml={'35px'} mt={'10px'}>
                    <ThemeProvider theme={theme}>
                        <Container >
                            <SideBarLink href={props.policy}> Terms Policies </SideBarLink>
                            <SideBarLink> CONetwork © 2018 </SideBarLink>
                        </Container>
                    </ThemeProvider>
                    <LogoutBtn
                        btnType="link"
                        onLogoutHook={window.hideMenu}
                    />
                </Container>
            </Container>
        </SContainer>
    );
};

class ProfileSideBar extends React.Component {

    constructor(props){
        super(props);
        this.policy = Meteor.settings.public.policyUrl;
    }

    componentWillMount() {
        this.props.cleanFilters();
    }

    render(){

        let name = this.props.curUser && this.props.curUser.profile && this.props.curUser.profile.name;
        let lastName = this.props.curUser && this.props.curUser.profile && this.props.curUser.profile.lastName;

        return(
          <ItemsContainer {...this.props} policy={this.policy} onClose={() => this.props.onClose && this.props.onClose()}>
            <FilterItem>
                <Container mt={'10px'}>
                    <Container>
                        <Username>{name} {lastName}</Username>
                    </Container>
                    <Container>
                        <Website>{this.props.curUser && this.props.curUser.profile && this.props.curUser.profile.website}</Website>
                    </Container>
                    <Link to={'/profile'}><Button>See Profile</Button></Link>
                </Container>
            </FilterItem>
            <Separator/>
          </ItemsContainer>
        );
    }

}

const mapStateToProps = state => {
    const {} = state;
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        setFilters: (type, filters) => dispatch(setFilters(type, filters)),
        cleanFilters: () => dispatch(cleanFilters())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileSideBar);
