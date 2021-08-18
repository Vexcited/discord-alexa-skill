# Summer 2021 - Replit Hackathon / Alexa skill

## Unofficial Discord API - Alexa Skill

Send instructions to your Discord account with this skill.

### Why Discord ?

I don't know, maybe because I'm a
super creative guy, full of ideas who is
doing original things. (..- no) ~

## Intents

- [x] `GetLastMention`: Tells who mentionned you the last time.
- [x] `LastMentionMarkAsRead`: Mark as read the latest mention you've got.

## Installation

Clone, run `yarn` to install depedencies
and then `yarn start` to run the webserver.

You can run `yarn start:watch` to use nodemon.

You can follow [this tutorial/template from Replit](https://blog.replit.com/replexa)
to create your Alexa skill, and replace their repository by mine.
Copy `.env.sample` to `.env`, adjust it,
point the skill endpoint to your repl URL,
import intents and enjoy.

This skill **supports French and English**.
To import them, go to Assets -> JSON Editor in Alexa,
go to the `/AlexaSkillIntents` folder, and import
the JSON file that you want to Alexa.

## Aliases

An alias system is provided to make people/channel/guild names more easier to say.

**When you need to DM someone, or get a channel, you'll need to call it by the
alias name that you given to it.**

### How

Copy `/aliases.sample.json` to `/aliases.json` and edit it.

### Structure

It contains three parts: `"channels", "guilds", "users"`.

In these parts you can give to a _thing_, an alias like this `"AliasName": "ThingId"`.

### Example

_You want to get access to your server, a text channel, and a private DM with a friend._

```json
{
  "guilds": {
    "my server": "767772344428265482"
  },
  "channels": {
    "my server global channel": "837076888744755321"
  },
  "users": {
    "my friend": "590848440922144788"
  }
}
```

## Skill Invocation / Commands

### English

Invocation name: `unofficial discord a. p. i.`. \
So, you would say `Alexa, open unofficial discord`.

### French

Invocation name: `a. p. i. discord non officielle` \
So, you would say `Alexa, ouvre discord non officiel`.
