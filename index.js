const mongoose = require('mongoose');

const dbUrl =
  'mongodb+srv://mbaye:mbaye@cluster0.dcrcvl0.mongodb.net/?retryWrites=true&w=majority';

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbUrl, connectionParams)
  .then(() => {
    console.info('Connected to the DB');
  })
  .catch((e) => {
    console.log('Error', e);
  });
