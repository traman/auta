Meteor.subscribe("trips");

Template.newtrip.events({
'click .newtrip' : function() {Session.set("ShowTripForm", true) ;console.log("blablabla")},
'click .cancel.trip' : function() {Session.set("ShowTripForm", false)}
});

Template.newtrip.ShowTripForm = function () { return Session.get("ShowTripForm") };

Template.tripform.rendered = function () {
	$('.datetimepicker').datetimepicker({
		language: "cs"
	});
}
