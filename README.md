# Birthday Countdown

A tiny static website for a birthday countdown.

## How it works

- `index.html` is the home page.
- `days.json` is the only file you need to edit to add/remove countdown days.
- `day.html?id=1` loads the HTML file associated with day 1.
- Every file in `days/` is independent and can have its own CSS and JavaScript.
- Files in `assets/` can contain photos, videos, audio, etc.

## Adding a new day

1. Create `days/day-03.html`.
2. Put your memory inside it.
3. Add this object to `days.json`:

```json
{
  "id": 3,
  "html": "days/day-03.html"
}
```

4. Commit/push the changes.

The QR code for day 3 should point to:

`https://YOUR-DOMAIN/day.html?id=3`

## Important

Don't open the site by double-clicking `index.html` from your computer.
The browser may block `fetch()` for `days.json` when using `file://`.
Use a local server or the deployed site.

## Suggested folder structure

birthday-countdown/
├── index.html
├── day.html
├── app.js
├── day.js
├── styles.css
├── days.json
├── days/
│   ├── day-01.html
│   ├── day-02.html
│   └── ...
└── assets/
    ├── day-01.jpg
    ├── day-01.mp3
    └── ...
