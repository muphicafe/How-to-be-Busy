# How To Be Busy

A simple app that answers: **"I have free time. What should I do?"**
Pick your time and mood, and get one useful idea. Mark it done and build a streak.

Free. Works offline. Plain English. Works on any phone as a PWA.

## Run locally
```
python3 -m http.server 8000
```
Open http://localhost:8000

## Publish free on GitHub Pages
1. Upload these files to your repository.
2. Go to **Settings > Pages**.
3. Under **Branch**, choose `main` and `/ (root)`, then Save.
4. Open the link GitHub gives you. On your phone, use **Add to Home Screen**.

## Add activities
Edit `activities.json`. Each item looks like:
```json
{"title": "Walk for 15 minutes", "duration": 15, "mood": ["energetic"],
 "place": "outside", "needs": "nothing", "icon": "🚶", "cost": "free"}
```
Moods: `tired`, `energetic`, `creative`, `social`.
Keep titles short and in simple English.

## Roadmap
- Hindi, Telugu and more languages
- Filters for place and cost
- Weekly summary
- Community ideas

## License
MIT
