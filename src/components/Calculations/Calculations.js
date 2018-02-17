import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveSpm } from '../../actions/actions';
import './Calculations.css';

export class Calculations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manual: '',
      heightFeet: '',
      heightInch: '',
      mphSpeed: '',
      mpmMinute: '',
      mpmSecond: '',
      result: ''
    }
  }

  componentDidUpdate = () => {
    if (this.state.result) {
      console.log('wutup')
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  submitSPM = () => {
    this.props.saveSpm(this.state.result)
    this.props.history.push('/select-genre')
  }

  calculateManual = (event) => {
    event.preventDefault()
    const result = this.state.manual * 4
    this.setState({result})
  }

  calculateMinutePerMile = (event) => {
    event.preventDefault()
    const {mpmMinute, mpmSecond} = this.state;
    const paceInDecimal = parseInt(mpmMinute, 10) + parseInt(mpmSecond / 60, 10)
    
    this.setStepPerMinute(paceInDecimal)
  }

  calculateMilePerHour = (event) => {
    event.preventDefault()
    const {mphSpeed} = this.state;
    const paceInMPM = 60 / parseInt(mphSpeed, 10)

    this.setStepPerMinute(paceInMPM)
  }

  setStepPerMinute = (pace) => {
    const {heightFeet, heightInch} = this.state;
    const heightInInches = parseInt(heightFeet * 12, 10) + parseInt(heightInch, 10)
    const stepPerMile = 1084 + ((143.6 * pace) - (13.5 * heightInInches))

    const result = Math.round(stepPerMile / pace);
    this.setState({result})
  }

  render() {
    return (
      <div className='Calculations'>

        {/*MANUAL CALCULATION*/}
        <article className='manual'>
          <p>Manual calculation is most accurate and only takes 40 seconds!</p>
          <ol>
            <li>Choose your favorite leg.</li>
            <li>Start walking or running for 10 seconds. Find your comfortable pace</li>
            <li>For the next 30 seconds, count how many times you land on your favorite leg</li>
            <li>Enter that number below!</li>
          </ol>
          <form onSubmit={this.calculateManual}>
            <input
              name='manual'
              type='number'
              className='manual-input'
              onChange={this.handleChange}
              value={this.state.manual}
              placeholder='30'
            />
            <button className='manual-button'>Get My SPM</button>
          </form>
        </article>

        {/* RESULT AND SUBMIT BUTTON */}

        <article className='result'>
          <h2>Your beat is:</h2>
          {
            this.state.result &&
            <div>
              <h1>{`${this.state.result + ' SPM'}`}</h1>
              <button onClick={this.submitSPM}>Save and select Genre</button>
            </div>
          }
        </article>


        {/* Height/Speed */}
        <article className='estimate'>
          <h4>Enter your height and speed to estimate your SPM</h4>
          <form>
            <h4 className='height'>Height</h4>
            <p><input
              name='heightFeet'
              type='number'
              onChange={this.handleChange}
              value={this.state.heightFeet}
              placeholder='5'
            />'
            <input
              name='heightInch'
              type='number'
              onChange={this.handleChange}
              value={this.state.heightInch}
              placeholder='4'
            />"</p>
          </form>
          <h4>Speed</h4>
          <div className='speeds'>
            <form onSubmit={this.calculateMinutePerMile}>
              <p>
                Minute/Mile<br/>
                <input
                  name='mpmMinute'
                  type='number'
                  onChange={this.handleChange}
                  value={this.state.mpmMinute}
                  placeholder='10'
                />:
                <input
                  name='mpmSecond'
                  type='number'
                  onChange={this.handleChange}
                  value={this.state.mpmSecond}
                  placeholder='00'
                />
              </p>
              <button>Get my SPM</button>
            </form>
            <div className='divider'></div>
            <form onSubmit={this.calculateMilePerHour}>
              <p>
                MPH<br/>
                <input
                  name='mphSpeed'
                  type='number'
                  onChange={this.handleChange}
                  value={this.state.mphSpeed}
                  placeholder='6.0'
                />
              </p>
              <button>Get my SPM</button>
            </form>
          </div>
        </article>
      </div>
    )
  }
}

export const MDTP = dispatch => ({
  saveSpm: spm => dispatch(saveSpm(spm))
})

export default withRouter(connect(null, MDTP)(Calculations))