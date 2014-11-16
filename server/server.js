Meteor.publish("trips", function (tripId) {
return Trips.find({_id:tripId},{});
console.log("trololo"); 
});
findPlace = function(options) {
	var seekers = Trips.findOne(options.id).people;
	Log(seekers);
	var tripCars = Trips.findOne(options.id).cars;
	for (var i=0; i<seekers.length;i++) {
		var person = Persons.findOne(seekers[i]);
		var cars =Cars.find({capacity:{$gt:person.places},_id:{$in: tripCars},active:"active"});
		Log(cars.fetch());
		if(cars.count() > 0){
			var cap = 0;
			var selected;
			cars.forEach(function (car) {
				cap=car.capacity>cap?car.capacity:cap;
				selected = car;
			});
			if(Cars.update(selected._id,{$inc:{capacity:-person.places},$push:{passenger:seekers[i]}}))
			{
				Trips.update(options.id,{$pull:{people:seekers[i]}})
			}
		}else{
			Log("No active cars");
			var cars = Cars.find({capacity:{$gt:person.places},_id:{$in: tripCars}});
			var cap = 0;
			var selected;
			cars.forEach(function (car) {
				cap=car.capacity>cap?car.capacity:cap;
				selected = car;
			});
			if(selected){
			if(Cars.update(selected._id,{$inc:{capacity:-person.places},$push:{passenger:seekers[i]},$set:{active:"active"}}))
			{
				Log("jedeme "+seekers[i]);
				Trips.update(options.id,{$pull:{people:seekers[i]}})
			}
			}			
		}
	}
}


