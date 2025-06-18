---
sidebar_position: 1
---

# Build size

This section contains various tips for decreasing the build size of your game. A smaller build will increase the load rate of your game, subsequently increasing your revenue.

## Compression

Unity supports Brotli and Gzip compressed builds for WebGL.

![Compression](@site/static/img/tips-images/image-2.png)

We recommend that you use Brotli compression, which is supported in all the major browsers ([caniuse.com](https://caniuse.com/brotli)) . Although it takes longer to build a Brotli compressed game, the final build is smaller compared to gzip. This improves the loading rate for your game significantly, and thus your revenue.

You can read more about Unity compression on their [official documentation](https://docs.unity3d.com/Manual/webgl-deploying.html).

## Code optimization

Avoid using the default "Shorter Build Time" code optimization option. Please pick here one of these:

- "Runtime Speed with LTO" if you are concerned about performance
- "Disk Size with LTO" if you want a smaller build

![Code optimization](@site/static/img/tips-images/image-3.png)

## IL2CPP Code Generation

For reduced build sizes we recommend setting this to "Faster (smaller) builds".

![IL2CPP Code Generation](@site/static/img/tips-images/image-4.png)

:::note
In our test with an empty Unity project build, selecting "Disk Size with LTO" and "Faster (smaller) builds" options mentioned in the above sections decreased the final size from 14.7MB down to 12.5MB (Brotli compression was used).
:::

## Code stripping

The code stripping functionality allows Unity to remove unused code from your project, thus reducing the final build size.

![Code stripping](@site/static/img/tips-images/image-5.png)

By default, it is enabled, and set on the minimal level. If you are looking to further optimize your build size, you can increase the level to low, medium, or high. Be sure to test the final build, since, with a higher level of stripping, chances are that some useful code will also be removed. To read more about code stripping and how to protect your code from being removed at higher stripping levels, please check the [official Unity documentation](https://docs.unity3d.com/Manual/managed-code-stripping.html).

## API Compatibility Level

We recommend that you use the ".Net Standard" API compatibility level, as this provides smaller build sizes. ".Net Framework" should be used only if the game depends on APIs not compatible with ".Net Standard".

![API Compatibility Level](@site/static/img/tips-images/image-6.png)

You can read more about the API compatibility, and other WebGL export settings on the [official Unity documentation](https://docs.unity3d.com/Manual/class-PlayerSettingsWebGL.html).

## Audio

Forcing audio to mono, and reducing the quality will reduce the size of the audio clip in your build.

![Audio](@site/static/img/tips-images/image-7.png)

## Textures

Another way to decrease the final build size is to correctly set the texture max size.

![Textures](@site/static/img/tips-images/image-8.png)

Some purchased assets, imported models, or even your textures, may have a large size, for example, 2048x2048. It is a good practice to set an appropriate size for the texture since this will reduce the size of the texture in the final build. For example, for small objects, or far away objects barely visible, you can pick a smaller texture size since the quality loss will not be as noticeable. Furthermore, you can also select low quality in the compression drop-down, to reduce texture size even more. Don't forget to check if the game still looks good after tweaking texture size and compression quality. The changes will also be visible in the editor.

You should also consider disabling "Generate Mipmap" if your texture is a sprite or is not supposed to be viewed at an angle or far distance, as mipmaps take some space in the final build.

You can also experiment with "Use Crunch Compression" texture option. In some cases this can reduce the build size even more. Check to make sure the textures still look good if you enable this option.

## URP and post-processing effects

If your game is using URP but you aren't using any post-processing effects (tonemapping, bloom, vignette, etc) we recommend that you disable the post-processing feature in the pipeline data. This will reduce the size of a Brotli compressed build by approximately 1mb. You can disable the post-processing effects by selecting the URP asset data, and unticking post-processing.

![URP and post-processing effects](@site/static/img/tips-images/image-9.png)

## Mesh compression

By default, Unity applies vertex compression to all the meshes in your project.

![Mesh compression](@site/static/img/tips-images/image-10.png)

It is possible though to also enable mesh compression individually for each mesh. You can do this by selecting the mesh, selecting a compression level, and clicking the "Apply" button afterward.

![Mesh compression](@site/static/img/tips-images/image-11.png)

This will reduce even more the build size compared to vertex compression. In our tests, a mesh file that was vertex compressed occupied \~300kb in the final build but individually compressed with the `High` option its size was lowered to 100kb.

Individual mesh compression doesn't come without any drawbacks. It may cause the following 2 things:

- slower loading times, since the meshes have to be decompressed on game start
- artifacts, since some data may get altered during compression

In our tests we didn't notice any of these, however, we recommend that you give a quick test to your game if you decide to compress the meshes individually, to be sure it still looks and loads fine.

You can read more about mesh compression on the [official Unity documentation](https://docs.unity3d.com/Manual/compressing-mesh-data-optimization.html)

## Unused packages

We recommend that you remove or disable all unused packages from `Window > Package Management > Package Manager` (both "In Project" and "Built-in"). This prevents unused dependencies from being included in your build and can reduce build size.

![Unused packages](@site/static/img/tips-images/image-12.png)
