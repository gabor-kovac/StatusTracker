import { createContext, useContext, useEffect, useState } from 'react';
import { type Theme } from '../../Types/Themes';

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
    theme: 'system',
    setTheme: () => null,
    toggleTheme: () => {},
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const ThemeProvider = ({ children, defaultTheme = 'system', storageKey = 'theme', ...props }: ThemeContextProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

    useEffect(() => {
        const root = globalThis.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
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
            case 'light':
                setThemeAndStore('dark');
                break;
            case 'dark':
                setThemeAndStore('system');
                break;
            default:
                setThemeAndStore('light');
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
