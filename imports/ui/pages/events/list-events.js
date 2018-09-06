import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { ItemsList } from "../../../ui/components";

/**
 * @module Events
 * @category list
 */
class ListEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFilters: true,
      selectedItem: null,
      loading: false,
      items: [
        {
          icon: "briefcase",
          views: 20,
          image: "./testing.jpeg",
          title: "Toys",
          subTitle: "Cuba, Havana",
          tags: [
            {
              name: "Javascript",
              value: "javascript"
            }
          ]
        },
        {
          icon: "briefcase",
          views: 40,
          title: "Toys 2",
          subTitle: "Cuba, Havana",
          tags: [
            {
              name: "Javascript",
              value: "javascript"
            }
          ]
        },
        {
          icon: "briefcase",
          views: 67,
          title: "Toys 3",
          subTitle: "Cuba, Havana",
          tags: [
            {
              name: "Javascript",
              value: "javascript"
            }
          ]
        },
        {
          icon: "briefcase",
          views: 84,
          title: "Toys 4",
          subTitle: "Cuba, Havana",
          tags: [
            {
              name: "Javascript",
              value: "javascript"
            }
          ]
        },
        {
          icon: "briefcase",
          title: "Toys 5",
          subTitle: "Cuba, Havana",
          tags: [
            {
              name: "Javascript",
              value: "javascript"
            }
          ]
        },
        {
          icon: "briefcase",
          views: 13,
          title: "Toys 6",
          subTitle: "Cuba, Havana",
          tags: [
            {
              name: "Javascript",
              value: "javascript"
            }
          ]
        }
      ]
    };
  }

  onChangeSelection(item, key) {
    this.setState({
      selectedItem: item
    });
  }

  fetchMoreSelection(item, key) {
    this.setState({
      loading: true
    });
    // todo: load more
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 2000);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Layout fullWY customTemplateColumns={"50% 50%"}>
          <Container>
            <Layout fullWY customTemplateColumns={"250px 1fr"}>
              <Container background={"red"}>Filters</Container>
              <Container>
                <Layout fullWY customTemplateRows={"75px 1fr"}>
                  <Container background={"blue"}>Buscador</Container>
                  <Container background={"yellow"}>
                    <ItemsList
                      data={this.state.items}
                      loading={this.state.loading}
                      onFetchData={options => this.fetchMoreSelection(options)}
                      onSelectCard={(item, key) =>
                        this.onChangeSelection(item, key)
                      }
                    />
                  </Container>
                </Layout>
              </Container>
            </Layout>
          </Container>
          <Container background={"pink"}>Detail</Container>
        </Layout>
      </ThemeProvider>
    );
  }
}

export default ListEvents;
