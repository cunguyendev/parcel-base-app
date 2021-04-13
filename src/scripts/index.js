import Handling, { DATA_LOCAL_NAME } from './handling';

const { Helpers } = window;

window.addEventListener('DOMContentLoaded', () => {
  const btnStart = Helpers.qs("button[data-type='start']");
  const btnClear = Helpers.qs("button[data-type='clear']");
  const btnDemo = Helpers.qs("button[data-type='demo']");
  const inputApi = Helpers.qs("input[id='api']");
  const inputRecord = Helpers.qs("input[id='record']");
  const progress = Helpers.qs("p[data-type='progress']");
  const adding = Helpers.qs("p[data-type='adding']");

  /**
   * Get data input saved
   */
  try {
    const dataSaved = JSON.parse(localStorage.getItem(DATA_LOCAL_NAME));

    if (dataSaved && dataSaved.api && dataSaved.record) {
      inputApi.value = dataSaved.api;
      inputRecord.value = dataSaved.record;
    }
  } catch (error) {
    throw Error(error);
  }

  /**
   * Handle demo data
   */
  btnDemo.addEventListener('click', () => {
    // eslint-disable-next-line no-console
    console.log('This is demo function!');
  });

  /**
   * Handle clear data
   */
  btnClear.addEventListener('click', () => {
    inputApi.value = '';
    inputRecord.value = '';
    btnClear.textContent = 'Cleared all of data';

    setTimeout(() => {
      btnClear.textContent = 'Clear';
    }, 3000);
  });

  /**
   * Handle for start generating data
   */
  btnStart.addEventListener('click', () => {
    if (inputApi.value && inputRecord.value) {
      btnStart.textContent = 'Loading...Please wait!';

      const handling = new Handling(inputApi.value, inputRecord.value);
      handling.start(
        () => {
          btnStart.textContent = 'Done!';

          setTimeout(() => {
            btnStart.textContent = 'Start';
          }, 3000);
        },
        (data) => {
          progress.innerHTML = data;
        },
        (data) => {
          adding.innerHTML = data;
          // eslint-disable-next-line comma-dangle
        }
      );
    } else {
      btnStart.textContent = 'Please fill all of data';

      setTimeout(() => {
        btnStart.textContent = 'Start';
      }, 3000);
    }
  });
});
