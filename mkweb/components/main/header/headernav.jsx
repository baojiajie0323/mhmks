import React from 'react';
import styles from './header.less';

class HeaderNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curview: 'schdule'
    };
    this.onClickNav = this.onClickNav.bind(this);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  onClickNav(e){
    var curview = e.currentTarget.dataset.view;
    Store.setCurView(curview);
    this.setState({curview});
  }
  getnavcontentStyle(view) {
    var styleary = [styles.navcontent];
    if (view == this.state.curview) {
      styleary.push(styles.navcontent_sel);
    }
    return styleary.join(' ');
  }
  render() {
    return (
      <div className={styles.headernav}>
        <div data-view="schdule" className={this.getnavcontentStyle('schdule')} onClick={this.onClickNav}>计划</div>
        <div data-view="homepage" className={this.getnavcontentStyle('homepage')} onClick={this.onClickNav}>总览</div>
        <div data-view="info" className={this.getnavcontentStyle('info')} onClick={this.onClickNav}>信息</div>
        <div data-view="visitor" className={this.getnavcontentStyle('visitor')} onClick={this.onClickNav}>拜访</div>
        <div data-view="config" className={this.getnavcontentStyle('config')} onClick={this.onClickNav}>配置</div>
      </div>
    );
  }
}

export default HeaderNav;