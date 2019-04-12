global.__base = __dirname + '/';

const express = require('express');
const bodyParser = require('body-parser');
const Boom = require('boom');
const cors = require('cors');

const errorsHelper = require('./utils/errors');

const projectsController = require('./integration/controllers/projects.controller');
const workflowsController = require('./integration/controllers/workflows.controller');
const templateDoController = require('./integration/controllers/template-do.controller');
const cacheController = require('./integration/controllers/cache.controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// health check (public endpoint)
app.get('/', (req, res) => {
  res.json({ msg: 'Hello world!' });
});


// define routes here
app.use(projectsController);
app.use(workflowsController);
app.use(templateDoController);
app.use(cacheController);


app.use((e, req, res, next) => {
  console.error('[Error]', e);
  let error = errorsHelper.createServiceError(e);


  if (error.status === 401 && !error.isBoom) {
    const message = 'Not authorized to perform the request';
    error = Boom.unauthorized(message);
  }

  if (!error.isBoom) {
    error = Boom.badImplementation();
  }
  res.status(error.output.statusCode).send(error.output);
});
module.exports = app;
