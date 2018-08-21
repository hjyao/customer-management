const expect = require('expect');
const request = require('supertest');

const app = require('../../app');
const Customer = require('../../src/models/customer');

const kitty = {
    name: 'Hello Kitty',
    mobile: 61413281367,
    address: 'Singapore',
    status: 0,
    notes: ['note1', 'note2']
};

before((done) => {
    Customer.remove({}).then(() => done())
});

describe('POST /customers', () => {
    it('should create a new customer', (done) => {
        const kitty = {
            name: 'Hello Kitty',
            address: 'Singapore',
            mobile: 61413281367,
            status: 0,
            notes: ['note1', 'note2']
        };
        request(app)
            .post('/customers')
            .set('Accept', 'application/json')
            .send(kitty)
            .expect(200)
            .expect((res) => {
                expect(res.text).toBe('Customer created successfully')
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Customer.find({mobile: kitty.mobile}).then((customers) => {
                    expect(customers.length).toBe(1);
                    expect(customers[0].mobile).toBe(kitty.mobile);
                    expect(customers[0].address).toBe(kitty.address);
                    expect(customers[0].status).toBe(kitty.status);
                    expect(customers[0].notes).toBe([...kitty.notes].join(','));
                    done();
                }).catch((e) => done(e))
            })
    });

    describe('should not create Customer with invalid data', (done) => {
        it('given empty data', (done) => {
            request(app)
                .post('/customers')
                .send({})
                .set('Accept', 'application/json')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err)
                    }

                    Customer.find({}).then((customers) => {
                        expect(customers.length).toBe(1);
                        done();
                    }).catch((e) => done(e))
                })
        });

        it('given deficient data', (done) => {
            const customerWithoutName = {
                address: 'address',
                mobile: 123,
                status: 0
            };
            request(app)
                .post('/customers')
                .send(customerWithoutName)
                .set('Accept', 'application/json')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err)
                    }
                    done();
                })
        });

        it('given data with wrong data type', (done) => {
            let kittyWithWrongDataType = Object.assign({}, kitty);
            kittyWithWrongDataType.status = 'string status';
            request(app)
                .post('/customers')
                .send(kittyWithWrongDataType)
                .set('Accept', 'application/json')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err)
                    }
                    done();
                })
        });
    })
});

describe('GET /customers', () => {
    it('should get all customers with view customized fields', (done) => {
        request(app)
            .get('/customers')
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(1);
                expect(res.body[0].id).toBeDefined();
                expect(res.body[0].notes).toBeUndefined();
                expect(res.body[0].created).toBeDefined();

                expect(res.body[0].mobile).toBe(kitty.mobile);
                expect(res.body[0].address).toBe(kitty.address);
                expect(res.body[0].status).toBe(kitty.status);
            })
            .end(done)
    });
});

describe('GET /customers/:id', () => {
    it('should get specific customer by id', (done) => {
        request(app)
            .get('/customers')
            .expect(200)
            .expect((res) => {
                expect(res.body[0].id).toBeDefined();
            })
            .end((err, res) => {
                const id = res.body[0].id;
                return request(app)
                    .get(`/customers/${id}`)
                    .expect(200)
                    .expect((embedRes) => {
                        expect(embedRes.body._id).toBe(id);
                        expect(embedRes.body.name).toBe(kitty.name);
                    })
                    .end(done);
            });
    });
});

describe('PATCH /customers/:id', () => {
    it('should update specific customer by id', (done) => {
        request(app)
            .get('/customers')
            .expect(200)
            .expect((res) => {
                expect(res.body[0]).toBeDefined();
            })
            .end((err, res) => {
                const originalCustomer = res.body[0];
                const id = res.body[0].id;
                let newNotes = ['new1', 'new2', 'note1'];
                return request(app)
                    .patch(`/customers/${id}`)
                    .send({status: 2, notes: newNotes})
                    .expect(200)
                    .end((err, embedRes) => {
                        if (err) {
                            return done(err)
                        }
                        Customer.find({_id: id}).then((customers) => {
                            expect(customers.length).toBe(1);
                            expect(customers[0].status).toBe(2);
                            expect(customers[0].notes).toBe(newNotes.join(','));
                            done();
                        }).catch(done)
                    });
            });
    });

    it('should not update data given invalid data', (done) => {
        request(app)
            .get('/customers')
            .expect(200)
            .expect((res) => {
                expect(res.body[0]).toBeDefined();
            })
            .end((err, res) => {
                const originalCustomer = res.body[0];
                const id = res.body[0].id;
                const originalStatus = res.body[0].status;
                return request(app)
                    .patch(`/customers/${id}`)
                    .send({status: 'invalid status', notes: ['note']})
                    .expect(400)
                    .end((err, embedRes) => {
                        if (err) {
                            return done(err)
                        }
                        Customer.find({_id: id}).then((customers) => {
                            expect(customers.length).toBe(1);
                            expect(customers[0].status).toBe(originalStatus);
                            done();
                        }).catch(done)
                    });
            });
    });
});

