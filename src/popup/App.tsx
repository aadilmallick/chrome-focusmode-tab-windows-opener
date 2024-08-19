import "../utils/style-utils/globals.css";
import AddModal from "./components/AddModal";
import AddTabGroupModal from "./components/AddTabGroupModal";
import Groups from "./components/Groups";
import "./index.css";

function App() {
  return (
    <>
      <div className="w-[15rem] h-[20rem]">
        <div className="flex gap-x-2 items-center justify-around p-2">
          <AddModal />
          <AddTabGroupModal />
        </div>
        <Groups />
      </div>
    </>
  );
}

export default App;
