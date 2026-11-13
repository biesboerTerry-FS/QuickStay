import React from "react";
import { useTheme } from "../context/ThemeContext";

const SunIcon = () => (
	<svg
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
	>
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
	</svg>
);

const MoonIcon = () => (
	<svg
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
	</svg>
);

const ThemeToggle = ({ className = "" }) => {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			title={isDark ? "Light mode" : "Dark mode"}
			className={`flex items-center justify-center h-9 w-9 rounded-full border border-current/20 hover:bg-current/10 transition-all cursor-pointer ${className}`}
		>
			{isDark ? <SunIcon /> : <MoonIcon />}
		</button>
	);
};

export default ThemeToggle;
