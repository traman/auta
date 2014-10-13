Meteor.subscribe("trips");

Template.newtrip.events({
'click .newtrip' : function() {Session.set("ShowTripForm", true) ;console.log("blablabla")},
'click .cancel' : function() {Session.set("ShowTripForm", false)},
'click .save' : function() {saveTrip()}
});

Template.join.events({
'click .joinbutton' : function() {Session.set("joinForm", true)},
'click .save' : function() {
	var name=template.find("personName");
	Meteor.call("join",{name: name});
},
'change #beruauto' : function() {console.log("autoberu"); Session.set("autoberu", Template.instance().find("#beruauto").checked)}
}
)
function saveTrip() {
	id = (Trips.insert({
		tripname: $("#tripname")[0].value,
		datetime: $("#tripdatetime")[0].value,
		destination: "",
		cars: [],
		people:[] 
	}))
	Session.set("ShowTripForm", false);
	Session.set("url", id);
}
Template.newtrip.ShowTripForm = function () { return Session.get("ShowTripForm") };
Template.registerHelper("url", function () { return Session.get("url")});
Template.registerHelper("joinForm", function () {return Session.get("joinForm")});
Template.registerHelper("autoberu", function () {return Session.get("autoberu")});
Template.tripform.rendered = function () {
	$('.datetimepicker').datetimepicker({
		language: "cs"
	});
}
