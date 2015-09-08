'use strict';

// http://whoismyrepresentative.com/api

import Promise from 'bluebird';
import config from 'config';
import request from 'superagent';

const REP_HOST = config.get('repHost');

function wrap(uri, queryName, defaultVal = '') {
  const URL = `${REP_HOST}/${uri}`;
  return (queryVal = defaultVal) => Promise
    .fromNode((cb) => request
      .get(URL)
      .query({
        [queryName]: queryVal,
        output: 'json'
      })
      .end(cb)
    )
    .then(({text}) => {
      try { return JSON.parse(text); }
      catch (err) { return {results: []}; }
    })
    .then(({results}) => results)
    .map((member) => {
      let district = parseInt(member.district, 10);
      member.type = isNaN(district)
        ? 'senator'
        : 'representative';
      return member;
    });
}

export let allByZip    = wrap('getall_mems.php', 'zip');
export let repsByName  = wrap('getall_reps_byname.php', 'name');
export let repsByState = wrap('getall_reps_bystate.php', 'state');
export let sensByName  = wrap('getall_sens_byname.php', 'name');
export let sensByState = wrap('getall_sens_bystate.php', 'state');
