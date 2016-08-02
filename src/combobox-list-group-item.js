import React, { Component } from 'react';

class ListGroupItem extends Component {
  componentDidUpdate(prevProps) { this._scrollIntoViewIfActive() }
  componentDidMount() { this._scrollIntoViewIfActive() }

  _scrollIntoViewIfActive () {
    if (!this.props.active) return;
    this.refs.root.scrollIntoView(false);
  }
  
  render () {
    let {active, value, className, onListGroupItemMouseEnter} = this.props;
    let classes = `list-group-item ${active ? "active" : ""} ${className || ""}`

    return (
      <li
        ref="root"
        style={Object.assign({paddingLeft: 30}, this.props.style)}
        onMouseEnter={(event) => onListGroupItemMouseEnter(value, event)}
        onClick={()=> this.props.onListGroupItemClick(value)}
        className={classes}>
        <div style={{position: "absolute", left: 15}}>
          { this.props.selected ? "\u2713" : "\u00a0" }
        </div>
        {/\S/.test(this.props.text || "") ? this.props.text : "\u00a0"}
      </li>
    )
  }
};

export default ListGroupItem;
