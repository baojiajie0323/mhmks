'use strict';
var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var EventConst = require('./event-const');
var ActionEvent = EventConst.ActionEvent;
var StoreEvent = EventConst.StoreEvent;

var _loginSuccess = false;
var _userInfo = {};
var _curview = 'homepage';
var _storeArea = [];
var _storeBasic = [];
var _storeContacts = [];
var _storeDisplay = [];
var _product = [];
var _productPrice = [];
var _productStock = [];
var _productBrand = [];
var _promotion = [];
var _promotionType = [];

var _user = [];
var _depart = [];

var Store = assign({}, EventEmitter.prototype, {
  setLoginSuccess(loginsuccess, userInfo) {
    _loginSuccess = loginsuccess;
    if (loginsuccess) {
      _userInfo = userInfo;
    } else {
      _curview = 'homepage';
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

  setStoreArea: function (sa) {
    _storeArea = sa;
    this.emitChange(StoreEvent.SE_STOREAREA);
  },
  getStoreArea: function () {
    return _storeArea;
  },
  setStoreBasic: function (sa) {
    _storeBasic = sa;
    this.emitChange(StoreEvent.SE_STOREBASIC);
  },
  getStoreBasic: function () {
    return _storeBasic;
  },
  setStoreContacts: function (sa) {
    _storeContacts = sa;
    this.emitChange(StoreEvent.SE_STORECONTACTS);
  },
  getStoreContacts: function () {
    return _storeContacts;
  },
  setStoreDisplay: function (sa) {
    _storeDisplay = sa;
    this.emitChange(StoreEvent.SE_STOREDISPLAY);
  },
  getStoreDisplay: function () {
    return _storeDisplay;
  },

  setProduct: function (sa) {
    _product = sa;
    this.emitChange(StoreEvent.SE_PRODUCT);
  },
  getProduct: function () {
    return _product;
  },
  setProductPrice: function (sa) {
    _productPrice = sa;
    this.emitChange(StoreEvent.SE_PRODUCTPRICE);
  },
  getProductPrice: function () {
    return _productPrice;
  },
  setProductStock: function (sa) {
    _productStock = sa;
    this.emitChange(StoreEvent.SE_PRODUCTSTOCK);
  },
  getProductStock: function () {
    return _productStock;
  },
  setProductBrand: function (sa) {
    _productBrand = sa;
    this.emitChange(StoreEvent.SE_PRODUCTBRAND);
  },
  getProductBrand: function () {
    return _productBrand;
  },

  setPromotion: function (sa) {
    _promotion = sa;
    this.emitChange(StoreEvent.SE_PROMOTION);
  },
  getPromotion: function () {
    return _promotion;
  },
  setPromotionType: function (sa) {
    _promotionType = sa;
    this.emitChange(StoreEvent.SE_PROMOTIONTYPE);
  },
  getPromotionType: function () {
    return _promotionType;
  },

  setUser: function (sa) {
    _user = sa;
    this.emitChange(StoreEvent.SE_USER);
  },
  getUser: function () {
    return _user;
  },
  getUserbyId: function (id) {
    for (var i = 0; i < _user.length; i++) {
      if (_user[i].id == id) {
        return _user[i];
      }
    }
  },
  addUser: function (sa) {
    _user.push(sa);
    this.emitChange(StoreEvent.SE_USER);
  },
  modUser: function (sa) {
    for (var i = 0; i < _user.length; i++) {
      if (_user[i].id == sa.id) {
        _user[i] = sa;
        break;
      }
    }
    this.emitChange(StoreEvent.SE_USER);
  },
  delUser: function (sa) {
    for (var i = 0; i < _user.length; i++) {
      if (_user[i].id == sa.id) {
        _user.splice(i, 1);
        break;
      }
    }
    this.emitChange(StoreEvent.SE_USER);
  },
  setDepartment: function (sa) {
    _depart = sa;
    this.emitChange(StoreEvent.SE_DEPARTMENT);
  },
  getDepartment: function () {
    return _depart;
  },
  getDepartmentbyId: function (id) {
    for (var i = 0; i < _depart.length; i++) {
      if (_depart[i].id == id) {
        return _depart[i];
      }
    }
  },
  addDepartment: function (sa) {
    _depart.push(sa);
    this.emitChange(StoreEvent.SE_DEPARTMENT);
  },
  modDepartment: function (sa) {
    for (var i = 0; i < _depart.length; i++) {
      if (_depart[i].id == sa.id) {
        _depart[i].name = sa.name;
        _depart[i].userid = sa.userid;
        break;
      }
    }
    this.emitChange(StoreEvent.SE_DEPARTMENT);
  },
  delDepartment: function (sa) {
    for (var i = 0; i < _depart.length; i++) {
      if (_depart[i].id == sa.id) {
        _depart.splice(i, 1);
        break;
      }
    }
    this.emitChange(StoreEvent.SE_DEPARTMENT);
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
    case ActionEvent.AE_STOREAREA: {
      Store.setStoreArea(action.value);
    }
      break;
    case ActionEvent.AE_STOREBASIC: {
      Store.setStoreBasic(action.value);
    }
      break;
    case ActionEvent.AE_STORECONTACTS: {
      Store.setStoreContacts(action.value);
    }
      break;
    case ActionEvent.AE_STOREDISPLAY: {
      Store.setStoreDisplay(action.value);
    }
      break;
    case ActionEvent.AE_PRODUCT: {
      Store.setProduct(action.value);
    }
      break;
    case ActionEvent.AE_PRODUCTPRICE: {
      Store.setProductPrice(action.value);
    }
      break;
    case ActionEvent.AE_PRODUCTPRICECOUNT: {
      Store.emit(StoreEvent.SE_PRODUCTPRICECOUNT, action.value);
    }
      break;
    case ActionEvent.AE_PRODUCTSTOCK: {
      Store.setProductStock(action.value);
    }
      break;
    case ActionEvent.AE_PRODUCTSTOCKCOUNT: {
      Store.emit(StoreEvent.SE_PRODUCTSTOCKCOUNT, action.value);
    }
      break;
    case ActionEvent.AE_PRODUCTBRAND: {
      Store.setProductBrand(action.value);
    }
      break;
    case ActionEvent.AE_PROMOTION: {
      Store.setPromotion(action.value);
    }
      break;
    case ActionEvent.AE_PROMOTIONCOUNT: {
      Store.emit(StoreEvent.SE_PROMOTIONCOUNT, action.value);
    }
      break;
    case ActionEvent.AE_PROMOTIONTYPE: {
      Store.setPromotionType(action.value);
    }
      break;

    case ActionEvent.AE_USER: {
      Store.setUser(action.value);
    }
      break;
    case ActionEvent.AE_USER_ADD: {
      Store.addUser(action.value);
    }
      break;
    case ActionEvent.AE_USER_MOD: {
      Store.modUser(action.value);
    }
      break;
    case ActionEvent.AE_USER_DEL: {
      Store.delUser(action.value);
    }
      break;
    case ActionEvent.AE_DEPARTMENT: {
      Store.setDepartment(action.value);
    }
      break;
    case ActionEvent.AE_DEPARTMENT_ADD: {
      Store.addDepartment(action.value);
    }
      break;
    case ActionEvent.AE_DEPARTMENT_MOD: {
      Store.modDepartment(action.value);
    }
      break;
    case ActionEvent.AE_DEPARTMENT_DEL: {
      Store.delDepartment(action.value);
    }
      break;

    default:
      break;
  }
});

window.Store = Store;
module.exports = Store;
