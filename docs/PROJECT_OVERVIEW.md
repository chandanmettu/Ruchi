# Ruchi: project overview

## Brief overview

At IIT Hyderabad, mess information is often shared through notices and messages, so students may have to search for the day's menu, timings, and paid extras before deciding what to eat. Ruchi brings the next seven days of meals, service hours, dish filters, illustrative food images, and extras prices into one mobile-friendly dining companion. Its distinctive feature is **My Plate**: students can log the dishes and portions they actually eat, see editable estimates of calories, protein, carbohydrates, and fat, and follow a personal food-logging streak. This connects menu discovery with a simple reflection on eating habits and can help students plan meals with more confidence and awareness. The nutrition figures are rough estimates for typical cooked servings, not measured mess food or medical advice, and the streak reflects self-reported entries rather than verified attendance.

## Technology stack

| Layer | Technology | Role |
| --- | --- | --- |
| Interface | HTML5, CSS3, vanilla JavaScript | Responsive menu, filters, search, dish details, My Plate, and reports |
| Data | Local JSON files | Menu rotation, paid extras, notices, and typical-serving nutrition presets |
| Personal storage | Browser `localStorage` | Saved dishes, My Plate entries, and food-log streak |
| Report drafts | Browser IndexedDB | Draft text and attached images until the student chooses to export an email draft |
| Delivery | Static hosting with HTTPS | Serves the site directly without account creation or a server runtime |
| Verification | Node.js built-in test runner | Checks menu data, photo mappings, nutrition coverage, and streak behavior |

Ruchi does not currently use React, FastAPI, PostgreSQL, a backend API, or a live generative AI service. Its nutrition presets are a curated reference table. An AI-assisted estimate would need recipe and serving data, safeguards for uncertainty, and clear consent before it could be presented as a real feature.

## Demonstration flow

1. Choose a date and meal; show the service hours and regular dishes.
2. Filter dishes, open a food card, and switch to paid extras to show a price.
3. Turn on Plate mode and add a dish, then change its portion. Open My Plate to show the nutrition totals and self-reported logging streak.
4. Open a dish again to show that the per-portion values can be edited. Point out that images and nutrition are illustrative.
5. Show the report draft and explain that it is saved in the browser until the student exports an email draft.

## Scope and limits

The bundled menu is an example weekly rotation based on mess notices, not a live feed. Students should confirm current dishes, prices, and service changes at the counter. Food photos are illustrative; [photo credits](../menu-photo-credits.html) identify their sources. Nutrition methods and sources are in [the estimate notes](NUTRITION_ESTIMATES.md). The site has no verified attendance tracking or medically validated diet assessment. Personal entries remain in the student's browser and are not synced across devices.
