const Chance = require('chance');
const chance = new Chance();

const UsersController = require('../../src/app/controllers/UsersController');
const { mockRequest, mockResponse } = require('../utils/interception');
const truncateTables = require('../utils/truncateTables');

describe('UserController', () => {
  afterEach(async () => {
    await truncateTables();
  });

  it('deve salvar um usuário comum', async () => {
    const req = mockRequest();
    req.body = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8}),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthdate: chance.birthday(),
    };
    const res = mockResponse();


    await UsersController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

  });

  it('deve salvar um usuário institucional', async () => {
    const req = mockRequest();
    req.body = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8}),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'institutional',
      cpf: chance.cpf(),
      birthdate: chance.birthday(),
      institution_type: 'escola'
    };
    const res = mockResponse();


    await UsersController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('deve retornar erro quando email já existe', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8}),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'institutional',
      cpf: chance.cpf(),
      birthdate: chance.birthday(),
      institution_type: 'escola'
    };


    let err;

    try {
      await UsersController.createUser(req, res);
      await UsersController.createUser(req, res);
    } catch (e) {
      err = e;
    } finally {
      expect(err).toBeInstanceOf(Error);
      expect(err.statusCode).toBe(400);
    }
  });

});
