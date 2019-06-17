const {URL} = require('url');
const configDal = require('../dal/config')
const entityDal = require('../dal/entities/users')
const dynroutes = require("../dynroutes.js");
const bcrypt = require("bcrypt");

let settingsStore = [
];

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.field = field;
  }
}

function assertValidLink ({url}) {
  try {
    new URL(url);
  } catch (error) {
    throw new ValidationError('Link validation error: invalid url.', 'url');
  }
}

module.exports = {
  Query: {
    savedSettings: async (root, {}, {orientDb, app}) => {
      let req = await configDal(orientDb).server.getCurrentSettings(app.state);
      let sets = [];
      for (const name in req[0]) {
        if (req[0].hasOwnProperty(name) && name[0] != "@") {
          const value = req[0][name];
          sets.push({value, name});
        }
      }
      return sets;
    },
    settings: async (root, {}, {orientDb, app}) => {
      return settingsStore;
    },
    state: (root, {}, {app}) => {
      return app.state;
    }
  },

  Mutation: {
    commit: async (root, {}, {orientDb, app}) => {
      let sets = {};
      
      for (let key in settingsStore) {
        sets[settingsStore[key].name] = settingsStore[key].value;
        if(!settingsStore[key].value) {
          return false;
        }
      }
      
      let potOrg = {
        name: sets.entreprise_general_name,
        address: sets.entreprise_general_address,
        city: sets.entreprise_general_city,
        postal: sets.entreprise_general_postalCode,
        country: sets.entreprise_general_country,
      }
      
      
    }
  }
};
