/**
 * Testimonials.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: false
    },
    body: {
      type: 'string',
      required: false
    },
    autor: {
      type: 'string',
      required: false
    },
    image: {
      type: 'string',
      required: false
    }

  },

};

