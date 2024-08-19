import React, { useEffect } from "react";
import { useApplicationStore } from "./useApplicationStore";
import {
  StorageHandler,
  TabGroup,
} from "app/background/controllers/storageController";

const useTabGroups = () => {
  const { setTabGroups, tabGroups } = useApplicationStore();
  const [loading, setLoading] = React.useState(false);

  async function addTabGroup(
    tabGroupName: string,
    links: TabGroup["links"] = []
  ) {
    const tabGroup = {
      id: crypto.randomUUID(),
      name: tabGroupName,
      links: links,
    };
    setTabGroups(tabGroups.concat(tabGroup));
    await StorageHandler.addTabGroup(tabGroup);
  }

  async function removeTabGroup(tabGroupId: string, tabGroupName: string) {
    const updatedTabGroups = tabGroups.filter(
      (group) => group.id !== tabGroupId
    );
    setTabGroups(updatedTabGroups);
    await StorageHandler.removeTabGroup(tabGroupId, tabGroupName);
  }

  async function addLinkToTabGroup(
    tabGroupId: string,
    url: string,
    title: string
  ) {
    const updatedTabGroups = tabGroups.map((group) => {
      const link = {
        id: crypto.randomUUID(),
        url,
        title,
      };
      const linksSet = new Set(group.links.map((link) => link.url));
      if (linksSet.has(link.url)) {
        return group;
      }
      if (group.id === tabGroupId) {
        return {
          ...group,
          links: group.links.concat(link),
        };
      }
      return group;
    });
    const updatedTabGroup = updatedTabGroups.find(
      (group) => group.id === tabGroupId
    );
    setTabGroups(updatedTabGroups);
    if (!updatedTabGroup) throw new Error("Tab group not found");
    await StorageHandler.updateTabGroup(updatedTabGroup);
  }

  async function removeLinkFromTabGroup(tabGroupId: string, linkId: string) {
    const updatedTabGroups = tabGroups.map((group) => {
      if (group.id === tabGroupId) {
        return {
          ...group,
          links: group.links.filter((link) => link.id !== linkId),
        };
      }
      return group;
    });
    const updatedTabGroup = updatedTabGroups.find(
      (group) => group.id === tabGroupId
    );
    setTabGroups(updatedTabGroups);
    if (!updatedTabGroup) throw new Error("Tab group not found");
    await StorageHandler.updateTabGroup(updatedTabGroup);
  }

  useEffect(() => {
    async function loadTabGroups() {
      setLoading(true);
      const groups = await StorageHandler.getTabGroups();
      setTabGroups(groups);
      setLoading(false);
    }

    loadTabGroups();
  }, []);

  return {
    tabGroups,
    loading,
    addTabGroup,
    removeTabGroup,
    addLinkToTabGroup,
    removeLinkFromTabGroup,
  };
};

export default useTabGroups;
