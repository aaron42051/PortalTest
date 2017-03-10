var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: String,
  startTime: Date,
  endTime: Date,
  desc: String,
  tasks: Array
});

var eventModel = mongoose.model('event', eventSchema);
router.get('/', function(req, res, next) {
  eventModel.find(function(err, events)
{
  console.log("getting events");
  if (err) return console.error(err);
  res.send(events);
  });
});


router.post('/', function(req, res, next)
{
  console.log("posting event");
  var newEvent = new eventModel(req.body);
  newEvent.save(function(err, event){
    if(err)
    {
      console.log(err);
      res.send(err);
    }

    else
    {
      console.log('sucessful post');
      res.json(event);
    }
  });
});

router.delete('/:id', function(req, res, next){
  eventModel.remove({_id: req.params.id}, function(err){
    if(err) res.send("Nothing to delete?");
  });
  res.send("Removed: " + req.params.id);

});

module.exports = router;
