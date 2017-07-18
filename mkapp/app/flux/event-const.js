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
    AE_SHELFMAIN: null,
    AE_SHELFMAIN_SUBMIT:null,
    AE_STOCK_SUBMIT: null,
    AE_SHELFAWAY: null,
    AE_SHELFAWAY_SUBMIT: null,
    AE_CHAT: null,
    AE_CHAT_SUBMIT: null,
    AE_PROMOTION: null,
    AE_STORE_PROMOTION: null,
    AE_PROMOTION_SUBMIT: null,
    AE_VISITOR_IMAGE: null,
    AE_SAFESTOCK: null,
    AE_SALEACTUAL: null,
    AE_EXPENSE: null,
    AE_SUBSIDY: null,
    AE_ROUTECOST: null,
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
    SE_SHELFMAIN: null,
    SE_SHELFMAIN_SUBMIT:null,
    SE_STOCK_SUBMIT: null,
    SE_SHELFAWAY: null,
    SE_SHELFAWAY_SUBMIT: null,
    SE_CHAT: null,
    SE_CHAT_SUBMIT: null,
    SE_PROMOTION: null,
    SE_STORE_PROMOTION: null,
    SE_PROMOTION_SUBMIT:null,
    SE_VISITOR_IMAGE: null,
    SE_SAFESTOCK: null,
    SE_SALEACTUAL: null,
    SE_EXPENSE: null,
    SE_SUBSIDY: null,
    SE_ROUTECOST: null,
  })
};

window.ActionEvent = eventMap.ActionEvent;
window.StoreEvent = eventMap.StoreEvent;
module.exports = eventMap;
