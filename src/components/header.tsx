'use client'

import ThemeButton from "./theme-bottn";
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import Link from "next/link";

const transitions = {
    en: {
        name: "Sean Kao",
        home: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact"
    },
    zh_tw: {
        name: "高偉翔 (Sean Kao)",
        home: "首頁",
        about: "關於我",
        skills: "技能",
        projects: "作品集",
        contact: "聯繫我"
    }
}

function LanguageButton({
    lang='en', 
    onLangChange = ()=>{},
}) {
    const [isMounted, setIsMounted] = useState(false);
    
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(()=>{
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <motion.button
            ref = {buttonRef}
            onClick={onLangChange}
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{ cursor: 'pointer' }}
            className="relative flex items-center justify-center rounded-full p-2"
        >
            <AnimatePresence initial={false}>
                {lang === 'en' ? (
                    <motion.div
                        className="absolute"
                        initial={{ scale: 0, rotate: 360, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0, rotate: -360, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
                        key={lang}
                    >
                        <span className="font-bold"> EN </span>
                    </motion.div>
                ) : (
                    <motion.div
                        className="absolute"
                        initial={{ scale: 0, rotate: 360, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0, rotate: -360, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
                        key={lang}
                    >
                        <span className="font-bold"> 中 </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    )
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState('en')
    const l = language === 'en' ? transitions.en : transitions.zh_tw;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleLanguage = () => {
        setLanguage(language==='en' ? 'zh_tw' : 'en');
    };

    const menuItems = [
        { title: l.home, href: '/#' },
        { title: l.about, href: '/#about' },
        { title: l.skills, href: '/#skills' },
        { title: l.projects, href: '/#projects' },
        { title: l.contact, href: '/#contact' },
    ];

    return (
        <header className="sticky top-0 z-50 blackdrop-blur-md transition-all bg-background/80">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo / Name */}
                    <div className="font-bold text-xl md:text-2xl">
                        <Link href="/" className="hover:text-blue-500 transition duration-300">
                            {l.name}
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="hover:text-blue-400 transition duration-300"
                            >
                                {item.title}
                            </Link>
                        ))}
                        <ThemeButton />
                        <LanguageButton lang={language} onLangChange={toggleLanguage} />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-600 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 pb-2">
                        <div className="flex flex-col space-y-3">
                            {menuItems.filter((item) => item.href != '/#').map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="hover:text-blue-400 transition duration-300 py-1"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ))}
                            <div className="flex justify-center items-center mt-4 space-x-8">
                                <ThemeButton />
                                <LanguageButton lang={language} onLangChange={toggleLanguage} />
                            </div>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}