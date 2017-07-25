import React from 'react';
import styles from './charts.less';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import { cyan600 } from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import Chart_month from './chart_month';
import Chart_actual from './chart_actual';
import Chart_promotion from './chart_promotion';

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navtitleIndex: 0,
    };
    this.navTitle = ["销售月报", "实销日报", "促销日报"];
    this.onClickLeft = this.onClickLeft.bind(this);
    this.onClickRight = this.onClickRight.bind(this);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  onClickLeft() {
    var { navtitleIndex } = this.state;
    navtitleIndex--;
    if (navtitleIndex < 0) {
      navtitleIndex = this.navTitle.length - 1;
    }
    this.setState({
      navtitleIndex
    })
  }
  onClickRight() {
    var { navtitleIndex } = this.state;
    navtitleIndex++;
    if (navtitleIndex >= this.navTitle.length) {
      navtitleIndex = 0;
    }
    this.setState({
      navtitleIndex
    })
  }
  render() {
    var chartdom = [];
    if (this.state.navtitleIndex == 0) {
      chartdom = <Chart_month />
    } else if (this.state.navtitleIndex == 1) {
      chartdom = <Chart_actual />
    } else if (this.state.navtitleIndex == 2) {
      chartdom = <Chart_promotion />
    }
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: config.titlebarPadding }}
          title='排名'
          iconElementLeft={<span></span>}
        />
        <div style={{ top: config.contentTop }} className={styles.content}>
          <div className={styles.chartnav}>
            <IconButton
              iconStyle={{
                width: 36,
                height: 36,
              }}
              style={{
                width: 50,
                height: 50,
                padding: 7,
              }}
              onTouchTap={this.onClickLeft}
            >
              <LeftIcon />
            </IconButton>
            <p style={{
              flexGrow: 1,
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: 'bold'
            }}
            >
              {this.navTitle[this.state.navtitleIndex]}
            </p>
            <IconButton
              iconStyle={{
                width: 36,
                height: 36,
              }}
              style={{
                width: 50,
                height: 50,
                padding: 7,
              }}
              onTouchTap={this.onClickRight}
            >
              <RightIcon />
            </IconButton>
          </div>
          <div className={styles.chartcontent}>
            {chartdom}
          </div>
        </div>
      </div >
    );
  }
}

export default Charts;