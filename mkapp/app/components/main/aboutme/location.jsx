import React from 'react';
import styles from './aboutme.less';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import FlatButton from 'material-ui/FlatButton';
import {message} from 'antd';
import config from '../../config';

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onClickLocation = this.onClickLocation.bind(this);
  }
  componentDidMount() {
    this.map = new BMap.Map("localtionmap");
    this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);  // 初始化地图,设置中心点坐标和地图级别
    this.map.setCurrentCity("上海");
    var context = this;
    setTimeout(function () {
      context.onClickLocation();
    }, 1500);
  }
  componentWillUnmount() {
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  onClickLocation() {
    var context = this;
    if (config.platform == "android") {
      baidu_location.getCurrentPosition(function (data) {
        if (data.locType == 61 || data.locType == 161) {
          //定位成功
          message.success('定位成功');
          var point = new BMap.Point(data.lontitude, data.latitude);
          var mk = new BMap.Marker(point);
          context.map.addOverlay(mk);
          context.map.panTo(point);
        } else {
          message.error(data.describe);
          context.setState({
            loading: false
          })
        }
      }, function (data) {
        //定位失败
        message.error("定位失败");
        context.setState({
          loading: false
        })
      });
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          //onSuccees        
          var point = new BMap.Point(position.coords.longitude, position.coords.latitude);

          var translateCallback = function (data) {
            if (data.status === 0) {

              message.success('定位成功');
              var mk = new BMap.Marker(data.points[0]);
              context.map.addOverlay(mk);
              context.map.panTo(data.points[0]);
            }
          }

          var convertor = new BMap.Convertor();
          var pointArr = [];
          pointArr.push(point);
          convertor.translate(pointArr, 1, 5, translateCallback);

        }, function (error) {
          //onError
          message.error('定位失败' + error.message);
        }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
      } else { message.error("没有开启定位权限！") }
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: config.titlebarPadding }}
          title='我的位置'
          onLeftIconButtonTouchTap={this.onClickBack}
          onRightIconButtonTouchTap={this.onClickLocation}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="定位" />}
          />
        <div style={{ top: config.contentTop }} id="localtionmap" className={styles.mapContainer}></div>
      </div>
    );
  }
}

export default Location;