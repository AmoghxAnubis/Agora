import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('theme');
        return stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <motion.button
            onClick={() => setIsDark(!isDark)}
            className="relative p-2 rounded-full overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="absolute inset-0 bg-gray-200 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="relative z-10 text-black dark:text-white"
            >
                {isDark ? <Moon size={18} fill="currentColor" /> : <Sun size={18} fill="currentColor" />}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
