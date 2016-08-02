import React, { Component } from 'react';
import Panel from './combobox-panel.js';

class FormControl extends Component {
  render () {
    let {placeholder, expanded, selected, name, style} = this.props;
    let text = /\S/.test(selected.text || "") ? selected.text : placeholder;

    let formControlStyle = {
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      position: "relative",
      cursor: "default"
    }

    let textStyle = {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden"
    }

    return (
      <div
        style={Object.assign(formControlStyle, style)}
        onMouseMove={this.props.onMouseMove}
        onClick={this.props.onFormControlClick}
        className="form-control"
        tabIndex="1">
        <div style={textStyle}>{text}</div>
        { expanded ? <Panel {...this.props} /> : null }
        <input type="hidden" name={name} value={selected.value}/>
      </div>
    )
  }
};

export default FormControl;
