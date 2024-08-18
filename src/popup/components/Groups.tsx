import type { TabGroup } from "app/background/controllers/storageController";
import useTabGroups from "../hooks/useTabGroups";
import {
  Loader,
  LucideCheck,
  LucideCopy,
  LucideExternalLink,
  LucideLink2Off,
  LucidePlus,
  LucideTrash,
} from "lucide-react";
import { memo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getButtonAccessibilityProps } from "app/utils/projectUtils";
import AddLinkModal from "./AddLinkModal";
import IconButton from "@/custom/IconButton";

const Groups = () => {
  const { tabGroups, loading } = useTabGroups();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-h-96 overflow-y-auto space-y-4 overflow-x-visible px-4 py-8">
      {tabGroups.map((group) => {
        return <TabGroupItem tabGroup={group} key={group.id} />;
      })}
    </div>
  );
};

const TabGroupItem = memo(({ tabGroup }: { tabGroup: TabGroup }) => {
  return (
    <div className="bg-gray-50 shadow-xl rounded-xl p-2 border-gray-200 border-2">
      <div className="flex justify-between items-center flex-wrap gap-x-2">
        <p className="text-sm font-semibold text-gray-900 tracking-tighter">
          {tabGroup.name}
        </p>
        {/* actions header */}
        <div className="flex gap-x-2">
          <OpenWindowButton tabGroup={tabGroup} />
          <AddLinkModal tabGroup={tabGroup} />
          <DeleteGroupButton tabGroup={tabGroup} />
        </div>
      </div>
      <TabGroupLinksAccordion tabGroup={tabGroup} />
    </div>
  );
});

const OpenWindowButton = ({ tabGroup }: { tabGroup: TabGroup }) => {
  async function openWindow() {
    const linksToOpen = tabGroup.links.map((link) => link.url);
    await chrome.windows.create({
      url: linksToOpen,
    });
  }
  return (
    <IconButton
      onClick={async () => {
        await openWindow();
      }}
      title="Open all links in a new window"
    >
      <LucideExternalLink size="16" color="gray" />
    </IconButton>
  );
};

const DeleteGroupButton = ({ tabGroup }: { tabGroup: TabGroup }) => {
  const { removeTabGroup } = useTabGroups();
  return (
    <IconButton
      onClick={async () => {
        const shouldDelete = confirm(
          `Are you sure you want to delete the group ${tabGroup.name}?`
        );
        shouldDelete && (await removeTabGroup(tabGroup.id, tabGroup.name));
      }}
      title="Delete group"
    >
      <LucideTrash size="16" color="red" />
    </IconButton>
  );
};

const TabGroupLinksAccordion = memo(({ tabGroup }: { tabGroup: TabGroup }) => {
  const [copying, setCopying] = useState(false);
  const { removeLinkFromTabGroup } = useTabGroups();
  return (
    <Accordion type="single" collapsible className="w-full overflow-x-hidden">
      <AccordionItem value="item-1">
        <AccordionTrigger>Links</AccordionTrigger>
        <AccordionContent>
          {tabGroup.links.map((link) => (
            <div
              className="flex justify-between items-center py-2"
              key={link.id}
            >
              <a
                href={link.url}
                className="line-clamp-1 text-xs inline-block max-w-[20ch] text-ellipsis text-blue-400"
                target="_blank"
              >
                {link.title || link.url}
              </a>
              <div className="flex gap-x-2">
                {/* copy link button */}
                <button
                  className="p-0 bg-none border-none steelblue disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={copying}
                  title="Copy link"
                  onClick={async () => {
                    setCopying(true);
                    await navigator.clipboard.writeText(link.url);
                    setTimeout(() => {
                      setCopying(false);
                    }, 2000);
                  }}
                >
                  {copying ? (
                    <LucideCheck size="16" color="gray" />
                  ) : (
                    <LucideCopy size="16" color="gray" />
                  )}
                </button>
                {/* delete link button */}
                <IconButton
                  onClick={async () => {
                    await removeLinkFromTabGroup(tabGroup.id, link.id);
                  }}
                  title="Delete link"
                >
                  <LucideTrash size="16" color="red" />
                </IconButton>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
});

export default Groups;
