# Zed Champions Horse Coat Color Tooltip

## Overview
This lightweight and easy to use [Tampermonkey](https://www.tampermonkey.net/) userscript enhances the [Zed Champions](https://app.zedchampions.com/) platform by adding a detailed tooltip to horse images across various pages. When you hover over a horse card, the tooltip displays the horse's **color name**, **rarity** (with emojis for specific rarities), and **hex code**. The script works on multiple pages, such as marketplace, auctions, dashboard, stable, horse detail pages and the expanded lineage section on horse detail pages.

**If you like and use any of my scripts feel free to donate a coffee or happy meal with Zed or any ERC-20 token here:**

0xd89a431bc83DB028905DCF0d810aEe48AC418C06

Thank you!

## Features
- **Color Name Display**: Shows the horse’s color name (e.g., Sea Pink, Dodger Blue) in the tooltip.
- **Rarity with Emojis**:
  - Displays the horse’s color rarity (Common, Uncommon, Rare, Ultra Rare).
  - Emojis for special rarities: Uncommon (👍), Rare (🔥), Ultra Rare (🏆).
- **Hex Code**: Shows the color’s hex code (e.g., `#EF9A9A`) for reference.
- **Dynamic Detection**:
  - Automatically detects horse cards and images on various pages, including dynamically loaded content (e.g., when expanding the lineage section on the horse detail page).
  - Works on multiple pages, such as marketplace, auctions, dashboard, stable, horse detail pages and the expanded lineage section on horse detail pages.
- **Compact Tooltip Design**:
  - Clean, compact tooltip design.

### Screenshots
![Tooltip Preview 1](https://raw.githubusercontent.com/itsryya/zed-champions-coat-color-tooltip/main/color-tooltip-preview-1.png)  
*Tooltip showing for a horse on the marketplace.*

![Tooltip Preview 2](https://raw.githubusercontent.com/itsryya/zed-champions-coat-color-tooltip/main/color-tooltip-preview-2.png)  
*Tooltip showing for a horse image on the auction page.*

![Tooltip Preview 3](https://raw.githubusercontent.com/itsryya/zed-champions-coat-color-tooltip/main/color-tooltip-preview-3.png)  
*Tooltip showing for a horse on the stable page.*

## Installation
1. **Install Tampermonkey**:
   - Install the Tampermonkey extension for your browser:
     - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
     - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
     - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
     - [Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089)
2. **Add the Script**:
   - Click the Tampermonkey icon in your browser and select "Create a new script."
   - Copy and paste the entire script code into the editor.
   - Save the script (`Ctrl+S` or `Cmd+S`).
3. **Tampermonkey Extension**
   - Ensure that the developer mode is enabled in the Tampermonkey Extension.
   - Ensure that the script is activated in the Tampermonkey Extension.
4. **Visit Zed Champions**:
   - Go to any page on [https://app.zedchampions.com/](https://app.zedchampions.com/) (e.g., stable, marketplace, or a horse detail page).
   - The script will automatically detect horse cards and apply tooltips on hover.

## Usage Instructions
To use the script and see tooltips on horse cards, follow these steps:

1. **Hover Over Horse Cards**:
   - On any page with horse images (e.g., auction, marketplace, stable, horse detail & lineage), hover over a horse image to see the tooltip.
   - The tooltip will display the color name, rarity (with an emoji if applicable), and hex code.

2. **Verify Tooltip Content**:
   - The tooltip should show:
     - **Color Name** (e.g., "Sea Pink").
     - **Rarity** (e.g., "Uncommon 👍") with emojis for Uncommon (👍), Rare (🔥), or Ultra Rare (🏆).
     - **Hex Code** (e.g., "#EF9A9A").

## Notes
- The script uses a `MutationObserver` and a 1-second refresh interval to detect dynamically loaded horse cards (e.g., when expanding the lineage section).
- The tooltip is designed to be non-intrusive, with a semi-transparent black background, white text, and a subtle shadow for readability.
- The script works on multiple pages, but if you encounter a page where tooltips don’t appear see Troubleshooting.

## Troubleshooting
- **Tooltips Don’t Appear**:
  - Ensure you’re on a supported page ([https://app.zedchampions.com/](https://app.zedchampions.com/)) and that Tampermonkey is enabled.
  - Ensure that the developer mode is enabled in the Tampermonkey Extension.

## Version
- **2.2** (as of May 28th, 2025)
