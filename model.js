Trips = new Mongo.Collection("trips");
Persons = new Mongo.Collection("persons");
Cars = new Mongo.Collection("cars");
NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length > 0;
});
ValidTime = Match.Where(function (x) {
return /^\s*([0-2]?[0-9]\s*.\s*[0-1]?[0-9]\s*.\s*\d{2,4})?\s*[0-2]?[0-9]\s*[.:]\s*[0-5][0-9]\s*$/.test(x);
});
Meteor.methods({
join:function(options) {
	check(options,{
		id: NonEmptyString,
		name: NonEmptyString,
		time: Match.Optional(ValidTime),
		capacity: Match.Optional(Number),
		place: Match.Optional(String),
		takeCar: Match.Optional(Boolean)
	});
	var personId=Persons.insert({name:options.name, time:options.time});	
	Trips.update(options.id,{$push: {people:personId}});
	if(options.takeCar){
		Meteor.call("addcar", {id: options.id, capacity: options.capacity, place:options.place, driver:personId});
	}
	findPlace(personId);
},
addcar:function(options) {
	console.log(options.capacity);
	check(options,{
		id: NonEmptyString,
		capacity: Number,
		place: String,
		driver:NonEmptyString});
	carId=Cars.insert({capacity: options.capacity, place:options.place, driver:options.driver, passenger:[], active:false});
	Trips.update(options.id,{$push: {cars:carId}});
}

})
