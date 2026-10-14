// Find the theme button.
const themeButton = document.querySelector("#theme-toggle");

// Switch between light and dark themes.
themeButton.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");

    themeButton.textContent = isDarkMode ? "Light mode" : "Dark mode";
    themeButton.setAttribute("aria-pressed", String(isDarkMode));
});

// Create photo navigation for each gallery.
document.querySelectorAll(".photo-gallery").forEach((gallery) => {
    const photos = gallery.querySelectorAll("img");

    // Galleries with one photo do not need buttons.
    if (photos.length < 2) {
        return;
    }

    let currentIndex = 0;
    gallery.classList.add("slider-active");

    const controls = document.createElement("div");
    controls.className = "gallery-controls";

    const previousButton = document.createElement("button");
    previousButton.type = "button";
    previousButton.textContent = "Previous";
    previousButton.setAttribute("aria-label", "Show previous photo");

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.textContent = "Next";
    nextButton.setAttribute("aria-label", "Show next photo");

    const counter = document.createElement("span");
    counter.setAttribute("aria-live", "polite");
    counter.setAttribute("aria-atomic", "true");

    controls.append(previousButton, counter, nextButton);
    gallery.after(controls);

    // Show the current photo and hide the others.
    function showPhoto() {
        photos.forEach((photo, index) => {
            photo.hidden = index !== currentIndex;
        });

        counter.textContent =
            `Photo ${currentIndex + 1} of ${photos.length}`;
    }

    // Move backwards, returning to the last photo if necessary.
    previousButton.addEventListener("click", () => {
        currentIndex =
            (currentIndex - 1 + photos.length) % photos.length;

        showPhoto();
    });

    // Move forwards, returning to the first photo at the end.
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % photos.length;

        showPhoto();
    });

    showPhoto();
});