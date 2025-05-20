# A11yes — JavaScript Accessibility Tool

A11yes is an easily integrable open-source JavaScript tool that was developed to improve the accessibility of your website or online shop. The features it provides comply with WCAG requirements.

---

## Table of Contents

- [Installation](#installation)  
- [Usage](#usage)  
- [Initialization and Configuration](#initialization-and-configuration)  
- [Available Settings](#available-settings)  
- [CSS Customization](#css-customization)  
- [License](#license)  

---

## Installation

You can include A11yes in your project either by downloading the files manually or by installing via npm.

### 1. Manual Installation

Download the latest release and include the CSS and JS files in your project:

```html
<!-- Include A11yes CSS -->
<link rel="stylesheet" href="/your-path/libs/a11yes/a11yes.css" />


<!-- Include A11yes JavaScript -->
<script type="module" src="/your-path/libs/a11yes/a11yes.js"></script>

<!-- Include your custom JS to initialize A11yes -->
<script type="module" src="/your-path/index.js"></script>
```

### 2. Installation via npm

Install the package from npm or directly from GitHub:

```bash
npm install allyes
```

```bash
git clone https://github.com/rozumbunch/a11yes.git
```
---

## Usage

### Initialization

Import and initialize it in your JavaScript entry file:

```js
import { a11YesInit } from '/your-path/libs/a11yes/a11yes.js';
```
The`a11YesInit` function is called to activate the accessibility features:

```js
a11YesInit();
```

### Configuration

You can customize the behavior by passing an options object to `a11YesInit`:

```js
a11YesInit({
    currentLanguage: 'de',
    openButtonClassname: 'a11yes-open',

    // Font size controls
    fontSize: true,
    fontSizeStep: 2,
    fontSizeMax: 5,
    fontSizeMin: 0,

    // Letter spacing controls
    letterSpacing: true,
    letterSpacingStep: 1,
    maxLetterSpacingSteps: 5,
    minLetterSpacingSteps: 0,

    // Contrast settings
    contrast: true,
    highLightColor: 'red',

    // Fonts options
    fonts: {
        'Arial': 'Arial, sans-serif',
        'Times New Roman': 'Times New Roman, serif',
    },

    // Enable other accessibility functions
    otherFunctions: true,

    // Links shown in the popup (array of [label, URL, target])
    links: [
        ['Learn more about Accessibility', 'https://www.a11yes.com/', '_blank'],
        ['Simple Language', 'https://www.a11yes.com/', '_blank']
    ],

    // Show icons in the popup
    icons: true,

    // Path to your translations file
    translations: "./path-to-your-translations.json"
});
```

---

## CSS Customization

A11yes uses CSS variables for easy theming. You can override these variables in your own CSS to customize colors and styles:

```css
:root {
    --a11yes-main-color: white;
    --a11yes-secondary-color: black;
    --a11yes-hover-color: #ccc;
    --a11yes-active-color: #bbb;
    --a11yes-window-bg: white;
}
```

Example of custom theme:

```css
:root {
    --a11yes-main-color: #e60000;
    --a11yes-secondary-color: #0044cc;
    --a11yes-hover-color: #ffcccc;
    --a11yes-active-color: #cc0000;
    --a11yes-window-bg: #f0f0f0;
}
```

---

## License

This project is licensed under the MIT License.

---

If you have any questions or want to contribute, feel free to open an issue or submit a pull request on [GitHub](https://github.com/rozumbunch/a11yes).

