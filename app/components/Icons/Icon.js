import React from 'react';

/*
 * Subset of the SVG icon collection from the Polymer project (goo.gl/N7SB5G)
 */
export default class Icon extends React.Component {
  static PropTypes = {
    icon: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    style: React.PropTypes.object,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    size: 24,
    color: "currentcolor"
  }

  renderGraphic() {
    switch (this.props.icon) {
      case 'menu':
        return (
          <g><path d="M3 18h18v-2h-18v2zm0-5h18v-2h-18v2zm0-7v2h18v-2h-18z"></path></g>
        );
      case 'more-vert':
        return (
          <g><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
        );
      case 'person':
        return (
          <g><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></g>
        );
      case 'message':
        return (
          <g><path d="M20 2h-16c-1.1 0-1.99.9-1.99 2l-.01 18 4-4h14c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm-2 12h-12v-2h12v2zm0-3h-12v-2h12v2zm0-3h-12v-2h12v2z"></path></g>
        );
      case 'email':
        return (
          <g><path d="M20 4h-16c-1.1 0-1.99.9-1.99 2l-.01 12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 4l-8 5-8-5v-2l8 5 8-5v2z"></path></g>
        );
      case 'arrow-back':
        return (
          <g><path d="M20 11h-12.17l5.59-5.59-1.42-1.41-8 8 8 8 1.41-1.41-5.58-5.59h12.17v-2z"></path></g>
        );
      case 'check':
        return (
          <g><path d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z"></path></g>
        );
      case 'chevron-left':
        return (
          <g><path d="M15.41 7.41l-1.41-1.41-6 6 6 6 1.41-1.41-4.58-4.59z"></path></g>
        );
      case 'close':
        return (
          <g><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"></path></g>
        );
      case 'search':
        return (
          <g><path d="M15.5 14h-.79l-.28-.27c.98-1.14 1.57-2.62 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"></path></g>
        );
      case 'arrow-drop-down':
        return (
          <g><path d="M7 10l5 5 5-5z"></path></g>
        );
      case 'delete':
        return (
          <g><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-12h-12v12zm13-15h-3.5l-1-1h-5l-1 1h-3.5v2h14v-2z"></path></g>
        );
    }
  }

  render() {
    let styles = {
      fill: this.props.color,
      verticalAlign: "middle",
      width: this.props.size,
      height: this.props.size,
      paddingBottom: '.1em'
    };
    return (
      <svg onClick={this.props.onClick} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fit
        style={styles}>
          {this.renderGraphic()}
      </svg>
    );
  }
}
