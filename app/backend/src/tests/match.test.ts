import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import loginMock from './mocks/users.mock';
import { describe, it } from 'mocha';

import {app} from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('verifica rota get matches ', async function () { 
  beforeEach(function () { sinon.restore(); });
    it('lista todas as partidas ', async function () {
    const httpResponse = await chai.request(app).get('/matches').send();
    expect(httpResponse.status).to.be.deep.equal(200);
    });
});

describe('verifica a rota Patch matches ', async function () { 
  beforeEach(function () { sinon.restore(); });
    it('update time ', async function () {
       const httpRequestBody = loginMock.validBody
       const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
       const httpResponse2 = await chai.request(app).patch('/matches/1').set('Authorization', `Bearer ${httpResponse.body.token}`).send({ homeTeamGoals:2, awayTeamGoals:4 });
       expect(httpResponse2.status).to.be.deep.equal(200);
    });
});

describe('verifica a rota Patch matches finish ', async function () { 
  beforeEach(function () { sinon.restore(); });
    it('ipadate time pelo id ', async function () {
       const httpRequestBody = loginMock.validBody
       const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
       const httpResponse2 = await chai.request(app).patch('/matches/46/finish').set('Authorization', `Bearer ${httpResponse.body.token}`).send();
       expect(httpResponse2.status).to.be.deep.equal(200);
    });
});
