document.addEventListener('DOMContentLoaded', function () {

  // ---------- Sample Data ----------
  // Replace these arrays with real data from your backend/API.
  // Keep the counts here in sync with classroom.js.
  const csAdvisoryStudents = [
    'Dela Cruz, Juan M.',
    'Santos, Maria L.',
    'Reyes, Paolo G.',
    'Garcia, Angela R.'
  ];

  const itAdvisoryStudents = [
    'Ramos, Kevin D.',
    'Torres, Bianca F.',
    'Mendoza, Aljon P.',
    'Villanueva, Trisha S.',
    'Aquino, Marco T.'
  ];

  const submittedCapstones = [
    { title: 'Capstone Repository', authors: 'Dela Cruz, Juan M.' },
    { title: 'Water Refilling Inventory and Delivery Tracking System', authors: 'Santos, Maria L. & Reyes, Paolo G.' },
    { title: 'Study Space: Interactive Student Learning Platform', authors: 'Garcia, Angela R., Ramos, Kevin D. & Torres, Bianca F.' }
  ];

  function getInitials(fullName) {
    const parts = fullName.replace(',', '').split(' ').filter(Boolean);
    const first = parts[0] ? parts[0][0] : '';
    const second = parts[1] ? parts[1][0] : '';
    return (first + second).toUpperCase();
  }

  function renderStudentList(students) {
    const list = document.getElementById('studentList');
    if (!list) return;

    if (students.length === 0) {
      list.innerHTML = '<div class="list-empty">No students found.</div>';
      return;
    }

    list.innerHTML = students.map(name => `
      <li>
        <span class="student-avatar">${getInitials(name)}</span>
        <span>${name}</span>
      </li>
    `).join('');
  }

  function renderCapstoneTable(capstones) {
    const tbody = document.getElementById('capstoneTableBody');
    if (!tbody) return;

    if (capstones.length === 0) {
      tbody.innerHTML = '<tr><td colspan="2" class="list-empty">No capstone studies submitted yet.</td></tr>';
      return;
    }

    tbody.innerHTML = capstones.map(c => `
      <tr>
        <td class="capstone-title">${c.title}</td>
        <td class="capstone-author">${c.authors}</td>
      </tr>
    `).join('');
  }

  const page = document.body.getAttribute('data-page');

  if (page === 'cs-advisory') {
    renderStudentList(csAdvisoryStudents);
  } else if (page === 'it-advisory') {
    renderStudentList(itAdvisoryStudents);
  } else if (page === 'capstone-list') {
    renderCapstoneTable(submittedCapstones);
  }
});