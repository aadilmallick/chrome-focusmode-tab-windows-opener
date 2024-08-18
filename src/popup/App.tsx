import "../utils/style-utils/globals.css";
import AddModal from "./components/AddModal";
import Groups from "./components/Groups";
import "./index.css";

function App() {
  return (
    <>
      <div className="w-[15rem] h-[20rem]">
        <div className="flex items-center justify-center p-2">
          <AddModal />
        </div>
        <Groups />
      </div>
    </>
  );
}

export default App;
