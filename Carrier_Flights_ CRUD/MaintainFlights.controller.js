sap.ui.controller("zt_rff_second_fiori.MaintainFlights", {

	handleNavButtonPress : function(evt) {
		app.back();
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
	
	formatDateInput : function(value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat
					.getDateTimeInstance({
						pattern : "yyyyMMdd"
					});
			return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
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
		oView.bindElement(oEvent.data.context.getPath());

		switch (oEvent.data.action) {
		case "I":
			oView.byId("Fldate").setEditable(true);
			break;

		case "E":
			oView.byId("Fldate").setEditable(false);
			break;
		}

	},

	Save : function() {

		var oView = this.getView();
		var oModel = oView.getModel();
		var vProperty = {};

		vProperty.Carrid = oView.byId("Carrid").getValue();
		vProperty.Connid = oView.byId("Connid").getValue();
		vProperty.Fldate = this.formatDateInput(oView.byId("Fldate").getValue());
		vProperty.Price = oView.byId("Price").getValue();
		vProperty.Currency = oView.byId("Currency").getValue();
		vProperty.Planetype = oView.byId("Planetype").getValue();

		if (vProperty.Connid == "") {

			oModel.createEntry("Flights", vProperty);

		} else {

			var oEntry = {};
			var mParameters = {};

			mParameters.context = oView.getBindingContext();
			mParameters.success = this._fnSuccess;
			mParameters.error = this._fnError;

			oEntry.Price = vProperty.Price;
			oEntry.Currency = vProperty.Currency;
			oEntry.Planetype = vProperty.Planetype;

			oModel.update("", oEntry, mParameters);

		}

		oModel.submitChanges(this._fnSuccess, this._fnError);
		oModel.refresh();
		app.back();

	}

});