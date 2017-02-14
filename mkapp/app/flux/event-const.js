'use strict';

var keyMirror = require('keymirror');

var eventMap = {
  ActionEvent: keyMirror({
    AE_LOGIN: null,
    AE_LOGOUT: null,
    AE_USER: null,
    AE_STOREBASIC: null,
  }),

  StoreEvent: keyMirror({
    SE_BACK: null,
    SE_LOGIN: null,
    SE_VIEW: null,
    SE_USER: null,
    SE_STOREBASIC: null,
    SE_CURPLANLIST: null,
  })
};

window.ActionEvent = eventMap.ActionEvent;
window.StoreEvent = eventMap.StoreEvent;
module.exports = eventMap;
