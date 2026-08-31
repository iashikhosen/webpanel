const HOME_TAB = {
  id: crypto.randomUUID(),
  title: 'Welcome to WebPanel',
  url: chrome.runtime.getURL('welcome.html'),
  pinned: false
};

chrome.runtime.onInstalled.addListener(async (details) => {
  const { panelTabs, panelSettings } = await chrome.storage.local.get(['panelTabs', 'panelSettings']);
  if (!panelTabs?.length) await chrome.storage.local.set({ panelTabs: [HOME_TAB] });
  await chrome.storage.local.set({ panelSettings: { showAddressBar: false, compactTabs: true, showPinIcon: true, showRefreshButton: false, showLoadingIndicator: true, theme: 'system', openHomeOnLaunch: true, home: { title: 'My Home', url: '', pinned: false }, ...panelSettings, home: { title: 'My Home', url: '', pinned: false, ...panelSettings?.home } } });
  await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({ id: 'open-link', title: 'Open link in WebPanel', contexts: ['link'] });
    chrome.contextMenus.create({ id: 'search-text', title: 'Search in WebPanel', contexts: ['selection'] });
    chrome.contextMenus.create({ id: 'settings', title: 'Settings', contexts: ['action'] });
    chrome.contextMenus.create({ id: 'contact-ashik', title: 'Quick help', contexts: ['action'] });
  });
  if (details.reason === 'install') await chrome.tabs.create({ url: chrome.runtime.getURL('options.html#welcome') });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.session.set({ openHomeOnNextPanel: true });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'settings') {
    await chrome.runtime.openOptionsPage();
    return;
  }
  if (info.menuItemId === 'contact-ashik') {
    await chrome.tabs.create({ url: 'https://wa.me/ashikhosen' });
    return;
  }
  const { panelTabs = [] } = await chrome.storage.local.get('panelTabs');
  const isLink = info.menuItemId === 'open-link';
  const source = isLink ? info.linkUrl : info.selectionText;
  if (!source) return;
  const url = isLink
    ? source
    : `https://www.google.com/search?q=${encodeURIComponent(source)}`;
  const next = [...panelTabs, { id: crypto.randomUUID(), title: info.menuItemId === 'open-link' ? 'New link' : info.selectionText.slice(0, 36), url, pinned: true }];
  await chrome.storage.local.set({ panelTabs: next });
  if (tab?.windowId) await chrome.sidePanel.open({ windowId: tab.windowId });
});
