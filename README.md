# Questioner  [![Build Status](https://travis-ci.org/luc-tuyishime/Questioner.svg?branch=develop)](https://travis-ci.org/luc-tuyishime/Questioner) [![Coverage Status](https://coveralls.io/repos/github/luc-tuyishime/Questioner/badge.svg?branch=develop)](https://coveralls.io/github/luc-tuyishime/Questioner?branch=develop)
Questioner​​ helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.


## User Interface (UI)
* HTML
* CSS
* Javascript

### UI Link Example
[Questioner link](https://luc-tuyishime.github.io/Questioner/)

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index (welcome message) |
| /api/v1/meetups | GET | Fetch all meetups |
| /api/v1/meetups/:id | GET | Fetch a particular meetup |
| /api/v1/questions/ | GET | Fetch all meetup questions  |
| /api/v1/upcomingMeetup | GET | Fetch all upcoming meetups |
| /api/v1/meetups | POST | Post to the collection of meetups |
| /api/v1/questions | POST | Post a question on meetup |
| /api/v1/meetups/:id | PATCH | Update a particular meetup |
| /api/v1/meetups/:id | PATCH | Update a particular meetup |
| /api/v1/questions/:id/upvote | PATCH | Upvote on a meetup question |
| /api/v1/questions/:id/downvote  | PATCH | Downvote on a meetup question |
| /api/v1/meetups/:id | DELETE | Delete a particular meetup |

## Tools Used

### Language
```
*Javascript*
```
### Server Environment
```
 *NodeJS* (run time Environment for running JS codes)
 ```
### Framework
```
 *Express* (used for building fast APIs)
 ```
### Testing Framework
```
 *Mocha* and *Chai*
 ```
### Style Guide
```
*Airbnb*
```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
nyc
```
### Git badge
```
coveralls
```
### Deployment
```
Heroku
```
### APP link Example

[heroku link](https://lucquestioner.herokuapp.com)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
To install the software on your local machine, you need first to clone the repository or download the zip file and once this is set up you are going to need this packages. [NodeJS]

```
 [Node Package Installer - NPM] this usually comes with Node or YARN in case NPM doesn't work.
```

## Installing
The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
> npm install
```

It will install the node_modules which will help you run the project on your local machine.

## Run the server
```
> npm start
```
## Run the test
```
> npm test
```


**Version 1.0.0**

## Contributor
- Jean luc Tuyishime <luctunechi45@gmail.com>

---

## License & copyright
Copyright (c) Jean luc Tuyishime, Software developer
