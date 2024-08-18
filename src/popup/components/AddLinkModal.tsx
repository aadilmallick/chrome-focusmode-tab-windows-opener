import CustomDialog from "@/custom/CustomDialog";
import useTabGroups from "../hooks/useTabGroups";
import { useState } from "react";
import { LucidePlus } from "lucide-react";
import type { TabGroup } from "app/background/controllers/storageController";
import { popupToaster } from "../popupToaster";
const AddLinkModal = ({ tabGroup }: { tabGroup: TabGroup }) => {
  const { addLinkToTabGroup } = useTabGroups();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  return (
    <>
      <CustomDialog
        openButton={
          <button className="p-0 bg-none border-none" title="Add link to group">
            <LucidePlus size="16" color="rgb(55, 134, 184)" />
          </button>
        }
        content={
          <div className="space-y-2">
            <input
              type="url"
              name=""
              id=""
              className="p-2 bg-gray-50 border-gray-500 rounded-md border-2 w-full"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <input
              type="text"
              name=""
              id=""
              maxLength={30}
              minLength={2}
              className="p-2 bg-gray-50 border-gray-500 rounded-md border-2 w-full"
              placeholder="Url Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        }
        title="Add new link"
        description="Enter the website url"
        onContinue={async () => {
          if (!url) {
            popupToaster.danger("Please enter a valid URL");
            return;
          }
          await addLinkToTabGroup(tabGroup.id, url, title);
        }}
        shouldShowHeader
      />
    </>
  );
};

export default AddLinkModal;
