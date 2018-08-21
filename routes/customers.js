var express = require('express');
var router = express.Router();

const customerController = require('../src/controller/customer');

router.get('/', function (req, res, next) {
    customerController.list(req, res, next);
});

router.get('/:id', function (req, res, next) {
    customerController.find(req, res, next);
});

router.post('/', function (req, res, next) {
    customerController.create(req, res, next);
});

router.patch('/:id', function (req, res, next) {
    customerController.patch(req, res, next);
});

module.exports = router;
