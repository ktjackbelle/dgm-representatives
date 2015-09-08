'use strict';

import {
  allByZip,
  repsByName,
  repsByState,
  sensByName,
  sensByState
} from './lib/reps';

import promiseware from './lib/promiseware';

let sendValue = (req, res) => res.json(req.value);

let routes = {
  '/all/by-zip/:zip': {
    route: {get: [
      promiseware((req) => allByZip(req.params.zip)),
      sendValue
    ]},
    docs: {
      get: {
        summary: 'Congress Members by Zip',
        parameters: [{
          name: 'zip',
          in: 'path',
          type: 'string',
          required: true
        }],
        tags: ['Senators', 'Representatives'],
        responses: {
          '200': {
            description: 'An array of congress members',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                $ref: '#/definitions/CongressMember'
              }
            }
          }
        }
      }
    }
  },
  '/reps/by-name/:name': {
    route: {get: [
      promiseware((req) => repsByName(req.params.name)),
      sendValue
    ]},
    docs: {
      get: {
        summary: 'Representatives by Name',
        parameters: [{
          name: 'name',
          in: 'path',
          type: 'string',
          description: 'The last name of the representatives to search for',
          required: true
        }],
        tags: ['Representatives'],
        responses: {
          '200': {
            description: 'An array of Representatives',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                $ref: '#/definitions/CongressMember'
              }
            }
          }
        }
      }
    }
  },
  '/reps/by-state/:state': {
    route: {get: [
      promiseware((req) => repsByState(req.params.state)),
      sendValue
    ]},
    docs: {
      get: {
        summary: 'Representatives by State',
        parameters: [{
          name: 'state',
          in: 'path',
          type: 'string',
          description: 'The State of the representatives to search for',
          required: true
        }],
        tags: ['Representatives'],
        responses: {
          '200': {
            description: 'An array of Representatives',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                $ref: '#/definitions/CongressMember'
              }
            }
          }
        }
      }
    }
  },
  '/sens/by-name/:name': {
    route: {get: [
      promiseware((req) => sensByName(req.params.name)),
      sendValue
    ]},
    docs: {
      get: {
        summary: 'Senators by Name',
        parameters: [{
          name: 'name',
          in: 'path',
          type: 'string',
          description: 'The last name of the senators to search for',
          required: true
        }],
        tags: ['Senators'],
        responses: {
          '200': {
            description: 'An array of Senators',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                $ref: '#/definitions/CongressMember'
              }
            }
          }
        }
      }
    }
  },
  '/sens/by-state/:state': {
    route: {get: [
      promiseware((req) => sensByState(req.params.state)),
      sendValue
    ]},
    docs: {
      get: {
        summary: 'Senators by State',
        parameters: [{
          name: 'state',
          in: 'path',
          type: 'string',
          description: 'The State of the senators to search for',
          required: true
        }],
        tags: ['Senators'],
        responses: {
          '200': {
            description: 'An array of Senators',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                $ref: '#/definitions/CongressMember'
              }
            }
          }
        }
      }
    }
  }
};

export default Object.keys(routes).map((uri) => ({uri, module: routes[uri]}));
