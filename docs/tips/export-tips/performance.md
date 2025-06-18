---
sidebar_position: 2
---

# Performance

This section contains various tips for improving the performance of your game. There are a lot of users that may play your game from weaker devices, for example, Chromebooks. So ensuring everyone can play it as smoothly as possible will result in increased revenue.

## Sprite atlases

For each individual sprite that you have in your 2D game, Unity will issue a draw call. The more draw calls your game has, the slower it will run. The sprite atlas combines multiple sprites in a single texture, thus issuing only a single draw call for the combined sprites.

You will need to install first of all the `2D SpriteShape` package.

![Sprite atlases](@site/static/img/tips-images/image-13.png)

Afterward, you can click anywhere in your Project view, and select `Create > 2D > Sprite Atlas` option to create a new Sprite atlas.

![Sprite atlases](@site/static/img/tips-images/image-14.png)

For more detailed information please refer to the [official Unity documentation](https://docs.unity3d.com/Manual/sprite/atlas/sprite-atlas-reference.html).

## Static batching

Batching is a powerful technique to reduce the draw calls and thus increase the performance of the game. Static batching combines meshes from the objects that don't move, and sends them in a single draw call to the CPU. If you want to use static batching, you need to enable it in the build settings:

![Static batching](@site/static/img/tips-images/image-15.png)

Furthermore, you'll need to also mark your objects as static objects, by either enabling the `Static` toggle or selecting only the specific `Batching Static` flag. Static objects must be objects that don't move, for example rocks, clouds, and buildings.

![Static batching](@site/static/img/tips-images/image-16.png)

Static batching works by creating a combined mesh from all the static objects. This means that the more static objects you have, the more memory will be used. For example, if you have a forest with a lot of trees and mark them all as static, memory usage may increase substantially. So sometimes, compromises have to be made between memory usage and rendering performance.

Check the [official Unity documentation](https://docs.unity3d.com/Manual/static-batching.html) to find out more about static batching.

## Exceptions

You can choose various levels for exception support when building for WebGL.

![Exceptions](@site/static/img/tips-images/image-17.png)

Selecting "None" provides better performance and smaller builds. However, if there is an exception thrown during the game, for example in a try/catch block, the game will crash. We recommend using this option only when you are sure the game runs as smoothly as possible, without any bugs, and you don't have any try/catch blocks in your code. Otherwise, the default "Explicitly thrown exceptions only" is also a good starting point. We recommend that you never submit a game with the "Full With Stacktrace" option selected. This option is only good for debugging, and it decreases the performance and increases the browser memory usage. You can find more information about exception support on the [official Unity documentation](https://docs.unity3d.com/Manual/webgl-building.html).

## Quality settings

We recommend decreasing the quality settings in `Edit > Project Settings > Quality` in order to improve game performance. You can also create a custom quality level that fits your game better, with the optimal settings.

![Quality settings](@site/static/img/tips-images/image-18.png)
