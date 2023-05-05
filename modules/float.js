//From: https://github.com/Haroenv/floating.js/blob/gh-pages/lib/main.js
/**
 * Float a number of things up on a page (hearts, flowers, 👌 ...)
 * <br>
 * You give the options in an object.
 *
 * @module floating
 * @param {string} [options.content='👌']
 *   the character or string to float
 * @param {number} [options.number=1]
 *   the number of items
 * @param {number} [options.duration=10]
 *   the amount of seconds it takes to float up
 * @param {number|string} [options.repeat='infinite']
 *   the number of times you want the animation to repeat
 * @param {string} [options.direction='normal']
 *   The <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction">
 *   animation-direction</a> of the main animation
 * @param {number|array} [options.sizes=2]
 *   The size (in em) of each element. Giving two values in an array will
 *   give a random size between those values.
 */
function floating(
    {
      content = '👌',
      number = 1,
      duration = 10,
      repeat = 'infinite',
      direction = 'normal',
      size = 2,
    } = {}
  ) {
    const style = document.createElement('style');
    style.id = 'floating-style';
  
    if (!document.getElementById('floating-style')) {
      document.head.appendChild(style);
    }
  
    const MAX = 201;
  
    const styles = `
    .float-container {
      width: 100px;
      height: 100vh;
      overflow: hidden;
      position: relative;
      top: -100vh;
      left: 0;
      pointer-events: none;
    }
    .float-container div * {
      width: 1em;
      height: 1em
    }
    @keyframes float{
      ${Array.apply(null, { length: MAX + 1 })
        .map((v, x) => ({
          percent: x * 100 / MAX,
          width: Math.sin(x / 10) * 10,
          height: 110 + x * (-120 / MAX),
        }))
        .map(
          ({ percent, width, height }) =>
            `${percent}% {
            transform: translate(
              ${width}vw,
              ${height}vh
            )
          }`
        )
        .join('')}
    }`;
  
    document.getElementById('floating-style').innerHTML = styles;
  
    const container = document.createElement('div');
  
    container.className = 'float-container';
  
    const _size = Array.isArray(size)
      ? Math.floor(Math.random() * (size[1] - size[0] + 1)) + size[0]
      : size;
  
    for (let i = 0; i < number; i++) {
      const floater = document.createElement('div');
      floater.innerHTML = content;
  
      floater.style.cssText = `
       position: absolute;
       left: 0;
       font-size: ${_size}em;
       transform: translateY(110vh);
       animation: 
         float
         ${duration}s
         linear
         ${i * Math.random()}s
         ${repeat}
         ${direction};
      margin-left: ${Math.random() * 100}vw;`;
  
      floater.addEventListener('animationend', e => {
        if (e.animationName === 'float') {
          container.removeChild(floater);
        }
      });
  
      container.appendChild(floater);
    }
    return container;
    // document.body.appendChild(container);
  }