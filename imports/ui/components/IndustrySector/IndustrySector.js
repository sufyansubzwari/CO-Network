import React from 'react';
import {GetTags} from "../../apollo-client/tag";
import { Query } from "react-apollo";
import SelectTag from "../SelectTag/SelectTag";
import PropsTypes from "prop-types";

class IndustrySector extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            tags : props.tags && props.tags.length ? props.tags : []
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.tags){
            this.setState({
                tags: nextProps.tags
            })
        }
    }

    render(){
        return(
            <Query query={GetTags} variables={{ tags: { type: "INDUSTRY" } }}>
                {({ loading, error, data }) => {
                    if (loading) return <div></div>;
                    if (error) return <div>Error</div>;
                    return (
                        <SelectTag
                            placeholderText={"Industry | Sector"}
                            tags={
                                this.state.tags.map( (tag) => ({
                                    ...tag,
                                    active: true
                                }) )
                            }
                            selectOptions={data.tags}
                            getTags={obj => this.props.handleTags(obj)}
                            model={{ obj: [] }}
                            name={"obj"}
                            tagsCloseable={true}
                            hideValue={true}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default IndustrySector;

IndustrySector.defaultProps = {
    inputValue: ""
};

IndustrySector.propTypes = {
    tags: PropsTypes.array,
    handleTags: PropsTypes.func
};


