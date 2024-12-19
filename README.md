![hero](Github.png)

<p align="center">
	<h1 align="center"><b>Omniplex</b></h1>
<p align="center">
    Open-Source Perplexity
    <br />
    <br />
    <a href="https://omniplex.ai">Website</a>
    ·
    <a href="https://discord.gg/87Mh7q5ZSd">Discord</a>
    ·
    <a href="https://www.reddit.com/r/omniplex_ai">Reddit</a>
  </p>
</p>

## Get started

To run the project, modify the code in the Chat component to use the `// Development Code`.

1. Fork & Clone the repository

```bash
git clone git@github.com:[YOUR_GITHUB_ACCOUNT]/omniplex.git
```

2. Install the dependencies

```bash
yarn
```

3. Fill out secrets in `.env.local`

```bash
BING_API_KEY=
OPENAI_API_KEY=

OPENWEATHERMAP_API_KEY=
ALPHA_VANTAGE_API_KEY=
FINNHUB_API_KEY=
```

4. Run the development server

```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Task Done
1.  UI Enhancement: The login page UI of the Omniplex project matches Claude.ai's interface design. Focus on simplicity, responsiveness, and user-friendly aesthetics
2.  API Integration: The OpenWeatherMap API to fetch real-time weather data.
   - Fetches real-time weather data based on city names.
   - Displays:
	- Current temperature, weather conditions, and description.
	- Hourly forecast (next 5 hours).
	- High and low temperatures for the day.
3.  Deployment: App is Deployed using Vercel
4.  Use of AI Tools: For solving errors and debugging
