import React, { Component } from 'react';

class ListGroupItem extends Component {
  componentDidUpdate(prevProps) { this._scrollIntoViewIfActive() }
  componentDidMount() { this._scrollIntoViewIfActive() }

  _scrollIntoViewIfActive (x) {
    if (!this.props.active) return;
    this.refs.root.scrollIntoView(false);
  }
  
  render () {
    let {active, selected, text, value, style, className, onListGroupItemClick, onListGroupItemMouseEnter} = this.props;
    let classes = `list-group-item ${active ? "active" : ""} ${className || ""}`

    return (
      <li
        ref="root"
        style={Object.assign({paddingLeft: 30}, style)}
        onMouseEnter={(event) => onListGroupItemMouseEnter(value, event)}
        onClick={()=> onListGroupItemClick(value)}
        className={classes}>
        <div style={{position: "absolute", left: 15}}>
          { selected ? "\u2713" : "\u00a0" }
        </div>
        {/\S/.test(text || "") ? text : "\u00a0"}
      </li>
    )
  }
};

export default ListGroupItem;
