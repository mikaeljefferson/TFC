import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import { describe, it } from 'mocha';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testa a rota /login', () => {

  let response: Response;

  afterEach(function() { sinon.restore() });

  describe('Testa /login', () => {
    
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
      expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
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
      expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });
  });
});
