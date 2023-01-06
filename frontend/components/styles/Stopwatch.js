import styled from 'styled-components';

const stopwatch = styled.div`
  .display_time-left {
    font-weight: 100;
    font-size: 20rem;
    margin: 0;
    color: black;
    text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
  }

  .timer {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .timer_controls {
    display: flex;
    flex-direction: row;
  }

  .timer_controls > * {
    flex: 1;
  }

  .timer_controls form {
    flex: 1;
    display: flex;
  }

  .timer_controls input {
    flex: 1;
    border: 0;
    padding: 2rem;
  }

  .timer_button {
    background: none;
    border: 0;
    cursor: pointer;
    color: black;
    font-size: 2rem;
    text-transform: uppercase;
    background: rgba(0, 0, 0, 0.1);
    border-bottom: 3px solid rgba(0, 0, 0, 0.2);
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    padding: 1rem;
    font-family: 'Inconsolata', monospace;
    flex-direction: row;
  }

  .timer_button:hover,
  .timer_button:focus {
    background: rgba(0, 0, 0, 0.2);
    outline: 0;
  }

  .display {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .display_end-time {
    font-size: 4rem;
    color: white;
  }
`;

export default stopwatch;
