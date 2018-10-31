import React, { Component } from "react";
import { List } from "btech-card-list-component";
import CardItem from "../CardItem/CardItem";
import EmptyList from "../EmptyList/EmptyList";
import { theme } from "../../theme";
import PropTypes from "prop-types";
import { Container, mixins } from "btech-layout";
import styled from "styled-components";
import { LOADINGDATA } from "./mockData";
import NavMenu from "./components/navMenu";
import _ from "lodash";

const SListTitle = styled(Container)`
  font-family: ${props =>
    props.theme.texts.title.fontFamily || "Helvetica Neue LT Std"};
  font-size: ${props => props.size || "14px"};
  zoom: 100%;

  ${mixins.media.desktop`
    font-size: ${props => props.size || "18px"};
    line-height: ${props => props.lineHeight || "26px"};
    margin-bottom: 15px;
  `} @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

/**
 * @module Event
 * @category List
 */
class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      mockData: LOADINGDATA
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activePreview !== this.props.activePreview) {
      this.forceUpdate();
    }
    if (!_.isEqual(nextProps.previewOptions, this.props.previewOptions)) {
      this.forceUpdate();
    }
  }

  onChangeSelection(item, key) {
    this.setState(
      {
        activeIndex: key
      },
      () => {
        this.props.onSelectCard && this.props.onSelectCard(item, key);
      }
    );
  }

  renderItem(item, key) {
    if (!item) return null;
    return (
      <CardItem
        lgCustomTemplateColumns={"195px 1fr"}
        onSelect={() => this.onChangeSelection(item, key)}
        isActive={
          this.state.activeIndex !== null
            ? this.state.activeIndex === key
            : false
        }
        topOptions={this.props.topOptions}
        loading={this.props.loading}
        title={(item && item.title) || ""}
        subTitle={(item && item.description) || ""}
        image={(item && item.image) || null}
        tags={(item && (item.tags || item.category || item.positionTags)) || []}
        views={item && item.views}
        key={key}
        data={item || 0}
        onSelectTag={this.props.onSelectTag}
        previewOptions={this.props.previewOptions}
        showPreviewMenu={
          this.props.previewOptions && !!this.props.previewOptions.length
        }
        activeOptionPreview={this.props.activePreview}
      />
    );
  }

  fetchMoreItems() {
    this.props.onFetchData && this.props.onFetchData();
  }

  render() {
    return (
      <Container fullY>
        {this.props.navList ? (
          <NavMenu
            options={this.props.navList}
            getActive={this.props.getNavActive}
          />
        ) : (
          <SListTitle ml={{ md: "15px" }}>{this.props.title}</SListTitle>
        )}
        {this.props.loading || (this.props.data && this.props.data.length) ? (
          <List
            renderItem={
              this.props.renderItem ? this.props.renderItem : this.renderItem
            }
            onFetchData={() => this.fetchMoreItems()}
            scrollSeparation={{
              xs: theme.lists.mobileScrollSeparation,
              md: theme.lists.scrollSeparation
            }}
            listSeparationBottom={{
              xs: theme.lists.mobileMarginBottom,
              md: theme.lists.marginBottom
            }}
            data={this.props.loading ? this.state.mockData : this.props.data}
          />
        ) : null}
        {!this.props.loading &&
        (!this.props.data || !this.props.data.length) ? (
          <EmptyList
            curUser={this.props.curUser}
            entityName={this.props.title}
          />
        ) : null}
      </Container>
    );
  }
}

ItemsList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  topOptions: PropTypes.array,
  loading: PropTypes.bool,
  onFetchData: PropTypes.func,
  renderItem: PropTypes.func,
  onSelectCard: PropTypes.func,
  navList: PropTypes.array,
  getNavActive: PropTypes.func,
  onSelectTag: PropTypes.func,
  activePreview: PropTypes.string,
  previewOptions: PropTypes.array
};

export default ItemsList;
