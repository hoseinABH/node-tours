const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const { argv } = require('process');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const tours = JSON.parse(
  fs.readFileSync(`/${__dirname}/tours-simple.json`, 'utf-8')
);

async function importData() {
  try {
    await Tour.create(tours);
    console.log('Data Successfully Insterted💎');
  } catch (error) {
    console.log(error);
  }
  process.exit();
}

async function deleteData() {
  try {
    await Tour.deleteMany();
    console.log('Data Successfully Deleted💥');
  } catch (error) {
    console.log(error);
  }
  process.exit();
}

if (argv[2] === '--import') {
  importData();
} else if (argv[2] === '--delete') {
  deleteData();
}
