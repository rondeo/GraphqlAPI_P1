const entityDao = require('../../dal/entities/users');

module.exports = function(schema){
    let {Query, Mutation} = schema;

    //* Type */

    schema.User = {
      id: root => root["@rid"] || root.id
    };

    //* Queries */
    
    Query.users = async (root, _, {orientDb}) => {
      return await entityDao(orientDb).get();
    };
    

    //* Mutations */
    
    Mutation.user_new = async (root, {user}, {orientDb}) => {
        return await entityDao(orientDb).create(user);
    };
    
    Mutation.user_delete = async (root, {id}, {orientDb, request}) => {
        return Boolean(await entityDao(orientDb).delete(id, request.user.id));
    };


}