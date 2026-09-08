 // Add Dynamic Chip Inputs
  document.querySelectorAll('.chip-add-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var row = document.getElementById(btn.dataset.target);
      var count = row.querySelectorAll('.chip-input').length + 1;
      var placeholder = btn.dataset.kind === 'author' ? 'Add Author ' + count : 'Add Keyword';

      var input = document.createElement('input');
      input.type = 'text';
      input.className = 'chip-input';
      input.placeholder = placeholder;

      row.insertBefore(input, btn);
      input.focus();
    });
  });

  // Form Submission Handling
  document.getElementById('studyForm').addEventListener('submit', function(e){
    e.preventDefault();
    alert('Capstone project submitted successfully!');
    window.location.href = '../pages/home.html';
  });