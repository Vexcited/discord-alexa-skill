# Summer 2021 - Replit Hackathon / Alexa skills

## Discord - Alexa skill.

Send instructions to your Discord account with this skill.

We use the Discord API to perform the requests.

Some features as "send message to"
may not be always working.
Why ? Users can have very hard to speak and
understand name, so Alexa may not
find them.
Even though I made a normalizer to
make people with username like this
"𝚝 𝚜 𝚞༉" recognisable
(eg.: (previous example) => tsu).

## Why Discord

I don't know, maybe because I'm a super creative guy, full of ideas who is doing original things. (..- no)

## Usage



## Installation

You can follow [this tutorial/template from Replit](https://blog.replit.com/replexa), and replace their repository by mine.
There's no need for SKILL_ID, just point the skill endpoint
to your repl URL and done.

To install, clone, run `yarn` to install depedencies
and then `yarn start` to run the webserver.

You can run `yarn start:watch` to use nodemon.

## Structure of `/src`
 - `handlers` => where we have every handlers for intents.
 - `public` => where we store static files for the website.
 - `index.js` => main code where we start webserver.