const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name.'],
    unique: true,
  },
  rate: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price.'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'Green land',
  price: 200,
  rate: 4.8,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc, 'Doc Saved.');
  })
  .catch((err) => {
    console.log('ERROR!', err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App Running on port: ${port}`);
});
