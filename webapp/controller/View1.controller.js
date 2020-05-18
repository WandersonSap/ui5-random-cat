sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/StandardListItem",
	"sap/m/ListType"
], function (Controller, StandardListItem, ListType) {
	"use strict";

	return Controller.extend("ovly.random-cat.controller.View1", {
		endpoint: "https://aws.random.cat/meow",
		
		counter: 1,
		
		onInit: function () {
			this._list=this.byId("listCat");
			this._detailPage=this.byId("detail-page");
			this._image=this.byId("cat-image");
		},
		
		onEmpty: function(oEvent) {
				this.counter=1;
				this._list.removeAllItems();
				this._image.setSrc("");
				this._detailPage.setTitle("");
		},
		
		onAdd: function(oEvent){
			this._callAPI();
		},
		
		onPressItem: function(oEvent) {
		var oItem=oEvent.getSource();
			this. _updateDetailPage({
				id:oItem.getTitle(),
				url:oItem.getIcon()
			});
		},	
		
		_callAPI: function(){
			$.get(this.endpoint, function(oResponse){
			this.addCatInsideList(oResponse.file);
			}.bind(this));
		},
		
		addCatInsideList: function(sUrl){
			var oNewItem = new StandardListItem({
				title: this.counter++,
				icon: sUrl,
				type:ListType.Navigation,
				press:[this.onPressItem,this]
			});
			
			this._list.insertItem(oNewItem,0);
			
			this._updateDetailPage({
				id:oNewItem.getTitle(),
				url:oNewItem.getIcon()
				
			});
		},
		
		_updateDetailPage:function(oCat){
			this._detailPage.setTitle(oCat.id);
			this._image.setSrc(oCat.url);
		}
	});
});