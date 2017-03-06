import React from 'react';
import styles from './aboutme.less';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import FlatButton from 'material-ui/FlatButton';
import {message} from 'antd';

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onClickLocation = this.onClickLocation.bind(this);
  }
  componentDidMount() {
    this.map = new BMap.Map("localtionmap");
    this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    this.map.setCurrentCity("上海");
    var context = this;
    setTimeout(function() {
      context.onClickLocation();
    }, 1500);
  }
  componentWillUnmount() {
  }
  onClickBack(){
    Store.emit(StoreEvent.SE_VIEW,'');
  }
  onClickLocation(){
    var context = this;
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {        
        message.success('定位成功');
        var mk = new BMap.Marker(r.point);
        context.map.addOverlay(mk);
        context.map.panTo(r.point);
      }
      else {
        message.error('定位失败' + this.getStatus());
      }
    }, { enableHighAccuracy: true })
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          style={{  paddingTop:'20px' }}
          title='我的位置'
          onLeftIconButtonTouchTap={this.onClickBack}
          onRightIconButtonTouchTap={this.onClickLocation}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="定位" />}
          />
         <div id="localtionmap" className={styles.mapContainer}></div> 
      </div>
    );
  }
}

export default Location;