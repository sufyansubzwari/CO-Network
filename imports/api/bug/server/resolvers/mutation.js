import Service from "../service"
const Mutation = {};

Mutation.bug= async (root, { bug }, context) => {
    return Service.bug(bug);
};

export default Mutation;
