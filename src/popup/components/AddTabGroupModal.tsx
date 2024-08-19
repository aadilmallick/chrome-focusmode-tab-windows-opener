import { Button } from "@/components/ui/button";
import CustomDialog from "@/custom/CustomDialog";
import IconButton from "@/custom/IconButton";
import { TabGroup } from "app/background/controllers/storageController";
import { LucideGroup, LucidePlus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import useTabGroups from "../hooks/useTabGroups";
import { popupToaster } from "../popupToaster";

const AddTabGroupModal = () => {
  const [groups, setGroups] = useState<
    {
      groupId: number;
      title: string | undefined;
    }[]
  >([]);
  const [selectedGroup, setSelectGroup] = useState<number | null>(null);
  const [selectedGroupName, setSelectGroupName] = useState<string>("");
  const { addTabGroup } = useTabGroups();

  const options = useMemo(() => {
    return groups.map((group) => ({
      value: group.groupId,
      label: group.title,
    }));
  }, [groups]);

  useEffect(() => {
    async function addTabGroupFromChrome() {
      const tabGroups = await chrome.tabGroups.query({});
      const groups = tabGroups.map((group) => ({
        groupId: group.id,
        title: group.title,
      }));
      setGroups(groups);
    }

    addTabGroupFromChrome();
  }, []);

  return (
    <CustomDialog
      openButton={
        <Button
          size="icon"
          title="Add existing tab group"
          className="bg-blue-400/50 text-blue-600 rounded-full hover:bg-blue-400/75 transition-colors shadow-md"
        >
          <LucideGroup size="16" />
        </Button>
      }
      content={
        <div>
          <Select
            options={options}
            onChange={(selectedOption) => {
              setSelectGroup(selectedOption?.value ?? null);
              setSelectGroupName(selectedOption?.label ?? "");
            }}
          />
        </div>
      }
      title="Add new link"
      description="Enter the website url"
      onContinue={async () => {
        console.log(selectedGroup);
        if (selectedGroup) {
          const tabsFromGroup = await chrome.tabs.query({
            groupId: selectedGroup,
          });
          const links: TabGroup["links"] = tabsFromGroup.map((tab) => ({
            title: tab.title!,
            url: tab.url!,
            id: (tab.id || crypto.randomUUID()).toString(),
          }));
          await addTabGroup(selectedGroupName, links);
          popupToaster.success("Tab group added successfully");
        }
      }}
      shouldShowHeader
    />
  );
};

export default AddTabGroupModal;
