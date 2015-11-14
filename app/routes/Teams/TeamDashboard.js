import React, {Component} from 'react';
import Sparkline from '../../components/Charts/Sparkline.js';
import Pie from '../../components/Charts/Pie.js';
import reactMixin from 'react-mixin';
import styles from './teamDashboard.css';
import {Link} from 'react-router';
import {Todos} from '../../schemas';

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


//end of sample data ... delete when we use real data

@reactMixin.decorate(ReactMeteorData)
export default class TeamDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      halfColWidth: 200,
      activePoint: null,
      tooltipTrigger: null,
    };
    this.resize = this.resize.bind(this);
  }

  getMeteorData() {
    let handle = Meteor.subscribe("todos.auth", null, this.props.params.teamId);
    return {
      todos: Todos.find({}, {sort: {createdAt: -1}}).fetch(),
      loading: !handle.ready(),
    };
  }

  render() {

    let privateTodos = 0
    let completeTodos = 0

    this.data.todos.map((todo) => {
      if (todo.isPrivate) {privateTodos = privateTodos + 1 }
      if (todo.isCompleted) {completeTodos = completeTodos + 1 }
    })

    const pieChartData1 = [
      { label: 'Private', value: privateTodos, color: '#3b5998' },
      { label: 'Completed', value: completeTodos, color: '#00aced' },
      { label: 'Example Label', value: 4, color: 'red' },
      { label: 'Another Example Label', value: 2, color: 'green' }
    ]

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Team Dashboard</h1>
        <h3 className={styles.subtitle}>User Stats</h3>
        <div className={styles.grid} >
          <div className={styles.halfColumn} >
            <Sparkline
              chartName="Users on my Team"
              data={sampleData}
              limit={20}
              width={this.state.halfColWidth}
              lineStyle={{ stroke: "#41c3f9", fill: "none" }}
              barStyle={{ stroke: "white", fill: "#41c3f9", fillOpacity: ".25" }}
              />
          </div>

          <div className={styles.halfColumn} ref="halfcol" >
            <Sparkline
              chartName="Another user stat"
              data={sampleData}
              width={this.state.halfColWidth}
              lineStyle={{ stroke: "none", fill: "none" }}
              barStyle={{ stroke: "#41c3f9", fill: "#41c3f9", fillOpacity: ".75" }}
              referenceLineStyle={{ display: "none" }}
              />
          </div>

        </div>

        <h3 className={styles.subtitle}>Todos</h3>
        <div className={styles.grid} >
          <div className={styles.halfColumn} >
            <Pie
              data={pieChartData1}
              chartName="Todos (private/completed are real values)"
              />
          </div>
        </div>

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
