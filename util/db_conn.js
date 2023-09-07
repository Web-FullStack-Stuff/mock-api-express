import './loadEnvironment.js'

// import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

const dbName = 'api-data'
let connectionString = process.env.MONGO_URI || ''

console.log('STR:', connectionString )
class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose
      .connect(`${connectionString}/${dbName}`)
      .then(() => {
        console.log('Database connection successful')
      })
      .catch((err) => {
        console.error('Database connection error')
      })
  }
}


export default new Database()
