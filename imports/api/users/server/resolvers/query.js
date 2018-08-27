import Users from "../../index";
const Query = {};

//------------------------------------------------------------------------------
// We access to the current user here thanks to the context. The current
// user is added to the context thanks to the 'meteor/apollo' package.
Query.user = (root, args, context) => context.user;
Query.userBy = (root, { _id }, context) => {
  return Users.collection.findOne(_id);
};

//------------------------------------------------------------------------------

export default Query;
