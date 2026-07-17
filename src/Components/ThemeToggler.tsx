import { useTheme } from "../Services/ThemeProvider/ThemeContextProvider";
import { Button } from "./ui/button";
import { Sun, Moon, SunMoon } from "lucide-react";

export default function ThemeToggler() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button variant="outline" size="icon-lg" onClick={toggleTheme}>
        {
            {
            'system' : <SunMoon />,
            'light' : <Sun />,
            'dark' : <Moon />
            }[theme]
        }
            <span className="sr-only">Toggle Theme</span>
        </Button>
    )
}