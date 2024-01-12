document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const numOfLinksDropdown = document.getElementById('numOfLinks');
    const linkFieldsContainer = document.getElementById('linkFields');
  
    startBtn.addEventListener('click', startAutoLogin);
    stopBtn.addEventListener('click', stopAutoLogin);
    numOfLinksDropdown.addEventListener('change', generateLinkFields);
  
    function generateLinkFields() {
      const numOfLinks = parseInt(numOfLinksDropdown.value);
      linkFieldsContainer.innerHTML = '';
  
      for (let i = 1; i <= numOfLinks; i++) {
        const label = document.createElement('label');
        label.textContent = `Enter Link ${i}:`;
  
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `https://example${i}.com`;
        input.required = true;
  
        linkFieldsContainer.appendChild(label);
        linkFieldsContainer.appendChild(input);
      }
    }
  
    function startAutoLogin() {
      const interval = document.getElementById('interval').value;
  
      const links = [];
      const linkInputs = document.querySelectorAll('#linkFields input');
      linkInputs.forEach(input => {
        links.push(input.value);
      });
  
      if (links.length > 0 && interval) {
        fetch('/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ links, interval }),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            startBtn.disabled = true;
            stopBtn.disabled = false;
          })
          .catch(error => {
            console.error('Error starting auto login:', error);
          });
      }
    }
  
    function stopAutoLogin() {
      fetch('/stop', {
        method: 'POST',
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          startBtn.disabled = false;
          stopBtn.disabled = true;
        })
        .catch(error => {
          console.error('Error stopping auto login:', error);
        });
    }
  
    // Generate link fields based on the initial dropdown value
    generateLinkFields();
  });
  