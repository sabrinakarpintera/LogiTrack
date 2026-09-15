document.addEventListener('DOMContentLoaded', function () {

  // ---------- Read Classroom Info from URL ----------
  const params = new URLSearchParams(window.location.search);
  const classroomName = params.get('name') || 'Classroom';
  const classroomCode = params.get('code') || '------';

  document.getElementById('classroomNameHeading').textContent = classroomName;
  document.getElementById('classroomCodeValue').textContent = classroomCode;
  document.title = classroomName + ' | LogiTrack';

  // ---------- Sample Data ----------
  // Replace these arrays with real data scoped to this classroom from your backend/API.
  const students = [
    'Dela Cruz, Juan M.',
    'Santos, Maria L.',
    'Reyes, Paolo G.',
    'Garcia, Angela R.'
  ];

  const submittedCapstones = [
    { title: 'Capstone Repository', authors: 'Dela Cruz, Juan M.' },
    { title: 'Water Refilling Inventory and Delivery Tracking System', authors: 'Santos, Maria L. & Reyes, Paolo G.' }
  ];

  // ---------- Render Student List ----------
  function getInitials(fullName) {
    const parts = fullName.replace(',', '').split(' ').filter(Boolean);
    const first = parts[0] ? parts[0][0] : '';
    const second = parts[1] ? parts[1][0] : '';
    return (first + second).toUpperCase();
  }

  const studentList = document.getElementById('studentList');
  if (students.length === 0) {
    studentList.innerHTML = '<div class="list-empty">No students in this classroom yet.</div>';
  } else {
    studentList.innerHTML = students.map(name => `
      <li>
        <span class="student-avatar">${getInitials(name)}</span>
        <span>${name}</span>
      </li>
    `).join('');
  }

  // ---------- Render Capstone Table ----------
  const capstoneTableBody = document.getElementById('capstoneTableBody');
  if (submittedCapstones.length === 0) {
    capstoneTableBody.innerHTML = '<tr><td colspan="2" class="list-empty">No capstone studies submitted yet.</td></tr>';
  } else {
    capstoneTableBody.innerHTML = submittedCapstones.map(c => `
      <tr>
        <td class="capstone-title">${c.title}</td>
        <td class="capstone-author">${c.authors}</td>
      </tr>
    `).join('');
  }

  // ---------- Sub Nav Tab Switching ----------
  const subnavButtons = document.querySelectorAll('#classroomSubnav .nav-link');
  const studentsPanel = document.getElementById('studentsPanel');
  const capstonePanel = document.getElementById('capstonePanel');

  subnavButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      subnavButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (btn.getAttribute('data-tab') === 'students') {
        studentsPanel.classList.remove('d-none');
        capstonePanel.classList.add('d-none');
      } else {
        capstonePanel.classList.remove('d-none');
        studentsPanel.classList.add('d-none');
      }
    });
  });
});