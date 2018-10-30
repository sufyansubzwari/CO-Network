import React from "react"
import {Layout, Container} from "btech-layout";
import ReactSVG from "react-svg";
import styled from "styled-components";
import PropsType from "prop-types";


const SVGContainer = styled(Container)`
    line-height: 13px;
`

const SLevel = styled(Layout)`
	color: #2b2b2b;
	opacity: 0.7;
    font-family: "Roboto Mono";
    font-size: 12px;    
    i{
        margin-left: 3px;
        line-height: 1.5;
    }
`

class LevelDegree extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    getLevelSvg = (level) => {
        if (!level) return null;

        switch (level) {
            case "P.h.D":
                return <ReactSVG src={"/images/icons/line3.svg"} svgStyle={{fill: "#FF1493"}}/>
            case "Masters": return <ReactSVG src={"/images/icons/line2.svg"} svgStyle={{fill: "#464646"}}/>
            case "Bachelors": return  <ReactSVG src={"/images/icons/line1.svg"} svgStyle={{fill: "#8e8a8a"}}/>
            case "Other": return null
            default:
        }
    }

    render(){
        return (
            <Layout customTemplateColumns={"11px auto"} colGap={'3px'}>
                <SVGContainer>{this.getLevelSvg(this.props.level)}</SVGContainer>
                <SLevel>
                    {this.props.level && this.props.level.toUpperCase()}
                </SLevel>
            </Layout>
        );
    }

}

export default LevelDegree;

LevelDegree.propTypes = {
    level: PropsType.string
}