/**
 * TestimonialsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: function (req, res) {
    Testimonials.find().exec(function (err, testimonials) {
      if (err) {
        res.send(500, {error: 'Database Error'});
      }
      res.send(testimonials);
    });
  },
  create: function (req, res) {
    let body = req.body;

    Testimonials.create({
      title: body.title,
      body:  body.body,
      autor: body.autor,
      image: body.image
    }).exec(function (err) {
      if (err) {
        res.send(500, {error: 'Database Error'});
      } else {
        res.sendStatus(200);
      }
    });
  },
  destroy: function (req, res) {
    Testimonials.destroy({id: req.params.id}).exec(function (err) {
      if (err) {
        res.send(500, {error: 'Database Error'});
      } else {
        res.sendStatus(200);
      }
    });

    return false;
  },
  update: function (req, res) {
    let body = req.body;

    Testimonials.update({id: req.params.id}, {
      title: body.title,
      body:  body.body,
      autor: body.autor,
      image: body.image
    }).exec(function (err) {
      if (err) {
        res.send(500, {error: 'Database Error'});
      } else {
        res.sendStatus(200);
      }
    });

    return false;
  }

};
