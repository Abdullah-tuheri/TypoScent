document.addEventListener('DOMContentLoaded', function () {
  console.log("Thème Lamsat Abeer is running!");

  // === Quick View Modal ===
  const quickViewButtons = document.querySelectorAll('.quick-view');
  const modal = document.getElementById('quick-view-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalDescription = document.getElementById('modal-description');
  const modalImage = document.getElementById('modal-image');

  if (quickViewButtons.length > 0) {
    quickViewButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');

        fetch(`/products/${productId}.js`)
          .then(response => response.json())
          .then(product => {
            if (modalTitle) modalTitle.textContent = product.title;
            if (modalPrice) modalPrice.textContent = `${product.price} {{ shop.currency }}`;
            if (modalDescription) modalDescription.textContent = product.description;
            if (modalImage) modalImage.src = product.featured_image;
            if (modal) modal.style.display = 'block';
          })
          .catch(err => {
            console.error('Error fetching product:', err);
            alert(window.translations.products.add_to_cart_error);
          });
      });
    });
  }

  // === Close Quick View Modal ===
  const closeButton = document.querySelector('.close');
  if (closeButton && modal) {
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // === Add to Cart Form Handling ===
  document.querySelectorAll('.add-to-cart-form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(this);

      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (!response.ok) throw new Error('Network error');
          return response.json();
        })
        .then(data => {
          alert(window.translations.products.add_to_cart_success);
          updateCartCount();
        })
        .catch(error => {
          alert(window.translations.products.add_to_cart_error);
        });
    });
  });

  // === Update Cart Count ===
  function updateCartCount() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
          cartCount.textContent = cart.item_count;
        }
      })
      .catch(err => console.error('Error fetching cart data:', err));
  }

  // === Product Filters ===
  document.querySelectorAll('[data-filter]').forEach(input => {
    input.addEventListener('change', filterProducts);
  });

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

  // === Compare Products Functionality ===
  let compareList = [];

  document.querySelectorAll('.compare-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = btn.getAttribute('data-product-id');

      if (!compareList.includes(productId)) {
        compareList.push(productId);
        btn.textContent = window.translations.products.comparison.selected;
      } else {
        compareList = compareList.filter(id => id !== productId);
        btn.textContent = window.translations.products.comparison.compare;
      }

      const viewCompareBtn = document.getElementById('view-compare');
      if (viewCompareBtn) {
        viewCompareBtn.style.display = compareList.length > 0 ? 'inline-block' : 'none';
      }
    });
  });

  // === Review Form Submission ===
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert(window.translations.products.reviews.thanks);
      this.reset();
    });
  }

  // === Language Switcher Button in Header ===
  document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', lang);
    });
  });

  // === Mobile Menu Toggle ===
  const mobileMenu = document.getElementById('mobile-menu');
  const openMenuBtn = document.getElementById('open-menu');
  const closeMenuBtn = document.getElementById('close-menu');

  if (openMenuBtn && mobileMenu) {
    openMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
    });
  }

  // === Back to Top Button ===
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = (window.pageYOffset > 300) ? 'block' : 'none';
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Cart Drawer Toggle ===
  const cartDrawer = document.getElementById('cart-drawer');
  const openCartBtn = document.getElementById('open-cart');
  const closeCartBtn = document.getElementById('close-cart');

  if (openCartBtn && cartDrawer) {
    openCartBtn.addEventListener('click', () => {
      cartDrawer.classList.remove('translate-x-full');
    });
  }

  if (closeCartBtn && cartDrawer) {
    closeCartBtn.addEventListener('click', () => {
      cartDrawer.classList.add('translate-x-full');
    });
  }

  // === Search Overlay Toggle ===
  const searchOverlay = document.getElementById('search-overlay');
  const openSearchBtn = document.getElementById('open-search');
  const closeSearchBtn = document.getElementById('close-search');

  if (openSearchBtn && searchOverlay) {
    openSearchBtn.addEventListener('click', () => {
      searchOverlay.classList.remove('hidden');
    });
  }

  if (closeSearchBtn && searchOverlay) {
    closeSearchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('hidden');
    });
  }

  // === Sticky Header ===
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
      header.classList.add('bg-white/90', 'backdrop-blur-sm', 'shadow-sm');
    } else {
      header.classList.remove('bg-white/90', 'backdrop-blur-sm', 'shadow-sm');
    }
  });

  // === Close drawer when clicking outside ===
  document.addEventListener('click', function(event) {
    const menu = document.getElementById('language-menu');
    const button = event.target.closest('.language-switcher button');
    if (menu && !menu.contains(event.target) && !button) {
      menu.classList.add('hidden');
    }
  });
});