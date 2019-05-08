const express = require('express');
const { json2csvAsync } = require('json-2-csv');
const cacheDelegate = require(__base + 'delegates/cache.delegate');

const router = express.Router();

router.get('/cache', async (req, res, next) => {
    try {
        let runId = req.query.runId;
        let cache = await cacheDelegate.getAll(runId);
        res.json(cache);
    } catch (e) {
        // we delegate to the error-handling middleware
        next(e);
    }
});
router.get('/cache/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let cache = await cacheDelegate.get(id);

        let format = req.query.format;
        if (format && format.toLowerCase() === "csv") {
            try {
                let csv = await json2csvAsync(cache.data.result);
                res.header('Content-Type', 'text/csv').status(200).send(csv);
            }
            catch (e) {
                res.status(500).send("Error: Not able to parse the result as a csv!");
            }
        }
        else {
            res.json(cache);
        }
    } catch (e) {
        // we delegate to the error-handling middleware
        next(e);
    }
});

router.delete('/cache/:id', async (req, res, next) => {
    try {
        let id = req.params.id;

        let cache = await cacheDelegate.deleteCache(id);
        res.json(cache);
    } catch (e) {
        // we delegate to the error-handling middleware
        next(e);
    }
});

module.exports = router;