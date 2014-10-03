Meteor.subscribe("trips");

Template.newtrip.events({
'click .newtrip' : function() {Session.set("ShowTripForm", true) ;console.log("blablabla")},
'click .cancel.trip' : function() {Session.set("ShowTripForm", false)},
'click .save.trip' : function() {saveTrip()}
});

function saveTrip() {
	console.log(Trips.insert({
		tripname: $("#tripname")[0].value,
		datetime: $("#tripdatetime")[0].value,
		destination: "",
		cars: {},
		people: {}
	}))
}
Template.newtrip.ShowTripForm = function () { return Session.get("ShowTripForm") };

Template.tripform.rendered = function () {
	$('.datetimepicker').datetimepicker({
		language: "cs"
	});
}
