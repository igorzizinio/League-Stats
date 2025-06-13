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

- Create a .env file at the root of the application with the following contents (note: currently League Stats store your keys in plain text, so be aware!):

```text
EXPO_PUBLIC_RIOT_API_KEY= <Place here your riot api key>
EXPO_PUBLIC_OPENROUTER_API_KEY = <Place here your openrouter api key>
```
