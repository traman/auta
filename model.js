Trips = new Mongo.Collection("trips");
NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length > 0;
});
ValidTime = Match.Where(function (x) {
Log(x);
return /^\s*([0-2]?[0-9]\s*.\s*[0-1]?[0-9]\s*.\s*\d{2,4})?\s*[0-2]?[0-9]\s*[.:]\s*[0-5][0-9]\s*$/.test(x);
});
Meteor.methods({
join:function(options) {
	check(options,{
		id: NonEmptyString,
		name: NonEmptyString,
		time: Match.Optional(ValidTime),
	});
	Trips.update(options.id,{$push: {people:{ name: options.name, time:options.time}}})
},
addcar:function(options) {
	check(options,{
		capacity: Integer,
		place: String});
	Trips.update(options.id,{$push:{cars: {capacity: options.capacity, place:options.place, driver:options.driver}}});
	
}

})
