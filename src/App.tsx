import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Compatibility from "./Pages/Compatibility";
import Releases from "./Pages/Releases";
import { ThemeProvider } from "./Services/ThemeProvider/ThemeContextProvider";
import { TooltipProvider } from "@/Components/ui/tooltip"
import ThemeToggler from "@/Components/ThemeToggler";
import VersionBadge from "@/Components/VersionBadge";
import packageJson from "../package.json";

function App() {
    return (
        <ThemeProvider>
            <TooltipProvider>
                <div className="grid w-full min-h-screen">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/compatibility" element={<Compatibility />} />
                        <Route path="/releases" element={<Releases />} />
                    </Routes>
                </div>
                <footer className="fixed bottom-2 right-2 gap-2 flex items-center">
                    <VersionBadge version={packageJson.version} />
                    <ThemeToggler />
                </footer>
            </TooltipProvider>
        </ThemeProvider>
    );
}

export default App;