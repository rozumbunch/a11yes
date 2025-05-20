/*!
 * a11yes.js - JavaScript Accessibility Tool
 * Copyright (c) 2025 RozumBunch
 * Licensed under the MIT License.
 * https://opensource.org/licenses/MIT
 */

function resolveRelativePath(filename) {
    try {
        return import.meta.url.replace('a11yes.js', filename);
    } catch (error) {
        console.error('Error resolving relative path:', error);
    }
}

function a11YesInit({
    // popup language
    currentLanguage = 'en',
    // element's classname to open a11Yes popup
    openButtonClassname = 'a11yes-open',
    // font size settings
    fontSize = true,
    fontSizeStep = 2,
    fontSizeMaxSteps = 5,
    fontSizeMinSteps = 0,
    // letter spacing settings
    letterSpacing = true,
    letterSpacingStep = 1,
    maxLetterSpacingSteps = 5,
    minLetterSpacingSteps = 0,
    // contrast settings
    contrast = true,
    highLightColor = 'red',
    // fonts settings
    fonts = {
        'Arial': 'Arial, sans-serif',
        'Times New Roman': 'Times New Roman, serif',
    },
    // other functions settings
    otherFunctions = true,
    // links settings
    links = [
        ['Lorem', '#', '_blank'],
        ['Ipsum', '#'],
    ],
    // show icons
    icons = true,
    iconsPath = resolveRelativePath('icons'),
    // translations
    translations = resolveRelativePath(`data/translations-${currentLanguage}.json`)
}) {
    fetch(translations)
        .then(response => response.json())
        .then(data => {
            initializeA11YesUI(data);
        })
        .catch((error) => {
            console.error('Error loading translations:', error);
        });

    function initializeA11YesUI(translation) {
        const html = document.documentElement;
        const body = document.body;

        const a11YesWindowEl = document.createElement('div');
        a11YesWindowEl.classList.add('a11yes-window');
        if (!icons) {
            a11YesWindowEl.classList.add('a11yes-window--no-icons');
        }

        a11YesWindowEl.innerHTML = `
            <button class="a11yes-close" aria-label="${translation['Close']}"></button>

            ${fontSize ? `
                <div class="a11yes-item">
                    <p class="a11yes-title">
                        <img class="a11yes-icon" src="${iconsPath}/font-size.svg" alt="icon"/>
                        ${translation['Font size']}
                    </p>
                    <div class="a11yes-group">
                        <button
                            class="a11yes-btn a11yes-font-increase"
                            aria-label="Increase size of fonts"
                        >
                            +
                        </button>
                        <button
                            class="a11yes-btn a11yes-font-decrease"
                            aria-label="Decrease size of fonts"
                        >
                            -
                        </button>
                    </div>
                </div>
            `
                : ''
            }

            ${letterSpacing ? `
                <div class="a11yes-item">
                    <p class="a11yes-title">
                        <img class="a11yes-icon" src="${iconsPath}/letter-spacing.svg" alt="icon"/>
                        ${translation['Letter spacing']}
                    </p>
                    <div class="a11yes-group">
                        <button class="a11yes-btn a11yes-letter-spacing-increase"
                            aria-label="Increase size of letter spacing">
                            +
                        </button>
                        <button class="a11yes-btn a11yes-letter-spacing-decrease"
                            aria-label="Decrease size of letter spacing">
                            -
                        </button>
                    </div>
                </div>
            `
                : ''
            }

            ${fonts ? `
                <fieldset class="a11yes-item a11yes-group-radio">
                    <div class="a11yes-group a11yes-radio">
                        <legend>
                            <p class="a11yes-title">
                                <img class="a11yes-icon" src="${iconsPath}/font-type.svg" alt="icon"/>
                                ${translation['Font type']}
                            </p>
                        </legend>
                        ${Object.entries(fonts)
                        .map(
                            ([fontName, fontValue]) => `
                            <label>
                                <input
                                    type="radio"
                                    name="font"
                                    value="${fontName.toLowerCase()}"
                                    class="a11yes-font-name"
                                    aria-label="${fontName}"
                                    data-font="${fontValue}"
                                >
                                <span>
                                    ${fontName}
                                </span>
                            </label>
                        `,
                        )
                        .join('')}
                    </div>
                </fieldset>
            `
                : ''
            }

            ${contrast ? `
                <fieldset class="a11yes-item a11yes-group-radio">
                    <div class="a11yes-group a11yes-radio">
                        <legend>
                            <p class="a11yes-title">
                                <img class="a11yes-icon" src="${iconsPath}/contrast.svg" alt="icon"/>
                                ${translation['Contrast']}
                            </p>
                        </legend>
                        <label>
                            <input
                                type="radio"
                                name="contrast"
                                value="normal"
                                class="a11yes-filter-normal"
                                aria-label="${translation['Standard Mode']}"
                            >
                            <span>
                                ${translation['Standard Mode']}
                            </span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="contrast"
                                value="contrast"
                                class="a11yes-filter-contrast"
                                aria-label="${translation['High contrast']}"
                            >
                            <span>
                                ${translation['High contrast']}
                            </span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="contrast"
                                value="invert"
                                class="a11yes-filter-invert"
                                aria-label="${translation['Invert']}"
                            >
                            <span>
                                ${translation['Invert']}
                            </span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="contrast"
                                value="monochrome"
                                class="a11yes-filter-monochrome"
                                aria-label="${translation['Monochrome']}"
                            >
                            <span>
                                ${translation['Monochrome']}
                            </span>
                        </label>
                    </div>
                </fieldset>
            `
                : ''
            }

            ${otherFunctions ? `
                <div class="a11yes-item">
                    <p class="a11yes-title">
                        <img class="a11yes-icon" src="${iconsPath}/functions.svg" alt="icon"/>
                        ${translation['Other functions']}
                    </p>
                    <div class="a11yes-group a11yes-buttons">
                        <button class="a11yes-btn a11yes-cursor" aria-label="${translation['Big cursor']}">
                            ${translation['Big cursor']}
                        </button>
                        <button class="a11yes-btn a11yes-highlight" aria-label="${translation['Highlighted']}">
                            ${translation['Highlighted']}
                        </button>
                        <button class="a11yes-btn a11yes-images" aria-label="${translation['Hide images']}">
                            ${translation['Hide images']}
                        </button>
                    </div>
                </div>
            `
                : ''
            }

            ${links.length ? `
                <div class="a11yes-item">
                    <div class="a11yes-group">
                        ${links
                        .map(
                            (link) => `
                            <a
                                aria-label="${link[0]}"
                                class="a11yes-link"
                                href="${link[1]}"
                                target="${link[2] ? link[2] : '_self'}"
                                rel="${link[2] ? 'noopener nofollow' : ''}"
                            >
                                ${link[0]}
                            </a>
                        `,
                        )
                        .join('')}
                    </div>
                </div>
            `
                : ''
            }

            <button class="a11yes-btn a11yes-reset">
                ${translation['Reset']}
            </button>
        `;

        body.appendChild(a11YesWindowEl);

        const a11YesWindow = document.querySelector('.a11yes-window');

        // Set highlight color css variable
        const customCssVariables = document.createElement('style');
        customCssVariables.innerHTML = `
            :root {
                --a11yes-highlight-color: ${highLightColor}
            }
        `;
        document.head.append(customCssVariables);

        // Select all elements
        const all = document.querySelectorAll('*');

        // Open accessibility window
        const openButtons = document.querySelectorAll(`.${openButtonClassname}`);

        openButtons.forEach(function (openButton) {
            openButton.addEventListener('click', function () {
                this.classList.toggle('active');
                this.parentElement.classList.toggle('active');
                a11YesWindow.classList.toggle('active');
            });
        });

        // Close accessibility window
        function closeA11yWindow() {
            openButtons.forEach(button => button.classList.remove('active'));
            a11YesWindow?.classList.remove('active');
        }

        document.addEventListener('click', function (event) {
            const isClickInsideOpenButton = Array.from(openButtons).some(button => button.contains(event.target));
            const isClickInsideA11yWindow = a11YesWindow.contains(event.target);

            if (!isClickInsideOpenButton && !isClickInsideA11yWindow) {
                closeA11yWindow();
            }
        });

        body.addEventListener('click', function (event) {
            if (event.target.matches('.a11yes-close')) {
                closeA11yWindow();
            }
        });

        // Close on swipe
        let touchStartY = 0;
        let touchEndY = 0;
        let threshold = 100;

        a11YesWindow.addEventListener('touchstart', function (event) {
            touchStartY = event.touches[0].clientY;
        });

        a11YesWindow.addEventListener('touchend', function (event) {
            touchEndY = event.changedTouches[0].clientY;
            handleSwipe();
        });

        function handleSwipe() {
            const deltaY = touchEndY - touchStartY;

            if (deltaY < -threshold) {
                openButtons.forEach(function (openButton) {
                    openButton.classList.remove('active');
                });
                a11YesWindow.classList.remove('active');
            }
        }

        // Font size logic
        const defaultFontSize = [];
        all.forEach(item => {
            const fontSize = window.getComputedStyle(item).fontSize;
            defaultFontSize.push(Number(fontSize.replace('px', '')));
        });

        let fontSizeStepsCount = Number(localStorage.getItem('fontSizeStepsCount')) || 0;

        const changeFontSize = (action) => {
            let size = [];

            all.forEach(item => {
                const fontSize = window.getComputedStyle(item).fontSize;
                size.push(Number(fontSize.replace('px', '')));
            });

            if (!action) {
                all.forEach((item, index) => {
                    item.style.fontSize = `${size[index] + fontSizeStep * fontSizeStepsCount}px`;
                });
            } else {
                all.forEach((item, index) => {
                    if (action === '+') {
                        size[index] += fontSizeStep;
                    } else {
                        size[index] -= fontSizeStep;
                    }
                    item.style.fontSize = `${size[index]}px`;
                });

                action === '+' ? fontSizeStepsCount++ : fontSizeStepsCount--;
            }

            localStorage.setItem('fontSizeStepsCount', fontSizeStepsCount);
        };

        if (fontSizeStepsCount) {
            changeFontSize();
        }

        body.addEventListener('click', function (event) {
            if (event.target.matches('.a11yes-font-increase')) {
                if (fontSizeStepsCount < fontSizeMaxSteps) {
                    changeFontSize('+');
                }
            }

            if (event.target.matches('.a11yes-font-decrease')) {
                if (fontSizeStepsCount > fontSizeMinSteps) {
                    changeFontSize('-');
                }
            }
        });

        // Letter spacing logic
        const defaultLetterSpacing = [];
        all.forEach(item => {
            const letterSpacing = window.getComputedStyle(item).getPropertyValue('letter-spacing');
            const letterSpacingValue = letterSpacing === 'normal' ? 0 : Number(letterSpacing.replace('px', ''));
            defaultLetterSpacing.push(letterSpacingValue);
        });

        let letterSpacingStepsCount = Number(localStorage.getItem('letterSpacingStepsCount')) || 0;

        const changeLetterSpacing = (action) => {
            let letterSpacing = [];
            all.forEach(item => {
                const spacing = window.getComputedStyle(item).getPropertyValue('letter-spacing');
                const spacingValue = spacing === 'normal' ? 0 : Number(spacing.replace('px', ''));
                letterSpacing.push(spacingValue);
            });

            if (!action) {
                all.forEach((item, index) => {
                    const newLetterSpacing = letterSpacing[index] + letterSpacingStep * letterSpacingStepsCount;
                    item.style.letterSpacing = newLetterSpacing + 'px';
                });
            } else {
                all.forEach((item, index) => {
                    if (action === '+') {
                        letterSpacing[index] += letterSpacingStep;
                    } else {
                        letterSpacing[index] -= letterSpacingStep;
                    }
                    item.style.letterSpacing = letterSpacing[index] + 'px';
                });

                action === '+' ? letterSpacingStepsCount++ : letterSpacingStepsCount--;
            }

            localStorage.setItem('letterSpacingStepsCount', letterSpacingStepsCount);
        };

        if (letterSpacingStepsCount) {
            changeLetterSpacing();
        }

        body.addEventListener('click', function (event) {
            if (event.target.matches('.a11yes-letter-spacing-increase')) {
                if (letterSpacingStepsCount < maxLetterSpacingSteps) {
                    changeLetterSpacing('+');
                }
            }

            if (event.target.matches('.a11yes-letter-spacing-decrease')) {
                if (letterSpacingStepsCount > minLetterSpacingSteps) {
                    changeLetterSpacing('-');
                }
            }
        });

        // Filter logic
        const storedFilter = localStorage.getItem('filter');

        if (storedFilter && storedFilter !== 'none') {
            if (storedFilter === 'invert(1)') {
                html.style.filter = 'invert(1)';
                document.querySelector('.a11yes-filter-invert').checked = true;
            } else if (storedFilter === 'grayscale(1)') {
                html.style.filter = 'grayscale(1)';
                document.querySelector('.a11yes-filter-monochrome').checked = true;
            } else if (storedFilter === 'contrast(200%)') {
                html.style.filter = 'contrast(200%)';
                document.querySelector('.a11yes-filter-contrast').checked = true;
            }
        } else {
            document.querySelector('.a11yes-filter-normal').checked = true;
        }

        const normalizeFilter = () => {
            html.style.filter = 'none';
            localStorage.setItem('filter', 'none');
        };

        body.addEventListener('change', function (event) {
            if (event.target.matches('.a11yes-filter-invert')) {
                document.documentElement.style.filter = 'invert(1)';
                localStorage.setItem('filter', 'invert(1)');
            }

            if (event.target.matches('.a11yes-filter-monochrome')) {
                document.documentElement.style.filter = 'grayscale(1)';
                localStorage.setItem('filter', 'grayscale(1)');
            }

            if (event.target.matches('.a11yes-filter-contrast')) {
                document.documentElement.style.filter = 'contrast(200%)';
                localStorage.setItem('filter', 'contrast(200%)');
            }

            if (event.target.matches('.a11yes-filter-normal')) {
                normalizeFilter();
            }
        });

        // Change fonts logic
        const customFontStyle = document.createElement('style');
        document.head.append(customFontStyle);

        const storedFontStyle = localStorage.getItem('fontStyle');

        if (storedFontStyle !== null && storedFontStyle !== 'false') {
            customFontStyle.innerHTML = `
            html, body, h1, h2, h3, h4, h5, h6, p, strong, span, i, u, ul, ol, li, form, input, select, textarea {
                font-family: ${storedFontStyle} !important;
            }
        `;

            $(`.a11yes-font-name[data-font="${storedFontStyle}"]`).prop('checked', true);
        }

        body.addEventListener('change', function (event) {
            if (event.target.matches('.a11yes-font-name')) {
                const font = event.target.dataset.font;

                customFontStyle.innerHTML = `
                html, body, h1, h2, h3, h4, h5, h6, p, strong, span, i, u, ul, ol, li, form, input, select, textarea {
                    font-family: ${font} !important;
                }
            `;

                localStorage.setItem('fontStyle', font);
            }
        });

        // Cursor logic
        const storedCursor =
            localStorage.getItem('bigCursor') === null || localStorage.getItem('bigCursor') === 'false' ? false : true;
        let bigCursor = storedCursor || false;

        const makeDefaultCursor = () => {
            body.style.cursor = 'default';
            document.querySelector('.a11yes-cursor').classList.remove('active');
        };

        const makeBigCursor = () => {
            body.style.cursor = `url("${iconsPath}/cursor.svg"), auto`;
            document.querySelector('.a11yes-cursor').classList.add('active');
        };

        if (storedCursor) {
            makeBigCursor();
        } else {
            makeDefaultCursor();
        }

        body.addEventListener('click', function (event) {
            if (event.target.matches('.a11yes-cursor')) {
                bigCursor = !bigCursor;
                localStorage.setItem('bigCursor', bigCursor);

                if (bigCursor) {
                    makeBigCursor();
                } else {
                    makeDefaultCursor();
                }
            }
        });

        // Highlight logic
        const storedHighlight =
            localStorage.getItem('highlight') === null || localStorage.getItem('highlight') === 'false' ? false : true;
        let highlight = storedHighlight || false;

        const addHighlight = () => {
            body.classList.add('highlight-enabled');
            document.querySelector('.a11yes-highlight').classList.add('active');
        };

        const removeHighlight = () => {
            body.classList.remove('highlight-enabled');
            document.querySelector('.a11yes-highlight').classList.remove('active');
        };

        if (storedHighlight) {
            addHighlight();
        } else {
            removeHighlight();
        }

        body.addEventListener('click', function (event) {
            if (event.target.matches('.a11yes-highlight')) {
                highlight = !highlight;
                localStorage.setItem('highlight', highlight);

                if (highlight) {
                    addHighlight();
                } else {
                    removeHighlight();
                }
            }
        });

        // Hide images logic
        const storedHideImages =
            localStorage.getItem('hideImages') === null || localStorage.getItem('hideImages') === 'false' ? false : true;
        let hideImages = storedHideImages || false;

        const makeHiddenImages = () => {
            const images = document.querySelectorAll('img:not(.a11yes-icon)');
            images.forEach(img => img.style.visibility = 'hidden');

            all.forEach(item => {
                item.classList.add('a11yes-remove-bg');
            });

            const a11YesImages = document.querySelectorAll('.a11yes-images');
            a11YesImages.forEach(img => img.classList.add('active'));
        };

        const makeDefaultImages = () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => img.style.visibility = 'visible');

            all.forEach(item => {
                item.classList.remove('a11yes-remove-bg');
            });

            const a11YesImages = document.querySelectorAll('.a11yes-images');
            a11YesImages.forEach(img => img.classList.remove('active'));
        };

        if (storedHideImages) {
            makeHiddenImages();
        } else {
            makeDefaultImages();
        }

        body.addEventListener('click', function (event) {
            if (event.target.matches('.a11yes-images')) {
                hideImages = !hideImages;
                localStorage.setItem('hideImages', hideImages);

                if (hideImages) {
                    makeHiddenImages();
                } else {
                    makeDefaultImages();
                }
            }
        });

        // Reset logic
        body.addEventListener('click', function (event) {
            if (event.target.matches('.a11yes-reset')) {
                // Font size reset
                fontSizeStepsCount = 0;
                all.forEach((item, index) => {
                    item.style.fontSize = `${defaultFontSize[index]}px`;
                });
                localStorage.setItem('fontSizeStepsCount', 0);

                // Letter spacing reset
                letterSpacingStepsCount = 0;
                all.forEach((item, index) => {
                    item.style.letterSpacing = `${defaultLetterSpacing[index]}px`;
                });
                localStorage.setItem('letterSpacingStepsCount', 0);

                // Font style reset
                customFontStyle.innerHTML = '';
                document.querySelectorAll('.a11yes-font-name').forEach(element => {
                    element.checked = false;
                });
                localStorage.setItem('fontStyle', false);

                // Filter reset
                normalizeFilter();
                document.querySelector('.a11yes-filter-normal').checked = true;

                // Cursor reset
                bigCursor = false;
                makeDefaultCursor();
                localStorage.setItem('bigCursor', false);

                // Highlight reset
                highlight = false;
                removeHighlight();
                localStorage.setItem('highlight', false);

                // Images reset
                hideImages = false;
                makeDefaultImages();
                localStorage.setItem('hideImages', false);
            }
        });
    }
}

export { a11YesInit };
