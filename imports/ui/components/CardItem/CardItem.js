import React, { Component } from "react";
import Styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import { Card } from "btech-card-list-component";
import { TagList } from "btech-base-forms-component";
import ReportToggle from "./ReportToggle";
import { PlaceHolder } from "btech-placeholder-component";

const TitleCardContainer = Styled.div`
    font-family: Helvetica Neue LT Std;
    font-size: 18px;
    font-weight: bold;
`;

const SKeyContainer = Styled.span`
    font-size: 14px;
    line-height: 18px;
`;

const SIconContainer = Styled.span`
    line-height: 18px;
    line-height: 18px;
    font-size: 14px;
    margin-right: 5px;
`;

const SubTitleCardContainer = Styled.div`
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const SMLCard = Styled(Card)`
    line-height: inherit;
`;

const EmptyTagsContainer = Styled.div`
    min-height: 32px;
`;

const NullImageContainer = Styled.div`
    font-family: Helvetica Neue LT Std;
    position: absolute;
    bottom: 10px;
    font-size: 15px;
    font-weight: 700;
    color: white;
    left: 10px;
`;

/**
 * @module Cards
 * @category MLSociety Card Base Component
 * @description This component is a wrapper for the ml-society card
 */
class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingImage: true,
      topOptions: [
        {
          key: "views",
          icon: "eye"
        }
      ]
    };
    if (props.image) {
      this.loadImage(props.image);
    }
  }

  componentDidMount() {
    this.setState({
      topOptions: this.state.topOptions.concat(this.props.topOptions)
    });
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.image) return;
    if (newProps.image !== this.props.image) this.loadImage(newProps.image);
  }

  loadImage(imageSrc) {
    this.setState({ loadingImage: true, imageError: false });
    if (imageSrc) {
      let image = new Image();
      image.onload = (data, error) => {
        this.setState({ loadingImage: false });
      };
      image.onerror = (data, error) => {
        this.setState({ loadingImage: false, imageError: true });
      };
      image.src = imageSrc;
    }
  }

  renderTopOptionItem(element, index) {
    const valueToShow = element.transformText
      ? element.transformText(this.props.data[element.key])
      : this.props.data[element.key] || this.props[element.key];
    const iconToShow = element.transformIcon
      ? element.transformIcon(this.props.data[element.key])
      : element.icon;
    return (
      <Container key={index} inLine mr={"15px"}>
        <SIconContainer>
          <MaterialIcon type={iconToShow} />
        </SIconContainer>
        <SKeyContainer>{valueToShow}</SKeyContainer>
      </Container>
    );
  }

  renderLeftSide() {
    const tags = this.props.tags.map(tag => ({ active: true, ...tag }));
    return (
      <Layout
        fullY
        minH={"initial"}
        mdMinH={"100px"}
        customTemplateRows={"1fr"}
        rowGap={"5px"}
        mdCustomTemplateRows={"1fr auto"}
      >
        <Layout fullY customTemplateRows={"auto auto 1fr"} rowGap={"5px"}>
          <Container mdMinH={"25px"}>
            <Layout
              customTemplateColumns={"1fr"}
              mdCustomTemplateColumns={this.props.showMenu ? "1fr auto" : "1f"}
            >
              <Container>
                {this.state.topOptions.map((element, index) =>
                  this.renderTopOptionItem(element, index)
                )}
              </Container>
              {this.props.showMenu ? (
                <Container hide mdShow>
                  <SViewsContainer>
                    <ReportToggle onSelect={(item, key) => alert(key)} />
                  </SViewsContainer>
                </Container>
              ) : null}
            </Layout>
          </Container>
          <Container>
            <Layout customTemplateRows={"1fr"}>
              <TitleCardContainer>
                {this.props.title || "No title"}
              </TitleCardContainer>
            </Layout>
          </Container>
          <Container>
            <Layout customTemplateRows={"1fr"}>
              <SubTitleCardContainer>
                {this.props.subTitle || "No description"}
              </SubTitleCardContainer>
            </Layout>
          </Container>
        </Layout>
        <Container hide mdShow>
          {tags.length ? (
            <TagList
              tags={tags}
              onSelect={(event, tag, index) => {
                event.stopPropagation();
                event.preventDefault();
                this.props.onSelectTag && this.props.onSelectTag(tag, index);
              }}
            />
          ) : (
            <EmptyTagsContainer />
          )}
        </Container>
      </Layout>
    );
  }

  getRightSide() {
    const loading =
      this.props.loading || (this.props.image && this.state.loadingImage);
    const imageElement = loading ? (
      <PlaceHolder rect loading={loading} height={398} width={395} />
    ) : (
      <img width="100%" height="100%" src={this.props.image} />
    );
    return this.props.image && this.props.image ? (
      <Container relative fullView>
        {imageElement}
      </Container>
    ) : (
      <Container relative fullView>
        <NullImageContainer>
          <div>No</div>
          <div>Image</div>
          <div>Founded</div>
        </NullImageContainer>
      </Container>
    );
  }

  render() {
    return (
      <Container style={{ cursor: "pointer" }}>
        <SMLCard
          background={"white"}
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
      </Container>
    );
  }
}

CardItem.defaultProps = {
  ...Card.defaultProps,
  tags: [],
  topOptions: [],
  views: 0,
  showMenu: false,
  image: null,
  iconClass: "eye"
};

CardItem.propTypes = {
  ...Card.propTypes,
  data: PropTypes.any,
  title: PropTypes.string,
  image: PropTypes.string,
  subTitle: PropTypes.string,
  showMenu: PropTypes.bool,
  iconClass: PropTypes.string,
  topOptions: PropTypes.array,
  onSelectTag: PropTypes.func,
  tags: PropTypes.array,
  views: PropTypes.number
};

export default CardItem;
