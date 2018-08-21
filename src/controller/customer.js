const Customer = require('../models/customer');

exports.create = (req, res, next) => {
    let customer = new Customer({
        name: req.body.name,
        address: req.body.address,
        mobile: req.body.mobile,
        status: req.body.status,
        notes: (req.body.notes || []).join(',')
    });
    customer.save((error) => {
        if (error) {
            return res.status(400).send(error);
        }
        res.send('Customer created successfully');
    });
};

exports.list = (req, res, next) => {
    Customer.find({}, (error, customers) => {
        const viewData = customers.map((customer) => {
            return {
                id: customer._id,
                name: customer.name,
                address: customer.address,
                mobile: customer.mobile,
                status: customer.status,
                created: customer.createdAt
            }
        });
        res.send(viewData);
    });
};

exports.find = (req, res, next) => {
    Customer.findById(req.params.id, (error, customer) => {
        res.send(customer);
    });
};

exports.patch = (req, res, next) => {
    Customer.findById(req.params.id, (error, customer) => {
        customer.status = req.body.status;
        customer.notes = (req.body.notes || []).join(',');
        customer.save((error) => {
            if(error) {
                return res.status(400).send(error);
            }
            res.send('Customer updated successfully');
        });
    });
};