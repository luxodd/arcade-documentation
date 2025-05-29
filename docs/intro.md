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


### Step 1: Developer Account Registration & Verification

:::note
Below steps can be skipped if you already have access to Luxodd Game Dev Portal.
:::

1. Fill out our [form](https://forms.gle/ixqvtC9uKjJUNL5k8)
2. We will verify your account.
3. If accepted you will receive an email with your login information to the [Luxodd Admin Portal](https://admin.luxodd.com)  
   - You'll also be issued an account (if not already made) to our [Luxodd Game Server](https://app.luxodd.com/registration?redirect=/home)

### Step 2: Register Your Game _(Draft State)_

1. Log in to our [Luxodd Admin Portal](https://admin.luxodd.com)
2. Navigate to `Games > New`
3. Fill in the following minimum details:
   - Game Title
   - Game Description
4. Click `Save`. The game will be saved in the _Draft_ state.


### Step 3: Dev API Token & Integration _(Draft State)_

📦 **Download Plugin & Documentation**
  - Download the [Luxodd Arcade Unity Plugin](link to github.com/luxodd/unity-plugin)
  - view unity Plugin [Documentation](https://staging-docs.luxodd.com/docs/category/unity-plugin)

🔌 **Integration Summary**
  - In The Admin Portal, generate your `Developer Token`
  - Import the Plugin into your Unity project
  - Use the token to authenticate game API calls
  - Refer to the [Arcade Launch Overview](/docs/arcade-launch/overview) for detailed setup instructions

  :::info
  _💡 Use the [app.luxodd.com](https://app.luxodd.com) API for testing during development, while in a non-approved state, all credit card transactions will be mocked (no actual money is used)._
  :::

### Step 4: Complete Game Details _(Draft -> Review State)_ 

1. Go to `Games > List` and click `Edit(Complete)` on your game
   - Complete the following required fields:
     - Cover Image URL (Minimum 800x600)
     - Game File (zip archive)
     - Add YouTube Gameplay Video ID
     - Price (in USD)
     - Game Mission / Objectives
2. Perform your own review on the game. Run through all of these [checks](arcade-launch/game-submission-checklist.md)
3. Once all the checks look good on your end. Set the game status to the _Review_ state

### Step 5: Game Review Process _(Review -> Approved/Rejected State)_
  - Our review team will evaluate your game (1 ~ 3 business days typical)
  - Status will update as follows:
    - _Approved_: You'll receive an email notification
    - _Rejected_: You'll receive an email with feedback and required changes

    ⚠️ If rejected, update your game and resubmit it by switching back to _`Review`_.


### Step 6: Going Live _(Approved -> Live State)_

  - Once approved, your game transitions to the Approved -> Live State
  - Your game will appear in the Luxodd Merchant Catalog
  - Arcade venue operators can now select and deploy your game
  - Your game becomes playable on  real Luxodd arcade cabinets

  :::info
  _🚀 The first time your game is selected by a merchant, it officially transitions to `Live` status._
  :::

### Frequently Asked Questions(FAQ)
**Q: How do I update my game later?**
A: Edit the existing game entry and upload a new file. Version history is tracked automatically.

**Q: Can I test in a sandbox before going live?**
A: Yes, we provide a dedicated `Sandbox Mode` for testing purposes.

**Q: How is revenue managed?**
A: Once your game is live, monthly reports are sent to your email. Payouts are processed via your registered payment method.

# Revenue Share

Players will be compensated based on what merchants pay them to deploy to their arcade, and are compensated for 10% of each session played.

Several other revenue strategies we have in development are outlined in our revenue [playbook](needs a link).

