import React, { Component } from 'react';

class ListGroupItem extends Component {
  componentDidUpdate() { this._scrollIntoViewIfActive() }
  componentDidMount() { this._scrollIntoViewIfActive() }

  _scrollIntoViewIfActive () {
    if (!this.props.active) return;
    if (this.refs.root.scrollIntoViewIfNeeded) {
      this.refs.root.scrollIntoViewIfNeeded()
    }
  }

  _handleMouseEnter() {
    if (this.props.active) return;
    this.props.onListGroupItemMouseEnter(this.props.value)
  }
  
  render () {
    let {active, selected, text, value, style, className, onListGroupItemClick} = this.props;
    let classes = `list-group-item ${active ? "active" : ""} ${className || ""}`

    return (
      <li
        ref="root"
        style={Object.assign({paddingLeft: 30}, style)}
        onMouseEnter={this._handleMouseEnter.bind(this)}
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
