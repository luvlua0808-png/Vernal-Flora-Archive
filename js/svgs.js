// SVG 花朵线稿生成器
// 灰色（未解锁）/ 彩色（已解锁）

function createFlowerSVG(flower, size = 80, colored = false) {
  const color = colored ? flower.colorHex : '#C8BCA8';
  const strokeW = size > 60 ? 1.5 : 1.2;

  switch (flower.id) {
    case 1: return svgYingChun(size, color, strokeW);
    case 2: return svgMeiHua(size, color, strokeW);
    case 3: return svgYuLan(size, color, strokeW);
    case 4: return svgZiYuLan(size, color, strokeW);
    case 5: return svgYingHua(size, color, strokeW);
    case 6: return svgChuiSiHaiTang(size, color, strokeW);
    case 7: return svgXiFuHaiTang(size, color, strokeW);
    case 8: return svgBiTao(size, color, strokeW);
    case 9: return svgShanTao(size, color, strokeW);
    case 10: return svgLianQiao(size, color, strokeW);
    case 11: return svgZiYeLi(size, color, strokeW);
    case 12: return svgMuGua(size, color, strokeW);
    case 13: return svgZiJing(size, color, strokeW);
    case 14: return svgMuLian(size, color, strokeW);
    case 15: return svgErQiao(size, color, strokeW);
    case 16: return svgYuJinXiang(size, color, strokeW);
    case 17: return svgDingXiang(size, color, strokeW);
    case 18: return svgMuDan(size, color, strokeW);
    case 19: return svgShaoYao(size, color, strokeW);
    case 20: return svgQiangWei(size, color, strokeW);
    case 21: return svgLiHua(size, color, strokeW);
    case 22: return svgLiHuaBai(size, color, strokeW);
    case 23: return svgXingHua(size, color, strokeW);
    case 24: return svgHanXiao(size, color, strokeW);
    default: return svgDefault(size, color, strokeW, flower.name[0]);
  }
}

function svgWrap(size, content) {
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}

// 1. 迎春花 - 六瓣管状金黄小花，细垂枝
function svgYingChun(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M50 85 Q40 65 30 45 Q20 30 25 15" opacity="0.6"/>
      <path d="M50 85 Q55 60 65 40 Q72 25 68 12" opacity="0.6"/>
      <path d="M50 85 Q60 70 75 58" opacity="0.5"/>
      <g transform="translate(25,15)">
        <ellipse cx="0" cy="-7" rx="4" ry="7" fill="${c}" opacity="0.9" stroke="none" transform="rotate(0)"/>
        <ellipse cx="0" cy="-7" rx="4" ry="7" fill="${c}" opacity="0.9" stroke="none" transform="rotate(60)"/>
        <ellipse cx="0" cy="-7" rx="4" ry="7" fill="${c}" opacity="0.9" stroke="none" transform="rotate(120)"/>
        <ellipse cx="0" cy="-7" rx="4" ry="7" fill="${c}" opacity="0.9" stroke="none" transform="rotate(180)"/>
        <ellipse cx="0" cy="-7" rx="4" ry="7" fill="${c}" opacity="0.9" stroke="none" transform="rotate(240)"/>
        <ellipse cx="0" cy="-7" rx="4" ry="7" fill="${c}" opacity="0.9" stroke="none" transform="rotate(300)"/>
        <circle cx="0" cy="0" r="2.5" fill="none" stroke="${c}" stroke-width="${sw}"/>
      </g>
      <g transform="translate(68,12)">
        <ellipse cx="0" cy="-6" rx="3.5" ry="6" fill="${c}" opacity="0.8" stroke="none" transform="rotate(30)"/>
        <ellipse cx="0" cy="-6" rx="3.5" ry="6" fill="${c}" opacity="0.8" stroke="none" transform="rotate(90)"/>
        <ellipse cx="0" cy="-6" rx="3.5" ry="6" fill="${c}" opacity="0.8" stroke="none" transform="rotate(150)"/>
        <ellipse cx="0" cy="-6" rx="3.5" ry="6" fill="${c}" opacity="0.8" stroke="none" transform="rotate(210)"/>
        <ellipse cx="0" cy="-6" rx="3.5" ry="6" fill="${c}" opacity="0.8" stroke="none" transform="rotate(270)"/>
        <ellipse cx="0" cy="-6" rx="3.5" ry="6" fill="${c}" opacity="0.8" stroke="none" transform="rotate(330)"/>
      </g>
      <g transform="translate(75,58)">
        <ellipse cx="0" cy="-5" rx="3" ry="5" fill="${c}" opacity="0.7" stroke="none" transform="rotate(0)"/>
        <ellipse cx="0" cy="-5" rx="3" ry="5" fill="${c}" opacity="0.7" stroke="none" transform="rotate(60)"/>
        <ellipse cx="0" cy="-5" rx="3" ry="5" fill="${c}" opacity="0.7" stroke="none" transform="rotate(120)"/>
        <ellipse cx="0" cy="-5" rx="3" ry="5" fill="${c}" opacity="0.7" stroke="none" transform="rotate(180)"/>
        <ellipse cx="0" cy="-5" rx="3" ry="5" fill="${c}" opacity="0.7" stroke="none" transform="rotate(240)"/>
        <ellipse cx="0" cy="-5" rx="3" ry="5" fill="${c}" opacity="0.7" stroke="none" transform="rotate(300)"/>
      </g>
    </g>
  `);
}

// 2. 梅花 - 五瓣圆润，老枝虬曲
function svgMeiHua(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M50 90 Q35 75 25 55 Q18 40 22 25 Q28 10 35 18" opacity="0.6"/>
      <path d="M35 18 Q42 8 50 20" opacity="0.5"/>
      <path d="M50 90 Q62 72 70 55 Q76 38 68 25" opacity="0.5"/>
      <g transform="translate(35,18)">
        <ellipse cx="0" cy="-8" rx="5.5" ry="8" fill="${c}" opacity="0.85" stroke="none"/>
        <ellipse cx="0" cy="-8" rx="5.5" ry="8" fill="${c}" opacity="0.85" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-8" rx="5.5" ry="8" fill="${c}" opacity="0.85" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-8" rx="5.5" ry="8" fill="${c}" opacity="0.85" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-8" rx="5.5" ry="8" fill="${c}" opacity="0.85" stroke="none" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="3" fill="none" stroke="${c}" stroke-width="${sw}"/>
        <circle cx="0" cy="-4" r="0.8" fill="${c}"/>
        <circle cx="3.8" cy="-1.2" r="0.8" fill="${c}"/>
        <circle cx="2.3" cy="3.2" r="0.8" fill="${c}"/>
        <circle cx="-2.3" cy="3.2" r="0.8" fill="${c}"/>
        <circle cx="-3.8" cy="-1.2" r="0.8" fill="${c}"/>
      </g>
      <g transform="translate(68,25)">
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.7" stroke="none"/>
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.7" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.7" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.7" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.7" stroke="none" transform="rotate(288)"/>
      </g>
    </g>
  `);
}

// 3. 玉兰 - 九瓣大花直立
function svgYuLan(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <line x1="50" y1="95" x2="50" y2="45" stroke="${c}" stroke-width="${sw * 1.5}" opacity="0.5"/>
      <g transform="translate(50,45)">
        <ellipse cx="0" cy="-16" rx="7" ry="16" fill="${c}" opacity="0.8" stroke="${c}" stroke-width="${sw * 0.5}"/>
        <ellipse cx="0" cy="-16" rx="7" ry="16" fill="${c}" opacity="0.8" stroke="${c}" stroke-width="${sw * 0.5}" transform="rotate(40)"/>
        <ellipse cx="0" cy="-16" rx="7" ry="16" fill="${c}" opacity="0.8" stroke="${c}" stroke-width="${sw * 0.5}" transform="rotate(80)"/>
        <ellipse cx="0" cy="-16" rx="7" ry="16" fill="${c}" opacity="0.8" stroke="${c}" stroke-width="${sw * 0.5}" transform="rotate(120)"/>
        <ellipse cx="0" cy="-16" rx="7" ry="16" fill="${c}" opacity="0.8" stroke="${c}" stroke-width="${sw * 0.5}" transform="rotate(160)"/>
        <ellipse cx="0" cy="-16" rx="7" ry="16" fill="${c}" opacity="0.8" stroke="${c}" stroke-width="${sw * 0.5}" transform="rotate(200)"/>
        <ellipse cx="0" cy="-16" rx="7" ry="16" fill="${c}" opacity="0.8" stroke="${c}" stroke-width="${sw * 0.5}" transform="rotate(240)"/>
        <ellipse cx="0" cy="-16" rx="7" ry="16" fill="${c}" opacity="0.8" stroke="${c}" stroke-width="${sw * 0.5}" transform="rotate(280)"/>
        <ellipse cx="0" cy="-16" rx="7" ry="16" fill="${c}" opacity="0.8" stroke="${c}" stroke-width="${sw * 0.5}" transform="rotate(320)"/>
        <circle cx="0" cy="0" r="4" fill="none" stroke="${c}" stroke-width="${sw}"/>
      </g>
    </g>
  `);
}

// 4. 紫玉兰 - 六瓣深紫
function svgZiYuLan(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <line x1="50" y1="95" x2="50" y2="48" stroke="${c}" stroke-width="${sw * 1.5}" opacity="0.5"/>
      <g transform="translate(50,48)">
        <ellipse cx="0" cy="-15" rx="8" ry="15" fill="${c}" opacity="0.85" stroke="none" transform="rotate(0)"/>
        <ellipse cx="0" cy="-15" rx="8" ry="15" fill="${c}" opacity="0.85" stroke="none" transform="rotate(60)"/>
        <ellipse cx="0" cy="-15" rx="8" ry="15" fill="${c}" opacity="0.85" stroke="none" transform="rotate(120)"/>
        <ellipse cx="0" cy="-15" rx="8" ry="15" fill="${c}" opacity="0.85" stroke="none" transform="rotate(180)"/>
        <ellipse cx="0" cy="-15" rx="8" ry="15" fill="${c}" opacity="0.85" stroke="none" transform="rotate(240)"/>
        <ellipse cx="0" cy="-15" rx="8" ry="15" fill="${c}" opacity="0.85" stroke="none" transform="rotate(300)"/>
        <circle cx="0" cy="0" r="4" fill="none" stroke="${c}" stroke-width="${sw}"/>
      </g>
    </g>
  `);
}

// 5. 樱花 - 五瓣，花瓣有缺刻
function svgYingHua(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M50 92 Q45 75 48 60" opacity="0.5"/>
      <g transform="translate(50,50)">
        <path d="M0,-14 C3,-14 7,-8 7,-4 C7,0 4,2 0,2 C-4,2 -7,0 -7,-4 C-7,-8 -3,-14 0,-14 Z" fill="${c}" opacity="0.85" stroke="none"/>
        <path d="M0,-14 C3,-14 7,-8 7,-4 C7,0 4,2 0,2 C-4,2 -7,0 -7,-4 C-7,-8 -3,-14 0,-14 Z" fill="${c}" opacity="0.85" stroke="none" transform="rotate(72)"/>
        <path d="M0,-14 C3,-14 7,-8 7,-4 C7,0 4,2 0,2 C-4,2 -7,0 -7,-4 C-7,-8 -3,-14 0,-14 Z" fill="${c}" opacity="0.85" stroke="none" transform="rotate(144)"/>
        <path d="M0,-14 C3,-14 7,-8 7,-4 C7,0 4,2 0,2 C-4,2 -7,0 -7,-4 C-7,-8 -3,-14 0,-14 Z" fill="${c}" opacity="0.85" stroke="none" transform="rotate(216)"/>
        <path d="M0,-14 C3,-14 7,-8 7,-4 C7,0 4,2 0,2 C-4,2 -7,0 -7,-4 C-7,-8 -3,-14 0,-14 Z" fill="${c}" opacity="0.85" stroke="none" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="2.5" fill="none" stroke="${c}" stroke-width="${sw}"/>
        <line x1="0" y1="0" x2="0" y2="-5" stroke="${c}" stroke-width="0.8"/>
        <line x1="0" y1="0" x2="4.8" y2="-1.6" stroke="${c}" stroke-width="0.8"/>
        <line x1="0" y1="0" x2="2.9" y2="4" stroke="${c}" stroke-width="0.8"/>
        <line x1="0" y1="0" x2="-2.9" y2="4" stroke="${c}" stroke-width="0.8"/>
        <line x1="0" y1="0" x2="-4.8" y2="-1.6" stroke="${c}" stroke-width="0.8"/>
      </g>
    </g>
  `);
}

// 6. 垂丝海棠 - 核心花，长红丝梗，花朵下垂（Hero）
function svgChuiSiHaiTang(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M50 10 Q48 25 42 38" stroke="${c}" stroke-width="${sw * 1.2}" opacity="0.7"/>
      <path d="M50 10 Q52 22 58 30 Q63 37 60 50" stroke="${c}" stroke-width="${sw * 1.2}" opacity="0.6"/>
      <path d="M50 10 Q38 20 28 28 Q20 35 22 48" stroke="${c}" stroke-width="${sw}" opacity="0.5"/>
      <path d="M50 10 Q62 18 72 24 Q80 30 78 44" stroke="${c}" stroke-width="${sw}" opacity="0.5"/>
      <line x1="42" y1="38" x2="42" y2="55" stroke="${c}" stroke-width="${sw * 0.8}" opacity="0.9"/>
      <line x1="60" y1="50" x2="60" y2="65" stroke="${c}" stroke-width="${sw * 0.8}" opacity="0.9"/>
      <line x1="22" y1="48" x2="22" y2="62" stroke="${c}" stroke-width="${sw * 0.8}" opacity="0.8"/>
      <line x1="78" y1="44" x2="78" y2="58" stroke="${c}" stroke-width="${sw * 0.8}" opacity="0.8"/>
      <g transform="translate(42,63) rotate(10)">
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.9" stroke="none"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.9" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.9" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.9" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.9" stroke="none" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="2.5" fill="${c}" stroke="none" opacity="0.7"/>
      </g>
      <g transform="translate(60,73) rotate(-8)">
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.85" stroke="none"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.85" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.85" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.85" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.85" stroke="none" transform="rotate(288)"/>
      </g>
      <g transform="translate(22,70) rotate(5)">
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.75" stroke="none"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.75" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.75" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.75" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.75" stroke="none" transform="rotate(288)"/>
      </g>
      <g transform="translate(78,66) rotate(-12)">
        <ellipse cx="0" cy="-5" rx="3.5" ry="5" fill="${c}" opacity="0.7" stroke="none"/>
        <ellipse cx="0" cy="-5" rx="3.5" ry="5" fill="${c}" opacity="0.7" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-5" rx="3.5" ry="5" fill="${c}" opacity="0.7" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-5" rx="3.5" ry="5" fill="${c}" opacity="0.7" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-5" rx="3.5" ry="5" fill="${c}" opacity="0.7" stroke="none" transform="rotate(288)"/>
      </g>
    </g>
  `);
}

// 7. 西府海棠 - 花朵向上
function svgXiFuHaiTang(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M50 90 Q50 70 50 55" stroke="${c}" stroke-width="${sw * 1.5}" opacity="0.5"/>
      <path d="M50 55 Q40 50 32 42" stroke="${c}" stroke-width="${sw}" opacity="0.5"/>
      <path d="M50 55 Q58 48 66 40" stroke="${c}" stroke-width="${sw}" opacity="0.5"/>
      <g transform="translate(50,40)">
        <ellipse cx="0" cy="-9" rx="5.5" ry="9" fill="${c}" opacity="0.9" stroke="none"/>
        <ellipse cx="0" cy="-9" rx="5.5" ry="9" fill="${c}" opacity="0.9" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-9" rx="5.5" ry="9" fill="${c}" opacity="0.9" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-9" rx="5.5" ry="9" fill="${c}" opacity="0.9" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-9" rx="5.5" ry="9" fill="${c}" opacity="0.9" stroke="none" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="3" fill="none" stroke="${c}" stroke-width="${sw}"/>
      </g>
      <g transform="translate(32,42)">
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none" transform="rotate(288)"/>
      </g>
      <g transform="translate(66,40)">
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none" transform="rotate(288)"/>
      </g>
    </g>
  `);
}

// 8. 碧桃 - 重瓣桃花
function svgBiTao(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M50 92 Q50 72 50 52" stroke="${c}" stroke-width="${sw * 1.5}" opacity="0.5"/>
      <g transform="translate(50,52)">
        <ellipse cx="0" cy="-10" rx="6" ry="10" fill="${c}" opacity="0.5" stroke="none"/>
        <ellipse cx="0" cy="-10" rx="6" ry="10" fill="${c}" opacity="0.5" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-10" rx="6" ry="10" fill="${c}" opacity="0.5" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-10" rx="6" ry="10" fill="${c}" opacity="0.5" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-10" rx="6" ry="10" fill="${c}" opacity="0.5" stroke="none" transform="rotate(288)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.7" stroke="none" transform="rotate(36)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.7" stroke="none" transform="rotate(108)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.7" stroke="none" transform="rotate(180)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.7" stroke="none" transform="rotate(252)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.7" stroke="none" transform="rotate(324)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.9" stroke="none" transform="rotate(18)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.9" stroke="none" transform="rotate(90)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.9" stroke="none" transform="rotate(162)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.9" stroke="none" transform="rotate(234)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.9" stroke="none" transform="rotate(306)"/>
        <circle cx="0" cy="0" r="3" fill="${c}" opacity="0.6" stroke="none"/>
      </g>
    </g>
  `);
}

// 9. 山桃花 - 单瓣五瓣浅粉
function svgShanTao(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M50 92 Q46 72 44 55" stroke="${c}" stroke-width="${sw * 1.5}" opacity="0.5"/>
      <path d="M50 92 Q55 70 58 55" stroke="${c}" stroke-width="${sw}" opacity="0.4"/>
      <g transform="translate(50,48)">
        <ellipse cx="0" cy="-9" rx="6" ry="9" fill="${c}" opacity="0.8" stroke="none"/>
        <ellipse cx="0" cy="-9" rx="6" ry="9" fill="${c}" opacity="0.8" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-9" rx="6" ry="9" fill="${c}" opacity="0.8" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-9" rx="6" ry="9" fill="${c}" opacity="0.8" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-9" rx="6" ry="9" fill="${c}" opacity="0.8" stroke="none" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="2" fill="${c}" opacity="0.6" stroke="none"/>
        <line x1="0" y1="0" x2="0" y2="-5" stroke="${c}" stroke-width="0.7" opacity="0.8"/>
        <line x1="0" y1="0" x2="4.8" y2="-1.6" stroke="${c}" stroke-width="0.7" opacity="0.8"/>
        <line x1="0" y1="0" x2="2.9" y2="4" stroke="${c}" stroke-width="0.7" opacity="0.8"/>
        <line x1="0" y1="0" x2="-2.9" y2="4" stroke="${c}" stroke-width="0.7" opacity="0.8"/>
        <line x1="0" y1="0" x2="-4.8" y2="-1.6" stroke="${c}" stroke-width="0.7" opacity="0.8"/>
      </g>
      <g transform="translate(44,55)">
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.65" stroke="none"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.65" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.65" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.65" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.65" stroke="none" transform="rotate(288)"/>
      </g>
    </g>
  `);
}

// 10. 连翘 - 四瓣金黄
function svgLianQiao(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M50 90 Q46 70 42 50 Q38 35 40 20" stroke="${c}" stroke-width="${sw * 1.2}" opacity="0.5"/>
      <path d="M50 90 Q54 70 58 52 Q62 35 60 20" stroke="${c}" stroke-width="${sw}" opacity="0.4"/>
      <g transform="translate(40,20)">
        <ellipse cx="0" cy="-8" rx="4" ry="8" fill="${c}" opacity="0.9" stroke="none"/>
        <ellipse cx="0" cy="-8" rx="4" ry="8" fill="${c}" opacity="0.9" stroke="none" transform="rotate(90)"/>
        <ellipse cx="0" cy="-8" rx="4" ry="8" fill="${c}" opacity="0.9" stroke="none" transform="rotate(180)"/>
        <ellipse cx="0" cy="-8" rx="4" ry="8" fill="${c}" opacity="0.9" stroke="none" transform="rotate(270)"/>
        <circle cx="0" cy="0" r="2" fill="${c}" opacity="0.7" stroke="none"/>
      </g>
      <g transform="translate(60,20)">
        <ellipse cx="0" cy="-7" rx="3.5" ry="7" fill="${c}" opacity="0.85" stroke="none"/>
        <ellipse cx="0" cy="-7" rx="3.5" ry="7" fill="${c}" opacity="0.85" stroke="none" transform="rotate(90)"/>
        <ellipse cx="0" cy="-7" rx="3.5" ry="7" fill="${c}" opacity="0.85" stroke="none" transform="rotate(180)"/>
        <ellipse cx="0" cy="-7" rx="3.5" ry="7" fill="${c}" opacity="0.85" stroke="none" transform="rotate(270)"/>
      </g>
      <g transform="translate(50,50)">
        <ellipse cx="0" cy="-6" rx="3" ry="6" fill="${c}" opacity="0.75" stroke="none"/>
        <ellipse cx="0" cy="-6" rx="3" ry="6" fill="${c}" opacity="0.75" stroke="none" transform="rotate(90)"/>
        <ellipse cx="0" cy="-6" rx="3" ry="6" fill="${c}" opacity="0.75" stroke="none" transform="rotate(180)"/>
        <ellipse cx="0" cy="-6" rx="3" ry="6" fill="${c}" opacity="0.75" stroke="none" transform="rotate(270)"/>
      </g>
    </g>
  `);
}

// 11-20: 简化版SVG（保持一致风格）
function svgZiYeLi(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M50 90 Q50 72 50 55" stroke="#6B3A7A" stroke-width="${sw * 1.5}" opacity="0.4"/>
      <path d="M30 80 Q40 65 50 55" stroke="#6B3A7A" stroke-width="${sw}" opacity="0.3"/>
      <g transform="translate(50,52)">
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.9" stroke="none"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.9" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.9" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.9" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.9" stroke="none" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="2.5" fill="none" stroke="${c}" stroke-width="${sw * 0.8}"/>
      </g>
      <ellipse cx="30" cy="75" rx="8" ry="12" fill="#6B3A7A" opacity="0.25" transform="rotate(-20,30,75)"/>
      <ellipse cx="68" cy="72" rx="7" ry="11" fill="#6B3A7A" opacity="0.2" transform="rotate(15,68,72)"/>
    </g>
  `);
}

function svgMuGua(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M50 92 Q40 75 35 60 Q32 48 38 40" stroke="${c}" stroke-width="${sw * 1.5}" opacity="0.5"/>
      <path d="M50 92 Q60 75 65 60 Q68 48 62 40" stroke="${c}" stroke-width="${sw}" opacity="0.4"/>
      <line x1="38" y1="30" x2="38" y2="40" stroke="${c}" stroke-width="${sw * 0.6}" opacity="0.7"/>
      <line x1="62" y1="28" x2="62" y2="40" stroke="${c}" stroke-width="${sw * 0.6}" opacity="0.7"/>
      <g transform="translate(38,25)">
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.9" stroke="none"/>
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.9" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.9" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.9" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.9" stroke="none" transform="rotate(288)"/>
      </g>
      <g transform="translate(62,22)">
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.85" stroke="none"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.85" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.85" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.85" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="0.85" stroke="none" transform="rotate(288)"/>
      </g>
      <path d="M25 60 L28 55 L31 60 L36 58 L33 63 L35 68 L30 66 L25 68 L27 63 Z" fill="${c}" opacity="0.3" stroke="none"/>
    </g>
  `);
}

function svgZiJing(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M50 92 Q50 75 50 60 Q50 45 50 30" stroke="${c}" stroke-width="${sw * 2}" opacity="0.4"/>
      <path d="M30 60 Q40 50 50 45" stroke="${c}" stroke-width="${sw}" opacity="0.4"/>
      <path d="M70 58 Q60 50 50 45" stroke="${c}" stroke-width="${sw}" opacity="0.4"/>
      <g transform="translate(50,42)">
        ${[0,30,60,90,120,150,180,210,240,270,300,330].map(r => `<path d="M0 0 C${3*Math.cos(r*Math.PI/180)} ${3*Math.sin(r*Math.PI/180)} ${8*Math.cos((r+20)*Math.PI/180)} ${8*Math.sin((r+20)*Math.PI/180)} ${7*Math.cos((r+40)*Math.PI/180)} ${7*Math.sin((r+40)*Math.PI/180)}" fill="${c}" opacity="0.85" stroke="none"/>`).join('')}
      </g>
      ${[40,50,60,38,52,58].map((x,i) => {
        const y = 28 + (i%3)*8;
        return `<g transform="translate(${x},${y})">
          <path d="M0,-5 C2,-5 4,-2 4,0 C4,2 2,3 0,3 C-2,3 -4,2 -4,0 C-4,-2 -2,-5 0,-5 Z" fill="${c}" opacity="${0.6+i*0.05}" stroke="none"/>
        </g>`;
      }).join('')}
    </g>
  `);
}

function svgMuLian(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <line x1="50" y1="95" x2="50" y2="52" stroke="${c}" stroke-width="${sw * 1.5}" opacity="0.5"/>
      <g transform="translate(50,52)">
        <ellipse cx="0" cy="-14" rx="6" ry="14" fill="${c}" opacity="0.75" stroke="none" transform="rotate(0)"/>
        <ellipse cx="0" cy="-14" rx="6" ry="14" fill="${c}" opacity="0.75" stroke="none" transform="rotate(45)"/>
        <ellipse cx="0" cy="-14" rx="6" ry="14" fill="${c}" opacity="0.75" stroke="none" transform="rotate(90)"/>
        <ellipse cx="0" cy="-14" rx="6" ry="14" fill="${c}" opacity="0.75" stroke="none" transform="rotate(135)"/>
        <ellipse cx="0" cy="-14" rx="6" ry="14" fill="${c}" opacity="0.75" stroke="none" transform="rotate(180)"/>
        <ellipse cx="0" cy="-14" rx="6" ry="14" fill="${c}" opacity="0.75" stroke="none" transform="rotate(225)"/>
        <ellipse cx="0" cy="-14" rx="6" ry="14" fill="${c}" opacity="0.75" stroke="none" transform="rotate(270)"/>
        <ellipse cx="0" cy="-14" rx="6" ry="14" fill="${c}" opacity="0.75" stroke="none" transform="rotate(315)"/>
        <ellipse cx="0" cy="0" rx="3" ry="6" fill="${c}" opacity="0.5" stroke="none"/>
      </g>
    </g>
  `);
}

function svgErQiao(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <line x1="50" y1="95" x2="50" y2="50" stroke="${c}" stroke-width="${sw * 1.5}" opacity="0.5"/>
      <g transform="translate(50,50)">
        <ellipse cx="0" cy="-13" rx="7" ry="13" fill="${c}" opacity="0.8" stroke="none" transform="rotate(0)"/>
        <ellipse cx="0" cy="-13" rx="7" ry="13" fill="${c}" opacity="0.8" stroke="none" transform="rotate(51.4)"/>
        <ellipse cx="0" cy="-13" rx="7" ry="13" fill="${c}" opacity="0.8" stroke="none" transform="rotate(102.8)"/>
        <ellipse cx="0" cy="-13" rx="7" ry="13" fill="${c}" opacity="0.8" stroke="none" transform="rotate(154.2)"/>
        <ellipse cx="0" cy="-13" rx="7" ry="13" fill="${c}" opacity="0.8" stroke="none" transform="rotate(205.6)"/>
        <ellipse cx="0" cy="-13" rx="7" ry="13" fill="${c}" opacity="0.8" stroke="none" transform="rotate(257)"/>
        <ellipse cx="0" cy="-13" rx="7" ry="13" fill="${c}" opacity="0.65" stroke="none" transform="rotate(25.7)"/>
        <circle cx="0" cy="0" r="3.5" fill="none" stroke="${c}" stroke-width="${sw}"/>
      </g>
    </g>
  `);
}

function svgYuJinXiang(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <line x1="50" y1="92" x2="50" y2="55" stroke="${c}" stroke-width="${sw * 1.5}" opacity="0.6"/>
      <path d="M30 80 Q38 72 50 68" stroke="${c}" stroke-width="${sw * 0.8}" opacity="0.4"/>
      <path d="M70 78 Q62 70 50 68" stroke="${c}" stroke-width="${sw * 0.8}" opacity="0.4"/>
      <g transform="translate(50,48)">
        <ellipse cx="0" cy="-11" rx="7" ry="11" fill="${c}" opacity="0.85" stroke="none" transform="rotate(0)"/>
        <ellipse cx="0" cy="-11" rx="7" ry="11" fill="${c}" opacity="0.85" stroke="none" transform="rotate(60)"/>
        <ellipse cx="0" cy="-11" rx="7" ry="11" fill="${c}" opacity="0.85" stroke="none" transform="rotate(120)"/>
        <ellipse cx="0" cy="-11" rx="7" ry="11" fill="${c}" opacity="0.85" stroke="none" transform="rotate(180)"/>
        <ellipse cx="0" cy="-11" rx="7" ry="11" fill="${c}" opacity="0.85" stroke="none" transform="rotate(240)"/>
        <ellipse cx="0" cy="-11" rx="7" ry="11" fill="${c}" opacity="0.85" stroke="none" transform="rotate(300)"/>
        <circle cx="0" cy="0" r="4" fill="${c}" opacity="0.4" stroke="none"/>
        <circle cx="0" cy="0" r="3" fill="none" stroke="${c}" stroke-width="${sw}"/>
      </g>
    </g>
  `);
}

function svgDingXiang(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M50 92 Q50 78 50 62" stroke="${c}" stroke-width="${sw * 1.5}" opacity="0.5"/>
      <path d="M50 62 Q40 52 32 42" stroke="${c}" stroke-width="${sw}" opacity="0.4"/>
      <path d="M50 62 Q60 52 68 42" stroke="${c}" stroke-width="${sw}" opacity="0.4"/>
      ${Array.from({length:18}, (_,i) => {
        const angle = (i/18)*360;
        const r = 15 + (i%3)*5;
        const x = 50 + r*Math.sin(angle*Math.PI/180);
        const y = 35 - r*Math.cos(angle*Math.PI/180)*0.5;
        const size2 = 2.5 + Math.random()*1;
        return `<ellipse cx="${x}" cy="${y}" rx="${size2}" ry="${size2}" fill="${c}" opacity="${0.6+Math.random()*0.3}" stroke="none" transform="rotate(${angle},${x},${y})"/>`;
      }).join('')}
    </g>
  `);
}

function svgMuDan(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M50 92 Q50 80 50 65" stroke="${c}" stroke-width="${sw * 1.5}" opacity="0.5"/>
      <path d="M25 90 Q35 78 50 72" stroke="${c}" stroke-width="${sw}" opacity="0.3"/>
      <path d="M75 88 Q65 77 50 72" stroke="${c}" stroke-width="${sw}" opacity="0.3"/>
      <g transform="translate(50,52)">
        ${[0,36,72,108,144,180,216,252,288,324].map(r => `<ellipse cx="0" cy="-12" rx="7" ry="12" fill="${c}" opacity="${0.4+Math.abs(Math.sin(r*Math.PI/180))*0.45}" stroke="none" transform="rotate(${r})"/>`).join('')}
        ${[18,54,90,126,162,198,234,270,306,342].map(r => `<ellipse cx="0" cy="-9" rx="6" ry="9" fill="${c}" opacity="${0.5+Math.abs(Math.cos(r*Math.PI/180))*0.4}" stroke="none" transform="rotate(${r})"/>`).join('')}
        ${[0,72,144,216,288].map(r => `<ellipse cx="0" cy="-6" rx="5" ry="6" fill="${c}" opacity="0.9" stroke="none" transform="rotate(${r})"/>`).join('')}
        <circle cx="0" cy="0" r="3" fill="${c}" opacity="0.6" stroke="none"/>
      </g>
    </g>
  `);
}

function svgShaoYao(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <line x1="50" y1="92" x2="50" y2="55" stroke="${c}" stroke-width="${sw * 1.5}" opacity="0.5"/>
      <path d="M32 85 Q38 75 45 68" stroke="${c}" stroke-width="${sw * 0.8}" opacity="0.35"/>
      <path d="M68 83 Q62 73 55 67" stroke="${c}" stroke-width="${sw * 0.8}" opacity="0.35"/>
      <g transform="translate(50,50)">
        ${[0,40,80,120,160,200,240,280,320].map(r => `<ellipse cx="0" cy="-11" rx="7" ry="11" fill="${c}" opacity="${0.45+Math.abs(Math.sin(r*Math.PI/180))*0.45}" stroke="none" transform="rotate(${r})"/>`).join('')}
        ${[20,60,100,140,180,220,260,300,340].map(r => `<ellipse cx="0" cy="-8" rx="5.5" ry="8" fill="${c}" opacity="0.8" stroke="none" transform="rotate(${r})"/>`).join('')}
        ${[0,72,144,216,288].map(r => `<ellipse cx="0" cy="-5" rx="4" ry="5" fill="${c}" opacity="0.95" stroke="none" transform="rotate(${r})"/>`).join('')}
        <circle cx="0" cy="0" r="3.5" fill="${c}" opacity="0.5" stroke="none"/>
      </g>
    </g>
  `);
}

function svgQiangWei(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <path d="M15 85 Q25 65 35 50 Q45 35 55 25 Q65 15 78 12" stroke="${c}" stroke-width="${sw * 1.2}" opacity="0.4"/>
      <path d="M15 85 Q20 70 28 60" stroke="${c}" stroke-width="${sw}" opacity="0.3"/>
      ${[{x:35,y:35},{x:55,y:22},{x:72,y:18},{x:45,y:48},{x:28,y:58}].map((p,i)=>`
        <g transform="translate(${p.x},${p.y})">
          <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="${0.7+i*0.04}" stroke="none"/>
          <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="${0.7+i*0.04}" stroke="none" transform="rotate(72)"/>
          <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="${0.7+i*0.04}" stroke="none" transform="rotate(144)"/>
          <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="${0.7+i*0.04}" stroke="none" transform="rotate(216)"/>
          <ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c}" opacity="${0.7+i*0.04}" stroke="none" transform="rotate(288)"/>
          <circle cx="0" cy="0" r="2" fill="${c}" opacity="0.6" stroke="none"/>
        </g>
      `).join('')}
      <circle cx="32" cy="48" r="1.5" fill="${c}" opacity="0.5"/>
      <circle cx="58" cy="38" r="1.5" fill="${c}" opacity="0.5"/>
    </g>
  `);
}

function svgDefault(size, c, sw, char) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <circle cx="50" cy="45" r="25" stroke="${c}" opacity="0.4"/>
      <text x="50" y="52" text-anchor="middle" font-size="20" fill="${c}" font-family="Noto Serif SC, serif" opacity="0.8">${char}</text>
    </g>
  `);
}

// 大尺寸垂丝海棠 Hero SVG
function createHeroSVG(colored = true) {
  const c = colored ? '#C0392B' : '#C8BCA8';
  return `<svg viewBox="0 0 200 220" width="160" height="175" xmlns="http://www.w3.org/2000/svg" class="hero-svg">
    <g fill="none" stroke="${c}" stroke-linecap="round" stroke-linejoin="round">
      <!-- 主枝 -->
      <path d="M100 20 Q95 50 85 75 Q78 95 80 115" stroke="${c}" stroke-width="2.5" opacity="0.6"/>
      <path d="M100 20 Q105 45 115 65 Q122 82 118 100" stroke="${c}" stroke-width="2" opacity="0.55"/>
      <path d="M100 20 Q75 40 58 58 Q45 72 48 90" stroke="${c}" stroke-width="1.8" opacity="0.5"/>
      <path d="M100 20 Q125 38 142 55 Q155 70 150 88" stroke="${c}" stroke-width="1.8" opacity="0.5"/>
      <path d="M85 75 Q68 80 55 88 Q44 95 46 108" stroke="${c}" stroke-width="1.5" opacity="0.45"/>
      <path d="M115 65 Q132 70 145 78 Q155 86 152 98" stroke="${c}" stroke-width="1.5" opacity="0.45"/>
      <!-- 红丝梗 1 -->
      <line x1="80" y1="115" x2="80" y2="145" stroke="${c}" stroke-width="1.2" opacity="0.85"/>
      <!-- 花1 -->
      <g transform="translate(80,150) rotate(8)">
        <ellipse cx="0" cy="-9" rx="6" ry="9" fill="${c}" opacity="0.9" stroke="none"/>
        <ellipse cx="0" cy="-9" rx="6" ry="9" fill="${c}" opacity="0.9" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-9" rx="6" ry="9" fill="${c}" opacity="0.9" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-9" rx="6" ry="9" fill="${c}" opacity="0.9" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-9" rx="6" ry="9" fill="${c}" opacity="0.9" stroke="none" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="3.5" fill="${c}" opacity="0.5" stroke="none"/>
        <line x1="0" y1="0" x2="0" y2="-6" stroke="${c}" stroke-width="0.8" opacity="0.9"/>
        <line x1="0" y1="0" x2="5.7" y2="-1.9" stroke="${c}" stroke-width="0.8" opacity="0.9"/>
        <line x1="0" y1="0" x2="3.5" y2="4.8" stroke="${c}" stroke-width="0.8" opacity="0.9"/>
        <line x1="0" y1="0" x2="-3.5" y2="4.8" stroke="${c}" stroke-width="0.8" opacity="0.9"/>
        <line x1="0" y1="0" x2="-5.7" y2="-1.9" stroke="${c}" stroke-width="0.8" opacity="0.9"/>
      </g>
      <!-- 红丝梗 2 -->
      <line x1="118" y1="100" x2="118" y2="132" stroke="${c}" stroke-width="1.2" opacity="0.85"/>
      <!-- 花2 -->
      <g transform="translate(118,140) rotate(-6)">
        <ellipse cx="0" cy="-10" rx="7" ry="10" fill="${c}" opacity="0.85" stroke="none"/>
        <ellipse cx="0" cy="-10" rx="7" ry="10" fill="${c}" opacity="0.85" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-10" rx="7" ry="10" fill="${c}" opacity="0.85" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-10" rx="7" ry="10" fill="${c}" opacity="0.85" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-10" rx="7" ry="10" fill="${c}" opacity="0.85" stroke="none" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="4" fill="${c}" opacity="0.45" stroke="none"/>
      </g>
      <!-- 红丝梗 3 -->
      <line x1="48" y1="90" x2="48" y2="118" stroke="${c}" stroke-width="1" opacity="0.75"/>
      <!-- 花3 (花苞) -->
      <g transform="translate(48,122)">
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.7" stroke="none"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.7" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.7" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.7" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.7" stroke="none" transform="rotate(288)"/>
      </g>
      <!-- 红丝梗 4 -->
      <line x1="150" y1="88" x2="150" y2="115" stroke="${c}" stroke-width="1" opacity="0.75"/>
      <g transform="translate(150,122) rotate(10)">
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.65" stroke="none"/>
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.65" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.65" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.65" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="${c}" opacity="0.65" stroke="none" transform="rotate(288)"/>
      </g>
      <!-- 红丝梗 5 -->
      <line x1="46" y1="108" x2="46" y2="138" stroke="${c}" stroke-width="1" opacity="0.7"/>
      <g transform="translate(46,145) rotate(5)">
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.8" stroke="none"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.8" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.8" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.8" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-8" rx="5" ry="8" fill="${c}" opacity="0.8" stroke="none" transform="rotate(288)"/>
      </g>
      <!-- 红丝梗 6 -->
      <line x1="152" y1="98" x2="152" y2="128" stroke="${c}" stroke-width="1" opacity="0.7"/>
      <g transform="translate(152,136) rotate(-8)">
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none" transform="rotate(72)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none" transform="rotate(144)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none" transform="rotate(216)"/>
        <ellipse cx="0" cy="-7" rx="4.5" ry="7" fill="${c}" opacity="0.75" stroke="none" transform="rotate(288)"/>
      </g>
      <!-- 叶片 -->
      <ellipse cx="92" cy="88" rx="8" ry="14" fill="${c}" opacity="0.18" transform="rotate(-30,92,88)"/>
      <ellipse cx="108" cy="82" rx="7" ry="12" fill="${c}" opacity="0.15" transform="rotate(20,108,82)"/>
      <ellipse cx="70" cy="78" rx="6" ry="10" fill="${c}" opacity="0.14" transform="rotate(-45,70,78)"/>
    </g>
  </svg>`;
}

// 21. 梨花 - 五瓣白花，紫红花药点缀
function svgLiHua(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <line x1="50" y1="95" x2="50" y2="58" stroke="${c}" stroke-width="${sw}"/>
      <line x1="50" y1="75" x2="35" y2="65" stroke="${c}" stroke-width="${sw * 0.8}"/>
    </g>
    <g transform="translate(50,46)">
      ${[0,72,144,216,288].map(a => `
        <ellipse cx="0" cy="-13" rx="7" ry="11" fill="${c}" opacity="0.75" stroke="${c}" stroke-width="${sw * 0.7}" transform="rotate(${a})"/>
      `).join('')}
      <circle cx="0" cy="0" r="4" fill="${c}" opacity="0.9"/>
      ${[0,45,90,135,180,225,270,315].map(a => `
        <line x1="0" y1="0" x2="${4.5*Math.sin(a*Math.PI/180)}" y2="${-4.5*Math.cos(a*Math.PI/180)}" stroke="${c}" stroke-width="0.8" opacity="0.8"/>
      `).join('')}
    </g>
    <g transform="translate(32,66)">
      ${[0,72,144,216,288].map(a => `
        <ellipse cx="0" cy="-8" rx="4.5" ry="6.5" fill="${c}" opacity="0.55" stroke="${c}" stroke-width="${sw * 0.5}" transform="rotate(${a})"/>
      `).join('')}
    </g>
  `);
}

// 22. 李花 - 五瓣细碎白花，黄色花药
function svgLiHuaBai(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <line x1="50" y1="95" x2="50" y2="55"/>
      <line x1="50" y1="70" x2="30" y2="58"/>
      <line x1="50" y1="62" x2="68" y2="52"/>
    </g>
    <g transform="translate(50,44)">
      ${[0,72,144,216,288].map(a => `
        <ellipse cx="0" cy="-10" rx="5" ry="8" fill="${c}" opacity="0.7" stroke="${c}" stroke-width="${sw * 0.6}" transform="rotate(${a})"/>
      `).join('')}
      <circle cx="0" cy="0" r="3" fill="${c}" opacity="0.85"/>
    </g>
    <g transform="translate(28,50)">
      ${[0,72,144,216,288].map(a => `
        <ellipse cx="0" cy="-7" rx="3.5" ry="5.5" fill="${c}" opacity="0.55" stroke="${c}" stroke-width="${sw * 0.5}" transform="rotate(${a})"/>
      `).join('')}
    </g>
    <g transform="translate(68,44)">
      ${[0,72,144,216,288].map(a => `
        <ellipse cx="0" cy="-7" rx="3.5" ry="5.5" fill="${c}" opacity="0.55" stroke="${c}" stroke-width="${sw * 0.5}" transform="rotate(${a})"/>
      `).join('')}
    </g>
  `);
}

// 23. 杏花 - 五瓣，深色花萼反折
function svgXingHua(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <line x1="50" y1="95" x2="50" y2="58"/>
      <line x1="50" y1="72" x2="33" y2="62"/>
    </g>
    <g transform="translate(50,46)">
      ${[0,72,144,216,288].map(a => `
        <ellipse cx="${11*Math.sin(a*Math.PI/180)}" cy="${-11*Math.cos(a*Math.PI/180)}" rx="2" ry="4" fill="${c}" opacity="0.85" stroke="none" transform="rotate(${a},${11*Math.sin(a*Math.PI/180)},${-11*Math.cos(a*Math.PI/180)})"/>
      `).join('')}
      ${[0,72,144,216,288].map(a => `
        <ellipse cx="0" cy="-12" rx="6.5" ry="10" fill="${c}" opacity="0.72" stroke="${c}" stroke-width="${sw * 0.7}" transform="rotate(${a})"/>
      `).join('')}
      <circle cx="0" cy="0" r="3.5" fill="${c}" opacity="0.9"/>
    </g>
    <g transform="translate(31,53)">
      ${[0,72,144,216,288].map(a => `
        <ellipse cx="0" cy="-8" rx="4" ry="7" fill="${c}" opacity="0.55" stroke="${c}" stroke-width="${sw * 0.5}" transform="rotate(${a})"/>
      `).join('')}
    </g>
  `);
}

// 24. 含笑花 - 半开花瓣，肥厚直立
function svgHanXiao(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <line x1="50" y1="95" x2="50" y2="60"/>
      <ellipse cx="60" cy="75" rx="10" ry="5" fill="${c}" opacity="0.18" stroke="${c}" stroke-width="${sw * 0.6}" transform="rotate(-20,60,75)"/>
      <ellipse cx="40" cy="72" rx="9" ry="4.5" fill="${c}" opacity="0.15" stroke="${c}" stroke-width="${sw * 0.6}" transform="rotate(15,40,72)"/>
    </g>
    <g transform="translate(50,46)">
      <ellipse cx="-5" cy="-14" rx="5" ry="12" fill="${c}" opacity="0.8" stroke="${c}" stroke-width="${sw * 0.8}" transform="rotate(-15)"/>
      <ellipse cx="5" cy="-14" rx="5" ry="12" fill="${c}" opacity="0.8" stroke="${c}" stroke-width="${sw * 0.8}" transform="rotate(15)"/>
      <ellipse cx="-10" cy="-10" rx="4.5" ry="10" fill="${c}" opacity="0.65" stroke="${c}" stroke-width="${sw * 0.7}" transform="rotate(-35)"/>
      <ellipse cx="10" cy="-10" rx="4.5" ry="10" fill="${c}" opacity="0.65" stroke="${c}" stroke-width="${sw * 0.7}" transform="rotate(35)"/>
      <ellipse cx="0" cy="-6" rx="4" ry="9" fill="${c}" opacity="0.55" stroke="${c}" stroke-width="${sw * 0.6}" transform="rotate(0)"/>
      <circle cx="0" cy="0" r="3" fill="${c}" opacity="0.9"/>
    </g>
  `);
}

// 25. 辛夷 - 毛笔形花苞，直立枝
function svgXinYi(size, c, sw) {
  return svgWrap(size, `
    <g fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round">
      <line x1="50" y1="95" x2="50" y2="30"/>
      <line x1="50" y1="70" x2="32" y2="55"/>
    </g>
    <g transform="translate(50,24)">
      <ellipse cx="-4" cy="-10" rx="5" ry="14" fill="${c}" opacity="0.85" stroke="${c}" stroke-width="${sw * 0.8}" transform="rotate(-12)"/>
      <ellipse cx="4" cy="-10" rx="5" ry="14" fill="${c}" opacity="0.85" stroke="${c}" stroke-width="${sw * 0.8}" transform="rotate(12)"/>
      <ellipse cx="-8" cy="-6" rx="4" ry="10" fill="${c}" opacity="0.6" stroke="${c}" stroke-width="${sw * 0.7}" transform="rotate(-25)"/>
      <ellipse cx="8" cy="-6" rx="4" ry="10" fill="${c}" opacity="0.6" stroke="${c}" stroke-width="${sw * 0.7}" transform="rotate(25)"/>
      <ellipse cx="0" cy="-16" rx="3" ry="5" fill="${c}" opacity="0.9" stroke="none"/>
    </g>
    <g transform="translate(30,48)">
      <ellipse cx="-3" cy="-8" rx="3.5" ry="9" fill="${c}" opacity="0.65" stroke="${c}" stroke-width="${sw * 0.6}" transform="rotate(-10)"/>
      <ellipse cx="3" cy="-8" rx="3.5" ry="9" fill="${c}" opacity="0.65" stroke="${c}" stroke-width="${sw * 0.6}" transform="rotate(10)"/>
    </g>
    <ellipse cx="62" cy="62" rx="7" ry="11" fill="${c}" opacity="0.15" transform="rotate(-20,62,62)"/>
    <ellipse cx="65" cy="74" rx="6" ry="9" fill="${c}" opacity="0.12" transform="rotate(10,65,74)"/>
  `);
}

// 生成印章SVG（标本墙右下角小印章）
function createStampSVG(date, colored = true) {
  const c = colored ? '#C0392B' : '#B8A990';
  return `<svg viewBox="0 0 60 60" width="34" height="34" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="26" fill="none" stroke="${c}" stroke-width="1.5" stroke-dasharray="3 1.5" opacity="0.85"/>
    <circle cx="30" cy="30" r="20" fill="none" stroke="${c}" stroke-width="0.7" opacity="0.45"/>
    <text x="30" y="27" text-anchor="middle" font-size="7.5" fill="${c}" font-family="Noto Serif SC, serif" opacity="0.9" letter-spacing="0.5">春事</text>
    <text x="30" y="38" text-anchor="middle" font-size="7.5" fill="${c}" font-family="Noto Serif SC, serif" opacity="0.9" letter-spacing="0.5">已记</text>
  </svg>`;
}

// 生成博物馆标本页面专用大印章
function createLargeStampSVG(date) {
  const c = '#C0392B';
  return `<svg viewBox="0 0 120 120" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="52" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="4 2.5" opacity="0.75"/>
    <circle cx="60" cy="60" r="44" fill="none" stroke="${c}" stroke-width="0.8" opacity="0.4"/>
    <text x="60" y="52" text-anchor="middle" font-size="13" fill="${c}" font-family="Noto Serif SC, serif" font-weight="500" opacity="0.9" letter-spacing="3">遇见</text>
    <text x="60" y="72" text-anchor="middle" font-size="10" fill="${c}" font-family="Noto Serif SC, serif" opacity="0.8" letter-spacing="1">${date}</text>
  </svg>`;
}
