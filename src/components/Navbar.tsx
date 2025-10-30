import gsap from 'gsap';
import { useWindowScroll } from 'react-use'
import { useEffect, useRef, useState } from 'react'

const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const navItems = ['Home', 'About', 'Projects', 'Experience'];

export default function Navbar() {
    
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
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
        <header className="fixed top-10 z-50 sm:inset-x-8 lg:inset-x-14">
            <nav className="relative flex h-16 items-center justify-between bg-blackgruvbox text-white border rounded-4xl">
                
                {/* Name and Hire Me Button */}
                <div className=" ">
                    FRASER MCEWAN
                </div>

                {/* Desktop Menu */}
                <div className="flex h-full items-center">
                    <div className="hidden md:flex md:items-center gap-x-12">
                        {navItems.map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                                {item}
                            </a>    
                        ))}
                    </div>
                </div>
                
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <HamburgerIcon />
                    </button>
                </div>

            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                 <div className="md:hidden mt-2 bg-blackgruvbox text-white border rounded-2xl p-4">
                    <nav className="flex flex-col items-center gap-y-4">
                         {navItems.map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn w-full text-right p-2 rounded hover:bg-gray-700">
                                {item}
                            </a>    
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );

}