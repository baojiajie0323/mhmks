import React from 'react';
import TodaySums from './todaysums';
import Planstatus from './planstatus';
import PlanpercentMonth from './planpercent_month';
import PlanpercentToday from './planpercent_today';
import Plandepart from './plandepart';
import Plancoverage from './plancoverage';
import styles from './homepage.less';

class Homepage extends React.Component {
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
        <TodaySums />
        <Planstatus />
        <PlanpercentMonth />
        <PlanpercentToday />
        <Plandepart />
        <Plancoverage />
      </div>
    );
  }
}

export default Homepage;