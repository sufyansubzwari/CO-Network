import React from "react";
import { Layout, Container } from "btech-layout";
import { HButtonGroup,HButtom} from "btech-horizantal-navbar";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the react-table
 */
class UserNavbarSection extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Layout
        customTemplateRows={"1fr auto"}
        fullY
        textCenter
        className={"center nav-profile"}
      >
        <Container />
        <Container>
          <Layout rowGap="15px">
            <HButtonGroup rows={[1,2,1]} gap={8} rowGap={-2}>
              <HButtom big image={"https://cdn.dribbble.com/users/199982/screenshots/4044699/furkan-avatar-dribbble.png"}></HButtom>
              <HButtom>a</HButtom>
              <HButtom>a</HButtom>
              <HButtom big primary>a</HButtom>
            </HButtonGroup>
            <Layout
              rowGap="5px"
              padding="0 20px 20px;"
              className={"center terms"}
            >
              {/*<a>Terms Policies </a>*/}
              {/*<a> CONetwork © 2018 </a>*/}
            </Layout>
          </Layout>
        </Container>
      </Layout>
    );
  }

}

export default UserNavbarSection;