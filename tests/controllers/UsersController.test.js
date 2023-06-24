const Chance = require('chance');

const UsersController = require('../../src/app/controllers/UsersController');
const { mockRequest, mockResponse } = require('../utils/interception');
const truncateTables = require('../utils/truncateTables');
const chance = new Chance();

describe('UserController', () => {

  beforeEach(async () => {
    await truncateTables();
  });

  it('deve salvar um usuário comum', async () => {
    const req = mockRequest();
    req.body = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
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
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'institutional',
      institution_type: 'escola'
    };
    const res = mockResponse();


    await UsersController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });


  it('deve encontrar um usuário pelo id', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
    };

    await UsersController.createUser(req, res);

    req.params = {
      id: res.json.mock.lastCall[0].dataValues.id
    };

    req.body = {};

    await UsersController.getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).not.toHaveBeenCalledWith(null);

  });

  it('deve atualizar um usuário já logado', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
    };

    await UsersController.createUser(req, res);

    const user = res.json.mock.lastCall[0].dataValues;

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    req.body = {
      name: chance.name(),
      email: chance.email(),
      birthday: chance.birthday()
    };

    await UsersController.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('deve remover um usuário já logado', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
    };

    await UsersController.createUser(req, res);

    const user = res.json.mock.lastCall[0].dataValues;

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    await UsersController.deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

});
