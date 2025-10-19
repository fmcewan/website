import gsap from 'gsap';
import { useWindowScroll } from 'react-use'
import { useEffect, useRef, useState } from 'react'

const navItems = ['About', 'Projects', 'Experience'];

export default function Navbar() {
    
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    
    const navContainerRef = useRef<HTMLDivElement>(null);
    
    const { y : currentScrollY } = useWindowScroll();
    
    useEffect(() => {
        if (!navContainerRef.current) return;

        if (currentScrollY === 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        }
        else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        }
        else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true)
            navContainerRef.current.classList.add('floating-nav');
        }
        
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY])

    useEffect(() => {
        if (!navContainerRef.current) return;

        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2
        })
    }, [isNavVisible])

    return (
        <div ref={navContainerRef}
        className="fixed top-4 z-50 h-16 border-none transition-all duration-700 inset-x-4 md:inset-x-8 lg:inset-x-14 text-white">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-x-3">
                        <a href="#hero" className="font-black">FRASER MCEWAN</a>
                        <h1>|</h1>
                        <a href="#contact" className="nav-hover-btn">HIRE ME</a>
                    </div>

                    <div className="flex h-full items-center">
                        <div className="hidden md:flex md:items-center md:gap-x-12">
                            {navItems.map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                                    {item}
                                </a>    
                            ))}
                        </div>
                    </div>

                </nav>
            </header>
        </div>
    );
}