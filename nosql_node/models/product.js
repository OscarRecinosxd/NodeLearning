const mongodb = require("mongodb")
const getDb = require("../util/database").getDb


class Product{
  constructor(title,price,description,imageUrl,id,userId){
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this._id = id ? new mongodb.ObjectId(id) : null
    this.userId = userId 
  }
  save(){
    const db = getDb()
    let dbOp;
    if(this._id){
      dbOp = db
      .collection("products")
      .updateOne({_id : this._id},{$set : this})
    }else{
      dbOp = db
      .collection("products")
      .insertOne(this)
    }
    
    return dbOp
      .then(result => {})
      .catch(err => {
        console.log(err);
    })
  }

  static fetchAll(){
    const db = getDb()
    return db.collection("products")
      .find()
      .toArray()
      .then(products => {
        return products
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  static getProduct(id){
    console.log(id);
    const db = getDb()
    return db.collection("products")
    .find({_id : new mongodb.ObjectId(id)})
    .next()
    .then(product => {
      return product
    })
    .catch(err => {
      console.log(err)
    })
  }
  static delete(id){
    const db = getDb()
    return db.collection("products")
    .findOneAndDelete({_id : new mongodb.ObjectId(id)})
    .then(status => {
      console.log(status);
    })
    .catch(err => {
      console.log(err);
    })
  }

}



module.exports = Product;