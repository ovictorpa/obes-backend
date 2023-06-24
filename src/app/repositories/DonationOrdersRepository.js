const { Op } = require('sequelize');
const DonationOrder = require('../models/DonationOrder');
const BadRequest = require('../services/errors/BadRequest');
const Book = require('../models/Book');

class DonationOrdersRepository {
  async create({ book_id, user_id }) {
    try {
      const donationOrder = await DonationOrder.create({
        book_id,
        user_id,
        date: new Date()
      });

      return donationOrder;
    }catch(e){
      throw new BadRequest(e.message, e.errors);
    }
  }

  async findByUserId(user_id) {
    try {
      const donationOrders = await DonationOrder.findAll({
        where: {
          user_id: {
            [Op.eq]: user_id
          }
        },
        include: [
          {
            model: Book,
          }
        ]

      });

      return donationOrders;
    } catch(e) {
      throw new BadRequest(e.message, e.errors);
    }
  }
}

module.exports = DonationOrdersRepository;
