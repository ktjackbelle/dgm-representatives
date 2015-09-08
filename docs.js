'use strict';

import {name as title, description, version} from './package';

export default {
  info: {title, description, version},
  definitions: {
    CongressMember: {
      properties: {
        name: {type: 'string'},
        party: {type: 'string'},
        state: {type: 'string'},
        district: {type: 'string'},
        phone: {type: 'string'},
        office: {type: 'string'},
        link: {type: 'string'},
        type: {type: 'string'}
      }
    }
  }
};
