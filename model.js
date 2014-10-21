Trips = new Mongo.Collection("trips");
NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length > 0;
});

Meteor.methods({
join:function(options) {
	check(options,{
		id: NonEmptyString,
		name: String,
		time: String,
	});
	Trips.update(options.id,{$push: {people:{ name: options.name, time:options.time}}})
}

})
