import { createContext, useContext, useState, useEffect } from "react";
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const currentTheme = () => {
        const Theme = localStorage.getItem('theme')
        if (Theme === null) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        } else {
            return Theme
        }
    }
    const [theme, setTheme] = useState(currentTheme());
    // this is our main function 
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    useEffect(() => {
        const root = document.documentElement; // Gets the <html> tag. <html lang="en"> 
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme])
    const value = {
        theme,
        toggleTheme,
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ThemeContext)
}