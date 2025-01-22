const html = document.documentElement;
const switches = document.querySelector(".switches");
const inputs = switches.querySelectorAll("input");

if (localStorage.getItem("bs-dark-mode")) {
	html.setAttribute("data-bs-theme", "dark");
}

if (localStorage.getItem("bs-selected-radio")) {
	switches.querySelector(
		`#${localStorage.getItem("bs-selected-radio")}`
	).checked = "true";
}

const setTheme = (theme) => {
	if (theme === "dark") {
		html.setAttribute("data-bs-theme", "dark");
		localStorage.setItem("bs-dark-mode", "true");
	} else {
		html.removeAttribute("data-bs-theme");
		localStorage.removeItem("bs-dark-mode");
	}
};

const handleMediaChange = (e) => {
	if (switches.querySelector('[type="radio"]:checked').id === "auto") {
		setTheme(e.matches ? "dark" : "light");
	}
};

const handleInputChange = (e) => {
	const themeMode = e.target.id;
	if (
		themeMode === "dark" ||
		(themeMode === "auto" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		setTheme("dark");
	} else {
		setTheme("light");
	}
	localStorage.setItem("bs-selected-radio", themeMode);
};

window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", handleMediaChange);

inputs.forEach((input) => input.addEventListener("input", handleInputChange));
