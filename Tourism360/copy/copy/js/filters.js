document.addEventListener('DOMContentLoaded', () => {
  loadBackendHotels();
  renderDynamicVendorListings();
  initExperienceFilters();
  initContactFormValidation();
});

async function loadBackendHotels() {
  const hotelContainer = document.getElementById('hotelCardList');

  if (!hotelContainer) return;

  hotelContainer.innerHTML = `
    <div class="hotel-loading-state" style="grid-column:1/-1;text-align:center;padding:3rem 1rem;">
      <div style="font-size:2rem;margin-bottom:0.75rem;">🏨</div>
      <h3 style="margin-bottom:0.5rem;">Finding the best stays...</h3>
      <p>Loading real hotel data from Tourism360.</p>
    </div>
  `;

  try {
    const response = await fetch('http://127.0.0.1:8000/api/hotels/');

    if (!response.ok) {
      throw new Error(`Hotel API returned ${response.status}`);
    }

    const hotels = await response.json();

    if (!Array.isArray(hotels) || hotels.length === 0) {
      hotelContainer.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;">
          <div style="font-size:2rem;margin-bottom:0.75rem;">🏨</div>
          <h3>No hotels found</h3>
          <p>Try again later or change your search.</p>
        </div>
      `;

      updateHotelCount(0, 0);
      return;
    }

    hotelContainer.innerHTML = '';

    hotels.forEach(hotel => {
      hotelContainer.appendChild(createHotelCard(hotel));
    });

    initHotelFilters();

  } catch (error) {
    console.error('Hotel API error:', error);

    hotelContainer.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;">
        <div style="font-size:2rem;margin-bottom:0.75rem;">⚠️</div>
        <h3>Unable to load hotels</h3>
        <p style="margin-bottom:1rem;">
          Please make sure the Tourism360 backend is running.
        </p>
        <button type="button" class="btn btn-primary btn-sm" onclick="loadBackendHotels()">
          Try Again
        </button>
      </div>
    `;

    updateHotelCount(0, 0);
  }
}

function createHotelCard(hotel) {
  const card = document.createElement('article');

  const name = hotel.name || 'Unnamed Hotel';
  const location = hotel.location || 'Uttarakhand';
  const price = Number(hotel.price || 0);
  const rating = Number(hotel.rating || 0);
  const facilities = hotel.facilities || 'Comfortable stay in Uttarakhand';
  const imageUrl = hotel.image_url || 'assets/images/nainital.jpg';
  const hotelUrl = hotel.hotel_url || '';

  let priceTier = 'premium';

  if (price > 0 && price < 1800) {
    priceTier = 'budget';
  } else if (price >= 1800 && price <= 3500) {
    priceTier = 'moderate';
  }

  const ratingValue = rating > 0 ? rating.toFixed(1) : 'N/A';

  const bookingButton = hotelUrl
    ? `
      <a
        href="${escapeHtml(hotelUrl)}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary btn-sm"
      >
        View Hotel →
      </a>
    `
    : `
      <button
        type="button"
        class="btn btn-primary btn-sm"
        onclick="openHotelDetails('${escapeHtml(name)}')"
      >
        Hotel Details →
      </button>
    `;

  card.className = 'tourism-card hotel-item-card backend-hotel-card';

  card.setAttribute('data-dest', location.toLowerCase());
  card.setAttribute('data-type', 'hotel');
  card.setAttribute('data-price', priceTier);
  card.setAttribute('data-rating', rating);

  card.innerHTML = `
    <div class="card-image-wrap">
      <span class="card-badge-top">🏨 Real Hotel</span>

      <span class="card-tag-right">
        ${price > 0 ? `₹${price.toLocaleString('en-IN')} / night` : 'Price unavailable'}
      </span>

      <img
        src="${escapeHtml(imageUrl)}"
        alt="${escapeHtml(name)}"
        class="card-image-img"
        loading="lazy"
        onerror="this.src='assets/images/nainital.jpg'"
      >
    </div>

    <div class="card-body">

      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;gap:1rem;">
        <span style="font-size:0.85rem;font-weight:700;color:var(--accent-orange);">
          📍 ${escapeHtml(location)}
        </span>

        <span style="font-size:0.9rem;font-weight:700;color:var(--primary-dark);white-space:nowrap;">
          ★ ${ratingValue}
        </span>
      </div>

      <h3 class="card-title">
        ${escapeHtml(name)}
      </h3>

      <p class="card-description">
        ${escapeHtml(facilities)}
      </p>

      <div class="card-meta-list">
        <span class="card-meta-item">
          ⭐ ${ratingValue} Rating
        </span>

        <span class="card-meta-item">
          💰 ${price > 0 ? `₹${price.toLocaleString('en-IN')} / night` : 'Price unavailable'}
        </span>

        <span class="card-meta-item">
          🏔️ Uttarakhand
        </span>
      </div>

      <div class="card-footer" style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;">
        <span class="verified-partner-badge">
          ✓ SerpAPI Verified
        </span>

        ${bookingButton}
      </div>

    </div>
  `;

  return card;
}

function openHotelDetails(name) {
  const message = `Hotel selected: ${name}`;

  if (typeof openBookingModal === 'function') {
    openBookingModal(name, '', '');
    return;
  }

  alert(message);
}

function initHotelFilters() {
  const destSelect = document.getElementById('hotelFilterDest');
  const typeSelect = document.getElementById('hotelFilterType');
  const priceSelect = document.getElementById('hotelFilterPrice');
  const ratingSelect = document.getElementById('hotelFilterRating');
  const resetBtn = document.getElementById('btnResetHotelFilters');
  const countDisplay = document.getElementById('hotelCountDisplay');

  const hotelCards = document.querySelectorAll('.hotel-item-card');

  if (!hotelCards.length) {
    updateHotelCount(0, 0);
    return;
  }

  function applyHotelFilters() {
    const selectedDest = destSelect
      ? destSelect.value.toLowerCase()
      : 'all';

    const selectedType = typeSelect
      ? typeSelect.value.toLowerCase()
      : 'all';

    const selectedPrice = priceSelect
      ? priceSelect.value.toLowerCase()
      : 'all';

    const selectedRating = ratingSelect
      ? parseFloat(ratingSelect.value) || 0
      : 0;

    let visibleCount = 0;

    hotelCards.forEach(card => {
      const cardDest = (
        card.getAttribute('data-dest') || ''
      ).toLowerCase();

      const cardType = (
        card.getAttribute('data-type') || ''
      ).toLowerCase();

      const cardPrice = (
        card.getAttribute('data-price') || ''
      ).toLowerCase();

      const cardRating = parseFloat(
        card.getAttribute('data-rating') || '0'
      );

      const matchesDest =
        selectedDest === 'all' ||
        cardDest === selectedDest ||
        cardDest.includes(selectedDest);

      const matchesType =
        selectedType === 'all' ||
        cardType === selectedType ||
        (
          selectedType === 'hotel' &&
          cardType.includes('hotel')
        );

      const matchesPrice =
        selectedPrice === 'all' ||
        cardPrice === selectedPrice;

      const matchesRating =
        cardRating >= selectedRating;

      const visible =
        matchesDest &&
        matchesType &&
        matchesPrice &&
        matchesRating;

      card.style.display = visible ? 'flex' : 'none';

      if (visible) {
        visibleCount++;
      }
    });

    updateHotelCount(
      visibleCount,
      hotelCards.length
    );
  }

  [
    destSelect,
    typeSelect,
    priceSelect,
    ratingSelect
  ].forEach(element => {
    if (element) {
      element.addEventListener(
        'change',
        applyHotelFilters
      );
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (destSelect) {
        destSelect.value = 'all';
      }

      if (typeSelect) {
        typeSelect.value = 'all';
      }

      if (priceSelect) {
        priceSelect.value = 'all';
      }

      if (ratingSelect) {
        ratingSelect.value = '0';
      }

      applyHotelFilters();
    });
  }

  applyHotelFilters();
}

function updateHotelCount(visibleCount, totalCount) {
  const countDisplay =
    document.getElementById('hotelCountDisplay');

  if (!countDisplay) return;

  if (totalCount === 0) {
    countDisplay.textContent = 'No hotels available';
    return;
  }

  countDisplay.textContent =
    `Showing ${visibleCount} of ${totalCount} stays`;
}

function renderDynamicVendorListings() {
  if (typeof getStoredListings !== 'function') return;

  const listings = getStoredListings();

  const approved = listings.filter(item => {
    const status = (
      item.status || ''
    ).toLowerCase();

    return (
      status === 'published' ||
      status === 'approved'
    );
  });

  renderVendorExperiences(approved);
  renderVendorFood(approved);
}

function renderVendorExperiences(listings) {
  const expContainer =
    document.getElementById('experienceCardList');

  if (!expContainer) return;

  const expListings = listings.filter(item => {
    const category =
      (item.category || '').toLowerCase();

    return (
      category.includes('experience') ||
      category.includes('guide') ||
      category.includes('trek') ||
      category.includes('tour') ||
      category.includes('adventure')
    );
  });

  expListings.forEach(item => {
    const card = document.createElement('article');

    const category =
      (item.category || '').toLowerCase();

    let filterCategory = 'culture';

    if (category.includes('trek')) {
      filterCategory = 'trek nature';
    } else if (category.includes('guide')) {
      filterCategory = 'trek adventure';
    } else if (category.includes('adventure')) {
      filterCategory = 'adventure';
    }

    card.className =
      'tourism-card experience-item-card dynamic-vendor-card';

    card.setAttribute(
      'data-category',
      filterCategory
    );

    card.innerHTML = `
      <div class="card-image-wrap">
        <span class="card-badge-top">
          🥾 ${escapeHtml(item.category || 'Experience')}
        </span>

        <span class="card-tag-right">
          ${escapeHtml(item.priceDisplay || ('₹' + (item.price || '0')))}
        </span>

        <img
          src="${escapeHtml(item.image || 'assets/images/munsiyari.jpg')}"
          alt="${escapeHtml(item.title || 'Experience')}"
          class="card-image-img"
          loading="lazy"
        >
      </div>

      <div class="card-body">

        <span style="font-size:0.85rem;font-weight:700;color:var(--accent-orange);display:block;margin-bottom:0.3rem;">
          📍 ${escapeHtml(item.districtDisplay || item.district || 'Uttarakhand')} • Certified Guide
        </span>

        <h3 class="card-title">
          ${escapeHtml(item.title || 'Local Experience')}
        </h3>

        <div style="font-size:0.82rem;color:#0284c7;font-weight:600;margin-bottom:0.4rem;">
          Led by:
          <strong>
            ${escapeHtml(item.businessName || item.vendorName || 'Local Mountaineer')}
          </strong>
        </div>

        <p class="card-description">
          ${escapeHtml(item.description || item.shortDesc || 'Explore Uttarakhand with a local guide.')}
        </p>

        <div class="card-meta-list">
          <span class="card-meta-item">
            ⏱️ Season: ${escapeHtml(item.bestTime || 'All Year')}
          </span>

          <span class="card-meta-item">
            🛡️ Equipment Included
          </span>
        </div>

        <div class="card-footer" style="display:flex;justify-content:space-between;align-items:center;">
          <span class="verified-partner-badge">
            ✓ Certified Guide
          </span>

          <button
            type="button"
            class="btn btn-secondary btn-sm"
            onclick="openBookingModal('${escapeHtml(item.title || 'Experience')}', '${escapeHtml(item.vendorId || '')}', '${escapeHtml(item.priceDisplay || ('₹' + (item.price || '0')))}')"
          >
            Book Guide →
          </button>
        </div>

      </div>
    `;

    expContainer.insertBefore(
      card,
      expContainer.firstChild
    );
  });
}

function renderVendorFood(listings) {
  const foodContainer =
    document.getElementById('vendorRestaurantCardList');

  if (!foodContainer) return;

  const foodListings = listings.filter(item => {
    const category =
      (item.category || '').toLowerCase();

    return (
      category.includes('restaurant') ||
      category.includes('food') ||
      category.includes('product')
    );
  });

  if (!foodListings.length) return;

  foodContainer.innerHTML =
    foodListings.map(item => `
      <article class="tourism-card food-item-card">

        <div class="card-image-wrap">
          <span class="card-badge-top">
            🍲 ${escapeHtml(item.category || 'Food')}
          </span>

          <span class="card-tag-right">
            ${escapeHtml(item.priceDisplay || ('₹' + (item.price || '0')))}
          </span>

          <img
            src="${escapeHtml(item.image || 'assets/images/almora.jpg')}"
            alt="${escapeHtml(item.title || 'Local Food')}"
            class="card-image-img"
            loading="lazy"
          >
        </div>

        <div class="card-body">

          <span style="font-size:0.85rem;font-weight:700;color:var(--accent-orange);display:block;margin-bottom:0.3rem;">
            📍 ${escapeHtml(item.districtDisplay || item.district || 'Uttarakhand')} • Traditional Kitchen
          </span>

          <h3 class="card-title">
            ${escapeHtml(item.title || 'Local Food')}
          </h3>

          <div style="font-size:0.82rem;color:#0284c7;font-weight:600;margin-bottom:0.4rem;">
            Operated by:
            <strong>
              ${escapeHtml(item.businessName || item.vendorName || 'Pahadi Rasoi')}
            </strong>
          </div>

          <p class="card-description">
            ${escapeHtml(item.description || item.shortDesc || 'Taste authentic Uttarakhand cuisine.')}
          </p>

          <div class="card-meta-list">
            <span class="card-meta-item">
              🌿 Organic Ingredients
            </span>

            <span class="card-meta-item">
              📞 ${escapeHtml(item.contact || '')}
            </span>
          </div>

          <div class="card-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <span class="verified-partner-badge">
              ✓ Verified Dhaba
            </span>

            <button
              type="button"
              class="btn btn-primary btn-sm"
              onclick="openBookingModal('${escapeHtml(item.title || 'Local Food')}', '${escapeHtml(item.vendorId || '')}', '${escapeHtml(item.priceDisplay || ('₹' + (item.price || '0')))}')"
            >
              Reserve / Contact →
            </button>
          </div>

        </div>

      </article>
    `).join('');
}

function initExperienceFilters() {
  const expButtons =
    document.querySelectorAll('.exp-filter-btn');

  const expCards =
    document.querySelectorAll('.experience-item-card');

  const countDisplay =
    document.getElementById('expCountDisplay');

  if (!expCards.length) return;

  expButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      expButtons.forEach(button => {
        button.classList.remove('active');
      });

      btn.classList.add('active');

      const filterValue =
        btn.getAttribute('data-filter') || 'all';

      let visibleCount = 0;

      expCards.forEach(card => {
        const category =
          card.getAttribute('data-category') || '';

        const visible =
          filterValue === 'all' ||
          category.includes(filterValue);

        card.style.display =
          visible ? 'flex' : 'none';

        if (visible) {
          visibleCount++;
        }
      });

      if (countDisplay) {
        countDisplay.textContent =
          `Showing ${visibleCount} experiences`;
      }
    });
  });
}

function initContactFormValidation() {
  const contactForm =
    document.getElementById('tourismContactForm');

  const statusMessage =
    document.getElementById('formStatusMessage');

  if (!contactForm) return;

  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const nameInput =
      document.getElementById('contactName');

    const emailInput =
      document.getElementById('contactEmail');

    const phoneInput =
      document.getElementById('contactPhone');

    const destInput =
      document.getElementById('contactDestination');

    const messageInput =
      document.getElementById('contactMessage');

    const name =
      nameInput ? nameInput.value.trim() : '';

    const email =
      emailInput ? emailInput.value.trim() : '';

    const phone =
      phoneInput ? phoneInput.value.trim() : '';

    const dest =
      destInput ? destInput.value : '';

    const message =
      messageInput ? messageInput.value.trim() : '';

    if (!name || name.length < 2) {
      displayFormError(
        'Please enter your full name (at least 2 characters).'
      );

      if (nameInput) {
        nameInput.focus();
      }

      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email)) {
      displayFormError(
        'Please provide a valid email address.'
      );

      if (emailInput) {
        emailInput.focus();
      }

      return;
    }

    if (statusMessage) {
      statusMessage.style.display = 'block';
      statusMessage.style.background = '#dcfce7';
      statusMessage.style.color = '#15803d';
      statusMessage.style.border = '1px solid #86efac';
      statusMessage.style.padding = '1rem 1.25rem';
      statusMessage.style.borderRadius = '8px';
      statusMessage.style.marginTop = '1.5rem';

      statusMessage.innerHTML = `
        <strong style="display:block;font-size:1.05rem;margin-bottom:0.3rem;">
          🎉 Thank you, ${escapeHtml(name)}!
        </strong>

        <p style="margin:0;font-size:0.92rem;">
          Your message regarding
          <strong>
            ${escapeHtml(dest || 'Uttarakhand Tourism')}
          </strong>
          has been received in this student innovation project demo.
        </p>
      `;
    }

    contactForm.reset();
  });

  function displayFormError(msg) {
    if (!statusMessage) return;

    statusMessage.style.display = 'block';
    statusMessage.style.background = '#fee2e2';
    statusMessage.style.color = '#b91c1c';
    statusMessage.style.border = '1px solid #fca5a5';
    statusMessage.style.padding = '0.85rem 1.25rem';
    statusMessage.style.borderRadius = '8px';
    statusMessage.style.marginTop = '1.5rem';
    statusMessage.textContent = `⚠️ ${msg}`;
  }
}

function escapeHtml(text) {
  if (!text) return '';

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return String(text).replace(
    /[&<>"']/g,
    m => map[m]
  );
}