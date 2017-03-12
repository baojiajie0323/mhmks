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
      if (_plan[i].Plan_Id == plan.Plan_Id) {
        _plan.splice(i, 1);
        break;
      }
    }

    this.emit(StoreEvent.SE_PLAN);
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
        _plan[i].signin_gps_x = signStore.lat;
        _plan[i].signin_gps_y = signStore.lon;
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
        _plan[i].signout_gps_x = signStore.lat;
        _plan[i].signout_gps_y = signStore.lon;
        this.emit(StoreEvent.SE_PLAN);
        break;
      }
    }
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
    case ActionEvent.AE_SIGN_OUT: {
      Store.signOutStore(action.value);
    }
      break;
    default:
      break;
  }
});

window.Store = Store;
module.exports = Store;
