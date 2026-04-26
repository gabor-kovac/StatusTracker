import { useTheme } from "../Services/ThemeProvider/ThemeContextProvider";
import { Button } from "./ui/button";
import { Sun, Moon, SunMoon } from "lucide-react";
import { Theme } from "../Types/Themes";

export default function ThemeToggler() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button variant="outline" size="icon-lg" onClick={toggleTheme}>
            {theme === Theme.System ? (
                <SunMoon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-100 dark:rotate-0"></SunMoon>
            ) : theme === Theme.Light ? (
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"></Sun>
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"></Moon>
            )}
            <span className="sr-only">Toggle Theme</span>
        </Button>
    )
}