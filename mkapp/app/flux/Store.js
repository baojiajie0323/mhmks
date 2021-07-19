'use strict';
var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var EventConst = require('./event-const');
var ActionEvent = EventConst.ActionEvent;
var StoreEvent = EventConst.StoreEvent;

var _curDate = new Date();
var _path_id = '';
var _store_id = '';

var _loginSuccess = false;
var _userInfo = {};
var _curPlanlist = [];

var _user = [];
var _storeBasic = [];
var _path = [];
var _plan = [];
var _brand = [];
var _product = {};
var _promotion = [];
var _expense = [];
var _chartmonth_user = [];
var _chartmonth_system = [];
var _chartactual_rtm = [];
var _chartactual_lot = [];
var _chartactual_wal = [];
var _chartpromotion_user = [];

var Store = assign({}, EventEmitter.prototype, {
  back: function () {
    this.emitChange(StoreEvent.SE_BACK);
  },

  setCurDate(date) {
    _curDate = date;
  },
  getCurDate() {
    return _curDate;
  },
  setCurPlan(path_id, store_id) {
    _path_id = path_id;
    _store_id = store_id;
  },
  getCurPlan() {
    return {
      path_id: _path_id,
      store_id: _store_id
    }
  },

  setLoginSuccess: function (loginsuccess, userInfo) {
    _loginSuccess = loginsuccess;
    if (loginsuccess) {
      _userInfo = userInfo;
    } else {
      _userInfo = {};
      _curPlanlist = [];
      _user = [];
      _storeBasic = [];
      _path = [];
      _plan = [];
      _brand = [];
      _product = {};
      _promotion = [];
    }
    this.emit(StoreEvent.SE_LOGIN, loginsuccess);
  },
  getUserInfo: () => {
    return _userInfo;
  },

  setCurView: function (view) {
    _curview = view;
    this.emit(StoreEvent.SE_VIEW);
  },
  getCurView: function () {
    return _curview;
  },

  setUser: function (sa) {
    _user = sa;
    this.emitChange(StoreEvent.SE_USER);
  },
  getUser: function () {
    return _user;
  },

  setStoreBasic: function (sa) {
    _storeBasic = sa;
    this.emitChange(StoreEvent.SE_STOREBASIC);
  },
  getStoreBasic: function () {
    return _storeBasic;
  },
  getStoreById: function (id) {
    for (var i = 0; i < _storeBasic.length; i++) {
      if (id == _storeBasic[i].Store_id) {
        return _storeBasic[i];
      }
    }
    return null;
  },

  setPath: function (sa) {
    _path = sa;
    this.emitChange(StoreEvent.SE_PATH);
  },
  getPath: function () {
    var pathList = _path.map((p) => {
      if (p.Path_seq == 1) {
        return {
          Path_id: p.Path_id,
          Path_name: p.Path_name
        }
      }
    })
    return pathList;
  },
  getPathDetail: function (pathId) {
    var pathDetail = [];
    _path.forEach((p) => {
      if (p.Path_id == pathId) {
        pathDetail.push(p.Store_name);
      }
    })
    return pathDetail;
  },

  getPlan: function () {
    return _plan;
  },
  setPlan: function (pl) {
    _plan = pl;
    this.emit(StoreEvent.SE_PLAN);
  },
  addPlan: function (plan) {
    _plan.push(plan);
    this.emit(StoreEvent.SE_PLAN);
  },
  delPlan: function (plan) {
    for (var i = 0; i < _plan.length; i++) {
      if (_plan[i].store_id == plan.store_id &&
        _plan[i].userid.toUpperCase() == plan.userid.toUpperCase() &&
        _plan[i].year == plan.year &&
        _plan[i].month == plan.month &&
        _plan[i].day == plan.day) {
        _plan.splice(i, 1);
        break;
      }
    }

    this.emit(StoreEvent.SE_PLAN);
  },
  getExpense: function () {
    return _expense;
  },
  setPathExpense: function (pl) {
    _expense = pl;
    this.emit(StoreEvent.SE_PATHEXPENSE);
  },
  setExpense: function (pl) {
    // _expense = pl;
    this.emit(StoreEvent.SE_EXPENSE,pl);
  },
  signInStore: function (signStore) {
    for (var i = 0; i < _plan.length; i++) {
      var plan = _plan[i];
      if (plan.userid == signStore.userid &&
        plan.year == signStore.year &&
        plan.month == signStore.month &&
        plan.day == signStore.day &&
        plan.store_id == signStore.store_id) {
        _plan[i].signin_time = signStore.signin_time;
        _plan[i].signin_gps_x = signStore.lon;
        _plan[i].signin_gps_y = signStore.lat;
        this.emit(StoreEvent.SE_PLAN);
        break;
      }
    }
  },
  signInStore2: function (signStore) {
    for (var i = 0; i < _plan.length; i++) {
      var plan = _plan[i];
      if (plan.userid == signStore.userid &&
        plan.year == signStore.year &&
        plan.month == signStore.month &&
        plan.day == signStore.day &&
        plan.store_id == signStore.store_id) {
        _plan[i].signin_gps_x = signStore.lon;
        _plan[i].signin_gps_y = signStore.lat;
        this.emit(StoreEvent.SE_PLAN);
        break;
      }
    }
  },
  signOutStore: function (signStore) {
    for (var i = 0; i < _plan.length; i++) {
      var plan = _plan[i];
      if (plan.userid == signStore.userid &&
        plan.year == signStore.year &&
        plan.month == signStore.month &&
        plan.day == signStore.day &&
        plan.store_id == signStore.store_id) {
        _plan[i].isfinish = true;
        _plan[i].signout_time = signStore.signout_time;
        _plan[i].signout_gps_x = signStore.lon;
        _plan[i].signout_gps_y = signStore.lat;
        this.emit(StoreEvent.SE_PLAN);
        break;
      }
    }
  },

  getBrand: function () {
    return _brand;
  },
  setBrand: function (brand) {
    _brand = brand;
    this.emitChange(StoreEvent.SE_BRAND);
  },

  getChartmonth_user: function () {
    return _chartmonth_user;
  },
  setChartmonth_user: function (c) {
    _chartmonth_user = c;
    this.emitChange(StoreEvent.SE_CHARTMONTH_USER);
  },
  getChartmonth_system: function () {
    return _chartmonth_system;
  },
  setChartmonth_system: function (c) {
    _chartmonth_system = c;
    this.emitChange(StoreEvent.SE_CHARTMONTH_SYSTEM);
  },
  getChartactual_rtm: function () {
    return _chartactual_rtm;
  },
  setChartactual_rtm: function (c) {
    _chartactual_rtm = c;
    this.emitChange(StoreEvent.SE_CHARTACTUAL_RTM);
  },
  getChartactual_lot: function () {
    return _chartactual_lot;
  },
  setChartactual_lot: function (c) {
    _chartactual_lot = c;
    this.emitChange(StoreEvent.SE_CHARTACTUAL_LOT);
  },
  getChartactual_wal: function () {
    return _chartactual_wal;
  },
  setChartactual_wal: function (c) {
    _chartactual_wal = c;
    this.emitChange(StoreEvent.SE_CHARTACTUAL_WAL);
  },
  getChartpromotion_user: function () {
    return _chartpromotion_user;
  },
  setChartpromotion_user: function (c) {
    _chartpromotion_user = c;
    this.emitChange(StoreEvent.SE_CHARTPROMOTION_USER);
  },


  getProduct: function (store_id) {
    if (_product.hasOwnProperty(store_id)) {
      return _product[store_id];
    }
    return [];
  },
  setProduct: function (product) {
    product.sort(function (a, b) { return parseInt(a.status) - parseInt(b.status) })
    if (product.length > 0) {
      var store_id = product[0].Store_id;
      _product[store_id] = product;
    }
    this.emitChange(StoreEvent.SE_PRODUCT);
  },

  getPromotionByStore: function (store_id) {
    var promotion = [];
    for (var i = 0; i < _promotion.length; i++) {
      if (_promotion[i].Store_id == store_id) {
        promotion.push(_promotion[i]);
      }
    }
    return promotion;
  },
  setPromotion: function (pm) {
    _promotion = pm;
    this.emitChange(StoreEvent.SE_PROMOTION);
  },

  emitChange: function (eventtype) {
    this.emit(eventtype);
  },
  /**
   * @param {function} callback
   */
  addChangeListener: function (eventtype, callback) {
    this.on(eventtype, callback);
  },
  /**
   * @param {function} callback
   */
  removeChangeListener: function (eventtype, callback) {
    this.removeListener(eventtype, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register((action) => {
  switch (action.eventName) {
    case ActionEvent.AE_LOGIN: {
      Store.setLoginSuccess(true, action.value);
    }
      break;
    case ActionEvent.AE_LOGOUT: {
      Store.setLoginSuccess(false);
    }
      break;
    case ActionEvent.AE_USER: {
      Store.setUser(action.value);
    }
      break;
    case ActionEvent.AE_STOREBASIC: {
      Store.setStoreBasic(action.value);
    }
      break;
    case ActionEvent.AE_PATH: {
      Store.setPath(action.value);
    }
      break;
    case ActionEvent.AE_PLAN: {
      Store.setPlan(action.value);
    }
      break;
    case ActionEvent.AE_PLAN_ADD: {
      Store.addPlan(action.value);
    }
      break;
    case ActionEvent.AE_PLAN_DEL: {
      Store.delPlan(action.value);
    }
      break;
    case ActionEvent.AE_SIGN_IN: {
      Store.signInStore(action.value);
    }
      break;
    case ActionEvent.AE_SIGN_IN2: {
      Store.signInStore2(action.value);
    }
      break;
    case ActionEvent.AE_SIGN_OUT: {
      Store.signOutStore(action.value);
    }
      break;
    case ActionEvent.AE_BRAND: {
      Store.setBrand(action.value);
    }
      break;
    case ActionEvent.AE_PRODUCT: {
      Store.setProduct(action.value);
    }
      break;
    case ActionEvent.AE_SHELFMAIN_SUBMIT: {
      Store.emitChange(StoreEvent.SE_SHELFMAIN_SUBMIT);
    }
      break;
    case ActionEvent.AE_STOCK_SUBMIT: {
      Store.emitChange(StoreEvent.SE_STOCK_SUBMIT);
    }
      break;
    case ActionEvent.AE_SHELFAWAY_SUBMIT: {
      Store.emitChange(StoreEvent.SE_SHELFAWAY_SUBMIT);
    }
      break;
    case ActionEvent.AE_CHAT_SUBMIT: {
      Store.emitChange(StoreEvent.SE_CHAT_SUBMIT);
    }
      break;
    case ActionEvent.AE_PROMOTION: {
      Store.setPromotion(action.value);
    }
      break;
    case ActionEvent.AE_PROMOTION_SUBMIT: {
      Store.emitChange(StoreEvent.SE_PROMOTION_SUBMIT);
    }
      break;
    case ActionEvent.AE_SHELFMAIN: {
      Store.emit(StoreEvent.SE_SHELFMAIN, action.value);
    }
      break;
    case ActionEvent.AE_SHELFAWAY: {
      Store.emit(StoreEvent.SE_SHELFAWAY, action.value);
    }
      break;
    case ActionEvent.AE_STOCK: {
      Store.emit(StoreEvent.SE_STOCK, action.value);
    }
      break;
    case ActionEvent.AE_STORE_PROMOTION: {
      Store.emit(StoreEvent.SE_STORE_PROMOTION, action.value);
    }
      break;
    case ActionEvent.AE_CHAT: {
      Store.emit(StoreEvent.SE_CHAT, action.value);
    }
      break;
    case ActionEvent.AE_VISITOR_IMAGE: {
      Store.emit(StoreEvent.SE_VISITOR_IMAGE, action.value);
    }
      break;
    case ActionEvent.AE_SAFESTOCK: {
      Store.emit(StoreEvent.SE_SAFESTOCK, action.value);
    }
      break;
    case ActionEvent.AE_SALEACTUAL: {
      Store.emit(StoreEvent.SE_SALEACTUAL, action.value);
    }
      break;
    case ActionEvent.AE_PATHEXPENSE: {
      Store.setPathExpense(action.value);
    }
      break;
    case ActionEvent.AE_EXPENSE: {
      Store.setExpense(action.value);
    }
      break;
    case ActionEvent.AE_SUBSIDY: {
      Store.emit(StoreEvent.SE_SUBSIDY, action.value);
    }
      break;
    case ActionEvent.AE_ROUTECOST: {
      Store.emit(StoreEvent.SE_ROUTECOST, action.value);
    }
      break;
    case ActionEvent.AE_EXPENSE_SUBMIT: {
      Store.emit(StoreEvent.SE_EXPENSE_SUBMIT, action.value);
    }
      break;
    case ActionEvent.AE_PARTTIME: {
      Store.emit(StoreEvent.SE_PARTTIME, action.value);
    }
      break;
    case ActionEvent.AE_PARTTIME_SUBMIT: {
      Store.emit(StoreEvent.SE_PARTTIME_SUBMIT, action.value);
    }
      break;
    case ActionEvent.AE_CHARTMONTH_USER: {
      Store.setChartmonth_user(action.value);
    }
      break;
    case ActionEvent.AE_CHARTMONTH_SYSTEM: {
      Store.setChartmonth_system(action.value);
    }
      break;
    case ActionEvent.AE_CHARTACTUAL_RTM: {
      Store.setChartactual_rtm(action.value);
    }
      break;
    case ActionEvent.AE_CHARTACTUAL_LOT: {
      Store.setChartactual_lot(action.value);
    }
      break;
    case ActionEvent.AE_CHARTACTUAL_WAL: {
      Store.setChartactual_wal(action.value);
    }
      break;
    case ActionEvent.AE_CHARTPROMOTION_USER: {
      Store.setChartpromotion_user(action.value);
    }
      break;


    default:
      break;
  }
});

window.Store = Store;
module.exports = Store;
