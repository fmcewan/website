import React from "react";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" className="text-xl font-bold cursor-pointer">
          Fraser McEwan
        </a>
        <ul className="flex space-x-6 text-sm font-medium">
          <li>
            <a href="#about" className="hover:text-gruvbox-bright_yellow transition-colors duration-300">About</a>
          </li>
          <li>
            <a href="#projects" className="hover:text-gruvbox-bright_yellow transition-colors duration-300">Projects</a>
          </li>
          <li>
            <a href="#skills" className="hover:text-gruvbox-bright_yellow transition-colors duration-300">Skills</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gruvbox-bright_yellow transition-colors duration-300">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
