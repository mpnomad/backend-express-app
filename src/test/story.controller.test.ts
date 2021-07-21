import chai, {expect} from 'chai';
import app from '../server';
import { request } from "express";
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
describe('/GET /stories/get-top-stories', () => {
    it('should GET top stories', async function () {
        const res = await chai.request(app)
            .get('/stories/get-top-stories/5').send({
                "status": 200,
                "data": [27897975, 27899918, 27893283, 27894903, 27896386, 27893181],
                "message": "Successfully retrieved top stories."
            });
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.data).not.to.be.empty;
        expect(res.body.data).to.be.an('array');
    });
});

describe('/POST /stories/save-top-stories', () => {
    it('should POST top stories', async function (done) {
        let limit = "10";
        const res = await chai.request(app)
            .post('/stories/save-top-stories').send('/stories/save-top-stories').send({
                "status": 400,
                "message": "Failed save stories."
            });
        done();
        expect(res.status).to.equal(400);
        expect(res.body).not.to.be.empty;
        expect(res.body.data).to.be.an('object');
    });
});
