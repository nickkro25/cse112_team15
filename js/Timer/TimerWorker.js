function timeToString(t){const i=Math.floor(t/60),o=t%60;return o<10?`${i}:0${o}`:`${i}:${o}`}class Timer{constructor(){this.duration=0,this.timeoutID=0}countdown(){const t=timeToString(this.duration);postMessage(t),this.duration-=1,this.duration>=0?this.timeoutID=setTimeout((()=>{this.countdown()}),1e3):postMessage(-1)}endTimer(){clearTimeout(this.timeoutID)}}const timer=new Timer;onmessage=t=>{-1!==t.data?(timer.duration=t.data,timer.countdown()):timer.endTimer()};
