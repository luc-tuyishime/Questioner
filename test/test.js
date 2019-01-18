import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

import rsvp from '../models/rsvp';

import meetups from '../models/meetups';

chai.use(chaiHttp);

chai.should();

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


// test create a meetup
describe('update a meetup', () => {
  it('/PATCH /meetups/<meetupId>', (done) => {
    const meetup = {
      createdOn: "17/01/19",
      location: "kigali",
      topic: "we here",
      happeningOn: "03/01/19",
      tags: "java rubi"
    };
    chai.request(app)
      .patch('/api/v1/meetups/1')
      .send(meetup)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
});


describe('Get all upcoming meetup', () => {
  it('/GET/meetups/upcoming', (done) => {
    chai.request(app)
      .get('/api/v1/meetup/upcoming')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
});


// test create a question
describe('create a question', () => {
  it('/POST /meetups/<meetup-Id>/question', (done) => {
    const meetup = {
      title: 'voila',
      body: 'ici on est au calm'
    };
    chai.request(app)
      .post('/api/v1/meetups/1/questions')
      .send(meetup)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
});


describe('create Rsvp for meetup', () => {
  it('/POST /meetups/<meetup-id>/rsvps', (done) => {
    chai.request(app)
      .post('/api/v1/meetups/1/rsvps')
      .send({
        status: 'no'
      })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
});

describe('/Delete a meetup', () => {
  it('/Delete/meetups/meetupId', (done) => {
    chai.request(app)
      .delete('/api/v1/meetups/2')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
});


// test upvote a question
describe('upvote a question', () => {
  it('Should upvote a question', (done) => {
    const upvote = {
      createdBy: 4,
      meetup: 2,
      title: "Greatest",
      body: "we must be here",
      upvote: 2,
      downvote: 0
    };
    chai.request(app)
      .patch('/api/v1/questions/1/upvote')
      .send(upvote)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
});

// test downvote a question
describe('upvote a question', () => {
  it('Should downvote a question', (done) => {
    const upvote = {
      createdBy: 4,
      meetup: 2,
      title: "Life",
      body: "we must be here",
      upvote: 2,
      downvote: 0
    };
    chai.request(app)
      .patch('/api/v1/questions/1/downvote')
      .send(upvote)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
});
