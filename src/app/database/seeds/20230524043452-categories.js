'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Administração, Negócios e Economia', created_at: new Date(), updated_at: new Date() },
      { name: 'Arte, Cinema e Fotografia', created_at: new Date(), updated_at: new Date() },
      { name: 'Artesanato, Casa e Estilo de Vida', created_at: new Date(), updated_at: new Date() },
      { name: 'Autoajuda', created_at: new Date(), updated_at: new Date() },
      { name: 'Biografias e Histórias Reais', created_at: new Date(), updated_at: new Date() },
      { name: 'Ciências', created_at: new Date(), updated_at: new Date() },
      { name: 'Computação, Informática e Mídias Digitais', created_at: new Date(), updated_at: new Date() },
      { name: 'Crônicas, Humor e Entretenimento', created_at: new Date(), updated_at: new Date() },
      { name: 'Direito', created_at: new Date(), updated_at: new Date() },
      { name: 'Educação, Referência e Didáticos', created_at: new Date(), updated_at: new Date() },
      { name: 'Engenharia e Transporte', created_at: new Date(), updated_at: new Date() },
      { name: 'Esportes e Lazer', created_at: new Date(), updated_at: new Date() },
      { name: 'Fantasia, Horror e Ficção Científica', created_at: new Date(), updated_at: new Date() },
      { name: 'Gastronomia e Culinária', created_at: new Date(), updated_at: new Date() },
      { name: 'HQs, Mangás e Graphic Novels', created_at: new Date(), updated_at: new Date() },
      { name: 'Infantil', created_at: new Date(), updated_at: new Date() },
      { name: 'LGBTQ+', created_at: new Date(), updated_at: new Date() },
      { name: 'Literatura e Ficção', created_at: new Date(), updated_at: new Date() },
      { name: 'Medicina', created_at: new Date(), updated_at: new Date() },
      { name: 'Policial, Suspense e Mistério', created_at: new Date(), updated_at: new Date() },
      { name: 'Política, Filosofia e Ciências Sociais', created_at: new Date(), updated_at: new Date() },
      { name: 'Religião e Espiritualidade', created_at: new Date(), updated_at: new Date() },
      { name: 'Romance', created_at: new Date(), updated_at: new Date() },
      { name: 'Saúde e Família', created_at: new Date(), updated_at: new Date() },
      { name: 'Turismo e Guias de Viagem', created_at: new Date(), updated_at: new Date() },
      { name: 'Inglês e Outras Línguas', created_at: new Date(), updated_at: new Date() },
      { name: 'Jovens e Adolescentes', created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('categories', null, []);
  }
};
