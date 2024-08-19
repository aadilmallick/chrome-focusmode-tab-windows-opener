export default class Windows {
  static async createBasicWindow(urls?: string[]) {
    return await chrome.windows.create({
      url: urls,
      focused: true,
      state: "fullscreen",
    });
  }

  private windowId?: number;
  private window?: chrome.windows.Window;

  constructor(public readonly initialUrls: string[] = []) {}

  public get chromeWindow() {
    return this.window;
  }

  public get id() {
    return this.windowId;
  }

  public get exists() {
    return !!this.windowId;
  }

  public get allUrls() {
    return this.window?.tabs?.map((tab) => tab.url);
  }

  async create() {
    // upsert
    await this.close();
    const window = await chrome.windows.create({
      url: this.initialUrls,
    });
    this.window = window;
    this.windowId = window.id;
    return this as this & {
      chromeWindow: chrome.windows.Window;
      id: number;
    };
  }

  async close() {
    if (this.windowId) {
      await chrome.windows.remove(this.windowId);
    }
  }
}
