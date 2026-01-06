import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme') === 'dark';
        setDarkMode(saved);

        const root = document.documentElement;
        if (saved) root.classList.add('dark');
        else root.classList.remove('dark');
    }, []);

    const toggleTheme = () => {
        setDarkMode(prev => {
            const next = !prev;
            const root = document.documentElement;
            if (next) root.classList.add('dark');
            else root.classList.remove('dark');

            localStorage.setItem('theme', next ? 'dark' : 'light');
            return next;
        });
    };

    return (
        <div className="min-h-screen transition-colors duration-300 bg-white  text-black">
            <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;
