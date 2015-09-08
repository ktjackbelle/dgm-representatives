'use strict';

import path from 'path';
import express from 'express';
import Server from 'hyperbole';
import config from 'config';

import {name as title, description, version} from './package';

// Middleware
import {json, urlencoded} from 'body-parser';
import compression from 'compression';
import trailblazer from 'trailblazer';
import trailblazerCors from './lib/trailblazer-cors';
import trailblazerNotSupported from './lib/trailblazer-not-supported';
import trailblazerErrors from './lib/trailblazer-errors';
import trailblazerSwagger from './lib/trailblazer-swagger';

import routes from './routes';
import docs from './docs';

const PORT = config.get('port');

let trailblaze = trailblazer(routes);
let cors = trailblaze.plugin(trailblazerCors);
let notSupported = trailblaze.plugin(trailblazerNotSupported);
let errors = trailblaze.plugin(trailblazerErrors);
let swagger = trailblaze.plugin(trailblazerSwagger);

export let app = express();
export let server = new Server(app, PORT);

app.disable('x-powered-by');
app.set('json spaces', 2);

app.use(cors());
app.use(notSupported());
app.use(compression());
app.use(json());
app.use(urlencoded({extended: true}));
app.use(swagger({docs}));
app.use(trailblaze.routes());
app.use(errors());

export default server.start()
  .then(() => console.log(`Server started on port ${PORT}`))
  .catch((err) => console.error(err.stack));
