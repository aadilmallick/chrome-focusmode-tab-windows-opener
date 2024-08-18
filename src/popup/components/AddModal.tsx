import { Button } from "@/components/ui/button";
import CustomDialog from "@/custom/CustomDialog";
import useTabGroups from "../hooks/useTabGroups";
import { useState } from "react";

const AddModal = () => {
  const { addTabGroup } = useTabGroups();
  const [name, setName] = useState("");
  return (
    <>
      <CustomDialog
        openButton={
          <Button className="bg-green-400/50 text-green-600 rounded-full hover:bg-green-400/75 transition-colors">
            Add new group +
          </Button>
        }
        content={
          <div className="">
            <input
              type="text"
              name=""
              id=""
              maxLength={30}
              minLength={2}
              className="p-2 bg-gray-50 border-gray-500 rounded-md border-2 w-full"
              placeholder="Enter group name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        }
        title="Add new group"
        description="Enter the NAME of the website you want to add to a new group."
        onContinue={async () => {
          if (!name) return;
          await addTabGroup(name);
        }}
        shouldShowHeader
      />
    </>
  );
};

export default AddModal;
