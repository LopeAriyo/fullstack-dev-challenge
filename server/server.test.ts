import * as app from "./server";
import "mocha";
import chai, { expect } from "chai";
import chaiHttp from 'chai-http'

chai.use(chaiHttp);

describe("App", () => {
    describe("POST /api/savings", () => {
        it("should return a successful status given the body request is valid", done => {
            const requestBody = {
                initialDeposit: 500,
                ratePercentage: 1.25,
                monthlyDeposit: 100,
            };

          chai.request('http://localhost:3001')
                .post("/api/savings")
                // .set('content-type', 'application/json')
                .send(requestBody)
                .end((err: any, res: any) => {
                        expect(res).to.have.status(200)
                        done()
                    })
                
        });
        it("should return a 400 status given the body request is invalid", done => {
            const requestBody = {
                initialDeposit: 500,
                ratePercentage: 0,
                monthlyDeposit: 100,
            };

          chai.request('http://localhost:3001')
                .post("/api/savings")
                // .set('content-type', 'application/json')
                .send(requestBody)
                .end((err: any, res: any) => {
                        expect(res).to.have.status(400)
                        done()
                    })
                
        });
    });
});
