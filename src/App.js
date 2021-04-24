import React from 'react'
import './App.css';
import palettes from './palettes.json'

function Label(props) {
  function handleMouseLeave(e) {
    e.target.textContent = props.label
    return false
  }

  function handleClick(e) {
    let colorName = `${props.name}-${props.label.replace(props.name, '').trim()}`.toLowerCase().replaceAll(' ', '-')


    let dummy = document.createElement('span')
    dummy.textContent = colorName
    // dummy.style.display = 'none'
    document.body.append(dummy)

    let range = document.createRange()
    range.selectNode(dummy)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    dummy.remove()

    e.target.textContent = 'Copied!'

    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <span
      className="label"
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {props.label}
    </span>
  )
}

class Tone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      label: props.label,
      value: props.value.replace('#', ''),
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleClick(e) {
    let target = e.target.querySelector('.value')
    if (!target) {
      if (e.target.classList.contains('value')) {
        target = e.target
      } else {
        return false
      }
    }
    let range = document.createRange()
    range.selectNode(target)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    target.textContent = 'Copied!'
  }

  handleMouseLeave(e) {
    let target = e.target.querySelector('.value')
    if (target) {
      target.textContent = this.state.value
    }
  }

  render() {
    return (
      <div
        className="tone"
        style={{
          background: '#' + this.state.value,
          color: parseInt(this.state.value, 16) < 0x999999 ? '#fff' : '#000',
        }}
        onClick={this.handleClick}
        onMouseLeave={this.handleMouseLeave}
      >
        <Label
          name={this.state.name}
          label={this.state.label} />
        <span className="value">{this.state.value}</span>
      </div>
    )
  }
}

function Palette(props) {
  let name = props.palette[0].label.replace(/\d+/g, '').trim()
  return (
    <div className="palette">
      { props.palette.map(function (tone) {
        return (
          <Tone
            key={tone.value}
            name={name}
            label={tone.label}
            value={tone.value}
          />
        )
      })}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      palettes
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Material Design color palettes</h1>
        <div className="link-back">
          <a href="https://material.io/design/color/the-color-system.html#tools-for-picking-colors" target="_blank" rel="noreferrer">Material Desigon: The color system</a>
        </div>
        <div className="container">
          {this.state.palettes.map(function (palette, index) {
            return <Palette key={index} palette={palette} />
          })}
        </div>
      </div>
    );
  }
}

export default App;
