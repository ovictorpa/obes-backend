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

  describe('getBookById', () => {
    it('should return "Invalid Id" if the book id is not valid', () => {
      const req = { params: { id: 0 } };
      const send = jest.fn();
      const res = { send };

      booksController.getBookById(req, res);

      expect(send).toHaveBeenCalledWith('Invalid Id');
    });

    it('should return a book by id', () => {
      const req = { params: { id: '1' } };
      const json = jest.fn();
      const status = jest.fn(() => ({ json }));
      const res = { status };

      booksController.getBookById(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalled();
    });
  });

});
