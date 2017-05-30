'use strict';

var keyMirror = require('keymirror');

var eventMap = {
  ActionEvent: keyMirror({
    AE_LOGIN: null,
    AE_LOGOUT: null,
    AE_USER: null,
    AE_USER_ADD: null,
    AE_USER_MOD: null,
    AE_USER_DEL: null,
    AE_DEPARTMENT: null,
    AE_DEPARTMENT_ADD: null,
    AE_DEPARTMENT_MOD: null,
    AE_DEPARTMENT_DEL: null,
    AE_PERMISSONTYPE: null,
    AE_ROLE: null,
    AE_ROLE_ADD: null,
    AE_ROLE_MOD: null,
    AE_ROLE_DEL: null,

    AE_STOREAREA: null,
    AE_STOREBASIC: null,
    AE_STORECONTACTS: null,
    AE_STOREDISPLAY: null,
    AE_PRODUCT: null,
    AE_PRODUCTPRICE: null,
    AE_PRODUCTPRICECOUNT: null,
    AE_PRODUCTSTOCK: null,
    AE_PRODUCTSTOCKCOUNT: null,
    AE_PRODUCTBRAND: null,
    AE_PROMOTION: null,
    AE_PROMOTIONTYPE: null,

    AE_PATH: null,
    AE_PATHDETAIL: null,
    AE_PLANSUM: null,
    AE_PLAN: null,
    AE_PLAN_UPDATE: null,
    AE_SIGNLIST: null,
    AE_VISITOR_PLANLIST:null,
    AE_VISITOR_CHATLIST:null,
    AE_VISITOR_IMAGE:null,

    AE_SUBSIDY: null,
    AE_SUBSIDY_UPDATE: null,
    AE_ROUTEBASIC: null,
    AE_ROUTECOST: null,
  }),

  StoreEvent: keyMirror({
    SE_KEYPRESS: null,
    SE_LOGIN: null,
    SE_USER: null,
    SE_DEPARTMENT: null,
    SE_PERMISSONTYPE: null,
    SE_ROLE: null,

    SE_VIEW: null,
    SE_STOREAREA: null,
    SE_STOREBASIC: null,
    SE_STORECONTACTS: null,
    SE_STOREDISPLAY: null,
    SE_PRODUCT: null,
    SE_PRODUCTPRICE: null,
    SE_PRODUCTPRICECOUNT: null,
    SE_PRODUCTSTOCK: null,
    SE_PRODUCTSTOCKCOUNT: null,
    SE_PRODUCTBRAND: null,
    SE_PROMOTION: null,
    SE_PROMOTIONTYPE: null,

    SE_PATH: null,
    SE_PATHDETAIL: null,
    SE_PLANSUM: null,
    SE_PLAN: null,
    SE_PLAN_UPDATE: null,
    SE_SIGNLIST: null,
    SE_VISITOR_PLANLIST:null,
    SE_VISITOR_CHATLIST:null,
    SE_VISITOR_IMAGE:null,

    SE_SUBSIDY: null,
    SE_ROUTEBASIC: null,
    SE_ROUTECOST: null,
  })
};

window.ActionEvent = eventMap.ActionEvent;
window.StoreEvent = eventMap.StoreEvent;
module.exports = eventMap;
