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
      password: chance.string({ length: 8}),
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
      password: chance.string({ length: 8}),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'institutional',
      institution_type: 'escola'
    };
    const res = mockResponse();


    await UsersController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('deve lançar erro quando o tipo de usuário é nulo', async () => {
    const req = mockRequest();
    req.body = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8}),
      phone_number: chance.phone({ formatted: false }),
    };
    const res = mockResponse();

    let err;
    try {
      await UsersController.createUser(req, res);
    } catch(e) {
      err = e;
    } finally {
      expect(err).toBeInstanceOf(Error);
      expect(err.statusCode).toBe(400);
    }
  });

  it('deve lançar erro quando o tipo de usuário é inválido', async () => {
    const req = mockRequest();
    req.body = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8}),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'teste'
    };
    const res = mockResponse();

    let err;
    try {
      await UsersController.createUser(req, res);
    } catch(e) {
      err = e;
    } finally {
      expect(err).toBeInstanceOf(Error);
      expect(err.statusCode).toBe(400);
    }
  });

  it('deve lançar erro quando email já existe', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8}),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'institutional',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
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

  it('deve encontrar um usuário pelo id', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8}),
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

  it('deve retornar um erro por não encontrar usuário pelo id', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.params = {
      id: 1
    };

    let err;
    try {
      await UsersController.getUserById(req, res);

    }catch (e) {
      err = e;
    } finally {
      expect(err).toBeInstanceOf(Error);
      expect(err.statusCode).toBe(404);
    }

  });

});