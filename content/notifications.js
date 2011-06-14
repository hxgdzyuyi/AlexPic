var Noti = {
showToast:function(text){
        var alertsService = Components.classes["@mozilla.org/alerts-service;1"]
                            .getService(Components.interfaces.nsIAlertsService);
        alertsService.showAlertNotification("chrome://alexpic/skin/alexpic_m.png",
                                           text, "", false, "", null);
  
}
}

AlexPic.noti = Object.create(Noti);
