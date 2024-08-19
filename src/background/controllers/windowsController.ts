import Windows from "app/utils/api/windows";

class FocusModeWindows {
  windows: Windows[] = [];

  public get windowIds() {
    return this.windows.map((win) => win.id);
  }

  getWindowFromId(windowId: number) {
    return this.windows.find((win) => win.id === windowId);
  }

  async add(window: Windows) {
    const createdWindow = await window.create();
    this.windows.push(createdWindow);
  }

  remove(windowId: number) {
    this.windows = this.windows.filter((win) => win.id !== windowId);
  }

  addUpdatedListener() {
    chrome.windows.onRemoved.addListener((windowId) => {
      this.remove(windowId);
    });
  }
}

export const windowsStore = new FocusModeWindows();
