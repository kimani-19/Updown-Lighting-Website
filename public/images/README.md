# Images Directory

This directory contains all images used on the Up-Down-Lighting website.

## Folder Structure

### `/gallery/`
**Purpose**: Project showcase images for the Gallery page
**Recommended formats**: JPG, PNG, WebP
**Recommended sizes**: 
- Thumbnail: 300x200px
- Full size: 1200x800px
- Max file size: 2MB per image

**Naming convention**: `project-[number]-[description].jpg`
**Examples**:
- `project-01-roofline-installation.jpg`
- `project-02-commercial-building.jpg`
- `project-03-custom-design.jpg`

### `/hero/`
**Purpose**: Hero section background images
**Recommended formats**: JPG, PNG, WebP
**Recommended sizes**: 1920x1080px (Full HD)
**Max file size**: 5MB per image

**Examples**:
- `hero-christmas-lights.jpg`
- `hero-winter-wonderland.jpg`
- `hero-holiday-display.jpg`

### `/team/`
**Purpose**: Team member profile photos
**Recommended formats**: JPG, PNG
**Recommended sizes**: 400x400px (square)
**Max file size**: 1MB per image

**Naming convention**: `team-[firstname]-[lastname].jpg`
**Examples**:
- `team-mike-johnson.jpg`
- `team-sarah-williams.jpg`
- `team-tom-rodriguez.jpg`

### `/services/`
**Purpose**: Service-related images and icons
**Recommended formats**: PNG, SVG, JPG
**Recommended sizes**: Varies by use case
**Max file size**: 500KB per image

**Examples**:
- `service-residential.jpg`
- `service-commercial.jpg`
- `service-maintenance.jpg`

## Image Optimization Tips

1. **Compress images** before uploading to reduce file size
2. **Use WebP format** for better compression (with JPG fallback)
3. **Optimize for web** - aim for fast loading times
4. **Use descriptive filenames** for better SEO
5. **Include alt text** when using images in components

## Usage in Code

To reference images in your React components:

```jsx
// For images in public/images/
<img src="/images/gallery/project-01-roofline.jpg" alt="Roofline Installation" />

// For dynamic imports
import heroImage from '/images/hero/christmas-lights.jpg';
```

## File Organization

- Keep related images grouped in appropriate folders
- Use consistent naming conventions
- Delete unused images to keep the directory clean
- Consider creating subfolders for large collections (e.g., `/gallery/2024/`, `/gallery/2023/`)
