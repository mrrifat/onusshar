# Onusshar Icons

## icon.svg
SVG source file with Bengali "অ" character.

## Converting to .ico for Windows

To convert the SVG to a proper Windows .ico file, you can use:

### Online Tools:
- https://convertio.co/svg-ico/
- https://www.aconvert.com/icon/svg-to-ico/

### Command Line (if you have ImageMagick):
```bash
convert icon.svg -define icon:auto-resize=256,128,64,48,32,16 icon.ico
```

### Or use GIMP:
1. Open icon.svg in GIMP
2. Export As → icon.ico
3. Select multiple sizes: 256x256, 128x128, 64x64, 48x48, 32x32, 16x16

## Current State
The SVG is ready to use. For production releases, generate icon.ico from it.
