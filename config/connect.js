const mongoose = require('mongoose');
const username = 'Ashish';
const password = 'Ashish';
const cluster = 'cluster0.hepmj';
const dbName = 'Nodetask'; 

//Create Connection and new Db
module.exports = mongoose.connect(
   `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}`,
      {
         useNewUrlParser: true,
         useUnifiedTopology: true
      }).then(() => {
           console.log('Mongoose Connection successful')
      }).catch((err) => {
           console.log(`no connectoin error -> ${err}`)
});