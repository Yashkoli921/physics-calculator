import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Create a root in the DOM
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(<App />);
