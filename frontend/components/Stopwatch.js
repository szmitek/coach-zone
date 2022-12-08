import { func } from 'prop-types';
import styled from 'styled-components';
import { useTimer } from 'use-timer';
import {useState} from 'react';
import React from 'react';

import Stopwatch from './styles/Stopwatch';

export default function stopwatch() {

  const { time, initialTime, advanceTime, start, reset, status } = useTimer({
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeOverflow: () => {
      reset;
    },
  });

  const minutes = Math.floor(time / 60);
  const remainderSeconds = time % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;

  const handleSubmit = (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      minutes: event.target.minutes.value,
    }

    const mins = data.minutes
    this.props.onSetCountdown(parseInt(mins, 10));
    }
    

  return (
    <Stopwatch>
      <div className="timer_controls">
        <button
            onClick={() => {
                reset();
                start();
                advanceTime(-300);
            }}
            className="timer_button"
            >
            5min
        </button>
        <button
          onClick={() => {
            reset();
            start();
            advanceTime(-600);
        }}
        className="timer_button"
        >
          10 min
        </button>
        <button 
            onClick={() => {
                reset();
                start();
                advanceTime(-900);
            }}
            className="timer_button"
            >
          15 min
        </button>
        <button onClick={() => {
            reset();
            start();
            advanceTime(-1200);
        }}
        className="timer_button"
        >
            20 min
            </button>
        <button onClick={() => {
            reset();
            start();
            advanceTime(-1800);
        }}
        className="timer_button"
        >
            30 min
            </button>
        <button onClick={reset} className="timer_button">
          Break
        </button>
        <form
          name="customForm"
          id="custom"
          onSubmit={(e) => {
            e.preventDefault();
            reset();
            start();
            advanceTime(-minutex.value * 60);
            console.log(minutex.value);
            minutex.value = null;
          }}
        >
          <input
            type="text"
            id="minutex"
            name="minutes"
            placeholder="enter time in seconds"
          />
        </form>
        </div>
        <div className="display">
          <h1 className="display_time-left">{display}</h1>
          {status === 'RUNNING' && <h1>Running...</h1>}
        </div>
      
    </Stopwatch>
  );
}