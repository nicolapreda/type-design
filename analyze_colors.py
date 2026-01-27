from PIL import Image
from collections import Counter

def get_dominant_colors(image_path, num_colors=5):
    try:
        image = Image.open(image_path)
        image = image.resize((150, 150))  # Resize to speed up
        pixels = list(image.getdata())
        
        # Filter out transparent pixels if any (assuming RGBA)
        if image.mode == 'RGBA':
            pixels = [p[:3] for p in pixels if p[3] > 0]
        elif image.mode != 'RGB':
            image = image.convert('RGB')
            pixels = list(image.getdata())

        counts = Counter(pixels)
        most_common = counts.most_common(num_colors)
        
        hex_colors = []
        for count in most_common:
            rgb = count[0]
            hex_color = '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])
            hex_colors.append((hex_color, count[1]))
            
        return hex_colors
    except Exception as e:
        print(f"Error: {e}")
        return []

image_path = '/Users/nicolapreda/.gemini/antigravity/brain/467990db-ca0a-4ddc-8d6a-59ba4c026ccd/uploaded_media_1769472419183.png'
colors = get_dominant_colors(image_path)

print("Dominant Colors:")
for color, count in colors:
    print(f"{color}: {count}")
