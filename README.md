# League Stats

League Stats is a mobile application about League of Legends


## Features:

 - Weekly champions
 - Match history
 - Profile page (level, ranking and mastery)
 - Coach by AI


## Requirements

- A riot application at <https://developer.riotgames.com> (or use a development api key)
- [Node.js](https://nodejs.org) (23 recommended)
- [Expo](https://expo.dev/) (>= 53)
- Yarn (recommended)
- [League-Stats API](https://github.com/igorzizinio/league-stats-api) instance running

## Running yourself

- Clone and install the dependencies

```sh
# Clone this repository
$ git clone https://github.com/igorzizinio/League-Stats.git

# Access the project directory
$ cd League-Stats

# Install dependencies
$ yarn install

# Run the application locally
$ yarn start
```

- Create a .env file at the root of the application with the following contents:

```text
EXPO_PUBLIC_LEAGUE_STATS_API_URL= <Place here your API URL for league-stats-api>
```
