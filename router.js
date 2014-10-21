console.log("bling");
Router.map(function () {
	this.route('intro', {path: '/'});
	this.route('trip', {
		path: '/trip/:id',
		data: function () {
			_id = this.params.id;
			Session.set("id",_id);
			templateData = Trips.findOne(_id);
			return templateData;
		}
	});
});
