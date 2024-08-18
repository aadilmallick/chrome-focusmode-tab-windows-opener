import { LocalStorage, SyncStorage } from "app/utils/api/storage";

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
export const appSettingsStorage = new SyncStorage({});

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
