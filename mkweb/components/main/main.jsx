import React from 'react';
import Header from './header/header';
//import Homepage from './homepage/homepage';
import Info from './info/info';
import Visitor from './visitor/visitor';
import Config from './config/config';
import Schdule from './schdule/schdule';
import styles from './main.less';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curview : Store.getCurView()
    };
    this.onChangeView = this.onChangeView.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_VIEW,this.onChangeView);
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_VIEW,this.onChangeView);
  }
  onChangeView(){
    this.setState({
      curview : Store.getCurView()
    })
  }
  getContent(){
    // if(this.state.curview == 'homepage'){
    //   return <Homepage />
    // }else 
    if(this.state.curview == 'info'){
      return <Info />
    }else if(this.state.curview == 'visitor'){
      return <Visitor />
    }else if(this.state.curview == 'config'){
      return <Config />
    }else if(this.state.curview == 'schdule'){
      return <Schdule />
    }
    return <Visitor />
  }
  render() {
    return (
      <div className={styles.container}>
        <Header />
        {this.getContent()}
      </div>
    );
  }
}

export default Main;