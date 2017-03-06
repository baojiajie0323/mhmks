import React from 'react';
import styles from './home.less';


import AppBar from 'material-ui/AppBar';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import {message} from 'antd';
import { List, ListItem } from 'material-ui/List';


import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';


import { cyan600 } from 'material-ui/styles/colors';


class DoPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      storestate: 0, // 0未签到  1已签到未签出  2已签出
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignIn() {
    const {stepIndex} = this.state;
    var context = this;
    setTimeout(function() {
      context.setState({
      storestate: 1
    });
    }, 400);
    message.success('签到成功');
  }

  handleSignOut() {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      storestate: 0,
      finished: stepIndex >= 2,
    });
    message.success('签出成功');
  }

  renderStepActions(step) {
    const {stepIndex, storestate} = this.state;

    return (
      <div style={{ margin: '12px 0' }}>
        {storestate == 0 ?
          <RaisedButton
            label={'签到'}
            primary={true}
            onTouchTap={this.handleSignIn}
            /> : null
        }
        {storestate == 1 ?
          [<List>
            <ListItem
              primaryText="主货架陈列"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={this.onClickStore}
              />
            <ListItem
              primaryText="离架陈列"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={this.onClickStore}
              />
            <ListItem
              primaryText="促销陈列"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={this.onClickStore}
              />
            <ListItem
              primaryText="库存采集"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={this.onClickStore}
              />
            <ListItem
              primaryText="异常库存管理"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={this.onClickStore}
              />
            <ListItem
              primaryText="竞品信息采集"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={this.onClickStore}
              />
            <ListItem
              primaryText="洽谈记录"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={this.onClickStore}
              />
          </List>,
            <RaisedButton
              label="签出"
              secondary={true}
              onTouchTap={this.handleSignOut}
              />] : null
        }
      </div>
    );
  }


  componentDidMount() {
  }
  componentWillUnmount() {
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  render() {
    const {finished, stepIndex} = this.state;
    return (
      <div className={styles.container}>
        <AppBar
          style={{  paddingTop:'20px' }}
          title='执行计划'
          onLeftIconButtonTouchTap={this.onClickBack}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          />
        <div className={[styles.content, styles.content_notoolbar].join(' ') }>
          <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
            <Subheader>线路：山东1</Subheader>
            <Stepper activeStep={stepIndex} orientation="vertical">
              <Step>
                <StepLabel>华北大润发即墨店</StepLabel>
                <StepContent>
                  {this.renderStepActions(0) }
                </StepContent>
              </Step>
              <Step>
                <StepLabel>华北大润发城阳店</StepLabel>
                <StepContent>
                  {this.renderStepActions(1) }
                </StepContent>
              </Step>
              <Step>
                <StepLabel>华北大润发长城路店</StepLabel>
                <StepContent>
                  {this.renderStepActions(2) }
                </StepContent>
              </Step>
            </Stepper>
            {finished && (
              <p style={{ margin: '20px 0', textAlign: 'center' }}>
                该线路所有门店都已巡完.
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    this.onClickBack();
                  } }
                  >
                  查看其它计划
                </a>
              </p>
            ) }
          </div>
        </div>
      </div>
    );
  }
}

export default DoPlan;