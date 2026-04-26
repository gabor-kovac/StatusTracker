import { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from '../../Types/Themes';

type ThemeContextProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const initialState: ThemeProviderState = {
    theme: Theme.System,
    setTheme: () => null,
    toggleTheme: () => {},
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const ThemeProvider = ({ children, defaultTheme = Theme.System, storageKey = "theme", ...props }: ThemeContextProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

    useEffect(() => {
        const root = globalThis.document.documentElement;
        root.classList.remove(Theme.Light, Theme.Dark);

        if (theme === Theme.System) {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light;
            root.classList.add(systemTheme);
            return;
        }
        root.classList.add(theme);
    }, [theme]);

    const setThemeAndStore = (theme: Theme) => {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
    };

    const toggleTheme = () => {
        switch (theme) {
            case Theme.Light:
                setThemeAndStore(Theme.Dark);
                break;
            case Theme.Dark:
                setThemeAndStore(Theme.System);
                break;
            default:
                setThemeAndStore(Theme.Light);
        }
    };

    const value: ThemeProviderState = {
        theme,
        setTheme: setThemeAndStore,
        toggleTheme,
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider!");
    }
    return context;
}
