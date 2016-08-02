import React, { Component } from 'react';
import ListGroup from './combobox-list-group.js';

class Panel extends Component {
  componentDidMount () {
    this.refs.search.focus();
  }

  _handleKeyUp () {
    this.props.onPanelKeyUp(this.refs.search.value);
  }

  render () {
    let empty = this.props.options.length === 0;
    let emptyClasses = "panel-footer text-muted";
    let emptyContent = <div className={emptyClasses}><em>No Results</em></div>;
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
            onKeyUp={this._handleKeyUp.bind(this)}
            className="form-control"
            placeholder="Search…"
            id="panel-search"
            type="search"
            ref="search" />
        </div>
        {empty ? emptyContent : <ListGroup {...this.props}/>}
      </div>
    )
  }
};

export default Panel;
