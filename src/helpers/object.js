module.exports = function(orientdb){
    return {
        arrayToMap(arrayArg, keyNameArg){
            let keyName = keyNameArg || "key";
            let obj = {};

            for (const index in arrayArg) {
                if (arrayArg.hasOwnProperty(index)) {
                    let element = arrayArg[index];
                    let mapObj = obj[element[keyName]] = {};

                    for (const key in element) {
                        mapObj[key] = element[key];
                    }

                }
            }
            return obj;
        },
        morphObject(objArg, cb){
            let obj = {};

            for (const index in objArg) {
                if (objArg.hasOwnProperty(index)) {
                    obj[index] = cb(objArg[index]);
                }
            }
            return obj;
        },
        updateObject(old, object, fields){
            if(fields){
                for(const key of fields){
                    if(object[key] !== undefined){
                        old[key] = object[key];
                    }
                }
            } else {
                for (const key in object){
                    if (object.hasOwnProperty(key)) {
                        if(object[key] !== undefined){
                            old[key] = object[key];
                        }
                    }
                }
            }
            return old;
        },
        cleanObject(obj){
            for(let i in obj){
                let el = obj[i];
                if(el && el._content){
                    obj[i] = el._content;
                }
            }
        },
        getEdgeLength (edges, type) {
            return edges.map(e => e[type].length).reduce( (t, a) => t + a);
        },
        update: async function(rec){
            return await orientdb.db.record.update(rec);
        },
        delete: async function(id){
            return orientdb.db.query(`DELETE VERTEX ${id}`);
        },
    }
}