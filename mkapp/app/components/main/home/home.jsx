import React from 'react';
import styles from './home.less';
import AppBar from 'material-ui/AppBar';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import LineIcon from 'material-ui/svg-icons/action/timeline';
import DoneIcon from 'material-ui/svg-icons/action/done-all';
import PhoneIcon from 'material-ui/svg-icons/action/settings-phone';
import TmpIcon from 'material-ui/svg-icons/action/restore';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { cyan600,green600,indigo600,red600} from 'material-ui/styles/colors';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><AddIcon color='white'/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="路线拜访" leftIcon={<LineIcon color={cyan600} />} />
    <MenuItem primaryText="临时拜访" leftIcon={<TmpIcon color={green600} />} />
    <MenuItem primaryText="电话拜访" leftIcon={<PhoneIcon color={indigo600} />} />
    <MenuItem primaryText="稽核拜访" leftIcon={<DoneIcon color={red600} />} />
  </IconMenu>
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  onClickAddPlan(){
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          title='拜访'
          iconElementLeft={<span />}
          iconElementRight={<Logged />}
          onRightIconButtonTouchTap={this.onClickAddPlan}
          />
      </div>
    );
  }
}

export default Home;