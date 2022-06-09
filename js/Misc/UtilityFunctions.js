export function timeToString(t){const o=Math.floor(t/60),n=t%60;return n<10?`${o}:0${n}`:`${o}:${n}`}
