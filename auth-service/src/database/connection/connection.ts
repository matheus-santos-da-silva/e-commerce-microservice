import mongoose from 'mongoose';

mongoose.connect(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`,
  { dbName: `${process.env.DB_NAME}` }
).then((response) => {
  console.log('Database Connected and running');
})
  .catch((error) => {
    console.log(error);
  }); 

export default mongoose;  