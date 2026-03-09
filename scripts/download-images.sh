#!/bin/bash
# 批量下载花卉图片到 images/ 目录
# 图片来源：Unsplash，按花卉学名精确挑选

mkdir -p ../images

# 说明：
# flower_1.jpg  - 迎春花 (Jasminum nudiflorum / Winter jasmine)
# flower_2.jpg  - 梅花 (Prunus mume / Chinese plum blossom)
# flower_3.jpg  - 白玉兰 (Magnolia denudata / Yulan magnolia)
# flower_4.jpg  - 紫玉兰 (Magnolia liliiflora / Purple magnolia)
# flower_5.jpg  - 樱花 (Prunus serrulata / Cherry blossom)
# flower_6.jpg  - 垂丝海棠 (Malus halliana / Hall crabapple)
# flower_7.jpg  - 西府海棠 (Malus micromalus / Crabapple)
# flower_8.jpg  - 碧桃 (Prunus persica double / Ornamental peach)
# flower_9.jpg  - 山桃花 (Prunus davidiana / Mountain peach)
# flower_10.jpg - 连翘 (Forsythia suspensa / Forsythia)
# flower_11.jpg - 紫叶李 (Prunus cerasifera / Cherry plum)
# flower_12.jpg - 木瓜海棠 (Chaenomeles speciosa / Flowering quince)
# flower_13.jpg - 紫荆 (Cercis chinensis / Chinese redbud)
# flower_14.jpg - 木莲 (Manglietia fordiana / Wood lotus)
# flower_15.jpg - 二乔玉兰 (Magnolia x soulangeana / Saucer magnolia)
# flower_16.jpg - 郁金香 (Tulipa / Tulip)
# flower_17.jpg - 丁香 (Syringa / Lilac)
# flower_18.jpg - 牡丹 (Paeonia suffruticosa / Tree peony)
# flower_19.jpg - 芍药 (Paeonia lactiflora / Chinese peony)
# flower_20.jpg - 蔷薇 (Rosa multiflora / Rambler rose)

# Unsplash source API (每次随机返回匹配图片，宽400px)
BASE="https://source.unsplash.com/400x400/?"

declare -A QUERIES=(
  [1]="winter+jasmine+yellow+flower"
  [2]="plum+blossom+pink+prunus"
  [3]="white+magnolia+flower+spring"
  [4]="purple+magnolia+flower"
  [5]="cherry+blossom+sakura+spring"
  [6]="pink+crabapple+malus+halliana"
  [7]="pink+crabapple+spring+flower"
  [8]="double+peach+blossom+ornamental"
  [9]="wild+peach+blossom+spring"
  [10]="forsythia+yellow+spring"
  [11]="cherry+plum+purple+leaf+white+flower"
  [12]="flowering+quince+red+orange"
  [13]="redbud+cercis+purple+flower"
  [14]="white+magnolia+lotus+flower"
  [15]="saucer+magnolia+pink+purple"
  [16]="tulip+spring+flower"
  [17]="lilac+purple+syringa"
  [18]="tree+peony+paeonia+flower"
  [19]="chinese+peony+paeonia+lactiflora"
  [20]="rambler+rose+rosa+multiflora"
)

for i in "${!QUERIES[@]}"; do
  echo "下载 flower_${i}.jpg (${QUERIES[$i]})..."
  curl -L -o "../images/flower_${i}.jpg" \
    "${BASE}${QUERIES[$i]}" \
    --silent --show-error
  sleep 0.5
done

echo "完成！图片保存在 images/ 目录"
echo "请检查图片是否准确，对不满意的可手动替换"
echo "命名规范: flower_1.jpg ~ flower_20.jpg"
