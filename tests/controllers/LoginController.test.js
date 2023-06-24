const Chance = require('chance');
const truncateTables = require('../utils/truncateTables');
const { mockRequest, mockResponse } = require('../utils/interception');
const UsersController = require('../../src/app/controllers/UsersController');
const LoginController = require('../../src/app/controllers/LoginController');

const chance = new Chance();

describe('LoginController', () => {
  beforeEach(async () => {
    await truncateTables();
  });

  it('Deve logar no sistema', async () => {
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

    await UsersController.createUser(req,res);

    const user = res.json.mock.lastCall[0].dataValues;
    const {email, password} = user;

    req.body = {
      email,
      password
    };

    await LoginController.newLogin(req, res);

    const response = res.json.mock.lastCall[0];

    // verificar se retorna o valor do token
    expect(response.hasOwnProperty('token')).toBe(true);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
