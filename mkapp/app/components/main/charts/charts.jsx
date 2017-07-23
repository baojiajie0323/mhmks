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

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
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
            >
              <LeftIcon />
            </IconButton>
            <DropDownMenu
              value={1}
              onChange={this.handleChange}
              style={{
                flexGrow: 1,
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              <MenuItem value={1} primaryText="销售月报" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </DropDownMenu>
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
            >
              <RightIcon />
            </IconButton>
          </div>
          <div className={styles.chartcontent}>
            <Chart_month />
          </div>  
        </div>
      </div >
    );
  }
}

export default Charts;