import React, {Component} from 'react';
import { Sparklines, SparklinesBars, SparklinesLine, SparklinesNormalBand, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';
import styles from './sparkline.css';

export default class Sparkline extends Component {
  static PropTypes = {
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    limit: React.PropTypes.number,
    margin: React.PropTypes.number,
    chartName: React.PropTypes.string,
    lineStyle: React.PropTypes.object,
    barStyle: React.PropTypes.object,
    referenceLine: React.PropTypes.string
  }

  static defaultProps = {
    height: 150,
    margin: 5,
    chartName: "My Chart",
    referenceLine: "avg",
  };

  render() {

    return (
      <div className={styles.wrapper} ref="root" >
        <h4>{this.props.chartName}</h4>
        <Sparklines data={this.props.data}
                    limit={this.props.limit}
                    width={this.props.width}
                    height={this.props.height}
                    margin={this.props.margin}
                    style={this.props.chartStyle}>
          <SparklinesLine style={this.props.lineStyle} />
          <SparklinesBars style={this.props.barStyle} height={this.props.height} />
          <SparklinesReferenceLine type={this.props.referenceLine} style={this.props.referenceLineStyle} />
        </Sparklines>
      </div>
    );
  }
}
