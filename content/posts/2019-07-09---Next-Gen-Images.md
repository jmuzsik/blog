---
title: How to Setup Next Gen Images for React
date: '2019-07-09'
template: 'post'
draft: false
slug: '/posts/next-gen-images-react/'
category: 'Projects'
tags:
  - 'Open Source'
  - 'Github'
  - 'Javascript'
  - 'React'
  - 'Images'
description: '"If Google says to do it, you should do it" - the intuition. If you use Googles Lighthouse Audit and have images on your application you will notice Google has been barking something new to us: Serve images in next-gen formats'
---

# How to Setup Next Gen Images for React

> "If Google says to do it, you should do it" - the intuition. If you use Google's Lighthouse Audit and have images on your application you'll notice Google has been barking something new to us: **Serve images in next-gen formats**

It looks like this:

![Next gen image recommendation by google lighthouse](https://cdn-images-1.medium.com/max/1440/1*7-jBjzLzxpukeCFrARXGhA.png)

<div style="text-align: center">5.25s</div>

Very obvious and aggressive. But what does this mean?

I'll just copy what Google states:

> JPEG 2000, JPEG XR, and WebP are image formats that have superior compression and quality characteristics compared to their older JPEG and PNG counterparts. Encoding your images in these formats rather than JPEG or PNG means that they will load faster and consume less cellular data.

But, what is the browser support?

### Webp

![browser support for webp images caniuse.com](https://cdn-images-1.medium.com/max/1440/1*VVjQcUbBlXGD_VKJjMjbMQ.png)

Ok, most of the way there… even Opera Mini!

### JPEG 2000

![browser support for jpeg 2000 images caniuse.com](https://cdn-images-1.medium.com/max/1440/1*1PAVj_M2-sca3eTPekFPYg.png)

At 95%! You can go further.

### JPEG XR

![browser support for jpeg xr images caniuse.com](https://cdn-images-1.medium.com/max/1440/1*_8yBg2Ej15pQsQyyNQW5pQ.png)

Basically 100%!

So, if you use all 3 then you have 100% support. So how to do so?

## How to add these fancy image formats to your site?

I put quite a bit of thought into this. First, seeing if there is some awesome size that'll get me exactly where I need to go. But it is not so simple. But there is this awesome Command Line Tool to use:

### [ImageMagick](https://imagemagick.org/index.php) to the rescue

With this tool you can convert your image formats. All those "ancient" image formats to the "new generation" formats. It's really simple with ImageMagick.

Here's a shell script that'll convert all images you put into an Images folder within the same directory you are in into webp and jp2 formats.

```bash
#!/bin/bash

# Create the folder to store Next Gen images
mkdir ./Images/JP2Files
mkdir ./Images/WebPFiles
mkdir ./Images/JXRFiles

# Go into Image directory for easier understanding
cd Images

# Loop through all images in the Image directory
for file in *; do
  # This means, do not run this code on a directory, only on a file (-f)
  if [[ -f $file ]]; then

    fileName=$(echo $file | cut -d'.' -f 1) # something.jpg -> something

    # Conversion to Next Gen formats, using solely imageMagick defaults
    # 100 is used as the default generally lessens the quality of the image
    convert $file -quality 100 ./WebPFiles/$fileName.webp
    convert $file ./JP2Files/$fileName.jp2
    convert $file ./JPXFiles/$fileName.jpx
    convert $file ./JXRFiles/$fileName.jxr

  fi

done

# Go back down
cd ..
```

This would create another folder and store the images into the next gen formats.

## Now you have the images, what about adding them to React?

Then you can just use the picture html element.

```html
<picture>
  <source type="image/webp" srcset="path/to/image.webp" />
  <source type="image/jp2" srcset="path/to/image.jp2" />
  <source type="image/jxr" srcset="path/to/image.jxr" />
  <img src="path/to/image.jpg" alt="alt description" />
</picture>
```

That is literally all there is to it.

---

I created this library to simplify the process: https://github.com/jMuzsik/nextGenImageCreation

It gives you a handful of shell scripts to run. It creates a chronological process that makes things way easier.

1. You can first create an S3 bucket to store the images in.
2. Convert those files into webp , jp2 , and a placeholder image.
3. Move all those images to an S3 bucket, all in a 4. specific folder such as webpImages , jp2Images , etc.
4. Get all the image data in the bucket in a JSON file to reference.

And that's that.
