import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const delayInput = form.querySelector('input[name="delay"]');
  const stateInput = form.querySelector('input[name="state"]:checked');
  if (!stateInput) {
    showMessage('Please select a state.');
    return;
  }

  const delay = parseInt(delayInput.value);
  const state = stateInput.value;

  if (isNaN(delay)) {
    showMessage('Please enter a valid delay value.');
    return;
  }

  try {
    const result = await generatePromise(delay, state);
    if (state === 'fulfilled') {
      showSuccessMessage(result);
    } else {
      showErrorMessage(result);
    }
  } catch (error) {
    showErrorMessage(error);
  }
});

function generatePromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function showSuccessMessage(delay) {
  iziToast.success({
    title: 'Fulfilled promise',
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'topRight',
  });
}

function showErrorMessage(delay) {
  iziToast.error({
    title: 'Rejected promise',
    message: `❌ Rejected promise in ${delay}ms`,
    position: 'topRight',
  });
}

function showMessage(message) {
  iziToast.warning({
    title: 'Warning',
    message: message,
    position: 'topRight',
  });
}
