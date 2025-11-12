# Videos Directory

This directory contains all videos used on the Up-Down-Lighting website.

## Supported Formats

- **MP4** (recommended for web)
- **WebM** (modern browsers, better compression)
- **MOV** (for high-quality source files)

## Recommended Specifications

### Gallery/Showcase Videos
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Duration**: 30-60 seconds
- **File size**: Under 10MB
- **Format**: MP4 with H.264 codec

### Hero Background Videos
- **Resolution**: 1920x1080 (Full HD)
- **Duration**: 10-30 seconds (looping)
- **File size**: Under 5MB
- **Format**: MP4 with H.264 codec

### Team/Process Videos
- **Resolution**: 1280x720 (HD)
- **Duration**: 1-3 minutes
- **File size**: Under 20MB
- **Format**: MP4 with H.264 codec

## Naming Convention

### Gallery Videos
`gallery-[number]-[description].mp4`
- `gallery-01-installation-process.mp4`
- `gallery-02-before-after.mp4`
- `gallery-03-customer-testimonial.mp4`

### Hero Videos
`hero-[description].mp4`
- `hero-christmas-lights.mp4`
- `hero-winter-scene.mp4`

### Team Videos
`team-[name]-[description].mp4`
- `team-mike-introduction.mp4`
- `team-sarah-design-process.mp4`

## Usage in Code

### HTML5 Video Element
```jsx
<video 
  src="/videos/gallery-01-installation.mp4" 
  controls 
  poster="/images/gallery/project-01-poster.jpg"
  width="100%" 
  height="auto"
>
  Your browser does not support the video tag.
</video>
```

### Background Video
```jsx
<video 
  autoPlay 
  muted 
  loop 
  playsInline
  className="hero-video"
>
  <source src="/videos/hero-christmas-lights.mp4" type="video/mp4" />
</video>
```

## Optimization Tips

1. **Compress videos** using tools like HandBrake or FFmpeg
2. **Use multiple formats** (MP4 + WebM) for better browser support
3. **Add poster images** for better loading experience
4. **Consider video thumbnails** for gallery previews
5. **Use lazy loading** for videos below the fold

## File Size Guidelines

- **Small videos** (< 5MB): Hero backgrounds, short clips
- **Medium videos** (5-20MB): Gallery showcases, process videos
- **Large videos** (> 20MB): Full testimonials, detailed processes

## Accessibility

- Add captions/subtitles for important videos
- Provide text alternatives for video content
- Ensure videos don't autoplay with sound
- Use descriptive filenames and alt text

## Storage Considerations

- Videos take up significant space
- Consider using a CDN for large video files
- Implement progressive loading for better performance
- Monitor bandwidth usage for video-heavy pages
