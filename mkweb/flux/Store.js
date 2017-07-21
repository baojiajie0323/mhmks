'use strict';
var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var EventConst = require('./event-const');
var ActionEvent = EventConst.ActionEvent;
var StoreEvent = EventConst.StoreEvent;

var _loginSuccess = false;
var _userInfo = {};
var _curview = 'schdule';
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
var _permissontype = [];
var _role = [];

var _path = [];
var _pathdetail = [];
var _plansum = [];
var _plan = [];
var _signlist = [];
var _visitorplan = [];
var _visitorchat = [];
var _visitormainshelf = [];
var _visitorstock = [];
var _visitorshelfaway = [];
var _visitorimage = [];

var _subsidy = [];
var _routeCost = [];
var _promotionsum = [];
var _promotionadjust = [];
var _stockconfig = [];

var Store = assign({}, EventEmitter.prototype, {
  setLoginSuccess(loginsuccess, userInfo) {
    _loginSuccess = loginsuccess;
    if (loginsuccess) {
      _userInfo = userInfo;
      if (_userInfo.enableapp) {
        _curview = 'schdule';
      } else {
        _curview = 'visitor';
      }
    } else {
      _curview = 'schdule';
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
  getStoreBasicById: function (id) {
    for (var i = 0; i < _storeBasic.length; i++) {
      if (_storeBasic[i].Store_id == id) {
        return _storeBasic[i];
      }
    }
    return null;
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
  setPermissonType: function (sa) {
    _permissontype = sa;
    this.emitChange(StoreEvent.SE_PERMISSONTYPE);
  },
  getPermissonType: function () {
    return _permissontype;
  },
  setRole: function (sa) {
    _role = sa;
    this.emitChange(StoreEvent.SE_ROLE);
  },
  getRole: function () {
    return _role;
  },
  getRolebyId: function (id) {
    for (var i = 0; i < _role.length; i++) {
      if (_role[i].id == id) {
        return _role[i];
      }
    }
  },
  addRole: function (sa) {
    _role.push(sa);
    this.emitChange(StoreEvent.SE_ROLE);
  },
  modRole: function (sa) {
    for (var i = 0; i < _role.length; i++) {
      if (_role[i].id == sa.id) {
        _role[i] = sa;
        break;
      }
    }
    this.emitChange(StoreEvent.SE_ROLE);
  },
  delRole: function (sa) {
    for (var i = 0; i < _role.length; i++) {
      if (_role[i].id == sa.id) {
        _role.splice(i, 1);
        break;
      }
    }
    this.emitChange(StoreEvent.SE_ROLE);
  },

  setPath: function (sa) {
    _path = sa;
    this.emitChange(StoreEvent.SE_PATH);
  },
  getPath: function () {
    var pathList = [];
    _path.forEach((p) => {
      if (p.Path_seq == 1) {
        pathList.push({
          Path_id: p.Path_id,
          Path_name: p.Path_name
        })
      }
    })
    return pathList;
  },
  getPathDetail: function (pathId) {
    var pathDetail = [];
    _path.forEach((p) => {
      if (!pathId || p.Path_id == pathId) {
        pathDetail.push(p);
      }
    })
    return pathDetail;
  },

  // getPath: function () {
  //   return _path;
  // },
  // getPathbyId: function (id) {
  //   for (var i = 0; i < _path.length; i++) {
  //     if (_path[i].Path_id == id) {
  //       return _path[i];
  //     }
  //   }
  // },
  // setPathDetail: function (sa) {
  //   _pathdetail = sa;
  //   this.emitChange(StoreEvent.SE_PATH);
  // },
  // getPathDetail: function () {
  //   return _pathdetail;
  // },
  getPathDetailbyId: function (id) {
    var pathdetail = [];
    for (var i = 0; i < _pathdetail.length; i++) {
      if (_pathdetail[i].Path_id == id) {
        pathdetail.push(_pathdetail[i]);
      }
    }
    return pathdetail;
  },

  getPlanSum: function (year, month) {
    var planSum = [];
    for (var i = 0; i < _plansum.length; i++) {
      if (_plansum[i].userid == localStorage.username &&
        _plansum[i].year == year &&
        (!month || _plansum[i].month == month)) {
        planSum.push(_plansum[i]);
      }
    }
    return planSum;
  },
  delPlanSum: function (year, month) {
    for (var i = 0; i < _plansum.length; i++) {
      if (_plansum[i].userid == localStorage.username &&
        _plansum[i].year == year &&
        _plansum[i].month == month) {
        _plansum.splice(i, 1);
        break;
      }
    }
  },
  setPlanSum: function (sa) {
    console.log('test1', _plansum);
    for (var i = 0; i < sa.length; i++) {
      this.delPlanSum(sa[i].year, sa[i].month);
      _plansum.push(sa[i]);
    }
    this.emit(StoreEvent.SE_PLANSUM);
  },
  getPlan: function (year, month, day) {
    var plan = [];
    for (var i = 0; i < _plan.length; i++) {
      if (_plan[i].userid == localStorage.username &&
        _plan[i].year == year &&
        _plan[i].month == month &&
        (!day || _plan[i].day == day)) {
        plan.push(_plan[i]);
      }
    }
    return plan;
  },
  delPlan: function (year, month, day) {
    for (var i = 0; i < _plan.length;) {
      if (_plan[i].userid == localStorage.username &&
        _plan[i].year == year &&
        _plan[i].month == month &&
        (!day || _plan[i].day == day)) {
        _plan.splice(i, 1);
        continue;
      }
      i++;
    }
  },
  setPlan: function (sa) {
    var lastyear = 0, lastmonth = 0;
    for (var i = 0; i < sa.length; i++) {
      if (lastyear != sa[i].year || lastmonth != sa[i].month) {
        this.delPlan(sa[0].year, sa[i].month);
        lastyear = sa[i].year;
        lastmonth = sa[i].month;
      }
      _plan.push(sa[i]);
    }
    this.emit(StoreEvent.SE_PLAN);
  },

  updatePlan: function (sa) {
    var planSum = sa.planSum;
    var plan = sa.plan;
    this.setPlan(plan);
    this.setPlanSum(planSum);
    this.emit(StoreEvent.SE_PLAN_UPDATE);
  },

  getSignList: function () {
    return _signlist;
  },
  setSignList: function (sl) {
    _signlist = sl;
    this.emitChange(StoreEvent.SE_SIGNLIST);
  },

  setVisitorPlan(vp) {
    _visitorplan = vp;
    this.emitChange(StoreEvent.SE_VISITOR_PLANLIST);
  },
  delVisotorPlan(vp) {
    for (var i = 0; i < _visitorplan.length; i++) {
      if (_visitorplan[i].userid == vp.userid &&
        _visitorplan[i].store_id == vp.store_id &&
        _visitorplan[i].year == vp.year &&
        _visitorplan[i].month == vp.month &&
        _visitorplan[i].day == vp.day) {
        _visitorplan.splice(i, 1);
        this.emitChange(StoreEvent.SE_VISITOR_PLANLIST);
        break;
      }
    }
  },
  reSignPlan(vp) {
    for (var i = 0; i < _visitorplan.length; i++) {
      if (_visitorplan[i].userid == vp.userid &&
        _visitorplan[i].store_id == vp.store_id &&
        _visitorplan[i].year == vp.year &&
        _visitorplan[i].month == vp.month &&
        _visitorplan[i].day == vp.day) {
        _visitorplan[i].isfinish = 0;
        _visitorplan[i].signin_time = null;
        _visitorplan[i].signin_gps_x = null;
        _visitorplan[i].signin_gps_y = null;
        _visitorplan[i].signout_time = null;
        _visitorplan[i].signout_gps_x = null;
        _visitorplan[i].signout_gps_y = null;
        this.emitChange(StoreEvent.SE_VISITOR_PLANLIST);
        break;
      }
    }
  },
  getVisitorPlan() {
    return _visitorplan;
  },

  setVisitorChat(vp) {
    _visitorchat = vp;
    this.emitChange(StoreEvent.SE_VISITOR_CHATLIST);
  },
  getVisitorChat() {
    return _visitorchat;
  },

  setVisitorMainshelf(vp) {
    _visitormainshelf = vp;
    this.emitChange(StoreEvent.SE_VISITOR_MAINSHELFLIST);
  },
  getVisitorMainshelf() {
    return _visitormainshelf;
  },
  setVisitorStock(vp) {
    _visitorstock = vp;
    this.emitChange(StoreEvent.SE_VISITOR_STOCKLIST);
  },
  getVisitorStock() {
    return _visitorstock;
  },
  setVisitorShelfaway(vp) {
    _visitorshelfaway = vp;
    this.emitChange(StoreEvent.SE_VISITOR_SHELFAWAYLIST);
  },
  getVisitorShelfaway() {
    return _visitorshelfaway;
  },

  setVisitorImage(vi) {
    _visitorimage = vi;
    this.emitChange(StoreEvent.SE_VISITOR_IMAGE);
  },
  getVisitorImage() {
    return _visitorimage;
  },

  setSubsidy(ss) {
    _subsidy = ss;
    this.emitChange(StoreEvent.SE_SUBSIDY);
  },

  updateSubsidy(ss) {
    for (var i = 0; i < _subsidy.length; i++) {
      if (_subsidy[i].id == ss.role_id) {
        _subsidy[i][ss.key] = ss.value;
        break;
      }
    }
    this.emitChange(StoreEvent.SE_SUBSIDY);
  },

  getSubsidy() {
    return _subsidy;
  },

  setRouteCost(rc) {
    _routeCost = rc;
    this.emitChange(StoreEvent.SE_ROUTECOST);
  },
  updateRouteCost(rc) {
    rc.store_id = rc.store_id || "";
    for (var i = 0; i < _routeCost.length; i++) {
      if (_routeCost[i].cdate == rc.routedate &&
        _routeCost[i].routetype == rc.routetype &&
        _routeCost[i].routemark == rc.routemark &&
        _routeCost[i].path_id == rc.path_id &&
        _routeCost[i].store_id == rc.store_id) {
        _routeCost[i][rc.key] = rc.value;

        this.emitChange(StoreEvent.SE_ROUTECOST);
        return;
      }
    }
    var data = {
      cdate: rc.routedate,
      routetype: rc.routetype,
      routemark: rc.routemark,
      path_id: rc.path_id,
      store_id: rc.store_id,
    };
    data[rc.key] = rc.value;
    _routeCost.push(data);
    this.emitChange(StoreEvent.SE_ROUTECOST);
  },
  getRouteCost() {
    return _routeCost;
  },
  setPromotionSum(ps) {
    _promotionsum = ps;
    this.emitChange(StoreEvent.SE_PROMOTIONSUM)
  },
  getPromotionSum() {
    return _promotionsum;
  },

  setPromotionAdjust(ss) {
    _promotionadjust = ss;
    this.emitChange(StoreEvent.SE_PROMOTIONADJUST);
  },

  updatePromotionAdjust(ss) {
    for (var i = 0; i < _promotionadjust.length; i++) {
      if (_promotionadjust[i].store_id == ss.store_id) {
        _promotionadjust[i][ss.key] = ss.value;
        this.emitChange(StoreEvent.SE_PROMOTIONADJUST);
        return;
      }
    }
    var data = {
      pro_id: ss.pro_id,
      store_id: ss.store_id,
    };
    data[ss.key] = ss.value;
    _promotionadjust.push(data);
    this.emitChange(StoreEvent.SE_PROMOTIONADJUST);
  },

  getPromotionAdjust() {
    return _promotionadjust;
  },

  setStockConfig(ss) {
    _stockconfig = ss;
    this.emitChange(StoreEvent.SE_STOCKCONFIG);
  },

  setStockConfigByKey(key, value) {
    console.log("setStockConfigByKey", key, value);
    for (var i = 0; i < _stockconfig.length; i++) {
      var stockInfo = _stockconfig[i];
      if (stockInfo.stock_key == key) {
        stockInfo.stock_value = value;
        break;
      }
    }
  },

  updateStockConfig(ss) {
    for (let key in ss) {
      this.setStockConfigByKey(key, ss[key]);
    }

    this.emitChange(StoreEvent.SE_STOCKCONFIG);
    // for (var i = 0; i < _stockconfig.length; i++) {
    //   if (_stockconfig[i].store_id == ss.store_id) {
    //     _stockconfig[i][ss.key] = ss.value;
    //     this.emitChange(StoreEvent.SE_STOCKCONFIG);
    //     return;
    //   }
    // }
    // var data = {
    //   pro_id: ss.pro_id,
    //   store_id: ss.store_id,
    // };
    // data[ss.key] = ss.value;
    // _promotionadjust.push(data);
    // this.emitChange(StoreEvent.SE_PROMOTIONADJUST);
  },

  getStockConfig() {
    return _stockconfig;
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
    case ActionEvent.AE_PERMISSONTYPE: {
      Store.setPermissonType(action.value);
    }
      break;
    case ActionEvent.AE_ROLE: {
      Store.setRole(action.value);
    }
      break;
    case ActionEvent.AE_ROLE_ADD: {
      Store.addRole(action.value);
    }
      break;
    case ActionEvent.AE_ROLE_MOD: {
      Store.modRole(action.value);
    }
      break;
    case ActionEvent.AE_ROLE_DEL: {
      Store.delRole(action.value);
    }
      break;

    case ActionEvent.AE_PATH: {
      Store.setPath(action.value);
    }
      break;
    case ActionEvent.AE_PATHDETAIL: {
      Store.setPathDetail(action.value);
    }
      break;
    case ActionEvent.AE_PLANSUM: {
      Store.setPlanSum(action.value);
    }
      break;
    case ActionEvent.AE_PLAN: {
      Store.setPlan(action.value);
    }
      break;
    case ActionEvent.AE_PLAN_UPDATE: {
      Store.updatePlan(action.value);
    }
      break;
    case ActionEvent.AE_SIGNLIST: {
      Store.setSignList(action.value);
    }
      break;
    case ActionEvent.AE_VISITOR_PLANLIST: {
      Store.setVisitorPlan(action.value);
    }
      break;
    case ActionEvent.AE_VISITOR_CHATLIST: {
      Store.setVisitorChat(action.value);
    }
      break;
    case ActionEvent.AE_VISITOR_MAINSHELFLIST: {
      Store.setVisitorMainshelf(action.value);
    }
      break;
    case ActionEvent.AE_VISITOR_STOCKLIST: {
      Store.setVisitorStock(action.value);
    }
      break;
    case ActionEvent.AE_VISITOR_SHELFAWAYLIST: {
      Store.setVisitorShelfaway(action.value);
    }
      break;
    case ActionEvent.AE_VISITOR_IMAGE: {
      Store.setVisitorImage(action.value);
    }
      break;
    case ActionEvent.AE_SUBSIDY: {
      Store.setSubsidy(action.value);
    }
      break;
    case ActionEvent.AE_SUBSIDY_UPDATE: {
      Store.updateSubsidy(action.value);
    }
      break;
    case ActionEvent.AE_ROUTEBASIC: {
      Store.emit(StoreEvent.SE_ROUTEBASIC, action.value);
    }
      break;
    case ActionEvent.AE_ROUTEBASICAREA: {
      Store.emit(StoreEvent.SE_ROUTEBASICAREA, action.value);
    }
      break;
    case ActionEvent.AE_ROUTECOST: {
      Store.setRouteCost(action.value);
    }
      break;
    case ActionEvent.AE_PLAN_DEL: {
      Store.delVisotorPlan(action.value);
    }
      break;
    case ActionEvent.AE_RESIGN: {
      Store.reSignPlan(action.value);
    }
      break;
    case ActionEvent.AE_ROUTECOST_UPDATE: {
      Store.updateRouteCost(action.value);
    }
      break;
    case ActionEvent.AE_PROMOTIONSUM: {
      Store.setPromotionSum(action.value);
    }
      break;
    case ActionEvent.AE_PROMOTIONIMAGE: {
      Store.emit(StoreEvent.SE_PROMOTIONIMAGE, action.value);
    }
      break;
    case ActionEvent.AE_PROMOTIONADJUST: {
      Store.setPromotionAdjust(action.value);
    }
      break;
    case ActionEvent.AE_PROMOTIONADJUST_UPDATE: {
      Store.updatePromotionAdjust(action.value);
    }
      break;
    case ActionEvent.AE_STOCKCONFIG: {
      Store.setStockConfig(action.value);
    }
      break;
    case ActionEvent.AE_STOCKCONFIG_UPDATE: {
      Store.updateStockConfig(action.value);
    }
      break;
    case ActionEvent.AE_CHECKPLAN: {
      Store.emit(StoreEvent.SE_CHECKPLAN, action.value);
    }
      break;
    case ActionEvent.AE_SALEACTUAL: {
      Store.emit(StoreEvent.SE_SALEACTUAL, action.value);
    }
      break;
    case ActionEvent.AE_MAINSHELFIMAGE: {
      Store.emit(StoreEvent.SE_MAINSHELFIMAGE, action.value);
    }
      break;
    case ActionEvent.AE_EXPENSE: {
      Store.emit(StoreEvent.SE_EXPENSE, action.value);
    }
      break;
    case ActionEvent.AE_EXPENSE_ADJUST: {
      Store.emit(StoreEvent.SE_EXPENSE_ADJUST, action.value);
    }
      break;
    case ActionEvent.AE_PARTTIME: {
      Store.emit(StoreEvent.SE_PARTTIME, action.value);
    }
      break;
    default:
      break;
  }
});

window.Store = Store;
module.exports = Store;
