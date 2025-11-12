# 📸 Up-Down-Lighting Assets Guide

This guide explains how to add and use images and videos on your website.

## 📁 Directory Structure

```
public/
├── images/
│   ├── gallery/          # Project showcase images
│   ├── hero/            # Hero section backgrounds
│   ├── team/            # Team member photos
│   └── services/        # Service-related images
└── videos/
    └── [various videos] # All video content
```

## 🖼️ Adding Images

### 1. Gallery Images
**Location**: `public/images/gallery/`
**Purpose**: Project showcase for Gallery page

**How to add**:
1. Take photos of your completed projects
2. Resize to 1200x800px (recommended)
3. Compress to under 2MB
4. Save as JPG or PNG
5. Name like: `project-01-roofline-installation.jpg`

**Usage in code**:
```jsx
<img 
  src="/images/gallery/project-01-roofline.jpg" 
  alt="Beautiful roofline Christmas lights installation"
  className="gallery-image"
/>
```

### 2. Hero Background Images
**Location**: `public/images/hero/`
**Purpose**: Background images for hero sections

**How to add**:
1. Use high-quality landscape photos
2. Resize to 1920x1080px
3. Keep file size under 5MB
4. Name like: `hero-christmas-lights.jpg`

**Usage in code**:
```jsx
// In your CSS
.hero {
  background-image: url('/images/hero/christmas-lights.jpg');
  background-size: cover;
  background-position: center;
}
```

### 3. Team Photos
**Location**: `public/images/team/`
**Purpose**: Team member profile pictures

**How to add**:
1. Take professional headshots
2. Crop to square (400x400px)
3. Keep file size under 1MB
4. Name like: `team-mike-johnson.jpg`

**Usage in code**:
```jsx
<img 
  src="/images/team/mike-johnson.jpg" 
  alt="Mike Johnson - Founder & Lead Installer"
  className="team-photo"
/>
```

### 4. Service Images
**Location**: `public/images/services/`
**Purpose**: Service-related illustrations and photos

**How to add**:
1. Photos of your work process
2. Service-related icons
3. Before/after comparisons
4. Name like: `service-residential.jpg`

## 🎥 Adding Videos

### 1. Gallery Videos
**Location**: `public/videos/`
**Purpose**: Video showcases of your work

**How to add**:
1. Record 30-60 second videos of installations
2. Compress to under 10MB
3. Use MP4 format
4. Name like: `gallery-01-installation-process.mp4`

**Usage in code**:
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

### 2. Hero Background Videos
**Purpose**: Dynamic background videos

**Usage in code**:
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

## 🛠️ Image Optimization Tools

### Free Online Tools:
- **TinyPNG**: https://tinypng.com/ (PNG/JPG compression)
- **Squoosh**: https://squoosh.app/ (Google's image optimizer)
- **Compressor.io**: https://compressor.io/ (Multiple formats)

### Desktop Software:
- **GIMP** (Free): Image editing and resizing
- **Paint.NET** (Free): Simple image editing
- **Photoshop** (Paid): Professional image editing

## 📱 Mobile Optimization

### Responsive Images:
```jsx
// Use different sizes for different screens
<img 
  src="/images/gallery/project-01-small.jpg" 
  srcSet="/images/gallery/project-01-small.jpg 480w, 
          /images/gallery/project-01-medium.jpg 768w, 
          /images/gallery/project-01-large.jpg 1200w"
  sizes="(max-width: 480px) 100vw, 
         (max-width: 768px) 50vw, 
         33vw"
  alt="Christmas lights installation"
/>
```

## 🚀 Performance Tips

### 1. Image Optimization:
- Compress all images before uploading
- Use WebP format when possible (with JPG fallback)
- Implement lazy loading for images below the fold
- Use appropriate image sizes for different screen sizes

### 2. Video Optimization:
- Compress videos to reduce file size
- Use poster images for faster loading
- Consider using a CDN for large video files
- Implement progressive loading

### 3. Loading Strategy:
```jsx
// Lazy loading example
<img 
  src="/images/gallery/project-01.jpg" 
  loading="lazy"
  alt="Project showcase"
/>
```

## 📋 Checklist for Adding Assets

### Before Adding Images:
- [ ] Resize to appropriate dimensions
- [ ] Compress to reduce file size
- [ ] Use descriptive filename
- [ ] Add alt text for accessibility
- [ ] Test on mobile devices

### Before Adding Videos:
- [ ] Compress to reasonable file size
- [ ] Use MP4 format for compatibility
- [ ] Add poster image for loading
- [ ] Test playback on different devices
- [ ] Consider bandwidth usage

## 🔧 Updating Your Website

### To add new images:
1. Place image in appropriate folder
2. Update your React components to reference the new image
3. Test the website to ensure images load correctly
4. Optimize for mobile viewing

### To add new videos:
1. Place video in `public/videos/` folder
2. Update your React components to reference the new video
3. Add poster image for better loading experience
4. Test video playback on different devices

## 📞 Need Help?

If you need assistance with:
- Image optimization
- Video compression
- Adding assets to your website
- Performance optimization

Contact your developer or refer to the documentation in each folder's README file.

---

**Remember**: Always test your website after adding new assets to ensure everything loads correctly and looks good on all devices! 📱💻
