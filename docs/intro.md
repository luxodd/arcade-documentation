---
sidebar_position: 1
---

# Onboard your Game

Welcome developers to Luxodd! We're thrilled you're considering bringing your creative vision to our unique arcade platform. Our goal is to forge a strong partnership, offering players engaging experiences centered around skill and our innovative "strategic betting" system – where players wager on their own abilities, not just chance. This guide outlines the journey your game will take from your development environment to being playable on Luxodd arcade cabinets across various locations.

## Your Game's Path to Production

Getting your game onto the Luxodd platform involves a clear, structured process designed for quality and smooth integration. Below, we detail the steps involved, from initial signup to seeing your game live on merchant arcades.

:::info
_An infographic visually representing the steps below will be displayed here. It will provide a quick, at-a-glance overview of the developer onboarding journey._
:::


### Phase 1: How to onboard a game dev to Luxodd

:::note
Below steps can be skipped if you already have access to Luxodd Game Dev Portal.
:::

1. Fill out our [form](https://forms.gle/ixqvtC9uKjJUNL5k8)
2. We will verify your account.
3. If accepted you will receive an email with your login information to the [Luxodd Admin Portal](https://admin.luxodd.com)  
   - You'll also be issued an account (if not already made) to our [Luxodd Game Server](https://app.luxodd.com/registration?redirect=/home)
4. Log in to our [Luxodd Admin Portal](https://admin.luxodd.com)
6. Click the Games drop down from the menu, then click `New`
7. Fill in the minimum information: game name, game description (these can be changed later) and click `save`
8. As soon as the game is uploaded, its status will automatically move to _Draft_ state
9. **Get your Developer API token** - You game will then appear in the `Games`/`List` menu. Click `Create Developer Token`. A new token will then be generated for this game, and be downloaded to your device.


### Phase 2: Game Integration and Testing

1. Download the [Luxodd Arcade Unity Plugin](link to github.com/luxodd/unity-plugin)
2. Integrate the API into your game (see [Arcade Launch Overview](/docs/arcade-launch/unity-plugin/overview) for detailed integration steps)

### Phase 3: How to add games to Luxodd

1. Log in to our [Luxodd Admin Portal](https://admin.luxodd.com)
2. Click the Games drop down from the menu, then click `List`
3. Click to `edit` your game
4. Fill in the rest of the missing game information **Image URL, Game File, Video ID, Price, Status** and **Mission**
5. Developer ensures the following [checks](link to checks)
6. Once checks have been passed, the developer can toggle their game to the _Review_ state
7. Luxodd reviews the game. If approved then the status changed to _Approved_ state.
- If rejected it will be moved to _Rejected_ state a custom email with reason will be sent back to developer. Developer treats this state as _Draft_ (start back at step 3).
- If approved it will be moved to _Approved_ state an automated email will be send back to developer, and the game moves into phase 5.
8. If a merchant deploys the game, the game will be transitioned from the _Approved_ to _Live_ state.


### Phase 4: Going Live

1. Upon successful validation, your game is deployed to our Production Environment
2. The game is added to the Luxodd Games Catalog
3. Arcade operators (Merchants) can now select your game for their venues
4. When a Merchant chooses your game, it's automatically deployed to their specific Luxodd arcade cabinet(s)
5. Your game is now live and accessible to players in that Merchant's location!
  - If this was the first time your game has been selected by a merchant, your game transistions form the _Approved_ to _Live_ state.


# Revenue Share

Players will be compensated based on what merchants pay them to deploy to their arcade, and are compensated for 10% of each session played.

Several other revenue strategies we have in development are outlined in our revenue [playbook](needs a link).

