from PIL import Image, ImageDraw

src = "/Users/zhaolu/.codeium/windsurf/ask_continue_temp_photo/ask_continue_1773110393428_csafyj.png"
img = Image.open(src).convert("RGBA")
w, h = img.size

# 内缩裁切：去掉原图外圈约5%的边缘（含圆角和黑色描边）
margin = int(min(w, h) * 0.06)
img = img.crop((margin, margin, w - margin, h - margin))
w2, h2 = img.size

# 取正方形中心区域
side = min(w2, h2)
left = (w2 - side) // 2
top = (h2 - side) // 2
img = img.crop((left, top, left + side, top + side))

# 用圆形蒙版裁剪，彻底消除四角
mask = Image.new("L", (side, side), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((0, 0, side, side), fill=255)

result = Image.new("RGBA", (side, side), (0, 0, 0, 0))
result.paste(img, mask=mask)

# 加透明内边距，花枝有呼吸感
pad = int(side * 0.08)
canvas_size = side + pad * 2
canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
canvas.paste(result, (pad, pad))

out = "/Users/zhaolu/Documents/春天花会开/icons/icon-logo.png"
canvas.save(out)
print(f"done: {canvas.size}")
