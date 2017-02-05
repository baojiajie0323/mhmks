'use strict';

var keyMirror = require('keymirror');

var eventMap = {
  ActionEvent: keyMirror({
    AE_LOGIN: null,
    AE_LOGOUT: null,

  }),

  StoreEvent: keyMirror({
    SE_KEYPRESS: null,
    SE_LOGIN: null,
    SE_VIEW:null,
  })
};

window.ActionEvent = eventMap.ActionEvent;
window.StoreEvent = eventMap.StoreEvent;
module.exports = eventMap;
