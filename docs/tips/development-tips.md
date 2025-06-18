---
sidebar_position: 1
---

# Development Tips

## Memory optimization

Unity uses a memory heap to store the objects, scenes, shaders, etc. when your game is running in the browser. The memory heap is resized automatically by Unity when needed. However, errors may happen during the resizing process, since the browser may fail to allocate more memory for resizing the heap. That's why it's important to keep your memory usage as low as possible. This also benefits the game when running on weaker devices, like mobile devices. You can find more information about memory usage on the [official Unity documentation.](https://docs.unity3d.com/Manual/webgl-memory.html)

## Garbage collection

The garbage collector runs at the end of every frame in WebGL, so there are various minor optimizations you can do to your code to generate less garbage.

- avoid doing string concatenation in loops, since this may generate a lot of garbage during a single frame and Unity may run out of memory
- for string concatenations, if the number of concatenated elements exceeds 10, it is recommended to start using StringBuilder
- cache arrays returned by the functions before using them in a for loop. In other words, avoid `for(int i=0;i<getArray();i++)`
- use `gameObject.CompareTag("tagName")` for tag comparison, since it doesn't allocate memory for the tag and is much more performant
- for coroutines, cache the yield, for example, `var delay = new WaitForSeconds(5.0f);` if you need to return it multiple times

## Memory profiler

To get a better overview of memory usage, we recommend using the [Memory Profiler package](https://docs.unity3d.com/Packages/com.unity.memoryprofiler@1.0/manual/index.html). With the help of this tool, you can capture a snapshot of the memory usage at any given moment, and get an overview of the resources using the RAM memory.

![Memory profiler](@site/static/img/tips-images/image-0.png)

In the `Unity Objects` tab, you will get a better overview of the meshes, textures, shaders, fonts, audio clips, animations, and many other things that are loaded in memory during the runtime.

![Unity objects](@site/static/img/tips-images/image-1.png)

See if there are for example:

- unused resources, like textures, meshes, objects, etc. This means that they are referenced somewhere and get loaded, when in fact they aren't used in the game.
- background audio clips taking too much space. Their load type can be set to **CompressedInMemory** to reduce the runtime memory usage.
- textures, meshes, audio clips that occupy too much memory. Can they be simplified, downsized, or compressed even more to take less memory?

## Target frame rate

Unity allows customizing the [target frame rate](https://docs.unity3d.com/ScriptReference/Application-targetFrameRate.html), at which your game will be rendered. This may be useful on mobile devices, however, it should be avoided on WebGL since it may decrease the game performance in browsers.

The default value for `Application.targetFrameRate` is `-1`, and should be kept like this on WebGL. This means that the browser itself will control the frame rate, which provides the best performance on WebGL.
