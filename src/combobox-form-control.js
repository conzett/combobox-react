import React, { Component } from 'react';
import Panel from './combobox-panel.js';

class FormControl extends Component {
  render () {
    let { onFormControlClick, placeholder, expanded, selected, style} = this.props
    let classes = `form-control ${this.props.className || ""}`
    let text =
      <div style={
        { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
        {/\S/.test(selected.text || "") ? selected.text : placeholder}
      </div>

    return (
      <div
        style={Object.assign({position: "relative", WebkitUserSelect: "none", cursor: "default"}, style)}
        onClick={onFormControlClick}
        className={classes}
        tabIndex="1">
        {text}
        { expanded ? <Panel {...this.props} ref="panel" /> : null }
        <input name={this.props.name} type="hidden" value={selected.value}/>
      </div>
    )
  }
};

export default FormControl;
