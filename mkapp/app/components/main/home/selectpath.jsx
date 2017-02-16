import React from 'react';
import styles from './home.less';


import { Spin } from 'antd';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';


import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';

class SelectPath extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: Store.getPath(),
      loading: true,
    };
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_CURPLANLIST, this.onCurPlanListChange)
  }
  componentWillUnmount() {
  }
  getPathlist() {
    return [<ListItem
      leftCheckbox={<Checkbox />}
      primaryText="山东1"
      secondaryText="华北大润发即墨店->华北大润发城阳店->华北大润发长城路店"
      />,
      <ListItem
        leftCheckbox={<Checkbox />}
        primaryText="山东2"
        secondaryText="家乐福青岛辽阳路店->家乐福青岛新兴店->家乐福青岛名达店"
        />,
      <ListItem
        leftCheckbox={<Checkbox />}
        primaryText="山东3"
        secondaryText="家乐福青岛辽阳路店->家乐福青岛新兴店"
        />]
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  onCurPlanListChange() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  onClickOk() {
    Action.addPlan({});
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          title='选择路线'
          onLeftIconButtonTouchTap={this.onClickBack}
          onRightIconButtonTouchTap={this.onClickOk}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="确定" />}
          />
        <div className={[styles.content, styles.content_notoolbar].join(' ') }>
          <List>
            {this.getPathlist() }
          </List>
        </div>
      </div>
    );
  }
}

export default SelectPath;