const Chance = require('chance');
const truncateTables = require('../utils/truncateTables');
const UsersService = require('../../src/app/services/UsersService');
const LoginService = require('../../src/app/services/LoginService');

const chance = new Chance();

describe('LoginService', () => {
  beforeEach(async () => {
    await truncateTables();
  });

  afterAll(async () => {
    await truncateTables();
  });

  it('Deve logar o usuário no sistema', async () => {
    const userService = new UsersService();
    const loginService = new LoginService();

    const payload = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
    };

    await userService.createUser(payload);

    const data = await loginService.login(payload.email, payload.password);

    expect(data.token).not.toBe(null);
    expect(data.user.email).toBe(payload.email);
  });

  it('Deve lançar erro quando credenciais não forem enviadas no login', async () => {
    const loginService = new LoginService();

    await expect(loginService.login())
      .rejects
      .toThrow('Invalid Credentials');
  });

  it('Deve lançar erro quando usuário não for encontrado pelas credenciais', async () => {
    const loginService = new LoginService();

    await expect(loginService.login(chance.email(), chance.string({ length: 8 })))
      .rejects
      .toThrow('User Not Found');
  });

  it('Deve lançar erro quando credenciais do usuário forem inválidas', async () => {
    const loginService = new LoginService();
    const usersService = new UsersService();

    const payload = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
    };

    await usersService.createUser(payload);

    await expect(loginService.login(payload.email, chance.string({ length: 8 })))
      .rejects
      .toThrow('Invalid Credentials');
  });
});
