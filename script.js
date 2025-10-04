// Animated welcome text with updated text
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

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    checkServerStatus();
  });
} else {
  typeEffect();
  checkServerStatus();
}

// Copy to clipboard function
function copyToClipboard(elementId, buttonElement) {
  const element = document.getElementById(elementId);
  const text = element.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    // Show feedback
    const originalText = buttonElement.textContent;
    buttonElement.textContent = 'Kopiert!';
    buttonElement.style.background = 'linear-gradient(135deg, rgba(76, 175, 80, 0.7), rgba(76, 175, 80, 0.5))';
    
    setTimeout(() => {
      buttonElement.textContent = originalText;
      buttonElement.style.background = '';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}

// Server status checking function
async function checkServerStatus() {
  const servers = [
    { host: 'took-wear.gl.joinmc.link', port: 25565, statusId: 'status1' },
    { host: 'tookwear.falixsrv.me', port: 25565, statusId: 'status2' }
  ];
  
  let totalPlayers = 0;
  
  for (const server of servers) {
    try {
      // Use Minecraft Server Status API
      const response = await fetch(`https://api.mcsrvstat.us/3/${server.host}`);
      const data = await response.json();
      
      const statusElement = document.getElementById(server.statusId);
      
      if (data.online) {
        statusElement.textContent = 'Online';
        statusElement.classList.add('online');
        statusElement.classList.remove('offline');
        
        if (data.players && data.players.online !== undefined) {
          totalPlayers += data.players.online;
        }
      } else {
        statusElement.textContent = 'Offline';
        statusElement.classList.add('offline');
        statusElement.classList.remove('online');
      }
    } catch (error) {
      console.error(`Error checking status for ${server.host}:`, error);
      const statusElement = document.getElementById(server.statusId);
      statusElement.textContent = 'Unbekannt';
      statusElement.classList.remove('online', 'offline');
    }
  }
  
  document.getElementById('playerCount').textContent = totalPlayers;
}

// Refresh server status every 60 seconds
setInterval(checkServerStatus, 60000);
