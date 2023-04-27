const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) =>{
    MongoClient.connect("mongodb+srv://oscar:1234@nodejs.9ohm1fd.mongodb.net/shop?retryWrites=true&w=majority")
        .then(client => {
            console.log("Connected");
            _db = client.db()
            callback()
        })
        .catch(err => {
            console.log("Error",err);
        })
}

const getDb = () => {
    if(_db){
        return _db
    }
    throw "No databases found"
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
