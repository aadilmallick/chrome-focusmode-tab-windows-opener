import { LocalStorage, SyncStorage } from "app/utils/api/storage";
import Windows from "app/utils/api/windows";

export interface TabGroup {
  links: {
    title: string;
    url: string;
    id: string;
  }[];
  id: string;
  name: string;
}

export const appStorage = new LocalStorage<Record<string, TabGroup | null>>();
export const windowsStorage = new LocalStorage({
  windows: [] as Windows[],
});
export const appSettingsStorage = new SyncStorage({
  focusMode: false,
});

// define static methods here
export class StorageHandler {
  static async addTabGroup(tabGroup: TabGroup) {
    await appStorage.set(`${tabGroup.name}-${tabGroup.id}`, tabGroup);
  }

  static async removeTabGroup(tabGroupId: string, tabGroupName: string) {
    await appStorage.remove(`${tabGroupName}-${tabGroupId}`);
  }

  static async getTabGroups(): Promise<TabGroup[]> {
    const stored = await appStorage.getAll();
    if (!stored) return [];
    const groups = Object.values(stored).filter((group) => group !== null);
    return groups;
  }

  static async updateTabGroup(tabGroup: TabGroup) {
    await appStorage.set(`${tabGroup.name}-${tabGroup.id}`, tabGroup);
  }
}
