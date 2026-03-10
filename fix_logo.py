from PIL import Image, ImageFilter
from collections import deque

src = "/Users/zhaolu/.codeium/windsurf/ask_continue_temp_photo/ask_continue_1773108286361_86izsu.png"
img = Image.open(src).convert("RGBA")
w, h = img.size
pixels = img.load()

def color_dist(c1, c2):
    return sum((a - b) ** 2 for a, b in zip(c1[:3], c2[:3])) ** 0.5

# 取四角像素颜色作为背景色参考
corners = [pixels[0,0], pixels[w-1,0], pixels[0,h-1], pixels[w-1,h-1]]
bg_color = corners[0]  # 应该都是同一背景

# BFS 泛洪填充：从四角开始，凡是与背景色相近（距离<60）的像素设为透明
visited = [[False]*h for _ in range(w)]
q = deque()

seed_points = [(0,0),(w-1,0),(0,h-1),(w-1,h-1)]
for sx, sy in seed_points:
    if not visited[sx][sy]:
        q.append((sx, sy))
        visited[sx][sy] = True

while q:
    x, y = q.popleft()
    r, g, b, a = pixels[x, y]
    if color_dist((r, g, b), bg_color[:3]) < 55:
        pixels[x, y] = (r, g, b, 0)
        for dx, dy in [(-1,0),(1,0),(0,-1),(0,1)]:
            nx, ny = x+dx, y+dy
            if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny]:
                visited[nx][ny] = True
                q.append((nx, ny))

# 裁剪透明边距
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

# 加内边距
pad = 80
canvas = Image.new("RGBA", (img.width + pad*2, img.height + pad*2), (0, 0, 0, 0))
canvas.paste(img, (pad, pad))

out = "/Users/zhaolu/Documents/春天花会开/icons/icon-logo.png"
canvas.save(out)
print(f"done: {canvas.size}")
