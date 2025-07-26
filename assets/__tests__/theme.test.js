const filterProducts = require('../filterProducts');

describe('filterProducts', () => {
  let under100;
  let range100to300;
  let message;
  let card1;
  let card2;
  let card3;

  function setupDOM(prices) {
    document.body.innerHTML = `
      <input type="checkbox" data-filter="under-100" />
      <input type="checkbox" data-filter="100-300" />
      <div id="no-products-message"></div>
      <div class="product-card"><span itemprop="price">${prices[0]}</span></div>
      <div class="product-card"><span itemprop="price">${prices[1]}</span></div>
      <div class="product-card"><span itemprop="price">${prices[2]}</span></div>
    `;
    under100 = document.querySelector('[data-filter="under-100"]');
    range100to300 = document.querySelector('[data-filter="100-300"]');
    message = document.getElementById('no-products-message');
    [card1, card2, card3] = document.querySelectorAll('.product-card');
  }

  test('shows products under 100 and hides others', () => {
    setupDOM([50, 200, 400]);
    under100.checked = true;
    filterProducts();

    expect(card1.style.display).toBe('block');
    expect(card2.style.display).toBe('none');
    expect(card3.style.display).toBe('none');
    expect(message.style.display).toBe('block');
  });

  test('hides all products when none match and hides message', () => {
    setupDOM([150, 200, 400]);
    under100.checked = true;
    filterProducts();

    expect(card1.style.display).toBe('none');
    expect(card2.style.display).toBe('none');
    expect(card3.style.display).toBe('none');
    expect(message.style.display).toBe('none');
  });
});
