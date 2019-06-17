let validOdbSqlRegex = /(?=^(\w| |:|_|#)+$)(?!.* ([fF][rR][oO][mM]|[Ww][hH][eE][rR][eE]|[lL][iI][mM][iI][tT]|[aA][nN][dD]|[oO][rR]|[rR][aA][nN][gG][eE]|[oO][rR][dD][eE][rR]|[bB][yY])( |$))/mg;

module.exports = function orientdbsql(request, ...args){
    let str = "";
    for(let index in request){
        str += request[index];
        if(args[index]){
            if(!validOdbSqlRegex.test(args[index])){
                console.log(args[index]);
                throw "Arguments contain illegal characters";
            }
            str += args[index];
        }
    }
    return str;
};