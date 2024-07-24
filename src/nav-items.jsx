import { FileCode } from "lucide-react";
import Index from "./pages/Index.jsx";

export const navItems = [
  {
    title: "Code to Flowchart",
    to: "/",
    icon: <FileCode className="h-4 w-4" />,
    page: <Index />,
  },
];