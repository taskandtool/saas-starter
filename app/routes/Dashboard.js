import React, {Component} from 'react';
import Sparkline from '../components/Charts/Sparkline.js';
import Pie from '../components/Charts/Pie.js';
import reactMixin from 'react-mixin';
import styles from './dashboard.css';
import UserList from '../components/Users/UserList';
import {Link} from 'react-router';

//sample data to populate dashboard.
function boxMullerRandom () {
    let phase = false,
        x1, x2, w, z;

    return (function() {

        if (phase = !phase) {
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);

            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            return x1 * w;
        } else {
            return x2 * w;
        }
    })();
}

function randomData(n = 30) {
    return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData = randomData(30);
const sampleData100 = randomData(100);

const pieChartData1 = [
  { label: 'Facebook', value: 100, color: '#3b5998' },
  { label: 'Twitter', value: 60, color: '#00aced' },
  { label: 'Google Plus', value: 30, color: '#dd4b39' },
  { label: 'Pinterest', value: 20, color: '#cb2027' },
  { label: 'Linked In', value: 10, color: '#007bb6' },
]
const pieChartData2 = [
  { label: 'Facebook', value: 10, color: '#3b5998' },
  { label: 'Twitter', value: 20, color: '#00aced' },
  { label: 'Google Plus', value: 60, color: '#dd4b39' },
  { label: 'Pinterest', value: 40, color: '#cb2027' },
  { label: 'Linked In', value: 80, color: '#007bb6' },
]
//end of sample data ... delete when we use real data

@reactMixin.decorate(ReactMeteorData)
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1],
      halfColWidth: 200,
      activePoint: null,
      tooltipTrigger: null,
    };
    this.resize = this.resize.bind(this);
    //replace with real data eventually (this code also doesn't unmount! Error will leave when we replace real data)
    setInterval(() =>
        this.setState({
            data: this.state.data.concat([boxMullerRandom()])
        }), 1500);
    //end of replace with real data
  }

  getMeteorData() {
    let handle = Meteor.subscribe("users", 4);
    return {
      users: Meteor.users.find().fetch(),
      loading: !handle.ready()
    };
  }

  render() {

    if (!this.props.isSuperAdmin) {
      return (<div className={styles.wrapper}>You are not authorized to access this page</div>)
    }

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Dashboard</h1>
        <h3 className={styles.subtitle}>User Stats</h3>
        <div className={styles.grid} >
          <div className={styles.halfColumn} >
            <Sparkline
              chartName="Users Online"
              data={this.state.data}
              limit={20}
              width={this.state.halfColWidth}
              lineStyle={{ stroke: "#41c3f9", fill: "none" }}
              barStyle={{ stroke: "white", fill: "#41c3f9", fillOpacity: ".25" }}
              />
          </div>

          <div className={styles.halfColumn} ref="halfcol" >
            <Sparkline
              chartName="Daily Acive Users"
              data={sampleData}
              width={this.state.halfColWidth}
              lineStyle={{ stroke: "none", fill: "none" }}
              barStyle={{ stroke: "#41c3f9", fill: "#41c3f9", fillOpacity: ".75" }}
              referenceLineStyle={{ display: "none" }}
              />
          </div>

          <div className={styles.halfColumn} >
            <Sparkline
              chartName="Monthly Active Users"
              data={sampleData}
              width={this.state.halfColWidth}
              lineStyle={{ strokeWidth: 3, stroke: "red", fill: "red", fillOpacity: ".25" }}
              barStyle={{ display: "none" }}
              referenceLineStyle={{ display: "none" }}
              />
          </div>

          <div className={styles.halfColumn} >
            <Sparkline
              chartName="Another Chart"
              data={sampleData}
              width={this.state.halfColWidth}
              chartStyle={{background: "#00bdcc"}}
              lineStyle={{ stroke: "none", fill: "none" }}
              barStyle={{ stroke: "#00bdcc", strokeWidth: "1", fill: "#000", fillOpacity: ".75" }}
              referenceLineStyle={{ stroke: 'white', strokeOpacity: .75, strokeDasharray: '2, 2' }}
              />
          </div>
        </div>

        <h3 className={styles.subtitle}>Social Data</h3>
        <div className={styles.grid} >
          <div className={styles.halfColumn} >
            <Pie
              data={pieChartData1}
              chartName="Shares today"
              />
          </div>
          <div className={styles.halfColumn} >
            <Pie
              data={pieChartData2}
              chartName="Shares (Past 30 Days)"
              />
          </div>
        </div>

        <h3 className={styles.subtitle}>Latest 4 Users</h3>
        <UserList users={this.data.users} />
        <Link to="/users" className={styles.buttonLink} ><button className={styles.btn}>See all users</button></Link>

      </div>
    );
  }

  //to resize sparkline charts
  resize = _.throttle(() => {
    if (this.refs.halfcol) {
      this.setState({
        halfColWidth: this.refs.halfcol.offsetWidth - 20
      });
    }
  }, 30)

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handlePointHover(point, trigger) {
    this.setState({
      activePoint: point,
      tooltipTrigger: trigger,
    })
  }
}
