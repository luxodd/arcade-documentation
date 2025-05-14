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
3. If accepted you recieve an email with your login information to the [Luxodd Admin Portal](https://admin.luxodd.com)  
   - You'll also be issued an account (if not already made) to our [Luxodd Game Server](https://app.luxodd.com/registration?redirect=/home)
   - A Developer API token will be issued for integration. API token is used in phase 2.
  

### Phase 2: Game Integration and Testing

1. Download the [Luxodd Arcade Unity Plugin](link to github.com/luxodd/unity-plugin)
2. Integrate the API into your game (see [Arcade Deployments](/docs/category/arcade-deployments) for detailed integration steps)

### Phase 3: How to add games to Luxodd

1. Log in to our [Luxodd Admin Portal](https://admin.luxodd.com)
2. Upload your game, provide game information like name, posters etc, along with a game zip file
3. As soon as the game is uploaded, its status will automatically move to _Draft_ state
4. Devloper ensures the following [checks](link to checks)
5. Once checks are passed and satisfactory, developer can toggles their game to the _Review_ state
6. Luxodd reviews the game. If approved then the status changed to _Approved_ state.
- If rejected it will be moved to _Rejected_ state a custom email with reason will be sent back to developer. Developer treats this state as _Draft_ (start back at step 3).
- If approved it will be moved to _Approved_ state an automated email will be send back to developer, and the gamemoves into stage 4.
7. If a merchant deploys the game, the game will be transitioned from the _Approved_ to _Live_ state.


### Phase 4: Review and Deployment

Once your game is ready for review:

1. Mark it as "Ready for Review" in the Developer Portal
2. Our team will conduct a thorough evaluation covering:
   - Technical Integration Accuracy
   - Performance and Stability
   - Content Guidelines Compliance
   - Strategic Betting Implementation
   - Overall Game Quality

:::note
If your game passes the review, it will be deployed to production. If issues are found, you'll receive detailed feedback for required changes.
:::

### Phase 5: Going Live

1. Upon successful validation, your game is deployed to our Production Environment
2. The game is added to the Luxodd Games Catalog
3. Arcade operators (Merchants) can now select your game for their venues
4. When a Merchant chooses your game, it's automatically deployed to their specific Luxodd arcade cabinet(s)
5. Your game is now live and accessible to players in that Merchant's location!
  - If this was the first time your game has been selected by a merchant, your game transistions form the _Approved_ to _Live_ state.
