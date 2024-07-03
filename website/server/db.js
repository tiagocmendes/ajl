const mongoose = require('mongoose');

mongoose.connect('mongodb://root:DNAvCtakP9NtmxjhMnWujMr2v6C9@mongodb/soccer-tournament?authSource=admin', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});