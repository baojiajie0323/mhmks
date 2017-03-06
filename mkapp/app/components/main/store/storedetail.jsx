import React from 'react';
import styles from './store.less';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import StarIcon from 'material-ui/svg-icons/toggle/star';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { cyan600, cyan300, transparent } from 'material-ui/styles/colors';

class StoreDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeInfo: {}
    };
  }
  componentDidMount() {
    var Store_id = this.props.userdata;
    var storeInfo = Store.getStoreById(Store_id);
    if (storeInfo) {
      this.setState({
        storeInfo
      })

    var map = new BMap.Map("localtionmap");
    var point = new BMap.Point(storeInfo.Gps_x, storeInfo.Gps_y);
    map.centerAndZoom(point, 14);
    var marker = new BMap.Marker(new BMap.Point(storeInfo.Gps_x, storeInfo.Gps_y)); // 创建点
    map.addOverlay(marker);
    }
  }
  componentWillUnmount() {
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          style={{  paddingTop:'20px' }}
          title={this.state.storeInfo.Store_name}
          onLeftIconButtonTouchTap={this.onClickBack}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          />
        <div className={styles.content}>
          <div id="localtionmap" className={styles.mapContainer}></div>
          <List>
            <ListItem
              primaryText={this.state.storeInfo.Address}
              leftIcon={<PlaceIcon color={cyan600}/>}
              />
            <ListItem
              primaryText={<span style={{ fontWeight: 'bold' }}>{this.state.storeInfo.Level}</span>}
              leftIcon={<StarIcon color={cyan600}/>}
              />
            <ListItem
              primaryText={this.state.storeInfo.Contacts_name}
              secondaryText={this.state.storeInfo.Tel}
              leftIcon={<CommunicationCall color={cyan600}/>}
              />
          </List>
        </div>
      </div>
    );
  }
}

export default StoreDetail;