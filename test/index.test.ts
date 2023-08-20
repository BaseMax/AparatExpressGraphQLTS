// index.test.ts
import { Server } from 'http';
import request from 'supertest';
import app from '../src/app';

describe('index', () => {
    let httpServer: any;

    before(async () => {
        httpServer = new Server(app.app);
        await startApolloServer(httpServer, { app: app.app });
    });

    describe('new App()', () => {
        it('Should initiate App successfully', (done) => {
            request(httpServer).post(`http://localhost:300${process.env.GRAPHQL_PATH}`).expect(200);
            return done();
        });
    });
});