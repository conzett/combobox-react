import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import FormControl from './combobox-form-control.js';

class Combobox extends Component {
  constructor (props) {
    super(props);
    let selected = this._findOption(props.selectedValue)
    this.state = {
      expanded: props.expanded,
      selected: selected,
      active: selected,
      search: null
    }
  }

  componentDidMount () {
    window.addEventListener("keydown", this._handleWindowKeyDown.bind(this));
    window.addEventListener("click", this._handleWindowClick.bind(this));
  }

  componentWillUnmount () {
    window.removeEventListener("keydown", this._handleWindowKeyDown.bind(this));
    window.removeEventListener("click", this._handleWindowClick.bind(this));
  }

  _findOption (value) {
    let opt = this.props.options;
    return opt.find(o=> o.value === value) || opt[0];
  }

  _handleFormControlClick () {
    if (this.props.disabled) return;
    if (!this.state.expanded) this._expand(true);
  }
  
  _handlePanelKeyUp (value) {
    this.setState({search: value});
  }

  _handleWindowKeyDown (event) {
    if (this.state.expanded) {
      switch(event.code) {
        case 'ArrowDown': this._setActiveOffset(1); break;
        case 'ArrowUp': this._setActiveOffset(-1); break;
        case 'Escape': this._expand(false); break;
        case 'Enter': this._selectActive(); break;
        default: break;
      }
    } else {
      if (document.activeElement !== findDOMNode(this.refs.root)) return;
      if (event.code === 'ArrowDown') this._expand(true);
    }
  }

  _selectActive () {
    this.setState({selected: this.state.active});
    this._expand(false);
  }

  _setActiveOffset (offset) {
    let filtered = this._filteredOptions();
    let index = filtered.findIndex(o => o === this.state.active) + offset;
    if (index < 0 || index >= filtered.length) return;
    this.setState({active: filtered[index]});
  }

  _handleWindowClick (event) {
    if (!this.state.expanded) return;
    let node = findDOMNode(this.refs.root);
    if (!node.contains(event.target)) this._expand(false);
  }

  // NOTE: We need to track our own mouse changes so we can tell the difference
  // between a real mouseMouse and an item being scrolled into view under the
  // cursor from a keyboard event or some other prop change
  _mousePositionY: null

  _handleMouseMove (event) {
    this.mousePositionY = event.pageY;
  }

  _handleListGroupItemMouseEnter (value, event) {
    if (event.pageY === this.mousePositionY) return;
    let option = this._findOption(value);
    this.setState({active: option});
  }

  _handleListGroupItemClick (value) {
    let option = this._findOption(value);
    this.setState({active: option, selected: option});
    this._expand(false);
  }

  _filteredOptions () {
    if (!this.state.search) return this.props.options;
    let search = this.state.search.toLowerCase();
    let filter = (o) => o.text && o.text.toLowerCase().includes(search);
    return this.props.options.filter(filter);
  }

  _expand (bool) {
    this.setState({expanded: bool, search: null, active: this.state.selected});
    if (!bool) findDOMNode(this.refs.root).focus();
  }

  render () {
    return (
      <FormControl
        {...this.state}
        {...this.props}
        onListGroupItemMouseEnter={this._handleListGroupItemMouseEnter.bind(this)}
        onListGroupItemClick={this._handleListGroupItemClick.bind(this)}
        onFormControlClick={this._handleFormControlClick.bind(this)}
        onPanelKeyUp={this._handlePanelKeyUp.bind(this)}
        onMouseMove={this._handleMouseMove.bind(this)}
        options={this._filteredOptions()}
        ref="root"/>
    )
  }
};

export default Combobox;
