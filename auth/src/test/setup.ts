import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

//set a signin function as part of the global methods
declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;

//set up local mongo server to use for tests
beforeAll(async () => {
  process.env.JWT_KEY = 'test';
  process.env.TEST_EMAIL = 'test@test.com';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

//clear all data in database to ensure tests function correctly
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

//close mongo connection
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

//set up global signin function
global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';
  const username = 'testTests';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password, username })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie;
};
