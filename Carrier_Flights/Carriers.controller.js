sap.ui.controller( "zt_rff_second_fiori.Carriers", {

	onInit : function() {
		
		var oView = this.getView();
		oView.setModel(sap.ui.getCore().getModel());

	},

	handleShowFlights: function(oEvent){
		
		var oContext = oEvent.getSource().getBindingContext();
		app.to("idFlights1", "slide", {context: oContext});	
	} 

});