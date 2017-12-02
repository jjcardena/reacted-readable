import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input/Input';
import Menu from 'react-toolbox/lib/menu/Menu';

class CustomDropDown extends Component {
  state = {
    active: false ,
    selectedCaption: "",
    selectedValue: ""
  };

  componentWillReceiveProps(nextProps) {
     if (nextProps.value !== this.state.selectedValue) {
       const item = this.props.children.filter((element) => element.props.value===nextProps.value)[0];
       this.setState({
         selectedCaption: item.props.caption ,
         selectedValue: nextProps.value
        });
     }
  }

  handleButtonClick = () => this.setState({ active: !this.state.active });

  handleMenuHide = () => this.setState({ active: false });

  handleSelect = (value) => {
    const item = this.props.children.filter((element) => element.props.value===value)[0];
    this.setState({
      selectedCaption: item.props.caption ,
      selectedValue: value
     });
     if(this.props.onChange)
      this.props.onChange(value);
  }

  handleChange = (value) => {}

  render () {
    return (
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <Input type='text' label={this.props.label} name='text'
        value={this.state.selectedCaption} required={this.props.required}
        onClick={this.handleButtonClick} onChange={(data) => this.handleChange(data)}
        disabled={this.props.disabled}/>
        <Menu position="bottomLeft" active={this.state.active} onHide={this.handleMenuHide}
        onSelect={(data) => this.handleSelect(data)}>
          {this.props.children}
        </Menu>
      </div>
    );
  }
}


export default CustomDropDown;
