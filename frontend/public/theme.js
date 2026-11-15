// Apply the theme before the page paints to avoid a light flash in dark mode.
let savedTheme;
try {
	savedTheme = localStorage.getItem("theme");
} catch {
	// Fall back to the system preference when storage is unavailable.
}
document.documentElement.classList.toggle(
	"dark",
	savedTheme === "dark" || (savedTheme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches),
);
