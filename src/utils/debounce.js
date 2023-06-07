function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;

      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export default debounce;

// function debounce(func, timeout = 300){
//   let timer;
//   return (...args) => {
//     if (!timer) {
//       func.apply(this, args);
//     }
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       timer = undefined;
//     }, timeout);
//   };
// }

// export default debounce;
