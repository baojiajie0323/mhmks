import React from 'react';
import styles from './aboutme.less';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import FlatButton from 'material-ui/FlatButton';
import {message} from 'antd';
import config from '../../config';

class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    var div1 = document.getElementById("framediv1");
    var div2 = document.getElementById("framediv2");
    var h = div1.offsetHeight; //高度
    var w = div1.offsetWidth; //宽度


    var scalex = w / 640;
    var offsetx = (w - 640) / 2;
    var scaley = h / 1080;
    var offsety = (h - 1080) / 2;

    div2.style.left = offsetx + 'px';
    div2.style.top = offsety + 'px';
    div2.style.transform = "scale(" + scalex + "," + scaley + ")";
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
          style={{  paddingTop:config.titlebarPadding }}
          title='产品手册'
          onLeftIconButtonTouchTap={this.onClickBack}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          />
        <div style={{top:config.contentTop}} id="framediv1" className={styles.mapContainer}>
          <div id="framediv2" className={styles.helpContainer}>
            <iframe id="iframe1" width="100%" height="100%" frameBorder="0" scrolling="no" src="http://9a86211e1ad5.ih5.cn/idea/SPSPuHt?vxparam=/vxid_1/"></iframe>
          </div>
        </div>
      </div>
    );
  }
}

export default Help;