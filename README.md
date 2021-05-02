# friendbot
The Discord bot that connects people to foster friendships

![thumbnail](https://user-images.githubusercontent.com/9388431/116831458-5e2cb680-ab64-11eb-8ee1-baba8b9afccc.png)



## Background 
As the COVID-19 pandemic brought the world to a standstill and severely limited in-person social events and human interactions, online spaces filled in this void and became the primary places for people to engage in social life and meet others and make connections. Discord, a platform that was once primarily for gamers, became one of the fastest growing spaces where people from any background and interest could chat, have a voice call, and stream movies or video games. However, Discord still was unable to recreate the feeling of spontaneity that is brought by meeting someone entirely new in-person.

That is why we created **friendbot**, the Discord bot that allows users to randomly pair with each other and start a conversation based on an icebreaker, creating the foundation for further interactions and possibly developing a friendship.

## Step-by-Step
1. Go to thefriendbot.github.io to invite the bot to your server.
2. To begin a pairing session, type the command `/friend init` into the chat.
3. React to the bot's message with the 👋 emote.
4. After everyone who is interested in the matching session has reacted, type the command `/friend pair` to create new channels where the randomly generated pairs will begin their conversations!
5. **friendbot** will start off with a random icebreaker question in each channel to help initially guide the conversation.
6. After a sufficient amount of time, the matching session can be stopped and all the friend channels deleted with the command `/friend stop`.


## How we built it

#### Tech Stack
* TypeScript
* Discord.js
* discord.ts
* Firebase

The main pillars of this application are TypeScript, Discord.js, and discord.ts. TypeScript was the language of our choice for this project because of its statically-typed nature as well as toolkits available for things like making a Discord bot. 

To interact with the Discord API, we used the well-known package Discord.js along with a lesser-well-known TypeScript Discord wrapper called discord.ts that facilitates the creation of common Discord paradigms such as commands, events, and messages.  

#### Design
We started out with a UX design session, where we all brainstormed for a few hours about how our app should interact with users and what types of flows a user should go through to reach all interactions within the product. 

Next up, we did a quick database and service design session to figure out how we would efficiently store users, friend sessions, matches, and other models of data in a NoSQL environment.

#### Engineering
Then came the engineering portion, where we implemented our specifications across all the required services, clients, and repositories, refactoring lots of code along the way to ensure a clean and tidy codebase structure was kept. The engineering process was nicely coupled with user testing, where we tested many flows of our application manually to see how the bot was responding in each case.


## Challenges we ran into
One challenge we ran into was the realization that group DMs' creation is not supported with Discord.js or discord.ts. As a result of this, we had to pivot our application and make private discord channels to pair users
instead. We also found it challenging to separate the bot from the conversation; essentially, ensuring
that the bot would only start conversations between users and not parttake in them. We wanted to ensure
that the user experience was based around interacting with other users and that the bot only kickstarted the process. 

## Accomplishments that we're proud of
We were very proud of creating a functioning discord bot at this level in the short duration of a hackathon. 
As several of our team members were relatively new to the Discord API and using TypeScript, we were very 
satisfied with creating a successful bot that allows users to find a match and meet new people, something that
is very important in the COVID-19 pandemic. 


## What we learned
Several of our team members hadn't created a project of this scale using Discord's API before, so we
learned much about how to utilize this API in conjunction with TypeScript. We also learned how to create
mock data through a seeding function in order to mimic a production environment and test our code effectively.


## What's next for friendbot
We have a number of ideas for how to expand friendbot in the future. Some of these features include
creating groups of different sizes (rather than just pairs), expanding the icebreaker challenges to more
categories, creating pairs based on personality tests (rather than random pairs), and much more! 
