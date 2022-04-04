'use strict';

import request from 'request';

export function getUsers(callback) {
  request.get('https://www.mysite.com/api/users', (error, response, body) =>
    callback(JSON.parse(response.body))
  );
}
