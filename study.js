 document.addEventListener('DOMContentLoaded', function () {
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    const bookmarkIcon = document.getElementById('bookmarkIcon');
    const bookmarkText = document.getElementById('bookmarkText');

    bookmarkBtn.addEventListener('click', function () {
      bookmarkBtn.classList.toggle('bookmarked');
      const isBookmarked = bookmarkBtn.classList.contains('bookmarked');

      if (isBookmarked) {
        bookmarkIcon.className = 'bi bi-bookmark-fill';
        bookmarkText.textContent = 'Saved';
      } else {
        bookmarkIcon.className = 'bi bi-bookmark';
        bookmarkText.textContent = 'Bookmark';
      }
    });
  });