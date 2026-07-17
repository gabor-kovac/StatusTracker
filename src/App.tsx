import { useEffect, useState } from "react";
import Home from "./Pages/Home";
import { ThemeProvider } from "./Services/ThemeProvider/ThemeContextProvider";
import { TooltipProvider } from "@/Components/ui/tooltip"
import ThemeToggler from "@/Components/ThemeToggler";
import VersionBadge from "@/Components/VersionBadge";
import packageJson from "../package.json";
import ReloadService from "./Services/ReloadService";
import { Toaster } from "@/Components/ui/sonner";
import { toast } from "sonner"
import { Button } from "./Components/ui/button";
import { X } from "lucide-react";

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
                <div className="flex items-center justify-between gap-3 bg-yellow-200 text-foreground dark:text-background p-3 rounded">
                    <span>Reload needed please refresh the page.</span>
                    <Button
                        type="button"
                        aria-label="Dismiss reload notification"
                        variant="secondary"
                        size="icon-lg"
                        onClick={() => {
                            toast.dismiss(toastId);
                            setReloadToastId(null);
                            setReloadToastDismissed(true);
                        }}
                    >
                        <X />
                    </Button>
                </div>
            ),
            {
                duration: Infinity,
                position: "bottom-center"
            }
        );

        setReloadToastId(id);
    }, [reloadNeeded, reloadToastId, reloadToastDismissed]);

    return (
        <ThemeProvider>
            <TooltipProvider>
                <Toaster />
                <div className="grid w-full min-h-screen">
                    <Home />
                </div>
                <footer className="fixed bottom-2 right-2 gap-2 flex items-center">
                    <VersionBadge version={packageJson.version} />
                    <ThemeToggler />
                </footer>
            </TooltipProvider>
        </ThemeProvider>
    );
}
