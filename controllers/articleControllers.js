const articles = require('../models/articles');


function createArticle(req, res) {
    const response = {}
    const newArticle = {
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        publisheDate: Date.now()
    }
    console.log(newArticle)
    articles.create(newArticle)
        .then((article) => {
            response.createdArticle = article;
            response.msg = 'Article created successfully';
         res.status(200)
         res.json(response);
         return;

        }).catch((err) => {

            response.statusCode = 500;
            response.error = err;
            response.msg = 'Article not created'
             res.status(500)
            res.json(response);
            return;

        });
}

function deleteArticle(req, res) {
    articles.findOneAndDelete({ title: req.body.title })
        .then((deletedArticle) => {
            return res.status(200).json({ msg: `deleted ${deletedArticle.title}` })
        }).catch((err) => {
            return res.status(500).json({ error: err, msg: 'could not delete article' })
        });
}

function updateArticle(req, res) {
    const title = req.body.title;
    articles.findOneAndUpdate({ title: req.body.title }, { title: req.body.utitle, content: req.body.content, tags: req.body.tags }, { new: true })
        .then((updatedArticle) => {
            return res.status(200).json({ msg: `updated ${title}`, article: updatedArticle });
        }).catch((err) => {
            return res.status(500).json({ error: err, msg: 'could not update article' });
        });
}

function findArticle(req, res) {
    const title = req.body.title;
    const tag = req.body.tags.map((tag) => {
        return new RegExp(tag, 'i');
    });
    let page = req.query.page || 0;
    let articlesPerPage = req.query.app || 3;
    if (tag) {
        //
        articles.aggregate([{ $match: { tags: { $in: tag } } }]).skip(page * articlesPerPage).limit(parseInt(articlesPerPage))
            .then((searchResults) => {
                console.log('test', searchResults);
                return res.status(200).json({ msg: `search result for "${title || tag}"`, results: searchResults });
            }).catch((err) => {
                return res.status(500).json({ error: err, msg: 'could not search for article' });
            });
    } else if (title) {
        articles.find({ title: title })
            .then((searchResults) => {
                return res.status(200).json({ msg: `search result for "${title}"`, results: searchResults });
            })
            .catch((err) => {
                return res.status(500).json({ error: err, msg: 'could not search for article' });
            })

    }
    else {
        articles.find().sort({ createdAt: -1 })
            .then((searchResults) => {
                return res.status(200).json({ msg: `All articles`, results: searchResults });
            }).catch((err) => {
                return res.status(500).json({ error: err, msg: 'could not search for article' });
            });
    }
}
module.exports = { createArticle, deleteArticle, updateArticle, findArticle }