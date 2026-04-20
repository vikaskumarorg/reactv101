import { useTheme } from './ThemeContaxt';

const ToggleTheme = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <label>
            <input 
                type="checkbox" 
                checked={theme === "dark"} 
                onChange={toggleTheme}
            /> Toggle Theme
            </label>
        </>
    );
};

export default ToggleTheme;