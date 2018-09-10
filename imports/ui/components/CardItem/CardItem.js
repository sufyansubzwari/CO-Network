import React, { Component } from "react";
import Styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import { Card } from "btech-card-list-component";
import { TagList } from "btech-base-forms-component";

const TitleCardContainer = Styled.div`
    font-family: Helvetica Neue LT Std;
    font-size: 18px;
    font-weight: bold;
`;

const SViewsContainer = Styled.div`
    font-size: 12px;
    line-height: 18px;
`;

const SViewIconContainer = Styled.div`
    line-height: 18px;
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
  renderLeftSide() {
    const tags = this.props.tags.map(tag => ({ active: true, ...tag }));
    return (
      <Layout fullY rowGap={"5px"} customTemplateRows={"1fr auto"}>
        <Container>
          <Layout fullY customTemplateRows={"auto auto 1fr"}>
            <Container>
              <Layout customTemplateColumns={"1fr auto"}>
                <Container>
                  <Layout customTemplateColumns={"20px auto"}>
                    <Container>
                      <SViewIconContainer>
                        <MaterialIcon type={this.props.iconClass} />
                      </SViewIconContainer>
                    </Container>
                    <Container>
                      <SViewsContainer>{this.props.views}</SViewsContainer>
                    </Container>
                  </Layout>
                </Container>
                <Container>...</Container>
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
        </Container>
        <Container>
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
    return this.props.image && this.props.image ? (
      <Container relative fullView>
        <img width="100%" height="100%" src={this.props.image} />
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
  views: 0,
  image: null,
  iconClass: "eye"
};

CardItem.propTypes = {
  ...Card.propTypes,
  data: PropTypes.object,
  title: PropTypes.string,
  image: PropTypes.string,
  subTitle: PropTypes.string,
  iconClass: PropTypes.string,
  onSelectTag: PropTypes.func,
  tags: PropTypes.array,
  views: PropTypes.number
};

export default CardItem;
