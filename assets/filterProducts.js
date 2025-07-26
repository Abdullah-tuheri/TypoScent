function filterProducts() {
  const selectedFilters = Array.from(document.querySelectorAll('[data-filter]:checked'))
    .map(el => el.getAttribute('data-filter'));

  const cards = document.querySelectorAll('.product-card');
  let hasVisibleCard = false;

  cards.forEach(card => {
    const priceElement = card.querySelector('[itemprop="price"]');
    if (!priceElement) return;

    const priceText = priceElement.textContent.replace(/[^0-9.-]+/g, "");
    const price = parseFloat(priceText);

    let show = true;

    if (selectedFilters.includes('under-100') && price >= 100) show = false;
    if (selectedFilters.includes('100-300') && (price < 100 || price > 300)) show = false;

    if (show) {
      card.style.display = 'block';
      hasVisibleCard = true;
    } else {
      card.style.display = 'none';
    }
  });

  const emptyState = document.getElementById('no-products-message');
  if (emptyState) {
    emptyState.style.display = hasVisibleCard ? 'block' : 'none';
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = filterProducts;
} else {
  window.filterProducts = filterProducts;
}
