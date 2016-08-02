import React, { Component } from 'react';
import ListGroupItem from './combobox-list-group-item.js';

class ListGroup extends Component {
  _listGroupItem (option) {
    let selected = this.props.selected === option
    let active = this.props.active === option

    return (
      <ListGroupItem
        {...option}
        onListGroupItemMouseEnter={this.props.onListGroupItemMouseEnter}
        onListGroupItemClick={this.props.onListGroupItemClick}
        selected={selected}
        key={option.value}
        active={active}/>
    )
  }

  render () {
    let style = { overflowY: "scroll", maxHeight: 300 }

    return (
      <ul className="list-group" style={style}>
        {this.props.options.map(o => this._listGroupItem(o))}
      </ul>
    );
  }
};

export default ListGroup;
