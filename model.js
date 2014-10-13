Trips = new Mongo.Collection("trips");
Meteor.methods({

join:function(options) {
	check(options,{
		id: NonEmptyString,
		name: String,
		time: String,
	});
	Trips.update(id,{$push: {people:{ name: options.name, time:options.time}}})
}

})
