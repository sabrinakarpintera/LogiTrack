document.addEventListener('DOMContentLoaded', function () {

  const createClassroomModal = document.getElementById('createClassroomModal');
  const classCodeInput = document.getElementById('classCode');
  const generateCodeBtn = document.getElementById('generateCodeBtn');
  const classroomNameInput = document.getElementById('classroomName');
  const createClassroomForm = document.getElementById('createClassroomForm');
  const classroomGrid = document.getElementById('classroomGrid');
  const classroomEmpty = document.getElementById('classroomEmpty');
  const fabCreate = document.querySelector('.fab-create');
  const footer = document.querySelector('footer');

  // ---------- Class Code Generator ----------
  function generateClassCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid confusion
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // Auto-generate a fresh code every time the modal opens
  createClassroomModal.addEventListener('show.bs.modal', function () {
    createClassroomForm.reset();
    classCodeInput.value = generateClassCode();
  });

  // Let the adviser regenerate the code manually
  generateCodeBtn.addEventListener('click', function () {
    classCodeInput.value = generateClassCode();
  });

  // ---------- Render a Classroom Card ----------
  function addClassroomCard(name, code) {
    if (classroomEmpty) {
      classroomEmpty.remove();
    }

    const card = document.createElement('div');
    card.className = 'classroom-card';
    card.innerHTML = `
      <div class="classroom-card-icon"><span class="material-symbols-outlined">school</span></div>
      <div class="classroom-card-name">${name}</div>
      <span class="classroom-card-code"><span class="material-symbols-outlined" style="font-size:1rem;">key</span>${code}</span>
    `;
    classroomGrid.appendChild(card);
  }

  // ---------- Create Classroom ----------
  createClassroomForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const classroomName = classroomNameInput.value.trim();
    const classCode = classCodeInput.value;

    if (!classroomName) return;

    // TODO: send { classroomName, classCode } to your backend/API here.
    addClassroomCard(classroomName, classCode);

    const modalInstance = bootstrap.Modal.getInstance(createClassroomModal);
    modalInstance.hide();
  });

  // ---------- Keep the FAB above the footer ----------
  function updateFabPosition() {
    if (!footer || !fabCreate) return;

    const margin = 32; // matches the 2rem gap used in CSS
    const footerRect = footer.getBoundingClientRect();

    if (footerRect.top < window.innerHeight - margin) {
      // Footer is visible near the bottom of the viewport: pin the button
      // above it instead of letting it float over the footer content.
      const footerTop = footer.offsetTop;
      fabCreate.style.position = 'absolute';
      fabCreate.style.bottom = 'auto';
      fabCreate.style.top = (footerTop - fabCreate.offsetHeight - margin) + 'px';
    } else {
      fabCreate.style.position = 'fixed';
      fabCreate.style.top = 'auto';
      fabCreate.style.bottom = margin + 'px';
    }
  }

  window.addEventListener('scroll', updateFabPosition);
  window.addEventListener('resize', updateFabPosition);
  updateFabPosition();
});
