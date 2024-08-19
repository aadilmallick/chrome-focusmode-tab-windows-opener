import { Runtime } from "app/utils/api/runtime";
import { appSettingsStorage } from "./controllers/storageController";
import NotificationModel from "app/utils/api/notifications";
import { windowsStore } from "./controllers/windowsController";

Runtime.onInstall({
  // runs first time you download the extension
  installCb: async () => {
    console.log("Extension installed");
  },
  // runs every time you update the extension or refresh it
  updateCb: async () => {
    console.log("Extension updated");
  },
  onAll: async () => {
    console.log("Extension loaded");
  },
});

windowsStore.addUpdatedListener();

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!tab.url) return;
  console.log("windows", windowsStore.windows);
  // if tab is not in a focusmode window, don't execute the code
  if (!windowsStore.windowIds.includes(tab.windowId)) return;

  const focusModeWindow = windowsStore.getWindowFromId(tab.windowId)!;
  console.log(focusModeWindow);

  const focusModeUrls = focusModeWindow.initialUrls.map(
    (url) => new URL(url).hostname
  );
  console.log(focusModeUrls);

  const shouldFocus = await appSettingsStorage.get("focusMode");
  if (shouldFocus) {
    chrome.tabs.remove(tabId);
    setTimeout(() => {
      NotificationModel.showBasicNotification({
        title: "Focus Mode",
        message: "You are in focus mode, the tab will be closed",
        iconPath: "public/icon.png",
      });
    }, 3000);
  }
});
