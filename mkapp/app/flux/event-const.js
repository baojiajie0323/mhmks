'use strict';

var keyMirror = require('keymirror');

var eventMap = {
  ActionEvent: keyMirror({
    AE_LOGIN: null,
    AE_LOGOUT: null,
    AE_USER: null,
    AE_STOREBASIC: null,
    AE_PATH: null,
    AE_PLAN: null,
    AE_PLAN_ADD: null,
    AE_PLAN_DEL: null,
    AE_SIGN_IN: null,
    AE_SIGN_OUT: null,
    AE_BRAND: null,
    AE_PRODUCT: null,
    AE_SHELFMAIN_SUBMIT:null,
    AE_STOCK_SUBMIT: null,
    AE_SHELFAWAY_SUBMIT: null,
    AE_CHAT_SUBMIT: null,
    AE_PROMOTION: null,
    AE_PROMOTION_SUBMIT: null,
  }),

  StoreEvent: keyMirror({
    SE_BACK: null,
    SE_LOGIN: null,
    SE_VIEW: null,
    SE_USER: null,
    SE_STOREBASIC: null,
    SE_PATH: null,
    SE_PLAN: null,
    SE_BRAND: null,
    SE_PRODUCT: null,
    SE_SHELFMAIN_SUBMIT:null,
    SE_STOCK_SUBMIT: null,
    SE_SHELFAWAY_SUBMIT: null,
    SE_CHAT_SUBMIT: null,
    SE_PROMOTION: null,
    SE_PROMOTION_SUBMIT:null,
  })
};

window.ActionEvent = eventMap.ActionEvent;
window.StoreEvent = eventMap.StoreEvent;
module.exports = eventMap;
