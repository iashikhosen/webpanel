const form = document.querySelector('#newTabForm');
form.addEventListener('submit', event => { event.preventDefault(); const url = document.querySelector('#tabUrl').value.trim(); if (!url) return; const title = document.querySelector('#tabName').value.trim() || 'Untitled tab'; window.parent.postMessage({ type: 'webpanel-add-tab', url, title, pinned: document.querySelector('#tabPinned').checked }, '*'); document.querySelector('#status').textContent = 'Opening your tab…'; });
document.querySelector('#openSettings').onclick=()=>window.parent.postMessage({type:'webpanel-open-settings'},'*');
