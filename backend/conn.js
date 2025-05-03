const mongoose = require('mongoose');
const URL = process.env.MONGODB_URI;  // Using MONGODB_URL as defined in your .env file

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB ERROR: '));

module.exports = { db, mongoose };


// const mongoose = require('mongoose');
// const URL = process.env.MONGODB_URI;

// mongoose.connect(URL)
// mongoose.Promise = global.Promise;

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'DB ERROR: '));

// module.exports = {db, mongoose};

