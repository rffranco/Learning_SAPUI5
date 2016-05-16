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

		var sEntityPath = oEvent.data.context.getPath();

		var oView = this.getView();
		oView.bindElement(sEntityPath);

		var oFlightTable = oView.byId("FlightTable");
		var oFlightItems = oView.byId("FlightItems").clone();

		oFlightTable.bindAggregation("items", {
			path : sEntityPath + "/Flights",
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
			return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
	},

	onInsertFlight : function() {

		var oView = this.getView();
		var oContext = oView.getBindingContext();
		app.to("idMaintainFlights1", "slide", {
			context : oContext,
			action : 'I'
		});

	},

	onEditFlight : function() {

		var oContext = this.getItemContext();

		if (oContext) {
			
			app.to("idMaintainFlights1", "slide", {
				context : oContext,
				action : 'E'
			});

		}
	},

	onDeleteFlight : function() {

		var oContext = this.getItemContext();
		
		if (oContext){
			
			var oModel = this.getView().getModel();
            oModel.remove(oContext.getPath());
            oModel.refresh();
			
		}
	},
	
	getItemContext : function(){
		
		var oView = this.getView();
		var oTable = oView.byId("FlightTable");
		var oItem = oTable.getSelectedItem();

		if (oItem) {
			return oItem.getBindingContext();
			
		} else {
			alert("No item selected");
			return null;
		}
	}

});