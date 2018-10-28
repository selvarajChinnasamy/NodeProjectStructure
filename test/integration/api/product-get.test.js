const expect = require('chai').expect,
    server = require('../../../server'),
    request = require('supertest')(server),
    productMock = require('../../fixtures/products'),
    UtilService = require('../../../libs/util.service');


describe('Product GET API', () => {
    const util = new UtilService();
    it('should get product list', (done) => {
        request
            .get('/api/product')
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) done(err);
                expect(response.body.success).to.equal(true);
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
});