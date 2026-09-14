// Add Dynamic Keyword Chips (scoped to the Keywords row only — the Author
// "+" button also has class .chip-add-btn but must not be caught here)
var keywordRow = document.getElementById('keywordRow');

document.querySelectorAll('.chip-row .chip-add-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var row = document.getElementById(btn.dataset.target);
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'chip-input';
    input.placeholder = 'Add Keyword';
    row.insertBefore(input, btn);
    input.focus();
  });
});

// Typing a keyword and pressing Enter should just keep it in its bar —
// without this, Enter inside a text field submits the whole form.
keywordRow.addEventListener('keydown', function (e) {
  if (e.target.classList.contains('chip-input') && e.key === 'Enter') {
    e.preventDefault();
    e.target.blur();
  }
});

// ---------- Author search-select rows ----------
(function () {
  // Demo directory of people to search against. In production this would
  // come from an API call (e.g. GET /api/authors?q=...).
  var directory = [
    'Juan Dela Cruz', 'Maria Santos', 'Jose Rizal', 'Andres Bonifacio',
    'Angela Reyes', 'Miguel Torres', 'Sofia Villanueva', 'Carlos Mendoza',
    'Isabella Cruz', 'Gabriel Ramos', 'Camille Aquino', 'Rafael Garcia',
    'Nicole Bautista', 'Daniel Fernandez', 'Patricia Lim', 'Antonio Navarro'
  ];

  var authorRow = document.getElementById('authorRow');
  var addAuthorBtn = document.getElementById('addAuthorBtn');
  var hiddenField = document.getElementById('authorsField');

  // Per-combo state (matches shown + which one is keyboard-highlighted).
  var state = new WeakMap();

  function initials(name) {
    var parts = name.trim().split(/\s+/);
    var first = parts[0] ? parts[0][0] : '';
    var last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  }

  function syncHiddenField() {
    var names = Array.prototype.map.call(
      authorRow.querySelectorAll('.author-input'),
      function (el) { return el.value.trim(); }
    ).filter(Boolean);
    hiddenField.value = names.join(', ');
  }

  function closeDropdown(combo) {
    var dropdown = combo.querySelector('.author-dropdown');
    var toggle = combo.querySelector('.author-combo-toggle');
    dropdown.classList.remove('is-open');
    dropdown.innerHTML = '';
    toggle.setAttribute('aria-expanded', 'false');
    state.set(combo, { matches: [], activeIndex: -1 });
  }

  function closeAllDropdowns() {
    authorRow.querySelectorAll('.author-combo').forEach(closeDropdown);
  }

  function otherSelectedNames(combo) {
    return Array.prototype.map.call(
      authorRow.querySelectorAll('.author-combo'),
      function (c) {
        if (c === combo) return null;
        var val = c.querySelector('.author-input').value.trim();
        return val || null;
      }
    ).filter(Boolean);
  }

  function buildOption(name, combo) {
    var item = document.createElement('div');
    item.className = 'author-option';

    var avatar = document.createElement('span');
    avatar.className = 'avatar-dot';
    avatar.textContent = initials(name);

    var label = document.createElement('span');
    label.textContent = name;

    item.appendChild(avatar);
    item.appendChild(label);
    item.addEventListener('click', function () { selectAuthor(combo, name); });
    return item;
  }

  function selectAuthor(combo, name) {
    var trimmed = name.trim();
    if (!trimmed) return;
    var input = combo.querySelector('.author-input');
    input.value = trimmed;
    closeDropdown(combo);
    syncHiddenField();
  }

  function highlight(combo, idx) {
    var dropdown = combo.querySelector('.author-dropdown');
    var items = dropdown.querySelectorAll('.author-option');
    items.forEach(function (el, i) { el.classList.toggle('is-active', i === idx); });
    var s = state.get(combo) || {};
    s.activeIndex = idx;
    state.set(combo, s);
  }

  // query === null -> browse the full directory (chevron click).
  // query === ''   -> nothing to show yet.
  // query === '...' -> filter as the person types.
  function renderDropdown(combo, query) {
    var dropdown = combo.querySelector('.author-dropdown');
    var toggle = combo.querySelector('.author-combo-toggle');
    var taken = otherSelectedNames(combo);

    dropdown.innerHTML = '';

    var pool = directory.filter(function (name) { return taken.indexOf(name) === -1; });
    var matches = query
      ? pool.filter(function (name) { return name.toLowerCase().indexOf(query.toLowerCase()) !== -1; }).slice(0, 6)
      : pool;

    matches.forEach(function (name) { dropdown.appendChild(buildOption(name, combo)); });

    if (query) {
      var exactMatch = directory.some(function (name) { return name.toLowerCase() === query.toLowerCase(); });
      if (!exactMatch) {
        var createItem = document.createElement('div');
        createItem.className = 'author-option author-option-create';
        createItem.innerHTML = '<span class="avatar-dot"><i class="bi bi-plus"></i></span><span>Add "' + query + '"</span>';
        createItem.addEventListener('click', function () { selectAuthor(combo, query); });
        dropdown.appendChild(createItem);
        matches = matches.concat([query]);
      }
    }

    if (!dropdown.children.length) {
      var empty = document.createElement('div');
      empty.className = 'author-option-empty';
      empty.textContent = query ? 'No matching authors' : 'All authors have been added';
      dropdown.appendChild(empty);
    }

    dropdown.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    state.set(combo, { matches: matches, activeIndex: -1 });
  }

  function wireCombo(combo) {
    var input = combo.querySelector('.author-input');
    var toggle = combo.querySelector('.author-combo-toggle');
    state.set(combo, { matches: [], activeIndex: -1 });

    input.addEventListener('input', function () {
      var query = input.value.trim();
      if (!query) { closeDropdown(combo); return; }
      renderDropdown(combo, query);
    });

    input.addEventListener('keydown', function (e) {
      var dropdown = combo.querySelector('.author-dropdown');
      var isOpen = dropdown.classList.contains('is-open');
      var s = state.get(combo) || { matches: [], activeIndex: -1 };

      if (e.key === 'ArrowDown' && isOpen && s.matches.length) {
        e.preventDefault();
        highlight(combo, Math.min(s.activeIndex + 1, s.matches.length - 1));
      } else if (e.key === 'ArrowUp' && isOpen && s.matches.length) {
        e.preventDefault();
        highlight(combo, Math.max(s.activeIndex - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        var current = state.get(combo) || { matches: [], activeIndex: -1 };
        if (isOpen && current.activeIndex > -1 && current.matches[current.activeIndex]) {
          selectAuthor(combo, current.matches[current.activeIndex]);
        } else {
          closeDropdown(combo);
          syncHiddenField();
        }
      } else if (e.key === 'Escape') {
        closeDropdown(combo);
      }
    });

    input.addEventListener('blur', function () {
      syncHiddenField();
    });

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var dropdown = combo.querySelector('.author-dropdown');
      var isOpen = dropdown.classList.contains('is-open');
      closeAllDropdowns();
      if (isOpen) return;
      renderDropdown(combo, input.value.trim() || null);
      input.focus();
    });
  }

  function addAuthorRow() {
    var combo = document.createElement('div');
    combo.className = 'author-combo';
    combo.innerHTML =
      '<i class="bi bi-search author-combo-icon"></i>' +
      '<input type="text" class="author-input" placeholder="Select or enter an author name" autocomplete="off">' +
      '<button type="button" class="author-combo-toggle" aria-label="Browse authors" aria-expanded="false">' +
      '<i class="bi bi-chevron-down"></i></button>' +
      '<div class="author-dropdown"></div>';

    authorRow.insertBefore(combo, addAuthorBtn);
    wireCombo(combo);
    combo.querySelector('.author-input').focus({ preventScroll: true });
  }

  // Wire up the first, already-present row.
  wireCombo(authorRow.querySelector('.author-combo'));

  addAuthorBtn.addEventListener('click', addAuthorRow);

  document.addEventListener('click', function (e) {
    if (!authorRow.contains(e.target)) closeAllDropdowns();
  });
})();

// Form Submission Handling
document.getElementById('studyForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Capstone project submitted successfully!');
  window.location.href = '../pages/home.html';
});
