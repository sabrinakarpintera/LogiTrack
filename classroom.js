document.addEventListener('DOMContentLoaded', function () {

  // ---------- Sample Data ----------
  // Keep these counts in sync with the data used on
  // cs-advisory.html, it-advisory.html, and capstone-list.html.
  const csAdvisoryCount = 4;
  const itAdvisoryCount = 5;
  const submittedCapstoneCount = 3;

  document.querySelector('[data-count="cs"]').textContent = csAdvisoryCount;
  document.querySelector('[data-count="it"]').textContent = itAdvisoryCount;
  document.querySelector('[data-count="capstone"]').textContent = submittedCapstoneCount;
});