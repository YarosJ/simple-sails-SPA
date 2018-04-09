
module.exports.views = {

  extension: 'pug',
  getRenderFn: function () {
    let consolidate = require('consolidate');
    return consolidate.pug;
  },
  layout: false

};
