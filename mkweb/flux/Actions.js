'use strict';
import $ from 'jquery'
import { message } from 'antd';

var _debug = true;

const AJAXTIMEOUT = 20 * 1000;
var React = require('react');
var AppDispatcher = require('./AppDispatcher');
var ActionEvent = require('./event-const').ActionEvent;
var Action = {
  login: function (data) {
    var context = this;
    data.command = 'login';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('login:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_LOGIN, response.data[0]);
          message.success('登录成功');
        } else {
          message.error('登录失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('login fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_LOGIN, rsp.data);
        }
      })
  },
  logout: function () {
    var context = this;
    var data = {
      command: 'logout'
    }
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('logout:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_LOGOUT);
          message.success('注销成功');
        } else {
          message.error('注销失败' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('logout fail');
        if (_debug) {
          context.dispatch(ActionEvent.AE_LOGOUT);
        }
        //context.dispatch(ActionEvent.AE_LOGOUT);
      })
  },
  getStoreArea: function () {
    var context = this;
    var data = {
      command: 'getstorearea'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getStoreArea:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_STOREAREA, response.data);
        } else {
          message.error('获取门店系统区域失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getStoreArea fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_STOREAREA, rsp.data);
        }
      })
  },
  getStoreBasic: function (data) {
    var context = this;
<<<<<<< HEAD
    data = data || {};
=======
>>>>>>> cbb2df8a0f041f51fa84abd3d1c5f054a1fcc596
    data.command = 'getstorebasic';
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getStoreBasic:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_STOREBASIC, response.data);
        } else {
          message.error('获取门店失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getStoreBasic fail');
        if (_debug) {
          var response = '{"code":0,"data":[{"Store_id":"RTM-HB-011","Store_name":"华北大润发威海店","Level":"C","Address":"山东省威海市环翠区海滨北路128号","user_id":"Z00189","Bdate":"2016-08-02T16:00:00.000Z","System_id":"RTM","Region_id":"RTM004","Gps_x":"122.1274427589461","Gps_y":"37.489635932637206","Store_cname":"华北大润发威海店","D1":1,"D2":1,"D3":1,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"刘课长","Tel":"13754607233"},{"Store_id":"RTM-HB-013","Store_name":"华北大润发城阳店","Level":"B","Address":"山东青岛市城阳区春阳路","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"120.39774367299837","Gps_y":"36.31509185522844","Store_cname":"华北大润发城阳店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"严娜","Tel":"15963290699"},{"Store_id":"RTM-HB-016","Store_name":"华北大润发即墨店","Level":"C","Address":"山东省青岛市即墨市振华街嵩山一路交叉口","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"120.43074446671416","Gps_y":"36.38747136573888","Store_cname":"华北大润发即墨店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"刘课长","Tel":"15166398212"},{"Store_id":"RTM-HB-017","Store_name":"华北大润发济宁店","Level":"B","Address":"山东省济宁市市中区琵琶山路和红星路交界处，百花公园地下商城","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"116.59919937963085","Gps_y":"35.41069339381356","Store_cname":"华北大润发济宁店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"张洪涛","Tel":"15910001390"},{"Store_id":"RTM-HB-018","Store_name":"华北大润发荣成店","Level":"B","Address":"山东省威海市荣成市成山大道与台上南街交汇处","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"122.43029448108528","Gps_y":"37.15549966167423","Store_cname":"华北大润发荣成店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"姜瑞秀","Tel":"13156090218"},{"Store_id":"RTM-HB-020","Store_name":"华北大润发莱阳店","Level":"B","Address":"山东省烟台市莱阳市龙门路与大寺街西北角","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"120.70732375010304","Gps_y":"36.967232441586034","Store_cname":"华北大润发莱阳店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"张轶","Tel":"15253570615"},{"Store_id":"RTM-HB-022","Store_name":"华北大润发青州店","Level":"B","Address":"山东省潍坊市潍城区青州市云门山路与范公亭交汇处购物广场A段一层","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"118.48142250937855","Gps_y":"36.684999308907116","Store_cname":"华北大润发青州店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"刘振国","Tel":"18606366173"},{"Store_id":"RTM-HB-023","Store_name":"华北大润发莱芜店","Level":"B","Address":"山东省莱芜市莱城区汶源东大街以北花园北路以西","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"117.67887839728368","Gps_y":"36.2220567143704","Store_cname":"华北大润发莱芜店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"苏贤峰","Tel":"13863477296"},{"Store_id":"RTM-HB-025","Store_name":"华北大润发滨州店","Level":"B","Address":"山东省滨州市滨城区黄河六路与渤海七路交叉口东南角","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"118.0134504630991","Gps_y":"37.38305627127066","Store_cname":"华北大润发滨州店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"齐课长","Tel":"18005435577"},{"Store_id":"RTM-HB-026","Store_name":"华北大润发平度店","Level":"C","Address":"山东省青岛市平度市苏州路2-7号(近青岛路)","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"119.9569140983603","Gps_y":"36.78118231941398","Store_cname":"华北大润发平度店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"韩课","Tel":"15318742785"},{"Store_id":"RTM-HB-027","Store_name":"华北大润发泰安店","Level":"B","Address":"山东省泰安市新泰市东岳大街的西首","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"117.10454026624339","Gps_y":"36.18976358869688","Store_cname":"华北大润发泰安店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"孙静静","Tel":"15166484313"},{"Store_id":"RTM-HB-029","Store_name":"华北大润发文登店","Level":"B","Address":"山东省威海市文登市润泰国际广场","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"122.0503127081697","Gps_y":"37.19946804640194","Store_cname":"华北大润发文登店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"李斌","Tel":"15192802980"},{"Store_id":"RTM-HB-030","Store_name":"华北大润发日照店","Level":"B","Address":"山东省日照市东港区海曲路与兖州路交汇处","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"119.48873775772752","Gps_y":"35.418258613778","Store_cname":"华北大润发日照店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"赵宏耀","Tel":"15506336775"},{"Store_id":"RTM-HB-032","Store_name":"华北大润发长城路店","Level":"B","Address":"山东省青岛市城阳区崇阳路宝龙广场","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"120.39546323178288","Gps_y":"36.29593677217744","Store_cname":"华北大润发长城路店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"谢宁宁","Tel":"15264230600"},{"Store_id":"RTM-HB-036","Store_name":"华北大润发世昌店","Level":"B","Address":"山东省威海市火炬高技术产业开发区世昌大道100号","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"122.0979742542","Gps_y":"37.5021187825","Store_cname":"华北大润发世昌店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"邹积建","Tel":"18660327388"},{"Store_id":"RTM-HB-052","Store_name":"华北大润发兖州店","Level":"C","Address":"山东省济宁市兖州市龙桥路与建设路交叉口西北角","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"116.81047213191371","Gps_y":"35.55589065840359","Store_cname":"华北大润发兖州店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"李刚","Tel":"15253752698"},{"Store_id":"RTM-HB-034","Store_name":"华北大润发崂山店","Level":"B","Address":"山东省青岛市崂山区辽阳东路10号","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"120.42910634239034","Gps_y":"36.110388470167365","Store_cname":"华北大润发崂山店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"隋燕凤","Tel":"13969721075"},{"Store_id":"RTM-HB-053","Store_name":"华北大润发三里河店","Level":"C","Address":"山东省青岛市胶州市福州南路与扬州路交叉口","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"120.0218013853023","Gps_y":"36.27110921529936","Store_cname":"华北大润发三里河店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"窦课","Tel":"13854269505"},{"Store_id":"RTM-HB-001","Store_name":"华北大润发历下店","Level":"A","Address":"山东省济南市历下区文化西路1号","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"117.03184557084214","Gps_y":"36.65463613180361","Store_cname":"华北大润发历下店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"杜吉芳","Tel":"18954179936"},{"Store_id":"RTM-HB-002","Store_name":"华北大润发历城店","Level":"A","Address":"山东省济南市历城区花园路99号","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"117.05818169115909","Gps_y":"36.683667213470414","Store_cname":"华北大润发历城店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"张莉莉","Tel":"18866802636"},{"Store_id":"RTM-HB-003","Store_name":"华北大润发市中店","Level":"A","Address":"山东省济南市中区二七新村南路9号","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"116.98226581816722","Gps_y":"36.63072731982125","Store_cname":"华北大润发市中店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"孙夕慧","Tel":"15169135087"},{"Store_id":"RTM-HB-006","Store_name":"华北大润发烟台店","Level":"A","Address":"山东省烟台市芝罘区南大街166号底下层","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"121.3727088074274","Gps_y":"37.5425004288028","Store_cname":"华北大润发烟台店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"姜峰","Tel":"13583516392"},{"Store_id":"RTM-HB-007","Store_name":"华北大润发青岛店","Level":"A","Address":"山东省青岛市市南区宁夏路162号","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"120.38756414173497","Gps_y":"36.08087579588813","Store_cname":"华北大润发青岛店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"郭莉","Tel":"18661701505"},{"Store_id":"RTM-HB-008","Store_name":"华北大润发天桥店","Level":"B","Address":"山东省济南市天桥区堤口路80号","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"116.97506637218306","Gps_y":"36.67515907274382","Store_cname":"华北大润发天桥店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"徐凯","Tel":"18660110320"},{"Store_id":"RTM-HB-010","Store_name":"华北大润发淄博店","Level":"A","Address":"山东省淄博市张店区华光路86号","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"118.03608253136957","Gps_y":"36.82105709751527","Store_cname":"华北大润发淄博店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"郑课长","Tel":"17705337538"},{"Store_id":"WAL-2371","Store_name":"沃尔玛（山东）百货有限公司济宁神道路分店","Level":"C","Address":"山东省济宁市任城区玄帝庙街22号太白商业广场地上一、二层","user_id":"Z00189","Bdate":null,"System_id":"WAL","Region_id":"WAL001","Gps_x":"116.56827233135967","Gps_y":"35.40196268437308","Store_cname":"沃尔玛（山东）百货有限公司济宁神道路分店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"沃尔玛","Region_name":"沃尔玛北区","Contacts_name":"吴永宽","Tel":"13406280639"},{"Store_id":"RTM-HB-035","Store_name":"华北大润发枣庄店","Level":"B","Address":"山东省枣庄市振兴路121号","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"117.55455496187571","Gps_y":"34.8564810953223","Store_cname":"华北大润发枣庄店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"朱课","Tel":"18963256121"},{"Store_id":"RTM-HB-051","Store_name":"华北大润发历奎文店","Level":"C","Address":"山东省潍坊市奎文区福寿街与新华路交叉口南200米路西","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"119.14132453804353","Gps_y":"36.71861263919841","Store_cname":"华北大润发历奎文店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"朗彬","Tel":"13562645493"},{"Store_id":"MTR-258","Store_name":"麦德龙食品服务青岛店","Level":"C","Address":"山东省青岛市经济技术开发区五台山路1517号","user_id":"Z00189","Bdate":null,"System_id":"MTR","Region_id":"MTR003","Gps_x":"120.169809","Gps_y":"35.967026","Store_cname":"麦德龙食品服务青岛店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"麦德龙","Region_name":"麦德龙华北区","Contacts_name":"李金玮","Tel":"18698079506"},{"Store_id":"RTM-HB-062","Store_name":"华北大润发红旗店","Level":"B","Address":"山东省临沂市兰山区新华一路28号","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"118.337204","Gps_y":"35.058132","Store_cname":null,"D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"尚善民","Tel":"15966420331"},{"Store_id":"RTM-HB-054","Store_name":"华北大润发省博店","Level":"C","Address":"山东省济南市历下区经十路11899号（燕山立交桥东2公里）","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"117.08923307686251","Gps_y":"36.65634920966547","Store_cname":"华北大润发省博店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"陶课","Tel":"13675417297"},{"Store_id":"RTM-HB-044","Store_name":"华北大润发阜安店","Level":"C","Address":"山东省青岛市胶州市人民广场对面","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"120.016979","Gps_y":"36.298548","Store_cname":"华北大润发阜安店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"王课","Tel":"15192736938"},{"Store_id":"MTR-121","Store_name":"麦德龙淄博张店商场","Level":"B","Address":"山东省淄博市张店区山泉路102号","user_id":"Z00189","Bdate":null,"System_id":"MTR","Region_id":"MTR003","Gps_x":"118.02971186514988","Gps_y":"36.76172265909978","Store_cname":"麦德龙淄博张店商场","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"麦德龙","Region_name":"麦德龙华北区","Contacts_name":"徐主管","Tel":"15853338149"},{"Store_id":"RTM-HB-063","Store_name":"华北大润发衡山店","Level":"C","Address":"山东省烟台市福山区衡山路58号","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"121.257133","Gps_y":"37.539360","Store_cname":"华北大润发衡山店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"宋珺","Tel":"15505459925"},{"Store_id":"RTM-HB-041","Store_name":"华北大润发章丘店","Level":"C","Address":"山东济南章丘香港街大润发二楼","user_id":"Z00189","Bdate":null,"System_id":"RTM","Region_id":"RTM004","Gps_x":"117.52867469464887","Gps_y":"36.71131898942501","Store_cname":"华北大润发章丘店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"大润发","Region_name":"大润发华北区","Contacts_name":"伦旭阳","Tel":"13225410731"},{"Store_id":"MTR-123","Store_name":"麦德龙潍坊商场","Level":"B","Address":"山东省潍坊市经济开发区北海路3333号","user_id":"Z00189","Bdate":null,"System_id":"MTR","Region_id":"MTR003","Gps_x":"119.1518022141309","Gps_y":"36.758105625507376","Store_cname":"麦德龙潍坊商场","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"麦德龙","Region_name":"麦德龙华北区","Contacts_name":"孙峰","Tel":"18853656918"},{"Store_id":"CAF-025","Store_name":"家乐福济南公共汽车站店","Level":"A","Address":"山东省济南市历下区历山路101号","user_id":"Z00189","Bdate":null,"System_id":"CAF","Region_id":"CAF003","Gps_x":"117.03783485553903","Gps_y":"36.668026127558505","Store_cname":"家乐福济南公共汽车站店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"家乐福","Region_name":"家乐福华北区","Contacts_name":"蒋秀华","Tel":"13188943485"},{"Store_id":"CAF-057","Store_name":"家乐福青岛辽阳路店","Level":"C","Address":"山东省青岛市市北区辽阳西路188号2楼","user_id":"Z00189","Bdate":null,"System_id":"CAF","Region_id":"CAF003","Gps_x":"120.39086648052199","Gps_y":"36.09780802657403","Store_cname":"家乐福青岛辽阳路店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"家乐福","Region_name":"家乐福华北区","Contacts_name":"刘坤","Tel":"18561725699"},{"Store_id":"CAF-014","Store_name":"家乐福青岛名达店","Level":"A","Address":"山东省青岛市市南区香港中路21号","user_id":"Z00189","Bdate":null,"System_id":"CAF","Region_id":"CAF003","Gps_x":"120.3897754779","Gps_y":"36.066245467","Store_cname":"家乐福青岛名达店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"家乐福","Region_name":"家乐福华北区","Contacts_name":"苏文","Tel":"18561731235"},{"Store_id":"CAF-020","Store_name":"家乐福青岛新兴店","Level":"B","Address":"山东省青岛市市北区山东路128号","user_id":"Z00189","Bdate":null,"System_id":"CAF","Region_id":"CAF003","Gps_x":"120.36883167924695","Gps_y":"36.09126788851098","Store_cname":"家乐福青岛新兴店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"家乐福","Region_name":"家乐福华北区","Contacts_name":"李课","Tel":"18153211772"},{"Store_id":"WAL-5744","Store_name":"沃尔玛济南泉城路分店","Level":"C","Address":"山东省济南市历下区泉城路万达","user_id":"Z00189","Bdate":null,"System_id":"WAL","Region_id":"WAL001","Gps_x":"117.01152","Gps_y":"36.664509","Store_cname":"沃尔玛济南泉城路分店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"沃尔玛","Region_name":"沃尔玛北区","Contacts_name":"高旭","Tel":"15953193933"},{"Store_id":"WAL-5745","Store_name":"沃尔玛青岛台东分店","Level":"C","Address":"山东省青岛市市北区台东三路63号万达","user_id":"Z00189","Bdate":null,"System_id":"WAL","Region_id":"WAL001","Gps_x":"120.35022912547133","Gps_y":"36.08225507178712","Store_cname":"沃尔玛青岛台东分店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"沃尔玛","Region_name":"沃尔玛北区","Contacts_name":"赵主管","Tel":"18561813311"},{"Store_id":"WAL-1032","Store_name":"沃尔玛淄博柳泉路分店","Level":"C","Address":"山东省淄博市张店区华光路北柳泉路西","user_id":"Z00189","Bdate":null,"System_id":"WAL","Region_id":"WAL001","Gps_x":"118.04704527227881","Gps_y":"36.82205128230315","Store_cname":"沃尔玛淄博柳泉路分店","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"沃尔玛","Region_name":"沃尔玛北区","Contacts_name":"梁柠玉","Tel":"13589558789"},{"Store_id":"MTR-020","Store_name":"麦德龙青岛四方商场","Level":"A","Address":"山东省青岛市四方区重庆南路116号","user_id":"Z00189","Bdate":null,"System_id":"MTR","Region_id":"MTR003","Gps_x":"120.3725269341612","Gps_y":"36.11538638124268","Store_cname":"麦德龙青岛四方商场","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"麦德龙","Region_name":"麦德龙华北区","Contacts_name":"张秋","Tel":"15763981843"},{"Store_id":"MTR-160","Store_name":"麦德龙临沂罗庄商场","Level":"B","Address":"山东省临沂市罗庄区沂州路318号","user_id":"Z00189","Bdate":null,"System_id":"MTR","Region_id":"MTR003","Gps_x":"118.3491515033536","Gps_y":"35.01781008555598","Store_cname":"麦德龙临沂罗庄商场","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"麦德龙","Region_name":"麦德龙华北区","Contacts_name":"赵主管","Tel":"13754749289"},{"Store_id":"MTR-059","Store_name":"麦德龙青岛黄岛商场","Level":"B","Address":"山东省青岛市黄岛区五台山路北、团结路西侧","user_id":"Z00189","Bdate":null,"System_id":"MTR","Region_id":"MTR003","Gps_x":"120.16440786479882","Gps_y":"35.985653614424095","Store_cname":"麦德龙青岛黄岛商场","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"麦德龙","Region_name":"麦德龙华北区","Contacts_name":"曲梅","Tel":"13793297606"},{"Store_id":"MTR-071","Store_name":"麦德龙烟台芝罘商场","Level":"B","Address":"山东省烟台市芝罘区只楚路149号","user_id":"Z00189","Bdate":null,"System_id":"MTR","Region_id":"MTR003","Gps_x":"121.35577563434138","Gps_y":"37.54302901725038","Store_cname":"麦德龙烟台芝罘商场","D1":null,"D2":null,"D3":null,"Status":"Y","System_name":"麦德龙","Region_name":"麦德龙华北区","Contacts_name":"周主管","Tel":"18954571843"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_STOREBASIC, rsp.data);
        }
      })
  },
  getStoreContacts: function () {
    var context = this;
    var data = {
      command: 'getstorecontacts'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getStoreContacts:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_STORECONTACTS, response.data);
        } else {
          message.error('获取门店联系人失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getStoreContacts fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_STORECONTACTS, rsp.data);
        }
      })
  },
  getStoreDisplay: function () {
    var context = this;
    var data = {
      command: 'getstoredisplay'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getStoreDisplay:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_STOREDISPLAY, response.data);
        } else {
          message.error('获取门店联系人失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getStoreDisplay fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_STOREDISPLAY, rsp.data);
        }
      })
  },
  getProduct: function () {
    var context = this;
    var data = {
      command: 'getproduct'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getProduct:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PRODUCT, response.data);
        } else {
          message.error('获取产品失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getStoreDisplay fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PRODUCT, rsp.data);
        }
      })
  },
  getProductPrice: function (page) {
    var context = this;
    var data = {
      command: 'getproductprice',
      page: page
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getProductPrice:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PRODUCTPRICECOUNT, response.count);
          context.dispatch(ActionEvent.AE_PRODUCTPRICE, response.data);
        } else {
          message.error('获取产品价格失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getProductPrice fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PRODUCTPRICE, rsp.data);
        }
      })
  },
  getProductStock: function (page) {
    var context = this;
    var data = {
      command: 'getproductstock',
      page: page
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getProductStock:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PRODUCTSTOCKCOUNT, response.count);
          context.dispatch(ActionEvent.AE_PRODUCTSTOCK, response.data);
        } else {
          message.error('获取产品安全库存失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getProductStock fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PRODUCTSTOCK, rsp.data);
        }
      })
  },
  getProductBrand: function () {
    var context = this;
    var data = {
      command: 'getproductbrand'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getProductBrand:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PRODUCTBRAND, response.data);
        } else {
          message.error('获取品牌失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getProductBrand fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PRODUCTBRAND, rsp.data);
        }
      })
  },
  getPromotionType: function () {
    var context = this;
    var data = {
      command: 'getpromotiontype'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPromotionType:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PROMOTIONTYPE, response.data);
        } else {
          message.error('获取促销类型失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPromotionType fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PROMOTIONTYPE, rsp.data);
        }
      })
  },
  getPromotion: function (page) {
    var context = this;
    var data = {
      command: 'getpromotion',
      page: page
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPromotion:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PROMOTIONCOUNT, response.count);
          context.dispatch(ActionEvent.AE_PROMOTION, response.data);
        } else {
          message.error('获取促销活动失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPromotion fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PROMOTION, rsp.data);
        }
      })
  },

  getUser: function () {
    var context = this;
    var data = {
      command: 'getuser'
    }
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getUser:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_USER, response.data);
        } else {
          message.error('获取用户失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getUser fail');
        if (_debug) {
          var response = '{"data":[{"id":1,"username":"008888","realname":"鲍嘉捷","password":"123456","phone":"15026489683","email":"baojiajie@myhome.com","depart":"","enableweb":1,"enableapp":0}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_USER, rsp.data);
        }
      })
  },
  addUser: function (data) {
    var context = this;
    data.command = 'adduser';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('addUser:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_USER_ADD, response.data);
          message.success('创建用户成功！');
        } else {
          message.error('创建用户失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('adduser fail');
      })
  },
  modUser: function (data) {
    var context = this;
    data.command = 'moduser';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('modUser:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_USER_MOD, response.data);
          message.success('修改用户成功！');
        } else {
          message.error('修改用户失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('modUser fail');
      })
  },
  delUser: function (data) {
    var context = this;
    data.command = 'deluser';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('delUser:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_USER_DEL, response.data);
          message.success('删除用户成功！');
        } else {
          message.error('删除用户失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('delUser fail');
      })
  },
  getDepartment: function () {
    var context = this;
    var data = {
      command: 'getdepart'
    }
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getDepart:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_DEPARTMENT, response.data);
        } else {
          message.error('获取部门失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getDepart fail');
        if (_debug) {
          var response = '{"data":[{"id":"1","name":"市场部","parentid":"0"},{"id":"2","name":"营销部","parentid":"0"},{"id":"3","name":"华东区","parentid":"1"},{"id":"4","name":"华中区","parentid":"1"},{"id":"5","name":"上海区","parentid":"4"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_DEPARTMENT, rsp.data);
        }
      })
  },
  addDepartment: function (data) {
    var context = this;
    data.command = 'adddepart';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('addDepartment:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_DEPARTMENT_ADD, response.data);
          message.success('创建部门成功！');
        } else {
          message.error('创建部门失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('addDepartment fail');
      })
  },
  modDepartment: function (data) {
    var context = this;
    data.command = 'moddepart';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('modDepartment:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_DEPARTMENT_MOD, response.data);
          message.success('修改部门成功！');
        } else {
          message.error('修改部门失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('modDepartment fail');
      })
  },
  delDepartment: function (data) {
    var context = this;
    data.command = 'deldepart';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('delDepartment:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_DEPARTMENT_DEL, response.data);
          message.success('删除部门成功！');
        } else {
          message.error('删除部门失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('delDepartment fail');
      })
  },
  getPermissonType: function () {
    var context = this;
    var data = {
      command: 'getpermissontype'
    }
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPermissonType:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PERMISSONTYPE, response.data);
        } else {
          message.error('获取权限失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPermissonType fail');
        if (_debug) {
          var response = '{"data":[{"permissonid":1,"name":"后台管理","parentid":"0"},{"permissonid":2,"name":"大区主管","parentid":"0"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PERMISSONTYPE, rsp.data);
        }
      })
  },
  getRole: function () {
    var context = this;
    var data = {
      command: 'getrole'
    }
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getRole:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_ROLE, response.data);
        } else {
          message.error('获取角色失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getRole fail');
        if (_debug) {
          var response = '{"data":[{"id":1,"name":"系统管理员"},{"id":2,"name":"大区主管"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_ROLE, rsp.data);
        }
      })
  },
  addRole: function (data) {
    var context = this;
    data.command = 'addrole';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('addRole:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_ROLE_ADD, response.data);
          message.success('创建角色成功！');
        } else {
          message.error('创建角色失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('addRole fail');
      })
  },
  modRole: function (data) {
    var context = this;
    data.command = 'modrole';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('modRole:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_ROLE_MOD, response.data);
          message.success('修改角色成功！');
        } else {
          message.error('修改角色失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('modRole fail');
      })
  },
  delRole: function (data) {
    var context = this;
    data.command = 'delrole';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('delRole:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_ROLE_DEL, response.data);
          message.success('删除角色成功！');
        } else {
          message.error('删除角色失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('delRole fail');
      })
  },

  getPath: function () {
    var context = this;
    var data = {
      command: 'getpath'
    }
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPath:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PATH, response.data);
        } else {
          message.error('获取路线失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPath fail');
        if (_debug) {
          var response = '{"data":[{"Path_id":"Q00001","Path_name":"山东1"},{"Path_id":"Q00002","Path_name":"山东2"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PATH, rsp.data);
        }
      })
  },
  getPath_app: function (data) {
    var context = this;
    data.command = 'getpath_app';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPath:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PATH, response.data);
        } else {
          message.error('获取路线失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPath fail');
        if (_debug) {
          var response = '{"code":0,"data":[{"Path_id":"Q00001","Path_seq":1,"Store_id":"RTM-HB-016","Path_name":"山东1","Store_name":"华北大润发即墨店"},{"Path_id":"Q00002","Path_seq":1,"Store_id":"CAF-057","Path_name":"山东2","Store_name":"家乐福青岛辽阳路店"},{"Path_id":"Q00003","Path_seq":1,"Store_id":"RTM-HB-034","Path_name":"山东3","Store_name":"华北大润发崂山店"},{"Path_id":"Q00004","Path_seq":1,"Store_id":"RTM-HB-026","Path_name":"山东4","Store_name":"华北大润发平度店"},{"Path_id":"Q00005","Path_seq":1,"Store_id":"RTM-HB-044","Path_name":"山东5","Store_name":"华北大润发阜安店"},{"Path_id":"Q00006","Path_seq":1,"Store_id":"WAL-5744","Path_name":"山东6","Store_name":"沃尔玛济南泉城路分店"},{"Path_id":"Q00007","Path_seq":1,"Store_id":"RTM-HB-054","Path_name":"山东7","Store_name":"华北大润发省博店"},{"Path_id":"Q00008","Path_seq":1,"Store_id":"RTM-HB-041","Path_name":"山东8","Store_name":"华北大润发章丘店"},{"Path_id":"Q00009","Path_seq":1,"Store_id":"RTM-HB-060","Path_name":"山东9","Store_name":"华北大润发东昌店"},{"Path_id":"Q00010","Path_seq":1,"Store_id":"RTM-HB-029","Path_name":"山东10","Store_name":"华北大润发文登店"},{"Path_id":"Q00011","Path_seq":1,"Store_id":"RTM-HB-036","Path_name":"山东11","Store_name":"华北大润发世昌店"},{"Path_id":"Q00012","Path_seq":1,"Store_id":"MTR-071","Path_name":"山东12","Store_name":"麦德龙烟台芝罘商场"},{"Path_id":"Q00013","Path_seq":1,"Store_id":"WAL-1033","Path_name":"山东13","Store_name":"沃尔玛潍坊东风东街分店"},{"Path_id":"Q00015","Path_seq":1,"Store_id":"RTM-HB-017","Path_name":"山东15","Store_name":"华北大润发济宁店"},{"Path_id":"Q00016","Path_seq":1,"Store_id":"RTM-HB-027","Path_name":"山东16","Store_name":"华北大润发泰安店"},{"Path_id":"Q00018","Path_seq":1,"Store_id":"RTM-HB-035","Path_name":"山东18","Store_name":"华北大润发枣庄店"},{"Path_id":"Q00001","Path_seq":2,"Store_id":"RTM-HB-013","Path_name":"山东1","Store_name":"华北大润发城阳店"},{"Path_id":"Q00002","Path_seq":2,"Store_id":"CAF-020","Path_name":"山东2","Store_name":"家乐福青岛新兴店"},{"Path_id":"Q00003","Path_seq":2,"Store_id":"RTM-HB-007","Path_name":"山东3","Store_name":"华北大润发青岛店"},{"Path_id":"Q00004","Path_seq":2,"Store_id":"MTR-059","Path_name":"山东4","Store_name":"麦德龙青岛黄岛商场"},{"Path_id":"Q00005","Path_seq":2,"Store_id":"RTM-HB-053","Path_name":"山东5","Store_name":"华北大润发三里河店"},{"Path_id":"Q00006","Path_seq":2,"Store_id":"CAF-025","Path_name":"山东6","Store_name":"家乐福济南公共汽车站店"},{"Path_id":"Q00007","Path_seq":2,"Store_id":"RTM-HB-003","Path_name":"山东7","Store_name":"华北大润发市中店"},{"Path_id":"Q00008","Path_seq":2,"Store_id":"RTM-HB-010","Path_name":"山东8","Store_name":"华北大润发淄博店"},{"Path_id":"Q00009","Path_seq":2,"Store_id":"RTM-HB-025","Path_name":"山东9","Store_name":"华北大润发滨州店"},{"Path_id":"Q00010","Path_seq":2,"Store_id":"RTM-HB-018","Path_name":"山东10","Store_name":"华北大润发荣成店"},{"Path_id":"Q00011","Path_seq":2,"Store_id":"RTM-HB-011","Path_name":"山东11","Store_name":"华北大润发威海店"},{"Path_id":"Q00012","Path_seq":2,"Store_id":"RTM-HB-006","Path_name":"山东12","Store_name":"华北大润发烟台店"},{"Path_id":"Q00013","Path_seq":2,"Store_id":"MTR-123","Path_name":"山东13","Store_name":"麦德龙潍坊商场"},{"Path_id":"Q00014","Path_seq":2,"Store_id":"RTM-HB-022","Path_name":"山东14","Store_name":"华北大润发青州店"},{"Path_id":"Q00015","Path_seq":2,"Store_id":"WAL-2371","Path_name":"山东15","Store_name":"沃尔玛（山东）百货有限公司济宁神道路分店"},{"Path_id":"Q00016","Path_seq":2,"Store_id":"RTM-HB-023","Path_name":"山东16","Store_name":"华北大润发莱芜店"},{"Path_id":"Q00017","Path_seq":2,"Store_id":"MTR-160","Path_name":"山东17","Store_name":"麦德龙临沂罗庄商场"},{"Path_id":"Q00018","Path_seq":2,"Store_id":"RTM-HB-030","Path_name":"山东18","Store_name":"华北大润发日照店"},{"Path_id":"Q00001","Path_seq":3,"Store_id":"RTM-HB-032","Path_name":"山东1","Store_name":"华北大润发长城路店"},{"Path_id":"Q00002","Path_seq":3,"Store_id":"CAF-014","Path_name":"山东2","Store_name":"家乐福青岛名达店"},{"Path_id":"Q00003","Path_seq":3,"Store_id":"WAL-5745","Path_name":"山东3","Store_name":"沃尔玛青岛台东分店"},{"Path_id":"Q00006","Path_seq":3,"Store_id":"RTM-HB-002","Path_name":"山东6","Store_name":"华北大润发历城店"},{"Path_id":"Q00007","Path_seq":3,"Store_id":"RTM-HB-008","Path_name":"山东7","Store_name":"华北大润发天桥店"},{"Path_id":"Q00008","Path_seq":3,"Store_id":"WAL-1032","Path_name":"山东8","Store_name":"沃尔玛淄博柳泉路分店"},{"Path_id":"Q00009","Path_seq":3,"Store_id":"MTR-121","Path_name":"山东9","Store_name":"麦德龙淄博张店商场"},{"Path_id":"Q00012","Path_seq":3,"Store_id":"RTM-HB-020","Path_name":"山东12","Store_name":"华北大润发莱阳店"},{"Path_id":"Q00013","Path_seq":3,"Store_id":"RTM-HB-051","Path_name":"山东13","Store_name":"华北大润发历奎文店"},{"Path_id":"Q00015","Path_seq":3,"Store_id":"RTM-HB-052","Path_name":"山东15","Store_name":"华北大润发兖州店"},{"Path_id":"Q00003","Path_seq":4,"Store_id":"MTR-020","Path_name":"山东3","Store_name":"麦德龙青岛四方商场"},{"Path_id":"Q00006","Path_seq":4,"Store_id":"RTM-HB-001","Path_name":"山东6","Store_name":"华北大润发历下店"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PATH, rsp.data);
        }
      })
  },
  getPathDetail: function () {
    var context = this;
    var data = {
      command: 'getpathdetail'
    }
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPathDetail:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PATHDETAIL, response.data);
        } else {
          message.error('获取路线详情失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPath fail');
        if (_debug) {
          var response = '{"data":[{"Path_id":"Q00001","Path_name":"山东1"},{"Path_id":"Q00002","Path_name":"山东2"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PATHDETAIL, rsp.data);
        }
      })
  },
  getPlanSum: function (data) {
    var context = this;
    data.command = 'getplansum';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPlanSum:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PLANSUM, response.data);
        } else {
          message.error('获取计划统计失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPlanSum fail');
        if (_debug) {
          var response = '{"code":0,"data":[{"userid":"z00189","year":2017,"month":1,"storeA":3.5,"storeB":5.3,"storeC":0.9,"cover":88,"complete":90},{"userid":"z00189","year":2017,"month":2,"storeA":4.1,"storeB":2.2,"storeC":1.2,"cover":97,"complete":75},{"userid":"z00189","year":2017,"month":3,"storeA":4.3,"storeB":2.5,"storeC":1.3,"cover":92,"complete":20}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PLANSUM, rsp.data);
        }
      })
  },
  getPlan: function (data) {
    var context = this;
    data.command = 'getplan';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPlan:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PLAN, response.data);
        } else {
          message.error('获取计划失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPlan fail');
        if (_debug) {
<<<<<<< HEAD
          var response = '{"code":0,"data":[{"userid":"z00189","year":2017,"month":4,"day":1,"plan_type":1,"path_id":"Q00004","store_id":"MTR-059","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东4"},{"userid":"z00189","year":2017,"month":4,"day":1,"plan_type":1,"path_id":"Q00004","store_id":"RTM-HB-026","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东4"},{"userid":"z00189","year":2017,"month":4,"day":2,"plan_type":1,"path_id":"Q00006","store_id":"CAF-025","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":2,"plan_type":1,"path_id":"Q00006","store_id":"RTM-HB-001","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":2,"plan_type":1,"path_id":"Q00006","store_id":"RTM-HB-002","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":2,"plan_type":1,"path_id":"Q00006","store_id":"WAL-5744","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":7,"plan_type":1,"path_id":"Q00002","store_id":"CAF-014","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东2"},{"userid":"z00189","year":2017,"month":4,"day":7,"plan_type":1,"path_id":"Q00002","store_id":"CAF-020","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东2"},{"userid":"z00189","year":2017,"month":4,"day":7,"plan_type":1,"path_id":"Q00002","store_id":"CAF-057","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东2"},{"userid":"z00189","year":2017,"month":4,"day":8,"plan_type":1,"path_id":"Q00006","store_id":"CAF-025","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":8,"plan_type":1,"path_id":"Q00006","store_id":"RTM-HB-001","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":8,"plan_type":1,"path_id":"Q00006","store_id":"RTM-HB-002","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":8,"plan_type":1,"path_id":"Q00006","store_id":"WAL-5744","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"}]}';
=======
          var response = '{"code":0,"data":[{"userid":"z00189","year":2017,"month":3,"day":1,"plan_type":1,"path_id":"Q00001","store_id":"RTM-HB-011","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东1"}]}';
>>>>>>> cbb2df8a0f041f51fa84abd3d1c5f054a1fcc596
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PLAN, rsp.data);
        }
      })
  },
  updatePlan: function (data) {
    var context = this;
    data.command = 'updateplan';
    console.log('updatePlan  req: ',data);
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('updatePlan:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_ROLE_MOD, response.data);
          message.success('修改计划成功！');
        } else {
          message.error('修改计划失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('modRole fail');
      })
  },
  dispatch: function (funname, value) {
    AppDispatcher.dispatch({
      eventName: funname,
      value: value
    });
  }
};

window.Action = Action;
module.exports = Action;
