# PC2 Scoreboard

This project is a real-time scoreboard application for programming contests, built using Vue.js. It fetches data from a PC2 server to display contest details and team scores.

## Project Structure

```
pc2-scoreboard
├── src
│   ├── components
│   │   └── Scoreboard.vue       # Vue component for displaying the scoreboard
│   ├── services
│   │   └── pc2Api.js            # API service for interacting with the PC2 server
│   ├── App.vue                   # Root component of the application
│   └── main.js                   # Entry point of the application
├── public
│   └── index.html                # Main HTML file for the application
├── package.json                  # Configuration file for npm
├── README.md                     # Documentation for the project
└── vite.config.js                # Configuration file for Vite
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd pc2-scoreboard
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` (or the port specified in your terminal) to view the application.

## Usage

The application will automatically fetch and display real-time data from the PC2 server. The scoreboard will show the contest name, team rankings, problems solved, penalties, and the status of each problem for every team.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.