# Lotus Menu

A lotus flower that functions as an interactive radial navigation menu that expands as the user hovers their mouse from one flower petal to another. It is built with CSS, JavaScript and Jquery.

**You are most welcome to use this code in your commercial projects, all that I ask in return is that you credit my work by providing a link back to this repository. Thank you & Enjoy!**

## Demo

[Watch the video](readme_assets/demo.mp4)

![Lotus Menu Demo](readme_assets/demo.png)

## ✨ Features

- **Pure CSS/JavaScript** - No external framework dependencies
- **Responsive Design** - Optimized for desktop viewing
- **Smooth Animations** - CSS transitions for seamless interactions
- **Multi-level Navigation** - Support for nested menu structures up to 4 levels deep
- **Hover & Click Effects** - Dual-state visual feedback
- **Customizable Colors** - Easy color scheme modifications

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/dannyblaker/lotus-menu.git
cd lotus-menu
```

2. Open `menu.html` in your web browser

3. Explore the interactive lotus menu!

## 🎨 Customization

### Adding New Petals

1. **HTML Structure**: Follow the petal naming pattern:
```html
<li class="petal petal-{name}" data-color="text-{color}">
  <a href="#" class="leaf leaf-{id}" data-title="{title}">
    <img src="img/original-petal.png" class="default-leaf">
    <img src="img/{color}.png" class="hover-leaf">
  </a>
  <ul class="sub-menu"><!-- nested items --></ul>
</li>
```

2. **CSS Positioning**: Add positioning rules in `menu.css`:
```css
.menu .petal.petal-{name} {
    left: {percentage}%;
    transform: translateX(-{percentage}%);
    top: {pixels}px;
}
.menu .petal.petal-{name} .leaf-{id} {
    transform: rotate({degrees}deg);
}
```

3. **Color Variants**: Create matching color images and CSS classes

### Menu Levels
- **Level 1**: `data-title` - Main menu items
- **Level 2**: `data-subtitle` - Secondary navigation
- **Level 3**: `data-subtext` - Tertiary options
- **Level 4**: `data-paratext` - Final level items

## 🛠️ Development

The menu uses a hierarchical naming system:
- **Main petals**: `leaf-1`, `leaf-2`, etc.
- **Sub-items**: `leaf-1-1`, `leaf-2-3`, etc.
- **Deep nesting**: `leaf-4-1-3-2` (petal 4, sub 1, sub 3, item 2)

### Key Components

- **jQuery 3.3.1** for DOM manipulation
- **CSS transforms** for petal positioning and rotation
- **Absolute positioning** for radial layout
- **Opacity/visibility** transitions for smooth menu reveals

## 🎯 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Optimized for desktop viewing (1320px+ width)