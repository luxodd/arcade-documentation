---
sidebar_position: 3
---

# Runtime memory

## Background audio compression

The [official Unity documentation](https://docs.unity3d.com/Manual/webgl-audio.html) recommends using the CompressedInMemory load type for background audio. This decreases the runtime memory usage because the audio clip doesn't have to be decompressed when the game runs. The drawback is the loss of precision and the latency, which usually don't matter so much for background audio.

![Background audio compression](@site/static/img/tips-images/image-19.png)

The following is a screenshot from the Unity Memory Profiler, which shows the total RAM memory used by a background audio clip. When the load type is set to **CompressedInMemory** (column A), the audio clip uses only 5mb of RAM.

![Background audio CompressedInMemory](@site/static/img/tips-images/image-20.png)
