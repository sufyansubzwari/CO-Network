import React, { Component } from 'react';
import { Layout, Container } from 'btech-layout';

import {theme} from '../../theme';

class MainLayout extends Component {
  render() {
    return (
      <Layout
        customTemplateColumns={'1fr'}
        customTemplateRows={'1fr 80px'}
        mdCustomTemplateColumns={'100px 1fr'}
        mdCustomTemplateRows={'1fr'}
        layoutAreas={{xs: `'content' 'navBar'`, md: `'navBar content'`}}
        fullWY>
        <Container fullY gridArea='navBar'>
          {/*<HNavbar links={navs} activeEval={this.activeEval} itemOptions={{title: {hide: true, mdShow: true}}} >*/}
            {/*<Layout customTemplateColumns={'1fr 58px 1fr'} background={'red'} key={'header'} mb={'20px'}>*/}
              {/*<Container />*/}
              {/*<HNavItem icon={'/assets/logo.svg'} activeEval={this.activeEval} />*/}
              {/*<Container />*/}
            {/*</Layout>*/}

            {/*<Layout customTemplateRows={'1fr auto'} fullY textCenter className={'center nav-profile'} key={'footer'}>*/}
              {/*<Container />*/}
              {/*<Container>*/}
                {/*<Layout rowGap='15px' >*/}
                  {/*<HNavItem icon={'/assets/logo.svg'} />*/}
                  {/*<button>+</button>*/}
                  {/*<span> M</span>*/}
                  {/*<span> N</span>*/}
                  {/*<Layout rowGap='5px' padding='0 20px 20px;' className={'center terms'}>*/}
                    {/*<a>Terms Policies </a>*/}
                    {/*<a> CONetwork © 2018 </a>*/}
                  {/*</Layout>*/}
                {/*</Layout>*/}
              {/*</Container>*/}
            {/*</Layout>*/}
          {/*</HNavbar>*/}
        </Container>
        <Container gridArea='content'>
        </Container>
      </Layout>
    );
  }
}
export default MainLayout;
