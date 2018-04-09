
module.exports.routes = {

  '/': {
    view: 'pages/homepage'
  },

  'post /testimonials': 'TestimonialsController.create',
  'get /testimonials': 'TestimonialsController.list',
  'put /testimonials/:id?': 'TestimonialsController.update',
  'delete /testimonials/:id?': 'TestimonialsController.destroy'

};
