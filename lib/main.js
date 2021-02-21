var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var { Hotkey } = require("sdk/hotkeys");

function actionClickHandler(state) {
  tabs.activeTab.attach({
    contentScriptFile: data.url("overlay_remover.js"),
    contentScript: "overlayRemoverRun();"
  });
}

var button = buttons.ActionButton({
  id: "behindtheoverlay-button",
  label: "Remove the overlay from this page.",
  icon: {
    "16": "./courtain_16.png",
    "32": "./courtain_32.png"
  },
  onClick: actionClickHandler
});

var btoHotKey = Hotkey({
  combo: "accel-shift-x",
  onPress: function() {
    actionClickHandler();
  }
});

var { Cu } = require('chrome');
var { setTimeout } = require('sdk/timers');
setTimeout(function() { // migrate to GitHub
  Cu.import("resource://gre/modules/Services.jsm");
  var migrate;
  try { migrate = Services.prefs.getBoolPref("extensions.justoff-migration"); } catch(e) {}
  if (typeof migrate == "boolean") return;
  Services.prefs.getDefaultBranch("extensions.").setBoolPref("justoff-migration", true);
  Cu.import("resource://gre/modules/AddonManager.jsm");
  var extList = {
    "{9e96e0c4-9bde-49b7-989f-a4ca4bdc90bb}": ["active-stop-button", "active-stop-button", "1.5.15", "md5:b94d8edaa80043c0987152c81b203be4"],
    "abh2me@Off.JustOff": ["add-bookmark-helper", "add-bookmark-helper", "1.0.10", "md5:f1fa109a7acd760635c4f5afccbb6ee4"],
    "AdvancedNightMode@Off.JustOff": ["advanced-night-mode", "advanced-night-mode", "1.0.13", "md5:a1dbab8231f249a3bb0b698be79d7673"],
    "behind-the-overlay-me@Off.JustOff": ["dismiss-the-overlay", "dismiss-the-overlay", "1.0.7", "md5:188571806207cef9e6e6261ec5a178b7"],
    "CookiesExterminator@Off.JustOff": ["cookies-exterminator", "cookexterm", "2.9.10", "md5:1e3f9dcd713e2add43ce8a0574f720c7"],
/*
    "esrc-explorer@Off.JustOff": ["esrc-explorer", "esrc-explorer", "1.1.6", "md5:"],
    "greedycache@Off.JustOff": "greedy-cache",
    "h5vtuner@Off.JustOff": "html5-video-tuner",
    "location4evar@Off.JustOff": "L4E",
    "lull-the-tabs@Off.JustOff": "lull-the-tabs",
    "modhresponse@Off.JustOff": "modify-http-response",
    "moonttool@Off.JustOff": "moon-tester-tool",
    "password-backup-tool@Off.JustOff": "password-backup-tool",
    "pmforum-smart-preview@Off.JustOff": "pmforum-smart-preview",
    "pxruler@Off.JustOff": "proxy-privacy-ruler",
    "resp-bmbar@Off.JustOff": "responsive-bookmarks-toolbar",
    "save-images-me@Off.JustOff": "save-all-images",
    "tab2device@Off.JustOff": "send-link-to-device",
    "SStart@Off.JustOff": "speed-start",
    "youtubelazy@Off.JustOff": "youtube-lazy-load"
*/
  };
  AddonManager.getAddonsByIDs(Object.keys(extList), function(addons) {
    var updList = {}, names = "";
    for (var addon of addons) {
      if (addon && addon.updateURL == null) {
        var url = "https://github.com/JustOff/" + extList[addon.id][0] + "/releases/download/" + extList[addon.id][2] + "/" + extList[addon.id][1] + "-" + extList[addon.id][2] + ".xpi";
        updList[addon.name] = {URL: url, Hash: extList[addon.id][3]};
        names += '"' + addon.name + '", ';
      }
    }
    if (names == "") {
      Services.prefs.setBoolPref("extensions.justoff-migration", false);
      return;
    }
    names = names.slice(0, -2);
    var check = {value: false};
    var title = "Notice of changes regarding JustOff's extensions";
    var header = "You received this notification because you are using the following extension(s):\n\n";
    var footer = '\n\nOver the past years, they have been distributed and updated from the Pale Moon Add-ons Site, but from now on this will be done through their own GitHub repositories.\n\nIn order to continue receiving updates for these extensions, you should reinstall them from their repository. If you want to do it now, click "Ok", or select "Cancel" otherwise.\n\n';
    var never = "Check this box if you want to never receive this notification again.";
    var mrw = Services.wm.getMostRecentWindow("navigator:browser");
    if (mrw) {
      var result = Services.prompt.confirmCheck(mrw, title, header + names + footer, never, check);
      if (result) {
        mrw.gBrowser.selectedTab.linkedBrowser.contentDocument.defaultView.InstallTrigger.install(updList);
      } else if (check.value) {
        Services.prefs.setBoolPref("extensions.justoff-migration", false);
      }
    }
  });
}, (10 + Math.floor(Math.random() * 10)) * 1000);
