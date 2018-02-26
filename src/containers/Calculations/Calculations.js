import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveRecentSpm } from '../../actions/actions';
import PropTypes from 'prop-types';

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
      
      manualVisibility: 'hide',
      estimateVisibility: 'show',
      manualButton: '',
      estimateButton: 'focused',
      
      toggleGetButton: 'show',
      toggleResult: 'hide',

      minuteMileVisibility: 'show',
      mileHourVisibility: 'hide',
      minuteMileButton: 'focused',
      mileHourButton: '' 
    };
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  submitSpm = () => {
    const { recentSpms } = this.props;
    const { result } = this.state;
    if (!recentSpms.includes(result)) {
      this.props.saveRecentSpm(result);
    }
    this.props.history.push('/select-spm');
  }

  calculateManual = (event) => {
    event.preventDefault();
    const result = this.state.manual * 4;
    this.setState({result});
  }

  calculateMinutePerMile = (event) => {
    event.preventDefault();
    const {mpmMinute, mpmSecond} = this.state;
    const paceInDecimal = 
      parseInt(mpmMinute, 10) + 
      (parseInt(mpmSecond, 10) / 60);
    
    this.setStepPerMinute(paceInDecimal);
  }

  calculateMilePerHour = (event) => {
    event.preventDefault();
    const {mphSpeed} = this.state;
    const paceInMPM = 60 / parseInt(mphSpeed, 10);

    this.setStepPerMinute(paceInMPM);
  }

  setStepPerMinute = (pace) => {
    const {heightFeet, heightInch} = this.state;
    const heightInInches = 
      (parseInt(heightFeet, 10) * 12) + 
      parseInt(heightInch, 10);
    const stepPerMile = 1084 + ((143.6 * pace) - (13.5 * heightInInches));

    const result = Math.round(stepPerMile / pace);
    this.setState({result});
  }

  toggleManualEstimate = (event) => {
    if (event.target.name === 'manual') {
      this.setState({
        manualVisibility: 'show',
        estimateVisibility: 'hide',
        manualButton: 'focused',
        estimateButton: ''
      });
    } else { 
      this.setState({
        manualVisibility: 'hide',
        estimateVisibility: 'show',
        manualButton: '',
        estimateButton: 'focused'
      });
    }
  }

  toggleMeasurement = (event) => {
    if (event.target.name === 'minuteMile') {
      this.setState({
        minuteMileVisibility: 'show',
        mileHourVisibility: 'hide',
        minuteMileButton: 'focused',
        mileHourButton: ''
      });
    } else { 
      this.setState({
        minuteMileVisibility: 'hide',
        mileHourVisibility: 'show',
        minuteMileButton: '',
        mileHourButton: 'focused'
      });
    }
  }

  showResult = () => {
    this.setState({
      toggleResult: 'show',
      toggleGetButton: 'hide'
    });
  }

  render() {
    return (
      <div>
        <div className='Calculations'>
          <button
            name='estimate'
            className={`estimate-tab ${this.state.estimateButton}`}
            onClick={this.toggleManualEstimate}
          >Estimate</button>
          <button
            name='manual'
            className={`manual-tab ${this.state.manualButton}`}
            onClick={this.toggleManualEstimate}
          >Manual</button>
          {/*MANUAL CALCULATION*/}
          <article className={`manual ${this.state.manualVisibility}`}>
            <h4 className='instructions'>
              Manual calculation is most accurate
              and takes less than a minute to do
            </h4>
            <ol>
              <li>Choose your favorite leg.</li>
              <li>
                Start walking or running at a comfortable pace.
              </li>
              <li>
                Count how many times you land on your chosen leg for 30 seconds
              </li>
              <li>Enter that number below!</li>
            </ol>
            <form
              className='manual-input-form'
              onSubmit={this.calculateManual}>
              <input
                name='manual'
                type='number'
                className='manual-input'
                onChange={this.handleChange}
                value={this.state.manual}
                placeholder='30'
              />
              <div className='button-wrapper'>
                <button
                  className={`
                    manual-button
                    next-and-back-buttons
                    ${this.state.toggleGetButton}`}
                  onClick={this.showResult}
                >Get my SPM</button>
              </div>
            </form>
          </article>

          {/* Height/Speed */}

          <article className={`estimate ${this.state.estimateVisibility}`}>
            <h4 className='instructions'>
              Enter your height and speed to estimate your SPM
              <br />
              <br />
              <span className='disclaimer'>
                (Manual calculation is more accurate)
              </span>
            </h4>
            
            <form className='height'>
              <h4><input
                name='heightFeet'
                type='number'
                onChange={this.handleChange}
                value={this.state.heightFeet}
                placeholder='5'
              />{`Feet`}
              <input
                name='heightInch'
                type='number'
                onChange={this.handleChange}
                value={this.state.heightInch}
                placeholder='4'
              />{`Inches`}</h4>
            </form>
            
            <button
              name='minuteMile'
              className={`minute-mile-button ${this.state.minuteMileButton}`}
              onClick={this.toggleMeasurement}
            >Minutes/Mile</button>
            <button
              name='mileHour'
              className={`mile-hour-button ${this.state.mileHourButton}`}
              onClick={this.toggleMeasurement}
            >Miles/Hour</button>
            <div className='speeds'>
              <form
                className={`mile-minute-box ${this.state.minuteMileVisibility}`}
                onSubmit={this.calculateMinutePerMile}
              >
                <input
                  name='mpmMinute'
                  type='number'
                  onChange={this.handleChange}
                  value={this.state.mpmMinute}
                  placeholder='Min'
                />
                <h2 className='colon'>:</h2>
                <input
                  name='mpmSecond'
                  type='number'
                  onChange={this.handleChange}
                  value={this.state.mpmSecond}
                  placeholder='Sec'
                />
                <div className='button-wrapper'>
                  <button
                    className={`
                      next-and-back-buttons
                      ${this.state.toggleGetButton}
                    `}
                    onClick={this.showResult}
                  >Get my SPM</button>
                </div>
              </form>
              <form
                className={`mile-hour-box ${this.state.mileHourVisibility}`}
                onSubmit={this.calculateMilePerHour}
              >
                <input
                  name='mphSpeed'
                  type='number'
                  onChange={this.handleChange}
                  value={this.state.mphSpeed}
                  placeholder='MPH'
                />
                <div className='button-wrapper'>
                  <button
                    className={`
                      next-and-back-buttons 
                      ${this.state.toggleGetButton}
                    `}
                    onClick={this.showResult}
                  >Get my SPM</button>
                </div>
              </form>
            </div>
          </article>
        </div>

        {/* RESULT AND SUBMIT BUTTON */}

        <article className={`result button-wrapper ${this.state.toggleResult}`}>
          <div>
            <h2>Your beat is:</h2>
            <h1>{`${this.state.result} SPM`}</h1>
          </div>
          <button
            className='next-and-back-buttons'
            onClick={this.submitSpm}>
            Save and Go
          </button>
        </article>
      </div>
    );
  }
}

const { arrayOf, number, func, shape } = PropTypes;

Calculations.propTypes = {
  recentSpms: arrayOf(number),
  saveRecentSpm: func,
  history: shape({
    push: func
  })
};

export const MSTP = ({recentSpms}) => ({recentSpms});

export const MDTP = dispatch => ({
  saveRecentSpm: spm => dispatch(saveRecentSpm(spm))
});

export default withRouter(connect(MSTP, MDTP)(Calculations));