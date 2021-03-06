import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);

chai.should();


describe('/get all meetups', () => {
  it('Should be able to get all the meetups', (done) => {
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
  it('Should be able to get a specific meetup', (done) => {
    chai.request(app)
      .get('/api/v1/meetups/1')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should not be abe to get a specific meetup', (done) => {
    chai.request(app)
      .get('/api/v1/meetups/42423')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(404);
        done();
      });
  });
});

// test create a meetup
describe('create a meetup', () => {
  it('Should be able to create a meetup', (done) => {
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

  it('Should not be able to create a meetup', (done) => {
    const meetup = {
      createdOn: 'January 06 2019',
      location: '',
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
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
});


// test create a meetup
describe('update a meetup', () => {
  it('Should be able update a meetup', (done) => {
    const meetup = {
      createdOn: '17/01/19',
      location: 'kigali',
      topic: 'we here',
      happeningOn: '03/01/19',
      tags: 'java rubi'
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

  it('Should not be able to update a meetup', (done) => {
    const meetup = {
      createdOn: '17/01/19',
      location: '',
      topic: 'we here',
      happeningOn: '03/01/19',
      tags: 'java rubi'
    };
    chai.request(app)
      .patch('/api/v1/meetups/1')
      .send(meetup)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
});

describe('/Delete a meetup', () => {
  it('should be able to delete a meetup', (done) => {
    chai.request(app)
      .delete('/api/v1/meetups/2')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });

  it('should not be able to delete a meetup', (done) => {
    chai.request(app)
      .delete('/api/v1/meetups/4342')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(404);
        done();
      });
  });
});


describe('Get all upcoming meetup', () => {
  it('Should be able to get all the upcoming meetups', (done) => {
    chai.request(app)
      .get('/api/v1/meetups/upcoming')
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
  it('Should be able create a meetup', (done) => {
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
  it('Should be able to rsvp to a meetup', (done) => {
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

  it('Should not be able to rsvp to a meetup', (done) => {
    chai.request(app)
      .post('/api/v1/meetups/1/rsvps')
      .send({
        status: ''
      })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
});

// test upvote a question
describe('upvote a question', () => {
  it('Should be able to upvote a question', (done) => {
    const upvote = {
      createdBy: 4,
      meetup: 2,
      title: 'Greatest',
      body: 'we must be here',
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

  it('Should not be able to upvote a question', (done) => {
    const upvote = {
      createdBy: 4,
      meetup: 2,
      title: 'Greatest',
      body: 'we must be here',
      upvote: 2,
      downvot: 0
    };
    chai.request(app)
      .patch('/api/v1/questions/34223/upvote')
      .send(upvote)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(404);
        done();
      });
  });
});

// test downvote a question
describe('upvote a question', () => {
  it('Should be able to downvote a question', (done) => {
    const upvote = {
      createdBy: 4,
      meetup: 2,
      title: 'Life',
      body: 'we must be here',
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

  it('Should not be able to downvote a question', (done) => {
    const upvote = {
      createdBy: 4,
      meetup: 2,
      title: 'Life',
      body: 'we must be here',
      upvote: 2,
      downvote: 0
    };
    chai.request(app)
      .patch('/api/v1/questions/34/downvote')
      .send(upvote)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(404);
        done();
      });
  });
});

describe('get all the users', () => {
  it('Should be able to get all the users', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
});

// Get single meetup test
describe('get a specific user', () => {
  it('Should be able to get a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/users/1')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should be not able to get a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/users/345324')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(404);
        done();
      });
  });
});

// test create a meetup
describe('create a user', () => {
  it('Should be able to create a user', (done) => {
    const user = {
      firstname: 'jean luc',
      lastname: 'tuyishime',
      othername: 'pierre',
      email: 'luc@gmail.com',
      phoneNumber: '0784421255',
      username: 'pills',
      registered: 'yesss',
      isAdmin: false
    };
    chai.request(app)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(201);
        done();
      });
  });

  it('Should not be able to create a user', (done) => {
    const user = {
      firstname: 'jean luc',
      lastname: 'tuyishime',
      othername: 'pierre',
      email: 'luc@gmail.com',
      phoneNumber: '0784421255',
      username: 'pill',
      registered: 'yes',
      isAdmin: false
    };
    chai.request(app)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
});

describe('update a user', () => {
  it('Should be able to update a user', (done) => {
    const user = {
      firstname: 'iciccc',
      lastname: 'labass',
      othername: 'lolalaa',
      email: 'licc@gmail.com',
      phoneNumber: '07345421255',
      username: 'rwerww',
      registered: 'registered',
      isAdmin: false
    };
    chai.request(app)
      .patch('/api/v1/users/1')
      .send(user)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });

  it('Should not be able to update a user', (done) => {
    const user = {
      firstname: 'jean luc',
      lastname: 'tuyishime',
      othername: 'pierre',
      email: 'luc@gmail.com',
      phoneNumber: '0784421255',
      username: 'pillss',
      registered: 'regsitered',
      isAdmin: false
    };
    chai.request(app)
      .patch('/api/v1/users/4234234')
      .send(user)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(404);
        done();
      });
  });
});

describe('/Delete a user', () => {
  it('should be able to delete a user', (done) => {
    chai.request(app)
      .delete('/api/v1/users/1')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });

  it('should not be able to delete a user', (done) => {
    chai.request(app)
      .delete('/api/v1/users/324324')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(404);
        done();
      });
  });
});
