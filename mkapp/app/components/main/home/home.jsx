import React from 'react';
import styles from './home.less';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import areIntlLocalesSupported from 'intl-locales-supported';
import {List, ListItem} from 'material-ui/List';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';


import AddIcon from 'material-ui/svg-icons/content/add-box';
import LineIcon from 'material-ui/svg-icons/action/timeline';
import DoneIcon from 'material-ui/svg-icons/action/done-all';
import PhoneIcon from 'material-ui/svg-icons/action/settings-phone';
import TmpIcon from 'material-ui/svg-icons/action/restore';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import LeftIcon from 'material-ui/svg-icons/av/fast-rewind';
import RightIcon from 'material-ui/svg-icons/av/fast-forward';
import NotstartIcon from 'material-ui/svg-icons/toggle/star-border';
import HasstartIcon from 'material-ui/svg-icons/toggle/star-half';
import FinishIcon from 'material-ui/svg-icons/toggle/star';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';


import { cyan800, cyan100, cyan600, green600, indigo600, red600 } from 'material-ui/styles/colors';

var DateTimeFormat;
if (areIntlLocalesSupported(['zh'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/zh');
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><AddIcon color={cyan800} /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
    <MenuItem primaryText="路线拜访" leftIcon={<LineIcon color={cyan600} />} />
    <MenuItem primaryText="临时拜访" leftIcon={<TmpIcon color={green600} />} />
    <MenuItem primaryText="电话拜访" leftIcon={<PhoneIcon color={indigo600} />} />
    <MenuItem primaryText="稽核拜访" leftIcon={<DoneIcon color={red600} />} />
  </IconMenu>
);

const PlanOperate = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon color={cyan800} /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
    <MenuItem primaryText="执行" leftIcon={<PlayIcon color={cyan600} />} />
    <MenuItem primaryText="删除" leftIcon={<DeleteIcon color={red600} />} />
  </IconMenu>
);

const Noplan = (props) => (
  <div className={styles.noplan}>暂无计划</div>
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planlist: [1, 2]
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  getPlanlist() {
    if (this.state.planlist.length <= 0) {
      return <Noplan />
    } else {
      return <List>
        <Subheader>共3个计划，已完成2个，未完成1个</Subheader>
        <ListItem
          primaryText="山东1"
          secondaryText="华北大润发即墨店-华北大润发城阳店-华北大润发长城路店"
          secondaryTextLines={3}
          rightIconButton={<PlanOperate />}
          leftIcon={<HasstartIcon color={cyan600} />}
          />
        <ListItem
          primaryText="临时拜访"
          secondaryText="家乐福青岛辽阳路店"
          secondaryTextLines={3}
          rightIconButton={<PlanOperate />}
          leftIcon={<NotstartIcon color={cyan600} />}
          />
        <ListItem
          primaryText="临时拜访"
          secondaryText="家乐福青岛新兴店"
          secondaryTextLines={3}
          rightIconButton={<PlanOperate />}
          leftIcon={<FinishIcon color={cyan600} />}
          />
      </List>
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          title='拜访'
          iconElementLeft={<span />}
          />
        <Paper zDepth={1}>
          <Toolbar style={{ backgroundColor: 'white' }}>
            <ToolbarGroup>
              <DateIcon color={cyan800} />
              <DatePicker
                DateTimeFormat={DateTimeFormat}
                locale="zh"
                style={{ marginLeft: '10px' }}
                textFieldStyle={{ textAlign: 'center', width: '120px' }}
                inputStyle ={{ textAlign: 'center' }}
                hintText="请选择日期"
                okLabel="确定"
                cancelLabel="取消"
                formatDate={new DateTimeFormat('zh', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format}
                />
              <IconButton><LeftIcon color={cyan800} /></IconButton>
              <IconButton><RightIcon color={cyan800} /></IconButton>
            </ToolbarGroup>
            <ToolbarGroup >
              <Logged />
            </ToolbarGroup>
          </Toolbar>
        </Paper>
        <div className={styles.content}>
          {this.getPlanlist() }
        </div>
      </div>
    );
  }
}

export default Home;