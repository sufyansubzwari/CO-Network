import React, { Component } from "react";
import Styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";
import PropTypes from "prop-types";
import { Container, Layout, mixins } from "btech-layout";
import { Card } from "btech-card-list-component";
import { TagList } from "btech-base-forms-component";
import ReportToggle from "./ReportToggle";
import { PlaceHolder } from "btech-placeholder-component";
import posed from "react-pose";
import { Utils } from "../../services";
import isMobile from "../../constants/isMobile";
import CardPreview from "./CardPreview";

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

const SKeyContainer = Styled.span`
  font-size: 12px;
  color: ${props => (props.isActive ? "#ffffff" : "#000000")};
  
  ${mixins.media.desktop`
    font-size: 14px;
    line-height: 18px;
  `};
`;

const SIconContainer = Styled.span`
  font-size: 12px;
  margin-right: 5px;
  color: ${props => (props.isActive ? "#ffffff" : "#000000")};
  
  ${mixins.media.desktop`
    font-size: 14px;
    line-height: 18px;
  `};
`;

const SubTitleCardContainer = Styled.div`
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => (props.isActive ? "#ffffff" : "#000000")};
  line-height: initial;
  
  ${mixins.media.desktop`
    font-size: 14px;
  `};
`;

const ViewContainer = Styled(Container)`
    line-height: 1;
`;

const SMLCard = Styled(Card)`
  line-height: inherit;
  transition: background 0.3s ease-out;
  :hover {
    background: red;
  }
`;

const EmptyTagsContainer = Styled.div`
  min-height: 32px;
`;

const NullImageContainer = Styled.div`
  font-family: Helvetica Neue LT Std;
  position: absolute;
  font-weight: 700;
  color: white;
  bottom: 0;
  font-size: 12px;
  left: 0;
  
  ${mixins.media.desktop`
    bottom: 10px;
    font-size: 15px;
    left: 10px;
  `};
`;

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

const SShowMore = Styled.div`
  width: 142px;
  height: 32px;
  margin-top: 40px;
  margin-left: -40px;
  background-color: #373737;
  box-shadow: 0 13px 30px rgba(34,66,76,0.15);
  color: #A8A8A8;
  font-family: "Roboto Mono";
  font-size: 12px;
  text-align: center;
  padding: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  
  /* Safari */
  -webkit-transform: rotate(-90deg);

  /* Firefox */
  -moz-transform: rotate(-90deg);
  
  /* IE */
  -ms-transform: rotate(-90deg);
  
  /* Opera */
  -o-transform: rotate(-90deg);
  
  /* Internet Explorer */
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
`;

//TODO review the blur when the scale is triggered
const PSCardContainer = posed(SCardContainer)({
  hoverable: true,
  init: { scale: 1 },
  hover: { scale: 1.028 }
});

const SImage = Styled.div`
  position: absolute;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  background: url(${props => (props.src ? props.src : null)}) no-repeat center;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

/**
 * @module Cards
 * @category MLSociety Card Base Component
 * @description This component is a wrapper for the ml-society card
 */
class CardItem extends Component {
  constructor(props) {
    super(props);
    const elements = [{ key: "views", icon: "eye" }].concat(
      this.props.topOptions
    );
    this.state = {
      loadingImage: true,
      topOptions: elements,
      showPreview: false
    };

    this.handlePreviewCard = this.handlePreviewCard.bind(this);
  }

  componentDidMount() {
    if (this.props.image) {
      this.loadImage(this.props.image);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isActive !== this.props.isActive) {
      this.setState({ showPreview: false });
    }
    //TODO: find another solution for this!! Console Warning!!
    setTimeout(() => {
      this.setState({ loadingImage: this.state.loadingImage });
    }, 500);
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
      image.src = this.handleImage(imageSrc);
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
      <ViewContainer key={index} inLine mr={{ xs: "5px", md: "15px" }}>
        <SIconContainer isActive={this.props.isActive}>
          <MaterialIcon type={iconToShow} />
        </SIconContainer>
        <SKeyContainer isActive={this.props.isActive}>
          {valueToShow}
        </SKeyContainer>
      </ViewContainer>
    );
  }

  handleImage = image => {
    return image
      ? image.startsWith("http") || image.startsWith("data:")
        ? image
        : Utils.getImageFromS3(image, "card")
      : null;
  };

  handlePreviewCard() {
    this.setState({ showPreview: !this.state.showPreview });
  }

  renderLeftSide() {
    const tags = this.props.tags
      .map(tag => ({ active: true, ...tag }))
      .sort((a, b) => {
        return a.label.length - b.label.length;
      });
    return (
      <Layout
        fullY
        minH={"initial"}
        mdMinH={"100px"}
        customTemplateColumns={"1fr 32px"}
        mdColGap={"5px"}
      >
        <Layout
          fullY
          minH={"initial"}
          mdMinH={"100px"}
          customTemplateRows={"1fr"}
          mdRowGap={"10px"}
          mdCustomTemplateRows={"1fr 27px"}
        >
          <Layout
            fullY
            customTemplateRows={"auto auto auto"}
            mdRowGap={"10px"}
            rowGap={"8px"}
          >
            <Container>
              <Layout
                customTemplateColumns={"1fr"}
                mdCustomTemplateColumns={
                  this.props.showMenu ? "1fr auto" : "1f"
                }
              >
                <Container style={{ lineHeight: 1 }}>
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
                <TitleCardContainer isActive={this.props.isActive}>
                  {this.props.title || "No title"}
                </TitleCardContainer>
              </Layout>
            </Container>
            <Container>
              <Layout customTemplateRows={"1fr"}>
                <SubTitleCardContainer isActive={this.props.isActive}>
                  {this.props.subTitle || "No description"}
                </SubTitleCardContainer>
              </Layout>
            </Container>
          </Layout>
          <Container hide mdShow ref={this.tagRef}>
            {tags.length ? (
              <TagList
                containerRef={this.tagcontainer}
                cut={true}
                tags={tags}
                onSelect={(event, tag, index) => {
                  event.stopPropagation();
                  event.preventDefault();
                  this.props.onSelectTag && this.props.onSelectTag(tag, index);
                }}
                backgroundTagColor={this.props.isActive ? "#000000" : null}
                borderColor={"#F92672"}
                activeColor={this.props.isActive ? "white" : "black"}
              />
            ) : (
              <EmptyTagsContainer />
            )}
          </Container>
        </Layout>
        {this.props.isActive && this.props.showPreviewMenu && !isMobile() ? (
          <SShowMore onClick={this.handlePreviewCard}>
            <span>
              <span>
                {this.state.showPreview ? "Show Less " : "Show More "}
              </span>
              <MaterialIcon
                type={this.state.showPreview ? "caret-down" : "caret-up"}
              />
            </span>
          </SShowMore>
        ) : null}
      </Layout>
    );
  }

  renderPreview() {
    return (
      <Layout
        fullY
        minH={"initial"}
        mdMinH={"112px"}
        customTemplateColumns={"1fr 32px"}
        mdColGap={"5px"}
      >
        <CardPreview
          options={this.props.previewOptions}
          active={this.props.activeOptionPreview}
        />
        <SShowMore onClick={this.handlePreviewCard}>
          <span>
            <span>{this.state.showPreview ? "Show Less " : "Show More "}</span>
            <MaterialIcon
              type={this.state.showPreview ? "caret-down" : "caret-up"}
            />
          </span>
        </SShowMore>
      </Layout>
    );
  }

  getRightSide() {
    const loading =
      this.props.loading || (this.props.image && this.state.loadingImage);
    const imageElement = loading ? (
      !isMobile() ? (
        <PlaceHolder rect loading={loading} height={280} width={390} />
      ) : (
        <PlaceHolder rect loading={loading} height={340} width={390} />
      )
    ) : (
      <SImage src={this.handleImage(this.props.image)} />
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
      <SCardContainer>
        <SMLCard
          className={"card"}
          background={
            this.props.isActive
              ? this.state.showPreview
                ? "#2E2E2E"
                : "#000000"
              : "white"
          }
          onSelect={() =>
            this.props.onSelect && this.props.onSelect({ ...this.props.data })
          }
          isActive={this.props.isActive}
          loading={this.props.loading}
          {...this.props}
          {...this.props.data}
          isCardPreview={this.state.showPreview}
          renderRightSide={
            !this.state.showPreview ? this.getRightSide.bind(this) : null
          }
          renderLeftSide={
            !this.state.showPreview
              ? this.renderLeftSide.bind(this)
              : this.renderPreview.bind(this)
          }
        />
      </SCardContainer>
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
  views: PropTypes.number,
  previewOptions: PropTypes.array,
  showPreviewMenu: PropTypes.bool,
  activeOptionPreview: PropTypes.string
};

export default CardItem;
