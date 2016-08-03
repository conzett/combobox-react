import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import ListGroupItem from './combobox-list-group-item.js';

class ListGroup extends Component {
  componentDidUpdate() { this._scrollActiveIntoView(); }
  componentDidMount() { this._scrollActiveIntoView(); }

  _scrollActiveIntoView () {
    let active = findDOMNode(this.refs.active);
    let root = findDOMNode(this.refs.root);
    let activeBottom = active.offsetTop + active.offsetHeight;
    let scrollBottom = root.scrollTop + root.offsetHeight;

    if ((active.offsetTop < root.scrollTop) || (activeBottom > scrollBottom)) {
      root.scrollTop = active.offsetTop;
    }
  }

  _listGroupItem (option) {
    let selected = this.props.selected === option;
    let active = this.props.active === option;

    return (
      <ListGroupItem
        ref={active ? "active" : null}
        {...option}
        onListGroupItemMouseEnter={this.props.onListGroupItemMouseEnter}
        onListGroupItemClick={this.props.onListGroupItemClick}
        selected={selected}
        key={option.value}
        active={active}/>
    )
  }

  render () {
    let style = { overflowY: "scroll", maxHeight: 300, position: "relative" }

    return (
      <ul className="list-group" style={style} ref="root">
        {this.props.options.map(o => this._listGroupItem(o))}
      </ul>
    );
  }
};

export default ListGroup;
