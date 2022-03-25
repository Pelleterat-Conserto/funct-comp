import React, { useState, useEffect } from 'react';
import './Chrono.css';

const PadWith0 = ({ nbr }) =>
  String(nbr).length < 2 ? `0${nbr}` : String(nbr);

const TimeFormat = ({ nbr }) => {
  const sec = nbr % 60;
  const min = ((nbr - sec) % 3600) / 60;
  const hours = ~~(nbr / 3600);

  return (
    <div style={{textAlign: "center"}}>
      <PadWith0 nbr={hours} />:<PadWith0 nbr={min} />:<PadWith0 nbr={sec} />
    </div>
  );
};

const Chrono = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    let timer = null;
  
  const start = () => { 
    timer = setInterval(tick, 1000);
    setRunning(true);
  };
  
  const stop = () => { 
    clearInterval(timer);  
    setRunning(false);
  };
  
  const reset = () => setTime(0);

  const tick = () => setTime(time + 1 );


  useEffect(() => {
    if (running) start();

    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      if (running) {
          stop();
        }
    };
  }, [running, time]);

  return (
      <div className="demochrono">
      <TimeFormat nbr={time} />
      <div className="controls">
        {running ? (
          <button onClick={stop}>Stop</button>
        ) : (
          <button onClick={start}>Start</button>
        )}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

const ChronoComponent = () => (
  <>
    <Chrono />
  </>
);

export default ChronoComponent;
