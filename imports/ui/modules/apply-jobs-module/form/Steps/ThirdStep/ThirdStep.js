import React from "react";
import {
    SalaryRange,
    InputAutoComplete,
    TagList,
    Select
} from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";

import { LOOKING_FOR_DEFAULT, TAG_LEVEL, DEGREE } from "../../../../../constants";
import { Query } from "react-apollo";
import {GetTags} from "../../../../../apollo-client/tag";

class ThirdStep extends React.Component {
    constructor(props) {
        super(props);

        let data = props.data ? props.data : {};

        this.state = {
            apply: data,
        };
    }

    componentWillMount() {
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.state.apply)
            this.setState({ apply: nextProps.data });
    }

    notifyParent(model, name, value) {
        if (model && name && value) {
            let apply = this.state.apply;
            apply[name] = value;
            this.setState(
                { apply: apply },
                () => this.props.onChange && this.props.onChange(this.state.apply)
            );
        } else this.props.onChange && this.props.onChange(this.state.apply);
    }

    onAddTags(name, type, tag) {
        if (tag.label && tag.label.length > 0) {
            let newTag = Object.assign({}, { tag: { ...tag } });
            let tags =
                (this.state.apply.professional && this.state.apply.professional[name]) || [];
            !newTag.tag.name ? (newTag.tag.name = newTag.tag.label) : null;
            newTag.tag.type = type;
            tags.push(newTag);
            this.state.apply.professional[name] = tags;
            this.setState({ apply: this.state.apply }, () => this.notifyParent());
        }
    }

    onCloseTags(e, tag, index, name) {
        this.state.apply.professional[name].splice(index, 1);
        this.setState({ apply: this.state.apply }, () => this.notifyParent());
    }

    handleCategoryChange(index, value, color, icon, name) {
        if (
            value &&
            this.state.apply.professional &&
            this.state.apply.professional[name] &&
            this.state.apply.professional[name][index]
        ) {
            let newTag = {
                ...this.state.apply.professional[name][index],
                levelColor: color,
                icon: icon,
                level: value
            };
            this.state.apply.professional[name][index] = newTag;
            this.setState({ apply: this.state.apply }, () => this.notifyParent());
        }
    }

    tagsSuggested(tags, name) {
        let sug = JSON.parse(JSON.stringify(tags));
        return sug
            .sort((a, b) => b.used - a.used)
            .map(tag => ({
                ...tag,
                active:
                this.state.apply &&
                this.state.apply.professional &&
                this.state.apply.professional[name].findIndex(
                    item => item.tag._id === tag._id
                ) > -1
            }))
            .slice(0, 5);
    }

    render() {
        return (
            <Layout rowGap={"25px"}>
                <Container>
                    <Query query={GetTags} variables={{ tags: { type: "Languages" } }}>
                        {({ loading, error, data }) => {
                            if (loading) return <div></div>;
                            if (error) return <div></div>;
                            return (
                                <div>
                                    <InputAutoComplete
                                        placeholderText={"Domain Expertise"}
                                        getAddedOptions={this.onAddTags.bind(
                                            this,
                                            "expertise",
                                            "Expertise"
                                        )}
                                        getNewAddedOptions={this.onAddTags.bind(
                                            this,
                                            "expertise",
                                            "Expertise"
                                        )}
                                        options={data.tags}
                                        model={{ others: [] }}
                                        name={"others"}
                                    />
                                    <Container mt={"10px"}>
                                        <TagList
                                            tags={this.tagsSuggested(data.tags, "expertise")}
                                            onSelect={(event, tag, index) => {
                                                if (!tag.active) {
                                                    delete tag.active;
                                                    this.onAddTags("expertise", "Expertise", tag);
                                                } else {
                                                    const pos = this.state.apply.professional.languages.findIndex(
                                                        item => item.tag._id === tag._id
                                                    );
                                                    this.onCloseTags(event, tag, pos, "expertise");
                                                }
                                            }}
                                        />
                                    </Container>
                                </div>
                            );
                        }}
                    </Query>
                    <Container mt={"10px"}>
                        <TagList
                            tags={
                                this.state.apply.professional.expertise &&
                                this.state.apply.professional.expertise.length > 0
                                    ? this.state.apply.professional.expertise.map(item => ({
                                        active: true,
                                        useIcon: true,
                                        levelColor: item.levelColor || "",
                                        icon: item.icon || "",
                                        level: item.level || "",
                                        ...item.tag,
                                        showOptions: !item.levelColor
                                    }))
                                    : []
                            }
                            closeable={true}
                            onClose={(e, tag, index) =>
                                this.onCloseTags(e, tag, index, "expertise")
                            }
                            levelOptions={TAG_LEVEL}
                            onCategoryChange={(index, value, color, icon) =>
                                this.handleCategoryChange(
                                    index,
                                    value,
                                    color,
                                    icon,
                                    "expertise"
                                )
                            }
                        />
                    </Container>
                </Container>
                <Layout templateColumns={2} colGap={'20px'} >
                    <SalaryRange
                        required
                        placeholder={"000"}
                        labelText={"Expected Salary Range"}
                        min={
                            this.state.apply &&
                            this.state.apply.professional &&
                            this.state.apply.professional.min
                        }
                        max={
                            this.state.apply &&
                            this.state.apply.professional &&
                            this.state.apply.professional.max
                        }
                        getValue={data => {
                            const { min, max } = data;
                            const apply = this.state.apply;
                            apply.professional.salaryRange = { min: min, max: max };
                            this.setState(
                                {
                                    apply: apply
                                },
                                () => this.notifyParent()
                            );
                        }}
                    />
                    <Select placeholderText={"Degree"} model={this.state.apply.professional} name={'degree'} options={DEGREE} />
                </Layout>
                <Container>
                    <Query query={GetTags} variables={{ tags: { type: "Languages" } }}>
                        {({ loading, error, data }) => {
                            if (loading) return <div></div>;
                            if (error) return <div></div>;
                            return (
                                <div>
                                    <InputAutoComplete
                                        placeholderText={"Languages & Libraries"}
                                        getAddedOptions={this.onAddTags.bind(
                                            this,
                                            "languages",
                                            "Languages"
                                        )}
                                        getNewAddedOptions={this.onAddTags.bind(
                                            this,
                                            "languages",
                                            "Languages"
                                        )}
                                        options={data.tags}
                                        model={{ others: [] }}
                                        name={"others"}
                                    />
                                    <Container mt={"10px"}>
                                        <TagList
                                            tags={this.tagsSuggested(data.tags, "languages")}
                                            onSelect={(event, tag, index) => {
                                                if (!tag.active) {
                                                    delete tag.active;
                                                    this.onAddTags("languages", "Languages", tag);
                                                } else {
                                                    const pos = this.state.apply.professional.languages.findIndex(
                                                        item => item.tag._id === tag._id
                                                    );
                                                    this.onCloseTags(event, tag, pos, "languages");
                                                }
                                            }}
                                        />
                                    </Container>
                                </div>
                            );
                        }}
                    </Query>
                    <Container mt={"10px"}>
                        <TagList
                            tags={
                                this.state.apply.professional.languages &&
                                this.state.apply.professional.languages.length > 0
                                    ? this.state.apply.professional.languages.map(item => ({
                                        active: true,
                                        useIcon: true,
                                        levelColor: item.levelColor || "",
                                        icon: item.icon || "",
                                        level: item.level || "",
                                        ...item.tag,
                                        showOptions: !item.levelColor
                                    }))
                                    : []
                            }
                            closeable={true}
                            onClose={(e, tag, index) =>
                                this.onCloseTags(e, tag, index, "languages")
                            }
                            levelOptions={TAG_LEVEL}
                            onCategoryChange={(index, value, color, icon) =>
                                this.handleCategoryChange(
                                    index,
                                    value,
                                    color,
                                    icon,
                                    "languages"
                                )
                            }
                        />
                    </Container>
                </Container>
                <Container>
                    <Query query={GetTags} variables={{ tags: { type: "INDUSTRY" } }}>
                        {({ loading, error, data }) => {
                            if (loading) return <div></div>;
                            if (error) return <div></div>;
                            return (
                                <div>
                                    <InputAutoComplete
                                        placeholderText={"Industry & Sector"}
                                        getAddedOptions={this.onAddTags.bind(
                                            this,
                                            "industry",
                                            "Industry"
                                        )}
                                        getNewAddedOptions={this.onAddTags.bind(
                                            this,
                                            "industry",
                                            "Industry"
                                        )}
                                        options={data.tags}
                                        model={{ others: [] }}
                                        name={"others"}
                                    />
                                    <Container mt={"10px"}>
                                        <TagList
                                            tags={this.tagsSuggested(data.tags, "industry")}
                                            onSelect={(event, tag, index) => {
                                                if (!tag.active) {
                                                    delete tag.active;
                                                    this.onAddTags("industry", "Industry", tag);
                                                } else {
                                                    const pos = this.state.apply.professional.industry.findIndex(
                                                        item => item.tag._id === tag._id
                                                    );
                                                    this.onCloseTags(event, tag, pos, "industry");
                                                }
                                            }}
                                        />
                                    </Container>
                                </div>
                            );
                        }}
                    </Query>
                    <Container mt={"10px"}>
                        <TagList
                            tags={
                                this.state.apply.professional.industry &&
                                this.state.apply.professional.industry.length > 0
                                    ? this.state.apply.professional.industry.map(item => ({
                                        active: true,
                                        useIcon: true,
                                        levelColor: item.levelColor || "",
                                        icon: item.icon || "",
                                        level: item.level || "",
                                        ...item.tag,
                                        showOptions: !item.levelColor
                                    }))
                                    : []
                            }
                            closeable={true}
                            onClose={(e, tag, index) =>
                                this.onCloseTags(e, tag, index, "industry")
                            }
                            levelOptions={TAG_LEVEL}
                            onCategoryChange={(index, value, color, icon) =>
                                this.handleCategoryChange(
                                    index,
                                    value,
                                    color,
                                    icon,
                                    "industry"
                                )
                            }
                        />
                    </Container>
                </Container>
            </Layout>
        );
    }
}

export default ThirdStep;
