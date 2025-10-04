// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Animated welcome text
  const title = document.querySelector("h1");
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

  // Check server status
  checkServerStatus();
  // Refresh server status every 60 seconds
  setInterval(checkServerStatus, 60000);
});

// Copy IP to clipboard
function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  const text = element.textContent;
  
  navigator.clipboard.writeText(text).then(function() {
    // Show feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = "Kopiert!";
    setTimeout(function() {
      btn.textContent = originalText;
    }, 2000);
  }).catch(function(err) {
    console.error('Fehler beim Kopieren: ', err);
    alert('Fehler beim Kopieren. Bitte manuell kopieren: ' + text);
  });
}

// Check server status using Minecraft server API
async function checkServerStatus() {
  const servers = [
    { id: 1, host: 'took-wear.gl.joinmc.link' },
    { id: 2, host: 'tookwear.falixsrv.me' }
  ];

  let totalPlayers = 0;
  
  for (const server of servers) {
    try {
      // Using mcsrvstat.us API for server status
      const response = await fetch(`https://api.mcsrvstat.us/3/${server.host}`);
      const data = await response.json();
      
      const statusElement = document.getElementById(`status${server.id}`);
      const playersElement = document.getElementById(`players${server.id}`);
      
      if (data.online) {
        statusElement.textContent = 'Online';
        statusElement.className = 'status-indicator status-online';
        const playerCount = data.players?.online || 0;
        playersElement.textContent = playerCount;
        totalPlayers += playerCount;
      } else {
        statusElement.textContent = 'Offline';
        statusElement.className = 'status-indicator status-offline';
        playersElement.textContent = '0';
      }
    } catch (error) {
      console.error(`Fehler beim Abrufen des Status für ${server.host}:`, error);
      const statusElement = document.getElementById(`status${server.id}`);
      statusElement.textContent = 'Unbekannt';
      statusElement.className = 'status-indicator';
      document.getElementById(`players${server.id}`).textContent = '-';
    }
  }
  
  document.getElementById('totalPlayers').textContent = totalPlayers;
}

