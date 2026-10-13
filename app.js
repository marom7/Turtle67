'use strict';
const button = document.querySelector('#charge-toggle');
const panel = document.querySelector('.charging-panel');
const status = document.querySelector('#charge-status');
const battery = document.querySelector('.battery');
let timer = null;
let seconds = 0;
function render() {
  document.querySelector('#duration').textContent = String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
  document.querySelector('#energy').innerHTML = (seconds * 11 / 3600).toFixed(2) + ' <small>kWh</small>';
  const percent = Math.min(100, 62 + Math.floor(seconds * 11 / 3600 / 70 * 100));
  battery.setAttribute('aria-valuenow', String(percent));
  document.querySelector('.battery-value').innerHTML = percent + '<span>%</span>';
  document.querySelector('.battery-fill').style.width = (percent * .94) + '%';
}
button.addEventListener('click', () => {
  const running = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(running));
  panel.classList.toggle('is-charging', running);
  if (running) {
    status.textContent = 'טוענים בנחת. זו רק הדגמה 🙂';
    document.querySelector('#power').innerHTML = '11.0 <small>kW</small>';
    button.textContent = 'עצירת ההדגמה';
    timer = window.setInterval(() => { seconds++; render(); }, 1000);
  } else {
    window.clearInterval(timer);
    timer = null;
    status.textContent = 'ההדגמה נעצרה. אפשר להמשיך בכל רגע.';
    document.querySelector('#power').innerHTML = '0.0 <small>kW</small>';
    button.textContent = 'המשך הדגמת טעינה';
  }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
