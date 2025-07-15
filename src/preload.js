const { contextBridge, ipcRenderer } = require('electron');
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  ipcRenderer.on("updateAuditeurs", (event, auditeurs) => {
    replaceText(`auditeurs`, auditeurs);
  });
});
