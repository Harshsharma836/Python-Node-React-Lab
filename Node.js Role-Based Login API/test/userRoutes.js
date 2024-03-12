import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js'; // Assuming your app is exported as 'app' in app.js

describe('User Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({ username: 'sharma', email: 'sharma@example.com', password: 'password', role: 'user' });

    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal('User registered successfully');
  }).timeout(10000); // Timeout in milliseconds

  it('should login a user', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({ email: 'sharma@example.com', password: 'password' });

    expect(res.status).to.equal(200);
    expect(res.body.token).to.exist;
  }).timeout(10000); // Timeout in milliseconds
});
