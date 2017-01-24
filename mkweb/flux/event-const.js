'use strict';

var keyMirror = require('keymirror');

var eventMap = {
  ActionEvent: keyMirror({
    AE_LOGIN: null,
    AE_LOGOUT: null,
    AE_STOREAREA: null,
  }),

  StoreEvent: keyMirror({
    SE_LOGIN: null,
    SE_VIEW: null,
    SE_STOREAREA: null,
  })
};

window.ActionEvent = eventMap.ActionEvent;
window.StoreEvent = eventMap.StoreEvent;
module.exports = eventMap;
