import React, { Component } from "react";
import { Layout, Container } from "btech-layout";
import UserForm from "./../../modules/user-module/form/";
import InternalLayout from "../../components/InternalLayout/InternalLayout";
import { Preview } from "../../../ui/components";
import Title  from "../../../ui/components/Preview/components/Title";
import Location  from "../../../ui/components/Preview/components/Location";
import Social  from "../../../ui/components/Preview/components/Social";
import Text  from "../../../ui/components/Preview/components/Text";
import TagsAdd from "../../components/Preview/components/TagsAdd";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { CreateEvent } from "../../apollo-client/event";

/**
 * @module User
 * @category user-profile
 */
class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
        user: {}
    }
  }

  onCancel() {
    this.props.history.push(`/`);
  }

  render() {
    return (
      <InternalLayout>
        <Container fullY key={"leftSide"}>
          <UserForm
            onFinish={data => this.onPostAction(() => console.log(createProfile), data)}
            onCancel={() => this.onCancel()}
            userLogged={false}
            {...this.props}
          />
        </Container>
        <Preview
          key={"rightSide"}
          navClicked={index => console.log(index)}
          navOptions={[
            {
              text: "Remove",
              icon: "delete",
              checkVisibility: () => {
                return this.state.selectedItem && this.state.selectedItem.id;
              },
              onClick: function() {
                console.log("Remove");
              }
            }
          ]}
          index={this.state.selectedIndex}
          data={this.state.selectedItem}
          backGroundImage={
            this.state.selectedItem ? this.state.selectedItem.image : null
          }
        >
          <Layout>
            <Title text={'Machine Learning Society'} />
            <Location text={'SAN DIEGO | BOSTON | NEW YORK | BAY AREA'} />
            <Social social={['github', 'google', 'facebook', 'twitter']} links={[{link: 'www.mlsociety.com', website: 'MLsociety.com'}]} />
              <TagsAdd header={'Organization Type'} tags={[{name:'Academia', active: true},{name:'Comunity', active: true}]} />
            <Text header={'Vision'} text={'Lorem ipsum dolorem orem ipsum dolorem orem ipsum dolorem orem ipsum dolorem orem ipsum dolorem ipsum dolorem orem ipsum dolorem ipsum dolorem orem ipsum dolorem ipsum dolorem orem ipsum dolorem ipsum dolorem orem ipsum dolorem'} />
          </Layout>
        </Preview>
      </InternalLayout>
    );
  }
}

export default UserProfile;
