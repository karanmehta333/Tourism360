document.addEventListener('DOMContentLoaded', () => {
  initDestinationFilter();
});

function initDestinationFilter() {
  const filterButtons = document.querySelectorAll('.dest-filter-btn');
  const destinationCards = document.querySelectorAll('.destination-item-card');
  const searchInput = document.getElementById('destPageSearch');
  const resultsCounter = document.getElementById('destCountDisplay');

  if (!destinationCards.length) return;

  let currentCategory = 'all';
  let currentSearch = '';

  function applyFilters() {
    let visibleCount = 0;

    destinationCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const name = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.card-description')?.textContent || '').toLowerCase();
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();

      const matchesCategory = (currentCategory === 'all') || category.includes(currentCategory);
      const matchesSearch = (currentSearch === '') || 
                            name.includes(currentSearch) || 
                            desc.includes(currentSearch) || 
                            tags.includes(currentSearch);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultsCounter) {
      resultsCounter.textContent = `Showing ${visibleCount} of ${destinationCards.length} destinations`;
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }
}
