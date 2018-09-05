import React, { Component } from 'react';
// import { Layout, Container } from 'btech-layout';
import Routes from '../../routes';
import theme from '../../theme';

class MainLayout extends Component {
  render() {
    return (
      {/*<Layout*/}
        {/*minH="100vh"*/}
        {/*customTemplateColumns="1fr"*/}
        {/*customTemplateRows="74px 1fr;"*/}
        {/*layoutAreas={{ md: '"Navbar" "MainContent"' }}*/}
      {/*>*/}
        {/*<Container*/}
          {/*gridArea="Navbar"*/}
          {/*border={{ bottom: { size: 1, color: theme.borderColor } }}*/}
        {/*>*/}
          {/*<Navbar*/}
            {/*logoTitle="Blue Ocean Docs"*/}
            {/*logoSrc="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2Fgitbook%2Favatar.png?generation=1522841935467998&amp;alt=media"*/}
            {/*links={[]}*/}
            {/*border="none"*/}
          {/*/>*/}
        {/*</Container>*/}
        {/*<Container gridArea="MainContent">*/}
          {/*<Routes {...this.props} />*/}
        {/*</Container>*/}
      {/*</Layout>*/}
    );
  }
}
export default MainLayout;
