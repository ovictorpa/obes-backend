const Chance = require('chance');
const chance = new Chance();

const UserRepository = require('../../src/app/repositories/UserRepository');
const truncateTables = require('../utils/truncateTables');

describe('UserRepository', () => {
  beforeEach(async () => {
    await truncateTables();
  });

  it('deve salvar um usuário comum no banco de dados', async () => {
    const repository = new UserRepository();

    const data = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
    };

    const user = await repository.create(data);

    expect(user.id).not.toBeNull();
    expect(user.name).not.toBeNull();
    expect(user.user_type).toBe('common');

  });

  it('deve salvar um usuário institucional no banco de dados', async () => {
    const repository = new UserRepository();

    const data = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8}),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'institutional',
      institution_type: 'escola'
    };

    const user = await repository.create(data);

    expect(user.id).not.toBeNull();
    expect(user.name).not.toBeNull();
    expect(user.user_type).toBe('institutional');

  });
});
