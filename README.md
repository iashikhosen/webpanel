# WebPanel Chrome Extension

WebPanel keeps a set of named websites in Chrome's native, resizable side panel.

## Install locally

1. Open `chrome://extensions` in Chrome and enable **Developer mode**.
2. Select **Load unpacked** and choose this project folder.
3. Click the WebPanel toolbar icon to open the side panel. Chrome supplies the panel-width resize handle.

## Included behavior

- Create persistent tabs with the **+** button; names, URLs, pin state, and selection are stored in `chrome.storage.local`.
- Right-click a tab to edit it, duplicate it, or remove it—there is intentionally no close icon on the tab.
- Right-click the WebPanel toolbar icon and choose **Settings** to configure the default URL, panel layout, access controls, and export/import a JSON backup.
- Use the page context menu to send a link or selected text to WebPanel.
- Choose Light, Dark, or System theme from Settings.

WebPanel does not inject code into websites or bypass website security headers. A website can choose not to display in an embedded frame; this is expected behavior and preserves the website's security policy.

## Chrome Web Store release checklist

- Publish a hosted privacy-policy URL before submission. It must match [privacy.html](privacy.html), including the local storage of saved tabs and the optional Google Form email collection.
- Add the privacy-policy URL and complete the Data Usage disclosure in the Chrome Web Store Developer Dashboard.
- In the listing, describe WebPanel's single purpose as a persistent website workspace in Chrome's side panel.
- Explain the `tabs`, `storage`, `sidePanel`, and `contextMenus` permissions in the listing or support page.
- Add at least one real screenshot, a support email, and a concise description of the optional future-update form.
- Create the upload ZIP from the extension source files only; exclude `.DS_Store` and Chrome-generated `_metadata/` files.
# webpanel
