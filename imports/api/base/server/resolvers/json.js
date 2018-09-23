/**
 * Date resolver
 * @summary In all our models we're using the default Date data type. As Apollo
 * basically only supports strings and numbers to be transported, we define a
 * new scalar which is basically another type.
 * @see {@link https://janikvonrotz.ch/2016/10/09/graphql-with-apollo-meteor-and-react/}
 */
const JsonType = {};

//------------------------------------------------------------------------------
// Value from the client
JsonType.__parseValue = value => value;
//------------------------------------------------------------------------------
// Value sent to the client
JsonType.__serialize = value => value;
//------------------------------------------------------------------------------
JsonType.__parseLiteral = ast => ast.value;
//------------------------------------------------------------------------------

export default JsonType;
