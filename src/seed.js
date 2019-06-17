module.exports = async function(server){
    let db = undefined;
    
    let classes = {};
    
    let entities = [
        //Vertices
        {name: "User", parent: "V"},
        {name: "Server_settings", parent: "V"},

        //Edges
        {name: "follow", parent: "E"},
        
        
    ];
    
    //Get list of databases on server
    let dbList = await server.list();
    if(dbList.map(db => db.name).indexOf('test1') > -1){
        console.log("Database exists...")
        db = server.use({
            name:     'test1',
            username:     'root',
            password: 'root'
         });

         console.log("Fetching entities")

         for(let entity of entities) {
            console.log(entity.name)

            if(entity && entity.name && entity.name !== undefined) classes[entity.name] = await db.class.get(entity.name);
         };
    } else {
        console.log("> Creating the database");
        db = await server.create({
            name:    'test1',
            type:    'root',
            storage: 'root'
        });
        console.log("< test1 created\n")

        let asyncs = [];

        for(let entity of entities) {
            if(entity && entity.name) (function(entity){
                let f = async function(){
                    console.log(`> Creating ${entity.name} class`)
                    classes[entity.name] = await db.class.create(entity.name, entity.parent);
                    console.log(`< ${entity.name} class created\n`)
                }
                asyncs.push(f());
            })(entity);
        };

        console.log(`> Creating classes`)
        for(let asy of asyncs){
            await asy;
        }
        console.log(`< Classes created\n`)
    }

    return {
        server,
        db,
        classes
    }
}