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
    };
  }
  componentDidMount() {
    var map = new BMap.Map("localtionmap");
    var point = new BMap.Point(120.3897754779, 36.066245467);
    map.centerAndZoom(point, 14);
    var marker = new BMap.Marker(new BMap.Point(120.3897754779, 36.066245467)); // 创建点
    map.addOverlay(marker);
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
          title='家乐福青岛名达店'
          onLeftIconButtonTouchTap={this.onClickBack}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          />
        <div className={styles.content}>
          <div id="localtionmap" className={styles.mapContainer}></div>
          <List>
            <ListItem
              primaryText="山东省青岛市市南区香港中路21号"
              leftIcon={<PlaceIcon color={cyan600}/>}
              />
            <ListItem
              primaryText={<span style={{fontWeight:'bold'}}>A</span>}
              leftIcon={<StarIcon color={cyan600}/>}
              />
            <ListItem
              primaryText="苏文"
              secondaryText="15026489683"
              leftIcon={<CommunicationCall color={cyan600}/>}
              />
            <ListItem
              insetChildren={true}
              primaryText="张飞"
              secondaryText="15026489684"
              />
          </List>
        </div>
      </div>
    );
  }
}

export default StoreDetail;