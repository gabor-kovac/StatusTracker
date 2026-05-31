import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Compatibility from "./Pages/Compatibility";
import Releases from "./Pages/Releases";
import { ThemeProvider } from "./Services/ThemeProvider/ThemeContextProvider";
import { TooltipProvider } from "@/Components/ui/tooltip"
import ThemeToggler from "@/Components/ThemeToggler";
import VersionBadge from "@/Components/VersionBadge";
import packageJson from "../package.json";
import ReloadService from "./Services/ReloadService";

function App() {
    var reloadNeeded = ReloadService({ refreshIntervalSeconds: 5 });
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
                    {reloadNeeded &&
                    <span className="text-red text-bold">RELOAD NEEDED</span>
                    }
                    <VersionBadge version={packageJson.version} />
                    <ThemeToggler />
                </footer>
            </TooltipProvider>
        </ThemeProvider>
    );
}

export default App;