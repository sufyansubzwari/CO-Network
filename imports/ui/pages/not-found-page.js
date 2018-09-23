import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/smart/seo";
import AuthPageLayout from "../layouts/auth-page";

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotFoundPage = () => [
  <AuthPageLayout
    key="view"
    title="404 - Page Not Found"
    subtitle="Back to"
    link={<Link to="/">Home</Link>}
  />
];

export default NotFoundPage;
