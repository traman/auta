Meteor.subscribe("trips");
i18n.setLanguage("cs_CZ");
i18n.showMissing(true);

Template.newtrip.events({
'click .newtrip' : function() {Session.set("ShowTripForm", true) ;console.log("blablabla")},
'click .cancel' : function() {Session.set("ShowTripForm", false)},
'click .save' : function() {saveTrip()}
});
Template.trip.events({
'click .joinbutton' : function() {Session.set("joinForm", true)}});
Template.join.events({
'click .save' : function(event,template) {
	var data = {id:Session.get("id")};
	data.name=template.find("#personName").value;
	var time=template.find("#persondatetime").value;
	if(time!=""){
        	data.time=time;
	};
	if(template.find("#takecar").checked){
		data.takeCar = true;
		data.capacity=parseInt(template.find("#capacity").value);
		data.place=template.find("#place").value;
	}
	Meteor.call("join",data);
},
'click .cancel' : function(event,template) {
Session.set("joinForm", false);
},
'change #takecar' : function() { Session.set("takecar", Template.instance().find("#takecar").checked)}
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
Template.registerHelper("takecar", function () {return Session.get("takecar")});
Template.tripform.rendered = Template.join.rendered = function () {
	$('.datetimepicker').datetimepicker({
		language: "cs"
	});
}
