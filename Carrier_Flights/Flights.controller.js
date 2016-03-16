sap.ui.controller("zt_rff_second_fiori.Flights", {

	handleNavButtonPress : function(evt) {
		app.back();
	},

	onInit : function() {

		var oView = this.getView();
		oView.setModel(sap.ui.getCore().getModel());

		oView.addEventDelegate({
			onBeforeShow : jQuery.proxy(function(oEvent) {
				this.onBeforeShow(oEvent);
			}, this)

		});

	},

	onBeforeShow : function(oEvent) {

		var oView = this.getView();
		var oFlightTable = oView.byId("FlightTable");
		var oFlightItems = oView.byId("FlightItems").clone();

		oFlightTable.bindAggregation("items", {
			path : oEvent.data.context.getPath() + "/Flights",
			sorter : new sap.ui.model.Sorter("Connid"),
			template : oFlightItems
		})

	},

	formatDate : function(value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat
					.getDateTimeInstance({
						pattern : "dd/MM/yyyy"
					});
//			var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
			return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
	},

});