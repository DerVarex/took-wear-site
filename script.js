// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Animated welcome text
  const title = document.querySelector("h1");
  if (title) {
    let i = 0;
    const text = "Willkommen auf TOOK WEAR";
    title.textContent = "";

    function typeEffect() {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 80);
      }
    }
    typeEffect();
  }

  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
      });
    });
  }

  // Check server status
  checkServerStatus();
});

// Copy to clipboard function
function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  const text = element.textContent;
  
  navigator.clipboard.writeText(text).then(function() {
    // Show success feedback
    const btn = element.nextElementSibling;
    const originalText = btn.textContent;
    btn.textContent = 'Kopiert!';
    btn.style.background = '#00ff00';
    
    setTimeout(function() {
      btn.textContent = originalText;
      btn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    }, 2000);
  }).catch(function(err) {
    console.error('Fehler beim Kopieren: ', err);
    alert('Fehler beim Kopieren. Bitte manuell kopieren.');
  });
}

// Check Minecraft server status
async function checkServerStatus() {
  const servers = [
    { id: 'status1', address: 'took-wear.gl.joinmc.link' },
    { id: 'status2', address: 'tookwear.falixsrv.me' }
  ];

  let totalPlayers = 0;

  for (const server of servers) {
    try {
      // Using mcsrvstat.us API for server status
      const response = await fetch(`https://api.mcsrvstat.us/3/${server.address}`);
      const data = await response.json();
      
      const statusElement = document.getElementById(server.id);
      
      if (data.online) {
        statusElement.textContent = `Online (${data.players.online}/${data.players.max})`;
        statusElement.className = 'status-indicator status-online';
        totalPlayers += data.players.online;
      } else {
        statusElement.textContent = 'Offline';
        statusElement.className = 'status-indicator status-offline';
      }
    } catch (error) {
      console.error(`Fehler beim Abrufen des Status für ${server.address}:`, error);
      const statusElement = document.getElementById(server.id);
      statusElement.textContent = 'Fehler';
      statusElement.className = 'status-indicator status-offline';
    }
  }

  document.getElementById('totalPlayers').textContent = totalPlayers;
}
