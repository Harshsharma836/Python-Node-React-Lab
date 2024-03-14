import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js'; 

describe('User Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({ username: 'sharma', email: 'sharma@example.com', password: 'password', role: 'user' });

    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal('User registered successfully');
  }).timeout(10000);

  it('should login a user', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({ email: 'sharma@example.com', password: 'password' });

    expect(res.status).to.equal(200);
    expect(res.body.token).to.exist;
  }).timeout(10000);

  
  it('should return a user profile with a valid JWT token', async () => {
    const registerRes = await request(app)
      .post('/user/register')
      .send({ username: 'sharma', email: 'sharma@example.com', password: 'password', role: 'user' });

    expect(registerRes.status).to.equal(201);

    const loginRes = await request(app)
      .post('/user/login')
      .send({ email: 'sharma@example.com', password: 'password' });

    expect(loginRes.status).to.equal(200);
    const token = loginRes.body.token;

    const profileRes = await request(app)
      .get('/user/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(profileRes.status).to.equal(200);
    expect(profileRes.body.username).to.equal('sharma');
    expect(profileRes.body.email).to.equal('sharma@example.com');
  }).timeout(10000);

  it('should return 401 unauthorized without a JWT token', async () => {
    const res = await request(app)
      .get('/user/profile');

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Unauthorized');
  }).timeout(10000);

  it('should return 401 unauthorized with an invalid JWT token', async () => {
    const res = await request(app)
      .get('/user/profile')
      .set('Authorization', 'Bearer invalidToken');

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Unauthorized');
  }).timeout(10000);
});
