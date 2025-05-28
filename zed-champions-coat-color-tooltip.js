// ==UserScript==
// @name         Zed Champions Horse Coat Color Tooltip
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Shows a detailed tooltip with the horse's color name, rarity, and hex code on hover over the horse card on all app.zedchampions.com pages
// @match        https://app.zedchampions.com/*
// @author       Ryya
// ==/UserScript==

(function () {
    'use strict';

    const colors = {
        '#ef9a9a': 'Sea Pink',
        '#e57373': 'Sunglo',
        '#ef5350': 'Burnt Sienna',
        '#f44336': 'Pomegranate',
        '#e53935': 'Cinnabar',
        '#d32f2f': 'Alizarin Crimson',
        '#f48fb1': 'Mauvelous',
        '#f06292': 'Froly',
        '#ec407a': 'French Rose',
        '#e91e63': 'Amaranth',
        '#d81b60': 'Maroon Flush',
        '#c2185b': 'Jazzberry Jam',
        '#ff1744': 'Torch Red',
        '#f50057': 'Razzmatazz',
        '#d50000': 'Guardsman Red',
        '#000000': 'Black',
        '#81d4fa': 'Malibu',
        '#4fc3f7': 'Jordy Blue',
        '#29b6f6': 'Dodger Blue',
        '#03a9f4': 'Cerulean',
        '#039be5': 'Curious Blue',
        '#0288d1': 'Lochmara',
        '#80deea': 'Spray',
        '#4dd0e1': 'Turquoise Blue',
        '#26c6da': 'Scooter',
        '#00bcd4': "Robin’s Egg Blue",
        '#00acc1': 'Pacific Blue',
        '#0097a7': 'Bondi Blue',
        '#18ffff': 'Aqua',
        '#00e5ff': 'Cyan',
        '#2962ff': 'Wild Blue Yonder',
        '#757575': 'Boulder',
        '#ce93d8': 'Light Wisteria',
        '#ba68c8': 'Amethyst',
        '#ab47bc': 'Mamba',
        '#9c27b0': 'Seance',
        '#8e24aa': 'Purple Heart',
        '#7b1fa2': 'Eminence',
        '#b39ddb': 'Lavender',
        '#9575cd': 'Lilac Bush',
        '#7e57c2': 'Fuchsia',
        '#673ab7': 'Mischka',
        '#5e35b1': 'Manatee',
        '#512da8': 'Daisy Bush',
        '#e040fb': 'Heliotrope',
        '#7c4dff': 'Prelude',
        '#aa00ff': 'Electric Violet',
        '#ffffff': 'White',
        '#fffde7': 'Picasso',
        '#fff9c4': 'Paris Daisy',
        '#fff176': 'Gorse',
        '#fdd835': 'Astra',
        '#fbc02d': 'Bright Sun',
        '#f9a825': 'Lightning Yellow',
        '#e6ee9c': 'Primrose',
        '#dce775': 'Manz',
        '#d4e157': 'Wattle',
        '#cddc39': 'Pear',
        '#c0ca33': 'Earls',
        '#afb42b': 'Ginger',
        '#c6ff00': 'Electric Lime',
        '#ffff00': 'Shalimar',
        '#ffd600': 'Golf',
        '#bdbdbd': 'Silver'
    };

    const colorToRarityMap = {
        '#ef9a9a': 'Common',
        '#e57373': 'Common',
        '#ef5350': 'Common',
        '#f44336': 'Common',
        '#e53935': 'Common',
        '#d32f2f': 'Common',
        '#f48fb1': 'Common',
        '#f06292': 'Common',
        '#ec407a': 'Common',
        '#e91e63': 'Common',
        '#d81b60': 'Common',
        '#c2185b': 'Common',
        '#ff1744': 'Uncommon',
        '#f50057': 'Uncommon',
        '#d50000': 'Rare',
        '#000000': 'Ultra Rare',
        '#81d4fa': 'Common',
        '#4fc3f7': 'Common',
        '#29b6f6': 'Common',
        '#03a9f4': 'Common',
        '#039be5': 'Common',
        '#0288d1': 'Common',
        '#80deea': 'Common',
        '#4dd0e1': 'Common',
        '#26c6da': 'Common',
        '#00bcd4': 'Common',
        '#00acc1': 'Common',
        '#0097a7': 'Common',
        '#18ffff': 'Uncommon',
        '#00e5ff': 'Uncommon',
        '#2962ff': 'Rare',
        '#757575': 'Ultra Rare',
        '#ce93d8': 'Common',
        '#ba68c8': 'Common',
        '#ab47bc': 'Common',
        '#9c27b0': 'Common',
        '#8e24aa': 'Common',
        '#7b1fa2': 'Common',
        '#b39ddb': 'Common',
        '#9575cd': 'Common',
        '#7e57c2': 'Common',
        '#673ab7': 'Common',
        '#5e35b1': 'Common',
        '#512da8': 'Common',
        '#e040fb': 'Uncommon',
        '#7c4dff': 'Uncommon',
        '#aa00ff': 'Rare',
        '#ffffff': 'Ultra Rare',
        '#fffde7': 'Common',
        '#fff9c4': 'Common',
        '#fff176': 'Common',
        '#fdd835': 'Common',
        '#fbc02d': 'Common',
        '#f9a825': 'Common',
        '#e6ee9c': 'Common',
        '#dce775': 'Common',
        '#d4e157': 'Common',
        '#cddc39': 'Common',
        '#c0ca33': 'Common',
        '#afb42b': 'Common',
        '#c6ff00': 'Uncommon',
        '#ffff00': 'Uncommon',
        '#ffd600': 'Rare',
        '#bdbdbd': 'Ultra Rare'
    };

    const $ = (s, p = document) => p.querySelector(s);
    const $$ = (s, p = document) => [...p.querySelectorAll(s)];

    function getColor(card) {
        const colorLayerSelectors = [
            'div.css-0[style*="background-color"]',
            'div[style*="background-color"]',
            'div[class*="color-overlay"]'
        ];

        let colorLayer = null;
        for (const selector of colorLayerSelectors) {
            colorLayer = card.querySelector(selector);
            if (colorLayer) break;
        }

        if (!colorLayer) {
            console.log('Color overlay not found in card:', card);
            return null;
        }

        const bg = colorLayer.style.backgroundColor;
        if (!bg) {
            console.log('No background color found in element:', colorLayer);
            return null;
        }

        let rgbMatch = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/) || bg.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
        if (!rgbMatch) {
            console.log('Could not parse RGB color from:', bg);
            return null;
        }

        const [_, r, g, b] = rgbMatch.map(Number);
        const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
        console.log('Extracted color:', hex);
        return hex.toLowerCase();
    }

    function getColorDetails(card, hexColor) {
        let rarity = colorToRarityMap[hexColor] || 'Unknown';
        let emoji = '';
        if (rarity === 'Uncommon') {
            emoji = ' 👍';
        } else if (rarity === 'Rare') {
            emoji = ' 🔥';
        } else if (rarity === 'Ultra Rare') {
            emoji = ' 🏆';
        }
        if (rarity === 'Unknown') {
            console.log(`No rarity found for color ${hexColor}. Available colors:`, Object.keys(colorToRarityMap));
        } else {
            console.log(`Rarity for ${hexColor}: ${rarity}${emoji}`);
        }
        return { rarity, emoji };
    }

    const style = `
    .zed-color-tooltip {
        position: fixed;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 10px;
        border-radius: 6px;
        font-family: Arial, sans-serif;
        font-size: 12px;
        z-index: 1000000;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        transition: opacity 0.2s ease;
        opacity: 1;
        line-height: 1.2;
    }
    .zed-color-tooltip.hidden {
        opacity: 0;
    }
    .zed-color-tooltip .color-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 0;
    }
    .zed-color-tooltip .rarity {
        margin-bottom: 0;
    }
    .zed-color-tooltip .rarity-text {
        font-size: 14px;
        font-style: italic;
    }
    .zed-color-tooltip .hex-code {
        font-size: 9px;
        margin-bottom: 0;
    }
    `;

    function showTooltip(event, card, colorName, hexColor) {
        let tooltip = document.querySelector('.zed-color-tooltip');
        if (tooltip) {
            tooltip.classList.add('hidden');
            tooltip.remove();
        }

        const { rarity, emoji } = getColorDetails(card, hexColor);

        const tooltipContent = `
            <div class="color-name">${colorName}</div>
            <div class="rarity"><span class="rarity-text">${rarity}</span>${emoji}</div>
            <div class="hex-code">${hexColor.toUpperCase()}</div>
        `;

        tooltip = document.createElement('div');
        tooltip.className = 'zed-color-tooltip';
        tooltip.innerHTML = tooltipContent.trim();
        document.body.appendChild(tooltip);

        const offsetX = 15;
        const offsetY = 15;
        const tooltipRect = tooltip.getBoundingClientRect();
        tooltip.style.left = `${Math.min(event.clientX + offsetX, window.innerWidth - tooltipRect.width - 5)}px`;
        tooltip.style.top = `${Math.min(event.clientY + offsetY, window.innerHeight - tooltipRect.height - 5)}px`;

        console.log('Tooltip created with content:', tooltipContent);
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.zed-color-tooltip');
        if (tooltip) {
            tooltip.classList.add('hidden');
            console.log('Hiding tooltip');
            setTimeout(() => tooltip.remove(), 200);
        }
    }

    function addTooltipListeners() {
        const selectors = [
            'div.css-veaapn',
            'div.css-frxn0e',
            'div.css-129clv6',
            'div.css-evkejy',
            'div.css-6j3bs0',
            'div.css-1y4ec7n',
            'div.css-174am27',
            'div.css-vgndvv',
            'div[bloodline]',
            'div[class*="horse"]',
            'div[class*="card"]',
            // Added selectors for lineage section (to be refined with screenshot)
            'div[class*="lineage"] div[class*="horse"]',
            'div[class*="lineage"] div[class*="card"]',
            'div[class*="lineage"] div[data-id]',
            'div[class*="lineage"] div[style*="background-color"]'
        ];

        let allCards = new Set();
        for (const selector of selectors) {
            const cards = $$(selector);
            cards.forEach(card => allCards.add(card));
        }

        console.log(`Found ${allCards.size} unique horse cards across all selectors.`);

        if (allCards.size === 0) {
            console.log('No horse cards found. Page structure may have changed.');
            return;
        }

        allCards.forEach((card, index) => {
            if (card.dataset.tooltipProcessed) {
                console.log(`Card ${index}: Already processed, skipping`);
                return;
            }
            card.dataset.tooltipProcessed = 'true';

            const hexColor = getColor(card);
            const colorName = hexColor && colors[hexColor] ? colors[hexColor] : 'Unknown Color';
            console.log(`Card ${index}: Color - ${hexColor} (${colorName})`);

            if (!hexColor) {
                console.log(`Card ${index}: Skipping due to missing color`);
                return;
            }

            const hoverElement = card;
            if (!hoverElement) {
                console.log(`Card ${index}: No hoverable element found`);
                return;
            }

            hoverElement.style.pointerEvents = 'auto';
            const images = hoverElement.querySelectorAll('img');
            images.forEach(img => {
                img.style.pointerEvents = 'auto';
            });

            hoverElement.removeEventListener('mouseover', showTooltip);
            hoverElement.removeEventListener('mouseout', hideTooltip);

            hoverElement.addEventListener('mouseover', (event) => {
                console.log(`Mouseover on card ${index}`);
                showTooltip(event, card, colorName, hexColor);
            });
            hoverElement.addEventListener('mouseout', () => {
                console.log(`Mouseout on card ${index}`);
                hideTooltip();
            });
        });
    }

    function init() {
        console.log('Initializing Zed Champions Horse Color Tooltip script v2.2...');
        console.log('Current URL:', window.location.href);
        console.log('Date and Time:', new Date().toLocaleString());

        document.head.insertAdjacentHTML('beforeend', `<style>${style}</style>`);

        addTooltipListeners();

        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === 1 && (
                            node.matches('div.css-veaapn') ||
                            node.matches('div.css-frxn0e') ||
                            node.matches('div.css-129clv6') ||
                            node.matches('div.css-evkejy') ||
                            node.matches('div.css-6j3bs0') ||
                            node.matches('div.css-1y4ec7n') ||
                            node.matches('div[bloodline]') ||
                            node.matches('div[class*="horse"]') ||
                            node.matches('div[class*="card"]') ||
                            node.matches('div[class*="lineage"]') || // Added for lineage section
                            node.querySelector('div.css-0') ||
                            node.querySelector('div[class*="lineage"]') ||
                            node.querySelector('div[class*="horse"]') ||
                            node.querySelector('div[class*="card"]')
                        )) {
                            shouldUpdate = true;
                            break;
                        }
                    }
                }
                if (shouldUpdate) break;
            }
            if (shouldUpdate) {
                console.log('DOM change detected, reapplying tooltip listeners...');
                addTooltipListeners();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        setInterval(() => {
            console.log('Periodic check for new horse cards...');
            addTooltipListeners();
        }, 1000); // Reduced to 1 second for faster detection
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.debugZedTooltip = () => {
        console.log('Manually triggering tooltip setup...');
        addTooltipListeners();
    };
})();