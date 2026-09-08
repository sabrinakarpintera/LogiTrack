document.addEventListener('DOMContentLoaded', function () {
  const filterToggleBtn = document.getElementById('filterToggleBtn');
  const filterDropdown = document.getElementById('filterDropdown');
  const yearFromInput = document.getElementById('yearFrom');
  const yearToInput = document.getElementById('yearTo');
  const applyFilterBtn = document.getElementById('applyFilterBtn');
  const resetFilterBtn = document.getElementById('resetFilterBtn');
  const searchInput = document.getElementById('searchInput');
  const studyItems = document.querySelectorAll('.study-item');
  const noResults = document.getElementById('noResults');

  // Toggle filter dropdown visibility
  filterToggleBtn.addEventListener('click', function () {
    filterDropdown.classList.toggle('d-none');
    filterToggleBtn.classList.toggle('active');
  });

  // Filter Logic Function
  function filterStudies() {
    const fromYear = parseInt(yearFromInput.value, 10);
    const toYear = parseInt(yearToInput.value, 10);
    const searchQuery = searchInput.value.toLowerCase().trim();

    let visibleCount = 0;

    studyItems.forEach(item => {
      const itemYear = parseInt(item.getAttribute('data-year'), 10);
      const titleText = item.querySelector('.study-title').textContent.toLowerCase();
      const keywordText = item.querySelector('.study-keywords').textContent.toLowerCase();

      // Check year range
      let matchesYear = true;
      if (!isNaN(fromYear) && itemYear < fromYear) matchesYear = false;
      if (!isNaN(toYear) && itemYear > toYear) matchesYear = false;

      // Check search text
      let matchesSearch = true;
      if (searchQuery && !titleText.includes(searchQuery) && !keywordText.includes(searchQuery)) {
        matchesSearch = false;
      }

      if (matchesYear && matchesSearch) {
        item.classList.remove('d-none');
        visibleCount++;
      } else {
        item.classList.add('d-none');
      }
    });

    // Toggle No Results message
    if (visibleCount === 0) {
      noResults.classList.remove('d-none');
    } else {
      noResults.classList.add('d-none');
    }
  }

  // Event Listeners
  applyFilterBtn.addEventListener('click', filterStudies);
  searchInput.addEventListener('input', filterStudies);

  // Reset Filters
  resetFilterBtn.addEventListener('click', function () {
    yearFromInput.value = '';
    yearToInput.value = '';
    filterStudies();
  });
});