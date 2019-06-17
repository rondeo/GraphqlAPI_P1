module.exports = function(orientdb){
    let helpers = {};
    
    helpers.server = {
        getSettings: async function(){
            return await orientdb.db.query(`SELECT FROM Server_settings`);
        },
        getCurrentSettings: async function(state){
            return await orientdb.db.query(`SELECT FROM Server_settings WHERE state = '${state}'`);
        },
        createSettings: async function(data){
            return await orientdb.classes.Server_settings.create(data);
        },
        updateSettings: async function(data, state){
            let rec = (await orientdb.db.query("SELECT FROM Server_settings WHERE state = 'configured'"))[0];
            for(let i in data){
                rec[i] = data[i];
            }
            return await orientdb.db.record.update(rec);
        }
    }

    return helpers;

}