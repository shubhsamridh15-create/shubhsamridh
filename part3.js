/* =========================================================
   PART 3 — OUR LITTLE MEMORIES
   NEW GALLERY ENGINE
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const PHOTO_FOLDER = "photo-sessions";

const TOTAL_PHOTOS = 66;

const NEXT_PAGE_URL = "part4.html";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    createStars();

    createGallery();

    setupScrollProgress();

    setupPhotoAnimations();

    setupContinueButton();

});


/* =========================================================
   CREATE BACKGROUND PARTICLES
========================================================= */

function createStars() {

    const field =
        document.getElementById("star-field");

    if (!field) return;


    const amount =
        window.innerWidth < 600
            ? 35
            : 70;


    const fragment =
        document.createDocumentFragment();


    for (let i = 0; i < amount; i++) {

        const star =
            document.createElement("span");


        star.className =
            "star";


        const size =
            (Math.random() * 2.5 + 1)
            .toFixed(2);


        const opacity =
            (Math.random() * .55 + .2)
            .toFixed(2);


        const duration =
            (Math.random() * 7 + 5)
            .toFixed(2);


        const delay =
            (Math.random() * -10)
            .toFixed(2);


        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;


        star.style.setProperty(
            "--size",
            `${size}px`
        );

        star.style.setProperty(
            "--opacity",
            opacity
        );

        star.style.setProperty(
            "--duration",
            `${duration}s`
        );

        star.style.setProperty(
            "--delay",
            `${delay}s`
        );


        fragment.appendChild(star);

    }


    field.appendChild(fragment);

}


/* =========================================================
   CREATE GALLERY
========================================================= */

function createGallery() {

    const gallery =
        document.getElementById(
            "gallery-grid"
        );


    if (!gallery) {

        console.error(
            "Gallery container not found."
        );

        return;
    }


    /*
        IMPORTANT:

        We deliberately DO NOT create
        separate columns here.

        CSS handles the masonry layout.

        Every photo is appended in
        exact numerical order.
    */

    const fragment =
        document.createDocumentFragment();


    for (
        let number = 1;
        number <= TOTAL_PHOTOS;
        number++
    ) {

        const photo =
            createPhoto(number);


        fragment.appendChild(photo);

    }


    gallery.appendChild(fragment);

}


/* =========================================================
   CREATE PHOTO
========================================================= */

function createPhoto(number) {

    const photoBox =
        document.createElement("figure");


    photoBox.className =
        "photo-item";


    /*
        EXACT FILE STRUCTURE:

        photo-sessions/
            photo (1).jpg
            photo (2).jpg
            ...
            photo (66).jpg
    */

    const imagePath =
        `${PHOTO_FOLDER}/photo (${number}).jpg`;


    const image =
        document.createElement("img");


    image.src =
        imagePath;


    image.alt =
        `Raksha Bandhan Memory ${number}`;


    /*
        First few images load immediately.

        Remaining images use lazy loading.
    */

    image.loading =
        number <= 8
            ? "eager"
            : "lazy";


    /*
        Browser helps decode images
        without blocking the page.
    */

    image.decoding =
        "async";


    /*
        Keep the photo exactly in
        its natural aspect ratio.
    */

    image.style.height =
        "auto";


    /*
        Error handling.
    */

    image.addEventListener(
        "error",
        () => {

            console.error(
                `Photo not found: ${imagePath}`
            );

            photoBox.classList.add(
                "photo-error"
            );

        },
        { once: true }
    );


    photoBox.appendChild(image);


    return photoBox;

}


/* =========================================================
   PHOTO ENTRANCE ANIMATION
========================================================= */

function setupPhotoAnimations() {

    const photos =
        document.querySelectorAll(
            ".photo-item"
        );


    if (!photos.length) return;


    /*
        If browser doesn't support
        IntersectionObserver, show
        everything immediately.
    */

    if (
        !("IntersectionObserver" in window)
    ) {

        photos.forEach(photo => {

            photo.classList.add(
                "photo-visible"
            );

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const photo =
                        entry.target;


                    /*
                        Small stagger based on
                        the photo's position.
                    */

                    const index =
                        Array.from(
                            photos
                        ).indexOf(photo);


                    const delay =
                        Math.min(
                            (index % 5) * 70,
                            280
                        );


                    setTimeout(() => {

                        photo.classList.add(
                            "photo-visible"
                        );

                    }, delay);


                    observerInstance.unobserve(
                        photo
                    );

                });

            },
            {
                root: null,

                rootMargin:
                    "0px 0px -8% 0px",

                threshold:
                    0.08
            }
        );


    photos.forEach(photo => {

        observer.observe(photo);

    });

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function setupScrollProgress() {

    const progressBar =
        document.getElementById(
            "scroll-progress-bar"
        );


    if (!progressBar) return;


    let ticking = false;


    function updateProgress() {

        const scrollTop =
            window.scrollY || 0;


        const scrollHeight =
            document.documentElement
                .scrollHeight;


        const viewportHeight =
            window.innerHeight;


        const totalScrollable =
            scrollHeight -
            viewportHeight;


        let percentage = 0;


        if (totalScrollable > 0) {

            percentage =
                (scrollTop /
                    totalScrollable) *
                100;

        }


        progressBar.style.width =
            `${Math.min(
                100,
                Math.max(
                    0,
                    percentage
                )
            )}%`;


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                requestAnimationFrame(
                    updateProgress
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    updateProgress();

}


/* =========================================================
   CONTINUE BUTTON
========================================================= */

function setupContinueButton() {
    const button = document.getElementById("continue-btn");

    if (!button) return;

    button.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.classList.add("fade-out-page");
        setTimeout(() => {
            window.location.href = NEXT_PAGE_URL;
        }, 700);
    });
}