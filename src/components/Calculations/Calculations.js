import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveRecentSpm } from '../../actions/actions';

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
      result: '',
      manualVisibility: 'show',
      estimateVisibility: 'hide',
      hoverTipVisibility: 'hide',
      manualButton: 'focused',
      estimateButton: '',
      toggleResult: 'hide'
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  submitSPM = () => {
    const { recentSpms } = this.props
    const { result } = this.state
    if (!recentSpms.includes(result)) {
      this.props.saveRecentSpm(result)
    }
    this.props.history.push('/select-spm')
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

  handleMouseEnter = () => {
    console.log('word')
  }

  handleMouseLeave = () => {
    console.log('suck it')
  }

  toggleManualEstimate = (event) => {
    if (event.target.name === 'manual') {
      this.setState({
      manualVisibility: 'show',
      estimateVisibility: 'hide',
      manualButton: 'focused',
      estimateButton: ''
      })
    } else { 
      this.setState({
      manualVisibility: 'hide',
      estimateVisibility: 'show',
      manualButton: '',
      estimateButton: 'focused'
      })
    }
  }

  showResult = () => {
    this.setState({toggleResult: 'show'})
  }



  render() {
    return (
      <div className='Calculations'>
        <button
          name='manual'
          className={this.state.manualButton}
          onClick={this.toggleManualEstimate}
        >Manual</button>
        <button
          name='estimate'
          className={this.state.estimateButton}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.toggleManualEstimate}
        >Estimate</button>
        {/*MANUAL CALCULATION*/}
        <article className={`manual ${this.state.manualVisibility}`}>
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
            <button
              className='manual-button'
              onClick={this.showResult}
            >Get My SPM</button>
          </form>
        </article>

        {/* Height/Speed */}

        <article className={`estimate ${this.state.estimateVisibility}`}>
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
              <button
                onClick={this.showResult}
              >Get my SPM</button>
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
              <button
                onClick={this.showResult}
              >Get my SPM</button>
            </form>
          </div>
        </article>


        {/* RESULT AND SUBMIT BUTTON */}

        <article className={`result ${this.state.toggleResult}`}>
          <h2>Your beat is:</h2>
          {
            this.state.result &&
            <div>
              <h1>{`${this.state.result + ' SPM'}`}</h1>
              <button onClick={this.submitSPM}>Save SPM</button>
            </div>
          }
        </article>


      </div>
    )
  }
}

export const MSTP = store => ({
  recentSpms: store.recentSpms
})

export const MDTP = dispatch => ({
  saveRecentSpm: spm => dispatch(saveRecentSpm(spm)),
})

export default withRouter(connect(MSTP, MDTP)(Calculations))