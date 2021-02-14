const user_input = document.getElementById('location');
const sts = document.getElementById('_status');
const info = document.getElementById('_info');

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const loc = user_input.value;
  sts.innerText = 'Loading...';

  const data = await fetch('http://localhost:3000/weather?address=' + loc).then(
    (res) => {
      res.json().then((data) => {
        sts.innerText = '';
        info.innerText = '' + data.forecast;
      });
    }
  );
});
