import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveRecentSpm, selectSpm } from '../../actions/actions';
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
    const { recentSpms, history, selectSpm } = this.props;
    const { result } = this.state;
    selectSpm(result);
    if (!recentSpms.includes(result)) {
      this.props.saveRecentSpm(result);
    }
    history.push('/select-genre');
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
    if (event.target.value === 'minuteMile') {
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

  handleBackButton = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/select-spm');
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
              />
              <div className='button-wrapper'>
                <button
                  onClick={this.handleBackButton}
                  className={`
                    buttons back-buttons
                    ${this.state.toggleGetButton}
                  `}>
                    Cancel
                </button>
                <button
                  disabled={!this.state.manual}
                  className={`
                    manual-button
                    buttons
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
            </h4>
            <h4 className='disclaimer'>
              (Manual calculation is more accurate)
            </h4>
            <div className='bottom-half-wrapper'>
              <div className='height-wrapper'>
                <h3 className='input-headers'>Height</h3>
                <form className='height'>
                  <h4>{`Feet`}</h4>
                  <h4>{`Inches`}</h4>
                  <input
                    name='heightFeet'
                    type='number'
                    onChange={this.handleChange}
                    value={this.state.heightFeet}
                    placeholder='Ft.'
                  />
                  <input
                    name='heightInch'
                    type='number'
                    onChange={this.handleChange}
                    value={this.state.heightInch}
                    placeholder='In.'
                  />
                </form>
              </div>
              <div className='speed-wrapper'>
                <div className='speed-header'>
                  <h3>Speed</h3>
                  <select
                    className='speed-units'
                    onChange={this.toggleMeasurement}>
                    <option value='minuteMile'>Minutes per Mile</option>
                    <option>Miles per Hour</option>
                  </select>
                </div>
                <div className='speeds'>
                  <form
                    className={`
                      mile-minute-box 
                      ${this.state.minuteMileVisibility}
                    `}
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
                        onClick={this.handleBackButton}
                        className={`
                          buttons back-buttons
                          ${this.state.toggleGetButton}
                        `}>
                          Cancel
                      </button>
                      <button
                        disabled={
                          !this.state.mpmSecond ||
                          !this.state.mpmMinute ||
                          !this.state.heightFeet ||
                          !this.state.heightInch
                        }
                        className={`
                          buttons
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
                        onClick={this.handleBackButton}
                        className={`
                          buttons back-buttons
                          ${this.state.toggleGetButton}
                        `}>
                          Cancel
                      </button>
                      <button
                        disabled={
                          !this.state.mphSpeed ||
                          !this.state.heightFeet ||
                          !this.state.heightInch }
                        className={`
                          buttons 
                          ${this.state.toggleGetButton}
                        `}
                        onClick={this.showResult}
                      >Get my SPM</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* RESULT AND SUBMIT BUTTON */}

        <article className={`result button-wrapper ${this.state.toggleResult}`}>
          <div>
            <h2>Your SPM is:</h2>
            <h1>{`${this.state.result} SPM`}</h1>
          </div>
          <button
            className='buttons'
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
  }),
  selectSpm: func
};

export const MSTP = ({recentSpms}) => ({recentSpms});

export const MDTP = dispatch => ({
  saveRecentSpm: spm => dispatch(saveRecentSpm(spm)),
  selectSpm: spm => dispatch(selectSpm(spm))
});

export default withRouter(connect(MSTP, MDTP)(Calculations));