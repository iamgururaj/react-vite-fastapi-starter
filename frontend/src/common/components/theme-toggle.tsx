import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function ThemeToggle() {
	const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
	function toggleTheme() {
		const next = !dark;
		document.documentElement.classList.toggle("dark", next);
		setDark(next);
		try {
			localStorage.setItem("theme", next ? "dark" : "light");
		} catch {
			// Keep the toggle usable when browser storage is unavailable.
		}
	}
	return (
		<Button
			variant="outline"
			className="h-8 w-8 border-0 bg-transparent px-0"
			onClick={toggleTheme}
			aria-label="Dark mode"
			aria-pressed={dark}
			title={dark ? "Use light mode" : "Use dark mode"}
		>
			{dark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
		</Button>
	);
}
