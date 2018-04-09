/**
 * TestimonialsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list:function(req, res){
    Testimonials.find().exec(function(err, testimonials){
      if(err){
        res.send(500, {error: 'Database Error'});
      }
      res.send(testimonials);
    });
  },
  create:function(req, res){
    var title = req.body.title;
    var body = req.body.body;
    var autor = req.body.autor;
    var image = req.body.image;

    Testimonials.create({title:title, body:body, autor:autor, image:image}).exec(function(err){
      if(err){
        res.send(500, {error: 'Database Error'});
      } else {
        res.sendStatus(200);
      }
    });
  },
  destroy: function(req, res){
    Testimonials.destroy({id:req.params.id}).exec(function(err){
      if(err){
        res.send(500, {error: 'Database Error'});
      } else {
        res.sendStatus(200);
      }
    });

    return false;
  },
  update: function(req, res){
    var title = req.body.title;
    var body = req.body.body;
    var autor = req.body.autor;
    var image = req.body.image;

    Testimonials.update({id: req.params.id},{title:title, body:body, autor:autor, image:image}).exec(function(err){
      if(err){
        res.send(500, {error: 'Database Error'});
      } else {
        res.sendStatus(200);
      }
    });

    return false;
  }

};
