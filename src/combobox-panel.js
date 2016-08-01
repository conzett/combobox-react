import React, { Component } from 'react';
import ListGroup from './combobox-list-group.js';

class Panel extends Component {
  componentDidMount () {
    this.refs.search.focus();
  }

  handleKeyUp () {
    this.props.onPanelKeyUp(this.refs.search.value);
  }

  render () {
    let empty = this.props.options.length === 0;
    let emptyContent =
      <div className="panel-footer text-muted"><em>No Results</em></div>
    let style = {
      whiteSpace: "nowrap",
      boxSizing: 'content-box',
      position: 'absolute',
      minWidth: "100%",
      left: -1,
      top: -1,
    };

    return (
      <div className="panel panel-default" style={style}>
        <div className="panel-body">
          <label htmlFor="panel-search" className="sr-only">Search</label>
          <input
            onKeyUp={this.handleKeyUp.bind(this)}
            className="form-control"
            placeholder="Search…"
            ref="search"
            id="panel-search"
            type="search" />
        </div>
        {empty ? emptyContent : <ListGroup {...this.props} ref="listGroup"/>}
      </div>
    )
  }
};

export default Panel;
