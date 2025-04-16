import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set the dir attribute on the root HTML element to support RTL
document.documentElement.dir = "rtl";
document.documentElement.lang = "ar";

createRoot(document.getElementById("root")!).render(<App />);
