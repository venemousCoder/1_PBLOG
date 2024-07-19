// Import the necessary modules
const jest = require('jest');
const { createArticle } = require('../controllers/articleControllers');
const articles = require('../models/articles'); // Mock this module

// Mock the articles model
jest.mock('../models/articles');

const req = {
    body: {
        title: "abc",
        content: "blah blah blah",
        tags: ["hello", "world"]
    }
}

const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
}


describe('createArticle', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                title: 'Test Title',
                content: 'Test Content',
                tags: ['test', 'article']
            }
        };

        res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
    });

    it('should create an article and return 200 with the created article', async () => {
        const mockArticle = {
            title: 'Test Title',
            content: 'Test Content',
            tags: ['test', 'article'],
            publisheDate: Date.now()
        };

        articles.create.mockResolvedValue(mockArticle);

        await createArticle(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 200,
            createdArticle: mockArticle,
            msg: 'Article created successfully'
        });
    });

    it('should return 500 if article creation fails', async () => {
        const error = new Error('Creation failed');
        articles.create.mockRejectedValue(error);

         createArticle(req, res);

        console.log('res.status calls:', res.status.mock.calls); // Log the calls to res.status
        console.log('res.json calls:', res.json.mock.calls); // Log the calls to res.json

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 500,
            error: error,
            msg: 'Article not created'
        });
    });
});