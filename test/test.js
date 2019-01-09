import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);

chai.should();

const meetups = [
  {
    id: 1,
    createdOn: '10/01/2019',
    location: 'klab',
    topic: 'Learn how to code for fun',
    happeningOn: '12/01/2019',
    tags: ['html', 'css', 'Javascript']
  },
  {
    id: 2,
    createdOn: '15/01/2019',
    location: 'Marriot Hotel',
    topic: 'Mastering Javascript',
    happeningOn: '19/01/2019',
    tags: ['react', 'angular', 'coffescript']
  }
];

describe('/get all meetups', () => {
  it('/GET /meetups/', (done) => {
    chai.request(app)
      .get('/api/v1/meetups').end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
});

// Get single meetup test
describe('/get a specific meetup', () => {
  it('/GET /meetups/<meetup-id>', (done) => {
    chai.request(app)
      .get('/api/v1/meetups/1')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
});

// test create a meetup
describe('create a meetup', () => {
  it('/POST /meetups/', (done) => {
    const meetup = {
      id: meetups.length + 1,
      createdOn: 'January 06 2019',
      location: 'klab',
      topic: 'Learn how to code',
      happeningOn: '01/13/2019',
      tags: 'html  css'
    };
    chai.request(app)
      .post('/api/v1/meetups')
      .send(meetup)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(201);
        done();
      });
  });
});


describe('Get all upcoming meetup', () => {
  it('/GET/meetups/upcoming', (done) => {
    chai.request(app)
      .get('/api/v1/upcomingMeetup/')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
});
