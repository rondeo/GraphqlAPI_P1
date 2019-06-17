let objHelperGenerator = require("../../helpers/object");
let bcrypt = require("bcrypt");

module.exports = function(orientdb){
    let objHelpers = objHelperGenerator(orientdb);
    
    let dao = {
        _fields: [
            "name",
            "firstname",
            "email",
            "password",
        ],
        get: async function() {
            return await orientdb.db.query(`SELECT FROM User`);
        },
        getById: async function(id){
            return await orientdb.db.record.get(id);
        },
        create: async function(p_user){
            let user = {};

            objHelpers.updateObject(user, p_user, dao._fields);

            console.log("SEGFAULT DEBUG")
            console.log(p_user.password);
            user.password = await bcrypt.hash(p_user.password, 6);
            
            let rel = await orientdb.classes.User.create(user);

            return rel;
        }

    }
    return dao;
}