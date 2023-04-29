const booksController = require('../../src/app/controllers/BooksController');
const pool = require('../../src/database')

jest.mock('../../src/database');

describe('BooksController', () => {
  describe('getAllBooks', () => {
    test('should return all books', async () => {
      const mockRows = [{ title: 'Book 1' }, { title: 'Book 2' }];
      const mockResults = { rows: mockRows };
      pool.query.mockImplementation((query, callback) => {
        callback(null, mockResults);
      });
      const mockReq = {};
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await booksController.getAllBooks(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockRows);
    });
  });
});
