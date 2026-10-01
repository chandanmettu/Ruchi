# Ruchi

Ruchi is a dining menu companion for IIT Hyderabad. Browse the next seven days of meals, check service hours, filter dishes, and see the prices of paid extras.

This is a standalone menu edition adapted from the earlier Ruchi app. It is intended to deploy independently on its own domain. The included campus menu data is an example, not an official source of current dishes or prices.

## Run locally

From this folder, run:

```sh
python3 -m http.server 8012
```

Open <http://localhost:8012>. No account, package installation, build step, or backend is needed.

## Deploy

Publish the contents of this repository as a static site, with `index.html` at the web root. Use HTTPS. Add the new domain's canonical URL to both entry pages once the domain is chosen, then verify the menu, Extras, images, and credits on the actual domain. This repository does not deploy the separate Ruchi site at `ruchi.iith.online`.

## What it does

- Shows regular dishes and separately priced extras for each meal.
- Displays the next seven days using a repeating menu rotation.
- Supports card and list views, dietary filters, and saved dishes.
- Stores My Plate entries and report drafts only in your browser.
- Generates a report email draft for review; it never sends one automatically.

The included menu is a source-backed example, not a live feed. Photos are illustrative and may depict a dish family rather than the exact serving. Nutrition values remain blank unless the user enters them.

## Project layout

| Path | Purpose |
| --- | --- |
| `index.html` | App entry point |
| `assets/js/` | Menu, schedule, saved dishes, plate, and report behaviour |
| `assets/data/` | Example menu, extras, and notices |
| `assets/css/` | App styles |
| `assets/images/` | Illustrative food images and their source records |
| `menu-photo-credits.html` | Photo attribution and usage notes |
| `tests/` | Menu data checks |

Run the menu checks with `node --test tests/menu-catalog.test.js` if Node.js is installed.

## Credits and use

Photo sources and their individual licenses are listed in [photo credits](menu-photo-credits.html) and the source records under `assets/images/`. The Outfit font license is in `assets/fonts/OFL-Outfit.txt`, and icon credits are in `assets/icons/LICENSE`. No blanket license for the app source is granted by this repository.
