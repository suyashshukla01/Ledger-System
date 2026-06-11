const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');

function connectToDB() {
  mongoose.connect(process.env.MONGO_URI)
   .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB');
    console.error(err);
    process.exit(1);
  });
}


module.exports = connectToDB;
