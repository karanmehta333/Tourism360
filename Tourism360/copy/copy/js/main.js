document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initHorizontalNavScroll();
  initStickyHeader();
  initBackToTop();
  initGlobalDestinationSearch();
  initCurrentYear();
});

function initHorizontalNavScroll() {
  const mainNavs = document.querySelectorAll('.main-nav');
  mainNavs.forEach(mainNav => {
    let wrapper = mainNav.querySelector('.nav-scroll-wrapper');
    const navLinks = mainNav.querySelector('.nav-links');
    if (!navLinks) return;

    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'nav-scroll-wrapper';
      navLinks.parentNode.insertBefore(wrapper, navLinks);
      wrapper.appendChild(navLinks);
    }

    let leftBtn = wrapper.querySelector('.nav-scroll-left');
    if (!leftBtn) {
      leftBtn = document.createElement('button');
      leftBtn.type = 'button';
      leftBtn.className = 'nav-scroll-btn nav-scroll-left';
      leftBtn.setAttribute('aria-label', 'Scroll navigation left');
      leftBtn.innerHTML = '&#8249;';
      wrapper.insertBefore(leftBtn, navLinks);
    }

    let rightBtn = wrapper.querySelector('.nav-scroll-right');
    if (!rightBtn) {
      rightBtn = document.createElement('button');
      rightBtn.type = 'button';
      rightBtn.className = 'nav-scroll-btn nav-scroll-right';
      rightBtn.setAttribute('aria-label', 'Scroll navigation right');
      rightBtn.innerHTML = '&#8250;';
      wrapper.appendChild(rightBtn);
    }

    function updateNavScrollButtons() {
      if (window.innerWidth <= 1040) {
        leftBtn.classList.remove('visible');
        rightBtn.classList.remove('visible');
        return;
      }

      const maxScroll = navLinks.scrollWidth - navLinks.clientWidth;
      const canScroll = maxScroll > 4;

      if (canScroll && navLinks.scrollLeft > 6) {
        leftBtn.classList.add('visible');
      } else {
        leftBtn.classList.remove('visible');
      }

      if (canScroll && navLinks.scrollLeft < maxScroll - 6) {
        rightBtn.classList.add('visible');
      } else {
        rightBtn.classList.remove('visible');
      }
    }

    leftBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.scrollBy({ left: -180, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.scrollBy({ left: 180, behavior: 'smooth' });
    });

    navLinks.addEventListener('scroll', updateNavScrollButtons, { passive: true });

    navLinks.addEventListener('wheel', (e) => {
      if (window.innerWidth > 1040 && navLinks.scrollWidth > navLinks.clientWidth) {
        if (e.deltaY !== 0) {
          e.preventDefault();
          navLinks.scrollLeft += e.deltaY;
          updateNavScrollButtons();
        }
      }
    }, { passive: false });

    window.addEventListener('resize', updateNavScrollButtons);

    const activeLink = navLinks.querySelector('a.active');
    if (activeLink) {
      setTimeout(() => {
        const itemLeft = activeLink.offsetLeft;
        const itemWidth = activeLink.offsetWidth;
        const containerWidth = navLinks.clientWidth;
        if (itemLeft > containerWidth - 80) {
          navLinks.scrollLeft = itemLeft - (containerWidth / 2) + (itemWidth / 2);
        }
        updateNavScrollButtons();
      }, 100);
    } else {
      setTimeout(updateNavScrollButtons, 50);
    }
  });
}

function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = mainNav.classList.toggle('active');
    toggleBtn.classList.toggle('active', isActive);
    toggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('active') && !mainNav.contains(e.target) && !toggleBtn.contains(e.target)) {
      mainNav.classList.remove('active');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initGlobalDestinationSearch() {
  const searchInput = document.getElementById('globalDestSearch');
  const dropdown = document.getElementById('searchDropdown');

  if (!searchInput || !dropdown) return;

  const destinationsList = [
    { name: 'Nainital', tag: 'Lake City & Viewpoints', url: 'destination-nainital.html', icon: '🏞️' },
    { name: 'Pithoragarh', tag: 'Little Kashmir & Valleys', url: 'destination-pithoragarh.html', icon: '🏔️' },
    { name: 'Bhimtal', tag: 'Island Lake & Nature Walks', url: 'destination-bhimtal.html', icon: '🛶' },
    { name: 'Almora', tag: 'Cultural Heritage & Pine Ridges', url: 'destination-almora.html', icon: '🌲' },
    { name: 'Mukteshwar', tag: 'Snow Peaks & Fruit Orchards', url: 'destination-mukteshwar.html', icon: '🍎' },
    { name: 'Bageshwar', tag: 'Sacred Rivers & Glacier Base', url: 'destination-bageshwar.html', icon: '🛕' },
    { name: 'Dharchula', tag: 'Border Wonder & Rung Culture', url: 'destination-dharchula.html', icon: '⛰️' },
    { name: 'Munsiyari', tag: 'Panchachuli Peaks & Alpine Treks', url: 'destination-munsiyari.html', icon: '❄️' }
  ];

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();

    if (query.length === 0) {
      dropdown.style.display = 'none';
      dropdown.innerHTML = '';
      return;
    }

    const matches = destinationsList.filter(item => 
      item.name.toLowerCase().includes(query) || item.tag.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
      dropdown.innerHTML = matches.map(item => `
        <a href="${item.url}" class="search-result-item">
          <div class="search-result-thumb">${item.icon}</div>
          <div>
            <strong>${item.name}</strong>
            <p style="font-size: 0.8rem; color: #64748b; margin: 0;">${item.tag}</p>
          </div>
        </a>
      `).join('');
      dropdown.style.display = 'block';
    } else {
      dropdown.innerHTML = `
        <div style="padding: 1rem; color: #64748b; font-size: 0.9rem; text-align: center;">
          No destinations match "<strong>${escapeHtml(query)}</strong>". Try searching <em>Nainital, Munsiyari, Almora</em>...
        </div>
      `;
      dropdown.style.display = 'block';
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
}

function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';
  if (type === 'error') icon = '🚨';

  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 4500);
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function initCurrentYear() {
  const yearEls = document.querySelectorAll('.current-year');
  const year = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = year);
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('#btnUserLogoutTop, #btnUserLogoutBottom, #btnAdminLogout, #navLogoutBtn, .btn-sidebar-logout, .nav-btn-logout, .btn-logout, [data-action="logout"], [data-logout]');
  if (btn) {
    e.preventDefault();
    localStorage.removeItem('t360_current_user');
    localStorage.removeItem('t360_current_vendor');
    localStorage.removeItem('t360_admin_session');
    if (btn.id === 'btnAdminLogout') {
      window.location.href = 'admin-login.html';
    } else if (btn.classList.contains('btn-sidebar-logout') || window.location.pathname.includes('vendor-')) {
      window.location.href = 'vendor-login.html';
    } else {
      window.location.href = 'login.html';
    }
  }
});
