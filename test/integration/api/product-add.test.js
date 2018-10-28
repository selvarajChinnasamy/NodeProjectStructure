const expect = require('chai').expect,
    server = require('../../../server'),
    request = require('supertest')(server),
    productMock = require('../../fixtures/products'),
    UtilService = require('../../../libs/util.service');


describe('Product creation API', () => {
    const util = new UtilService();
    it('should create product', (done) => {
        request
            .post('/api/product')
            .set('Accept', 'application/json')
            .send(productMock)
            .end((err, response) => {
                if (err) done(err);
                expect(response.body.success).to.equal(true);
                expect(response.statusCode).to.equal(201);
                done();
            });
    });
    it('should not create product without values', (done) => {
        request
            .post('/api/product')
            .set('Accept', 'application/json')
            .send({})
            .end((err, response) => {
                if (err) done(err);
                expect(response.body.success).to.equal(false);
                expect(response.statusCode).to.equal(422);
                done();
            });
    });
    it('should not create product if any of required value is missing', (done) => {
        const value = util.shallowCopy(productMock);
        delete value.name;
        request
            .post('/api/product')
            .set('Accept', 'application/json')
            .send(value)
            .end((err, response) => {
                if (err) done(err);
                expect(response.body.success).to.equal(false);
                expect(response.statusCode).to.equal(422);
                done();
            });
    });
});