import React, { Component } from "react";
import { List, MLCard } from "btech-card-list-component";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import PropTypes from "prop-types";

/**
 * @module Event
 * @category List
 */
class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.data,
      activeIndex: null,
      loading: this.props.loading
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) this.setState({ items: nextProps.data });
  }

  onChangeSelection(item, key) {
    this.setState(
      {
        activeIndex: key
      },
      () => {
        this.onSelectCard && this.onSelectCard(item, key);
      }
    );
  }

  renderItem(item, key) {
    return (
      <MLCard
        onSelect={() => this.onChangeSelection(item, key)}
        isActive={
          this.state.activeIndex !== null
            ? this.state.activeIndex === key
            : false
        }
        loading={this.state.loading}
        {...item}
        key={key}
      />
    );
  }

  fetchMoreItems(options) {
    console.log("loading more events");
    this.props.onFetchData && this.props.onFetchData(options);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <List
          renderItem={
            this.props.renderItem ? this.props.renderItem : this.renderItem
          }
          onFetchData={options => this.fetchMoreItems(options)}
          itemSeparation={theme.lists.itemSeparation}
          scrollSeparation={theme.lists.scrollSeparation}
          data={this.state.items}
        />
      </ThemeProvider>
    );
  }
}

ItemsList.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  onFetchData: PropTypes.func,
  renderItem: PropTypes.func,
  onSelectCard: PropTypes.func
};

export default ItemsList;
