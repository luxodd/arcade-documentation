---
sidebar_position: 4
---

# Other Player Settings

## Name file as hashes

We recommend that you select this option when building your game.

![Name file as hashes](@site/static/img/tips-images/image-21.png)

The files will have unique names on every build, composed of the MD5 hash of their content. Although we clean the cache on our side after each game update, the browsers may still hold onto the old files, and unique file names fix this problem.

## Disable splash screen

You can disable the Unity splash screen to reduce the startup time. This is available from Unity 6\.

![Disable splash screen](@site/static/img/tips-images/image-22.png)

Please be sure you also disabled "Show Unity Logo", otherwise it will still be included in the build.

![Disable splash screen](@site/static/img/tips-images/image-23.png)

Enable caching
Be sure to enable caching so that the game loads faster on subsequent visits.

![Disable splash screen](@site/static/img/tips-images/image-24.png)
