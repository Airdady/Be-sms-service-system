const uuid = require('uuid');

export default `AC.${uuid.v4().replace(/-/g, '.')}`;