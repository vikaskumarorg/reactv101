import { useTheme } from './ThemeContaxt';

const ToggleTheme = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <label>Toggle Theme</label>
            <input 
                type="checkbox" 
                checked={theme === "dark"} 
                onChange={toggleTheme}
            />
        </>
    );
};

export default ToggleTheme;