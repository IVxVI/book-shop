import mongoose from 'mongoose'

export const connectMongoDB = async () => {
  if(mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('Connectetd to MongoDb')
  } catch (error) {
    console.log('Error with connection', error)
  }
}