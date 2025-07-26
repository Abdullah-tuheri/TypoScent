const filterProducts = require('../filterProducts');

describe('filterProducts', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="no-products-message"></div>
      <input type="checkbox" data-filter="under-100" />
      <input type="checkbox" data-filter="100-300" />
      <div class="product-card"><span itemprop="price">$50</span></div>
      <div class="product-card"><span itemprop="price">$150</span></div>
    `;
  });

  test('hides empty state when products are visible', () => {
    filterProducts();
    const message = document.getElementById('no-products-message');
    expect(message.style.display).toBe('none');
  });

  test('shows empty state when no products are visible', () => {
    document.querySelector('[data-filter="under-100"]').checked = true;
    document.querySelector('[data-filter="100-300"]').checked = true;
    filterProducts();
    const message = document.getElementById('no-products-message');
    expect(message.style.display).toBe('block');
  });
});
