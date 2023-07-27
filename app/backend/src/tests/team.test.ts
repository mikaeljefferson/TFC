import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { describe, it } from 'mocha';
import { Response } from 'superagent';

import teamsMock from './mocks/team.mock';

import Team from '../database/models/team.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('testes sobre teams', () => {

  let response: Response;

  afterEach(function() { sinon.restore() });

  it ('retorna todos os  teams', async () => {
    sinon.stub(Team, 'findOne').resolves(teamsMock as unknown as Team);
    response = await chai.request(app).get('/teams');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(teamsMock);
  });
  it('retorna teams  pelo Id', async () => {

    sinon.stub(Team, "findByPk").resolves(teamsMock[0] as unknown as Team);

    const response = await chai
            .request(app)
            .get('/teams/1');


    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMock[0]);

  });
});
