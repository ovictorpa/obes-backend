const Chance = require('chance');
const truncateTables = require('../utils/truncateTables');
const UsersService = require('../../src/app/services/UsersService');

const chance = new Chance();

describe('UsersService', () => {
  beforeEach(async () => {
    await truncateTables();
  });

  it('Deve cadastrar um usuário comum', async () => {
    const service = new UsersService();

    const payload = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
    };

    const user = await service.createUser(payload);

    expect(user.id).not.toBe(null);
    expect(user.name).toBe(payload.name);
    expect(user.user_type).toBe('common');
  });

  it('Deve cadastrar um usuário institucional', async () => {
    const service = new UsersService();

    const payload = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'institutional',
      institution_type: 'escola'
    };

    const user = await service.createUser(payload);

    expect(user.id).not.toBe(null);
    expect(user.name).toBe(payload.name);
    expect(user.user_type).toBe('institutional');
  });

  it('Deve lançar erro quando tipo de usuário é nulo', async () => {
    const service = new UsersService();

    const payload = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
    };

    await expect(service.createUser(payload))
      .rejects
      .toThrow('Invalid User type');
  });

  it('Deve lançar erro quando tipo de usuário é inválido', async () => {
    const service = new UsersService();

    const payload = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'teste'
    };

    await expect(service.createUser(payload))
      .rejects
      .toThrow('Invalid User type');
  });

  it('Deve lançar erro quando usuário de mesmo email já existe', async () => {
    const service = new UsersService();

    const payload = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
    };

    await service.createUser(payload);

    await expect(service.createUser(payload))
      .rejects
      .toThrow('User Already Exists');
  });

  it('Deve encontrar um usuário pelo id', async () => {
    const service = new UsersService();

    const payload = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
    };

    const { id } = await service.createUser(payload);

    const user = await service.findById(id);

    expect(user.id).toBe(id);
    expect(user.email).toBe(payload.email);
  });

  it('Deve lançar um erro por não encontrar o usuário pelo id', async () => {
    const service = new UsersService();

    await expect(service.findById(1))
      .rejects
      .toThrow('User Not Found');
  });

  it('Deve atualizar um usuário', async () => {
    const service = new UsersService();

    const payload = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
    };

    const user = await service.createUser(payload);

    const newPayload = {
      id: user.id,
      name: chance.name(),
      email: chance.email(),
    };

    const updatedUser = await service.update(newPayload);

    expect(updatedUser.name).toBe(newPayload.name);
    expect(updatedUser.email).toBe(newPayload.email);
  });

  it('Deve lançar erro quando usuário não for encontrado pelo id para atualização', async () => {
    const service = new UsersService();

    const newPayload = {
      id: 1,
      name: chance.name(),
      email: chance.email(),
    };

    await expect(service.update(newPayload))
      .rejects
      .toThrow('User Not Found');
  });

  it('Deve remover um usuário pelo id', async () => {
    const service = new UsersService();

    const payload = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
    };

    const user = await service.createUser(payload);

    const confirmationDeletedUser = await service.deleteById(user.id);

    expect(confirmationDeletedUser).toBe(true);
  });

  it('Deve lançar erro quando usuário não for encontrado pelo id para remoção', async () => {
    const service = new UsersService();

    await expect(service.deleteById(1))
      .rejects
      .toThrow('User Not Found');
  });

  it('Deve encontrar usuário pelo campo email' , async () => {
    const service = new UsersService();

    const payload = {
      name: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 8 }),
      phone_number: chance.phone({ formatted: false }),
      user_type: 'common',
      cpf: chance.cpf(),
      birthday: chance.birthday(),
    };

    await service.createUser(payload);

    const userFound = await service.findBy({ email: payload.email });

    expect(userFound.email).toBe(payload.email);
    expect(userFound.name).toBe(payload.name);
  });

  it('Deve lançar erro por não encontrar usuário pelo campo email' , async () => {
    const service = new UsersService();

    await expect(service.findBy({ email: 'teste@teste.com' }))
      .rejects
      .toThrow('User Not Found');
  });
});
