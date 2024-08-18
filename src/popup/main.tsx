import { injectRoot } from "app/utils/ReactUtils.tsx";
import App from "./App.tsx";
import { popupToaster } from "./popupToaster.tsx";

injectRoot(<App />);
popupToaster.setup();
