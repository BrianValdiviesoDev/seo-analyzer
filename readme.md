<div align="center">

<h1>SEO Analyzer 🔍</h1>
</div>

This web project allows you to insert a URL and perform web scraping followed by basic SEO analysis. The application consists of two main parts: the frontend built in ReactJS and the API developed in NodeJS with ExpressJS.

## Folder Structure

- `api/`: contains API code.
- `front/`: contains the front code.

## Installation and Setup

Below are the steps to run this project in your local environment:

### Frontend (ReactJS)

1. Open a terminal in the `front/` folder.

2. Install the dependencies using npm or yarn:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npm run start
   ```

#### Environment variables

**VITE_API_URL**: url to api project, normally http://localhost:3001

### API (ExpressJS)

1. Open a terminal in the `api/` folder.

2. Install the dependencies using npm or yarn:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npm run start
   ```

#### Environment variables

**GOOGLE_API_KEY**: your google API key for use Page Speed Insights

(optional) **PORT**: port to listen. If you don't set this variables, by default Express uses port 3000.

## Usage

Once the application and API are up and running, you can access the frontend interface in your web browser.

Insert a URL you want to analyze and wait for the results.
