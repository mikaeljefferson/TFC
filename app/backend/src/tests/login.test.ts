import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import User from '../database/models/user.model';
import { describe, it } from 'mocha';
import userMock from './mocks/users.mock';
import token from './mocks/token.mock';

import { Response } from 'superagent';
import * as jsonwebtoken from 'jsonwebtoken';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testa a rota /login', () => {

  let response: Response;

  afterEach(function() { sinon.restore() });

  describe('Testa /login', () => {
    it('testa se possivel realizar loigin', async () => {

      sinon.stub(User, "findOne").resolves(userMock as unknown as User);
      sinon.stub(jsonwebtoken, 'sign').resolves(token);

      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'test@admin.com',
                password: 'secret_admin'
              });


      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ token });

    });

    it('testa se pode não informa o campo "email"', async () => {
      const response = await chai
              .request(app)
              .post('/login')
              .send({
                password: 'secret_admin'
              });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('testa se pode não informa o campo "password"', async () => {
      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'test@admin.com',
              });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('testa se pode não informa email válido', async () => {
      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'admin@teste.com',
                password: 'secret_admin'
              });

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });

    it('testa se pode não informa senha válida', async () => {
      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'admin@teste.com',
                password: 'password'
              });

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  });
});