import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Compatibility from "./Pages/Compatibility";
import Releases from "./Pages/Releases";
import { ThemeProvider } from "./Services/ThemeProvider/ThemeContextProvider";
import { TooltipProvider } from "@/Components/ui/tooltip"
import ThemeToggler from "@/Components/ThemeToggler";
import VersionBadge from "@/Components/VersionBadge";
import packageJson from "../package.json";
import ReloadService from "./Services/ReloadService";
import { Toaster } from "@/Components/ui/sonner";
import { toast } from "sonner"

export default function App() {
    const refreshInterval = parseInt(import.meta.env.VITE_REFRESH_INTERVAL_SECONDS) || 5;
    const reloadNeeded = ReloadService({refreshIntervalSeconds: refreshInterval});
    const [reloadToastId, setReloadToastId] = useState<string | number | null>(null);
    const [reloadToastDismissed, setReloadToastDismissed] = useState(false);

    useEffect(() => {
        if (!reloadNeeded || reloadToastId !== null || reloadToastDismissed) {
            return;
        }

        const id = toast.custom(
            (toastId) => (
                <div className="flex items-center gap-3">
                    <span>Reload needed please refresh the page.</span>
                    <button
                        type="button"
                        aria-label="Dismiss reload notification"
                        className="rounded px-2 py-1 text-sm font-semibold"
                        onClick={() => {
                            toast.dismiss(toastId);
                            setReloadToastId(null);
                            setReloadToastDismissed(true);
                        }}
                    >
                        ×
                    </button>
                </div>
            ),
            {
                duration: Infinity,
                closeButton: false,
                dismissible: false,
                position: "bottom-center",
                description: "A new version of the application is available. Please refresh the page to load the latest updates.",
                onDismiss: () => setReloadToastDismissed(true),
            }
        );

        setReloadToastId(id);
    }, [reloadNeeded, reloadToastId, reloadToastDismissed]);

    return (
        <ThemeProvider>
            <TooltipProvider>
                <Toaster />
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
