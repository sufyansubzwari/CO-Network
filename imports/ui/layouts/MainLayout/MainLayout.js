import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import Navbar from "../../components/Navbar/Navbar";

const MainLayout = props => {
  return (
    <Layout
      customTemplateColumns={"1fr"}
      customTemplateRows={"1fr 80px"}
      mdCustomTemplateColumns={"72px 1fr"}
      lgCustomTemplateColumns={"100px 1fr"}
      mdCustomTemplateRows={"1fr"}
      layoutAreas={{ xs: `'content' 'Navbar'`, md: `'Navbar content'` }}
      fullWY
    >
      <Navbar {...props} />
      <Container gridArea="content" />
    </Layout>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
