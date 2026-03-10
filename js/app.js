// ===== ANALYTICS (Umami) =====
function track(event, props) {
  if (typeof umami === 'undefined') return;
  try {
    umami.track(event, props);
  } catch(e) {}
}

// ===== STATE =====
const STATE = {
  currentPage: 'home',
  quizHistory: [],
  quizCurrentNode: null,
  quizStep: 0,
  quizResult: null,
  collectionFilter: 'all',
  unlockedFlowers: {},  // { id: 'YYYY.MM.DD' }
};

// ===== UTILITIES =====
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `${r},${g},${b}`;
}

// ===== LOCALSTORAGE =====
const STORAGE_KEY = 'chunTianHuaHuiKai_v1';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      STATE.unlockedFlowers = JSON.parse(raw);
    }
  } catch(e) {}
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE.unlockedFlowers));
  } catch(e) {}
}

function unlockFlower(id) {
  if (!STATE.unlockedFlowers[id]) {
    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')}`;
    STATE.unlockedFlowers[id] = dateStr;
    saveProgress();
    // 检查新成就
    setTimeout(() => checkNewAchievements(), 600);
    return true;
  }
  return false;
}

function isUnlocked(id) {
  return !!STATE.unlockedFlowers[id];
}

function getUnlockDate(id) {
  return STATE.unlockedFlowers[id] || null;
}

// ── 采集者姓名 ────────────────────────────────────────
const COLLECTOR_KEY = 'chunTianHuaHuiKai_collector';

function getCollectorName() {
  try { return localStorage.getItem(COLLECTOR_KEY) || ''; } catch(e) { return ''; }
}

function setCollectorName(name) {
  try { localStorage.setItem(COLLECTOR_KEY, name.trim()); } catch(e) {}
}

// ===== ACHIEVEMENTS =====
const ACH_KEY = 'chunTianHuaHuiKai_achievements_v1';

function loadAchievements() {
  try {
    const raw = localStorage.getItem(ACH_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch(e) { return {}; }
}

function saveAchievements(data) {
  try { localStorage.setItem(ACH_KEY, JSON.stringify(data)); } catch(e) {}
}

function getUnlockedCount() {
  return Object.keys(STATE.unlockedFlowers).length;
}

function checkNewAchievements() {
  if (typeof ACHIEVEMENTS === 'undefined') return;
  const count = getUnlockedCount();
  const earned = loadAchievements();
  const newlyEarned = [];

  ACHIEVEMENTS.forEach(ach => {
    if (!earned[ach.id] && ach.condition(count, STATE.unlockedFlowers)) {
      earned[ach.id] = new Date().toLocaleDateString('zh-CN');
      newlyEarned.push(ach);
    }
  });

  if (newlyEarned.length > 0) {
    saveAchievements(earned);
    newlyEarned.forEach((ach, i) => {
      setTimeout(() => showAchievementToast(ach), i * 1200);
    });
  }
}

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [783.99, 1046.50, 1318.51]; // G5, C6, E6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.18;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.1);
      osc.start(t);
      osc.stop(t + 1.2);
    });
  } catch(e) {}
}

function showAchievementToast(ach) {
  const existing = document.getElementById('achievement-toast');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.id = 'achievement-toast';
  el.innerHTML = `
    <div class="ach-toast-icon">${ach.icon}</div>
    <div class="ach-toast-body">
      <div class="ach-toast-tag">成 就 解 锁</div>
      <div class="ach-toast-title">${ach.title}</div>
      <div class="ach-toast-desc">${ach.desc}</div>
      <div class="ach-toast-hint">轻触收纳入册</div>
    </div>
  `;
  el.className = 'achievement-toast';
  el.onclick = () => {
    el.style.transition = 'transform 320ms cubic-bezier(0.4,0,1,1)';
    el.style.transform = 'translateX(-50%) translateY(-110%)';
    setTimeout(() => el.remove(), 330);
  };
  document.body.appendChild(el);

  playChime();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add('show'));
  });

  setTimeout(() => {
    if (!el.parentNode) return;
    el.style.transition = 'transform 380ms cubic-bezier(0.4,0,1,1)';
    el.style.transform = 'translateX(-50%) translateY(-110%)';
    setTimeout(() => el.remove(), 400);
  }, 4500);
}

function openAchievementsPanel() {
  if (typeof ACHIEVEMENTS === 'undefined') return;
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!overlay || !content) return;

  const count = getUnlockedCount();
  const earned = loadAchievements();

  const rows = ACHIEVEMENTS.map(ach => {
    const isEarned = !!earned[ach.id];
    const r = (typeof RARITY_CONFIG !== 'undefined') ? RARITY_CONFIG[ach.rarity] : {};
    const color = isEarned ? (r.color || '#7D7168') : '#BDB8B0';
    const border = isEarned ? (r.border || '#C4BAB0') : '#DEDAD6';
    const label = r.label || '';
    const progressPct = ach.threshold ? Math.min(100, Math.round(count / ach.threshold * 100)) : 0;
    return `
      <div class="ach-row ${isEarned ? 'earned' : 'locked'}">
        <div class="ach-badge" style="color:${color};border-color:${border}">${ach.icon}</div>
        <div class="ach-info">
          <div class="ach-title-row">
            <span class="ach-title" style="color:${isEarned ? 'var(--ink)' : 'var(--ink-faint)'}">${isEarned ? ach.title : '· · ·'}</span>
            <span class="ach-rarity-tag" style="color:${color};border-color:${border}">${label}</span>
          </div>
          <div class="ach-desc">${isEarned ? ach.desc : (ach.threshold ? `还差 ${Math.max(0, ach.threshold - count)} 种` : '待解锁')}</div>
          ${ach.threshold && !isEarned ? `
            <div class="ach-progress-bar">
              <div class="ach-progress-fill" style="width:${progressPct}%;background:${color}"></div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  const earnedCount = Object.keys(earned).length;

  content.innerHTML = `
    <div class="modal-handle"></div>
    <div class="ach-panel-header">
      <div class="ach-panel-title">春事录</div>
      <div class="ach-panel-sub">${earnedCount} / ${ACHIEVEMENTS.length} · 已成册</div>
    </div>
    <div class="ach-list">${rows}</div>
    <div style="padding:16px 24px 40px">
      <button class="btn-secondary" onclick="closeModal()" style="width:100%">收册</button>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ===== NAVIGATION =====
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const targetPage = document.getElementById(`page-${page}`);
  const targetNav = document.querySelector(`[data-page="${page}"]`);

  if (targetPage) targetPage.classList.add('active');
  if (targetNav) targetNav.classList.add('active');

  STATE.currentPage = page;

  if (page === 'collection') renderCollection();
  if (page === 'quiz') initCalendar();
}

// ===== HOME PAGE =====
function renderHomePage() {
  const heroWrap = document.getElementById('hero-svg-wrap');
  if (heroWrap) heroWrap.innerHTML = '<img src="icons/icon-logo.png" alt="春天花会开" class="hero-logo-img">';

  renderCollectorWidget();
}

function renderCollectorWidget() {
  const existing = document.getElementById('collector-widget');
  if (existing) existing.remove();

  const name = getCollectorName();
  const widget = document.createElement('div');
  widget.id = 'collector-widget';
  widget.className = 'collector-widget';

  if (name) {
    widget.innerHTML = `
      <span class="collector-label">采集者</span>
      <span class="collector-name" id="collector-display">${name}</span>
      <button class="collector-edit-btn" onclick="openCollectorEdit()">编辑</button>
    `;
  } else {
    widget.innerHTML = `
      <button class="collector-set-btn" onclick="openCollectorEdit()">+ 设置采集者姓名</button>
    `;
  }

  // 插入到首页 hero CTA 下方
  const heroCta = document.querySelector('#page-home .hero-cta');
  if (heroCta) heroCta.after(widget);
}

function openCollectorEdit() {
  const current = getCollectorName();
  const overlay = document.createElement('div');
  overlay.id = 'collector-edit-overlay';
  overlay.className = 'collector-edit-overlay';
  overlay.innerHTML = `
    <div class="collector-edit-sheet">
      <div class="collector-edit-title">采集者姓名</div>
      <input class="collector-edit-input" id="collector-input" type="text"
        placeholder="你的名字或昵称" value="${current}" maxlength="20" autocomplete="off">
      <div class="collector-edit-hint">将显示在分享卡片上，留空则不显示</div>
      <div class="collector-edit-actions">
        <button class="collector-cancel-btn" onclick="closeCollectorEdit()">取消</button>
        <button class="collector-confirm-btn" onclick="saveCollectorEdit()">确认</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));
  setTimeout(() => document.getElementById('collector-input')?.focus(), 300);
}

function closeCollectorEdit() {
  const overlay = document.getElementById('collector-edit-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 280);
  }
}

function saveCollectorEdit() {
  const input = document.getElementById('collector-input');
  if (input) setCollectorName(input.value);
  closeCollectorEdit();
  setTimeout(() => renderCollectorWidget(), 300);
}

// ===== QUIZ =====
function startQuiz() {
  STATE.quizHistory = [];
  STATE.quizCurrentNode = QUIZ_TREE;
  STATE.quizStep = 0;
  STATE.quizResult = null;
  navigateTo('quiz');
  switchQuizTab('guide');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const body = document.getElementById('quiz-body');
  const node = STATE.quizCurrentNode;

  if (!node) return;

  const stepNum = STATE.quizStep + 1;
  const maxSteps = 5;

  // Progress dots
  const dots = Array.from({length: maxSteps}, (_, i) =>
    `<div class="quiz-progress-dot ${i < STATE.quizStep ? 'done' : ''}"></div>`
  ).join('');

  const optionIcons = ['A', 'B', 'C', 'D', 'E'];

  body.innerHTML = `
    <div class="quiz-progress">${dots}</div>
    <div class="quiz-question-wrap">
      <div class="quiz-step-num">STEP ${stepNum}</div>
      <div class="quiz-question">${node.question}</div>
      <div class="quiz-options">
        ${node.options.map((opt, i) => `
          <button class="quiz-option" onclick="selectQuizOption(${i})">
            <div class="quiz-option-content">
              <span class="quiz-option-icon">${optionIcons[i] || i+1}</span>
              <span>${opt.label}</span>
            </div>
          </button>
        `).join('')}
      </div>
      ${STATE.quizHistory.length > 0 ? `
        <button class="quiz-back-btn" onclick="quizGoBack()">
          ← 上一步
        </button>
      ` : ''}
    </div>
  `;
}

function selectQuizOption(index) {
  const node = STATE.quizCurrentNode;
  const option = node.options[index];

  STATE.quizHistory.push(STATE.quizCurrentNode);
  STATE.quizStep++;

  if (option.result) {
    // Found a result
    STATE.quizResult = option.result;
    renderQuizResult(option.result);
  } else if (option.next) {
    STATE.quizCurrentNode = option.next;
    renderQuizQuestion();
  }
}

function quizGoBack() {
  if (STATE.quizHistory.length === 0) return;
  STATE.quizCurrentNode = STATE.quizHistory.pop();
  STATE.quizStep--;
  if (STATE.quizResult) STATE.quizResult = null;
  renderQuizQuestion();
}

function renderQuizResult(flowerId) {
  const flower = findFlowerById(flowerId);
  if (!flower) return;
  track('quiz_result', { flower_id: flowerId, flower_name: flower.name, period: flower.period });

  const body = document.getElementById('quiz-body');
  const alreadyUnlocked = isUnlocked(flower.id);
  const unlockDate = getUnlockDate(flower.id);

  const periodColors = {
    '早春': { color: '#8B6914', bg: 'rgba(249,217,35,0.15)', border: '#F9D923' },
    '仲春': { color: '#8B3060', bg: 'rgba(255,183,197,0.15)', border: '#FFB7C5' },
    '暮春': { color: '#7B1547', bg: 'rgba(255,107,157,0.15)', border: '#FF6B9D' },
  };
  const pc = periodColors[flower.period] || periodColors['仲春'];

  body.innerHTML = `
    <div class="result-card">
      <div class="result-flower-hero" style="--result-color: ${flower.colorHex}">
        <div class="result-svg-wrap">
          ${createFlowerSVG(flower, 120, true)}
        </div>
        <div class="result-name">${flower.name}</div>
        <div class="result-period-badge" style="color:${pc.color};background:${pc.bg};border-color:${pc.border}">
          ${flower.period}
        </div>
        <div class="result-story">${flower.story}</div>
        ${alreadyUnlocked ? `<div style="text-align:center;margin-top:16px;font-size:11px;color:var(--ink-faint);letter-spacing:0.2em">遇见于 ${unlockDate}</div>` : ''}
      </div>
      <div class="result-actions">
        <button class="btn-checkin ${alreadyUnlocked ? 'checked' : ''}"
                id="checkin-btn"
                onclick="checkInFlower(${flower.id})">
          ${alreadyUnlocked ? '✓ 已打卡' : '识别并打卡 · 加入标本墙'}
        </button>
        <button class="btn-restart" onclick="startQuiz()">重新识别</button>
        <button class="btn-restart" onclick="navigateTo('home')">返回首页</button>
      </div>
    </div>
  `;
}

function checkInFlower(id) {
  const btn = document.getElementById('checkin-btn');
  const isNew = unlockFlower(id);
  const flower = FLOWERS_DATA.find(f => f.id === id);
  if (isNew) {
    playChime();
    track('flower_checkin', { flower_id: id, flower_name: flower?.name, period: flower?.period, total: getUnlockedCount() });
  }

  if (btn) {
    btn.classList.add('checked');
    btn.textContent = '✓ 已打卡';
    if (isNew) {
      btn.style.animation = 'none';
      btn.offsetHeight; // reflow
      btn.style.animation = 'stampIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
  }

  const flowerName = FLOWERS_DATA.find(f=>f.id===id)?.name;
  showToast(isNew ? `${flowerName} 已加入标本墙` : '已在标本墙中');

  if (isNew) {
    setTimeout(() => {
      navigateTo('collection');
      setTimeout(() => openSpecimenDetail(id), 300);
    }, 900);
  }
}

// ===== PHENOLOGY CALENDAR =====
// 每朵花的盛花月份（手动标注，基于 blooming_period 字段）
const FLOWER_MONTHS = {
  1:  [2, 3, 4],       // 迎春花
  2:  [1, 2, 3],       // 梅花
  3:  [2, 3],          // 玉兰
  4:  [3, 4],          // 紫玉兰
  5:  [3, 4],          // 樱花
  6:  [3, 4],          // 垂丝海棠
  7:  [4],             // 西府海棠
  8:  [3, 4],          // 碧桃
  9:  [2, 3],          // 山桃花
  10: [3, 4],          // 连翘
  11: [3, 4],          // 紫叶李
  12: [3, 4],          // 木瓜海棠
  13: [3, 4],          // 紫荆
  14: [4, 5],          // 木莲
  15: [3, 4],          // 二乔玉兰
  16: [3, 4, 5],       // 郁金香
  17: [4, 5],          // 丁香
  18: [4, 5],          // 牡丹
  19: [4, 5],          // 芍药
  20: [4, 5, 6],       // 蔷薇
  21: [3, 4],          // 梨花
  22: [3],             // 李花
  23: [3],             // 杏花
  24: [3, 4, 5],       // 含笑花
};

const SEASON_HINTS = {
  2: { solar: '雨水 · 惊蛰', desc: '大地回春，早花争先，迎春梅花率先绽放' },
  3: { solar: '春分 · 清明', desc: '桃李争艳，百花齐放，是一年中最繁盛的时节' },
  4: { solar: '谷雨', desc: '谷雨三朝看牡丹，海棠丁香相继开放' },
  5: { solar: '立夏', desc: '春尽夏来，芍药蔷薇是春天最后的告别' },
};

let calendarActiveMonth = new Date().getMonth() + 1;
if (calendarActiveMonth < 2) calendarActiveMonth = 2;
if (calendarActiveMonth > 5) calendarActiveMonth = 5;

function initCalendar() {
  const bar = document.getElementById('calendar-month-bar');
  if (!bar) return;

  bar.querySelectorAll('.cal-month-btn').forEach(btn => {
    const m = parseInt(btn.dataset.month);
    btn.classList.toggle('active', m === calendarActiveMonth);
    btn.onclick = () => {
      calendarActiveMonth = m;
      bar.querySelectorAll('.cal-month-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCalendarGrid(m);
    };
  });

  renderCalendarGrid(calendarActiveMonth);
}

function renderCalendarGrid(month) {
  const grid = document.getElementById('calendar-flower-grid');
  const hint = document.getElementById('calendar-season-hint');
  if (!grid) return;

  const sh = SEASON_HINTS[month] || {};
  if (hint) {
    hint.innerHTML = `<span class="cal-solar-term">${sh.solar || ''}</span><span class="cal-season-desc">${sh.desc || ''}</span>`;
  }

  const flowers = FLOWERS_DATA.filter(f => (FLOWER_MONTHS[f.id] || []).includes(month));

  grid.innerHTML = flowers.map(f => {
    const unlocked = isUnlocked(f.id);
    return `
      <div class="cal-flower-card" onclick="openSpecimenDetail(${f.id})">
        <div class="cal-flower-svg" style="--cal-color:${f.colorHex}">
          ${createFlowerSVG(f, 52, unlocked)}
        </div>
        <div class="cal-flower-name">${f.name}</div>
        <div class="cal-flower-period">${f.blooming_period ? f.blooming_period.split('，')[0].split('（')[0] : ''}</div>
        ${unlocked ? `
          <div class="cal-flower-stamp">
            <svg viewBox="0 0 36 36" width="36" height="36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="${f.colorHex}" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.7"/>
              <circle cx="18" cy="18" r="11" fill="none" stroke="${f.colorHex}" stroke-width="0.8" opacity="0.5"/>
              <text x="18" y="22" text-anchor="middle" font-family="Noto Serif SC, serif" font-size="10" fill="${f.colorHex}" opacity="0.9">遇见</text>
            </svg>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function switchQuizTab(tab) {
  const cal = document.getElementById('panel-calendar');
  const guide = document.getElementById('panel-guide');
  if (cal) cal.style.display = tab === 'calendar' ? '' : 'none';
  if (guide) guide.style.display = tab === 'guide' ? '' : 'none';
  if (tab === 'calendar') initCalendar();
}

// ===== COLLECTION WALL =====
function renderCollection() {
  const grid = document.getElementById('collection-grid');
  const countEl = document.getElementById('unlocked-count');

  const unlockedCount = Object.keys(STATE.unlockedFlowers).length;
  if (countEl) countEl.textContent = unlockedCount;

  let flowers = FLOWERS_DATA;
  if (STATE.collectionFilter !== 'all') {
    const periodMap = { early: '早春', mid: '仲春', late: '暮春' };
    flowers = FLOWERS_DATA.filter(f => f.period === periodMap[STATE.collectionFilter]);
  }

  if (!grid) return;

  grid.innerHTML = flowers.map(f => {
    const unlocked = isUnlocked(f.id);
    const date = getUnlockDate(f.id);
    return `
      <div class="specimen-cell ${unlocked ? 'unlocked' : ''}"
           onclick="openSpecimenDetail(${f.id})"
           data-id="${f.id}">
        <div class="specimen-svg-wrap">
          <img
            class="specimen-photo"
            src="images/flower_${f.id}.jpg"
            onerror="this.style.display='none'"
            alt="${f.name}"
            loading="lazy"
            style="width:100%;height:100%;object-fit:cover;display:block;"
          />
        </div>
        ${unlocked ? `
          <div class="stamp-overlay">
            ${createStampSVG(date, true)}
          </div>
        ` : ''}
        <div class="specimen-name-bar">
          <div class="specimen-name">${f.name}</div>
        </div>
      </div>
    `;
  }).join('');
}

function setCollectionFilter(filter) {
  STATE.collectionFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === filter);
  });
  renderCollection();
}

// ===== 3D FLIP TRANSITION =====
function playFlipTransition(sourceEl, onComplete) {
  let flipOverlay = document.getElementById('flip-overlay');
  if (!flipOverlay) {
    flipOverlay = document.createElement('div');
    flipOverlay.id = 'flip-overlay';
    document.body.appendChild(flipOverlay);
  }
  flipOverlay.innerHTML = '';

  const rect = sourceEl.getBoundingClientRect();
  const clone = document.createElement('div');
  clone.className = 'flip-card';
  clone.style.cssText = `
    left: ${rect.left}px; top: ${rect.top}px;
    width: ${rect.width}px; height: ${rect.height}px;
    background: #f9f5ee;
  `;
  clone.innerHTML = sourceEl.innerHTML;
  flipOverlay.appendChild(clone);

  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const targetW = window.innerWidth;
  const targetH = window.innerHeight * 0.92;
  const scaleX = targetW / rect.width;
  const scaleY = targetH / rect.height;
  const tx = window.innerWidth / 2 - cx;
  const ty = window.innerHeight * 0.04 + targetH / 2 - cy;

  clone.animate([
    { transform: 'translate(0,0) scale(1) rotateY(0deg)', opacity: 1 },
    { transform: `translate(${tx}px,${ty}px) scale(${scaleX},${scaleY}) rotateY(-8deg)`, opacity: 0.9, offset: 0.5 },
    { transform: `translate(${tx}px,${ty}px) scale(${scaleX},${scaleY}) rotateY(0deg)`, opacity: 0 }
  ], { duration: 420, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' })
    .onfinish = () => {
      flipOverlay.innerHTML = '';
      onComplete();
    };
}

// ===== INK WASH UNLOCK EFFECT =====
function playInkWash(cellEl, colorHex) {
  const ripple = document.createElement('div');
  ripple.className = 'ink-wash-ripple';
  const size = Math.max(cellEl.offsetWidth, cellEl.offsetHeight);
  ripple.style.cssText = `
    width: ${size}px; height: ${size}px;
    left: 50%; top: 50%;
    margin-left: -${size/2}px; margin-top: -${size/2}px;
    background: radial-gradient(circle, ${colorHex}cc 0%, ${colorHex}44 50%, transparent 75%);
  `;
  cellEl.appendChild(ripple);
  setTimeout(() => ripple.remove(), 950);
}

// ===== FLOWER DETAIL MODAL =====
function openFlowerDetail(id) {
  const flower = findFlowerById(id);
  if (!flower) return;
  openModal(flower);
}

function openSpecimenDetail(id) {
  const flower = findFlowerById(id);
  if (!flower) return;
  track('flower_detail_view', { flower_id: id, flower_name: flower.name, unlocked: isUnlocked(id) });
  openModal(flower);
}

function openModal(flower) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  if (!overlay || !content) return;

  const unlocked = isUnlocked(flower.id);
  const date = getUnlockDate(flower.id);

  const periodColors = {
    '早春': { text: '#8B6914', bg: 'rgba(249,217,35,0.12)', border: '#D4AA20' },
    '仲春': { text: '#8B3060', bg: 'rgba(255,183,197,0.12)', border: '#D47090' },
    '暮春': { text: '#7B1547', bg: 'rgba(255,107,157,0.12)', border: '#C04070' },
  };
  const pc = periodColors[flower.period] || periodColors['仲春'];

  // 顶部色带背景
  const heroBg = `rgba(${hexToRgb(flower.colorHex)}, 0.07)`;

  content.innerHTML = `
    <div class="modal-handle"></div>

    <!-- 顶部大图/线稿区 -->
    <div class="modal-hero-band" style="--modal-accent-bg: ${heroBg}">
      <div class="modal-hero-bg"></div>
      <img
        class="modal-hero-photo ${unlocked ? '' : 'modal-hero-photo--locked'}"
        src="images/flower_${flower.id}.jpg"
        onerror="this.style.display='none'"
        alt="${flower.name}"
        loading="lazy"
      />
    </div>

    <!-- 花名标题区 -->
    <div class="modal-title-band">
      <div class="modal-title-row">
        <div>
          <div class="modal-flower-name">${flower.name}</div>
          ${flower.isHero ? '<div class="modal-hero-flag">看板花</div>' : ''}
          <div class="modal-alias">${flower.alias || ''}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div class="modal-period-pill" style="color:${pc.text};background:${pc.bg};border-color:${pc.border}">
            ${flower.period}
          </div>
        </div>
      </div>
    </div>

    <!-- 杂志内容体 -->
    <div class="modal-content-body">

      <!-- 印象志 -->
      <div class="modal-section">
        <div class="modal-section-label">印象志</div>
        <p class="modal-story">${flower.story}</p>
      </div>

      <!-- 物候信息 -->
      <div class="modal-section">
        <div class="modal-section-label">物候与产地</div>
        <div class="modal-info-grid">
          <div class="modal-info-item">
            <div class="modal-info-label">花期</div>
            <div class="modal-info-value">${flower.blooming_period || '—'}</div>
          </div>
          <div class="modal-info-item">
            <div class="modal-info-label">时令</div>
            <div class="modal-info-value">${flower.period}</div>
          </div>
        </div>
        <div class="modal-info-full">
          <div class="modal-info-label" style="margin-bottom:6px">产地与气候</div>
          <div class="modal-info-value" style="line-height:1.8">${flower.origin_climate || '—'}</div>
        </div>
      </div>

      <!-- 别称由来 -->
      ${flower.alias_origin ? `
      <div class="modal-section">
        <div class="modal-section-label">别称由来</div>
        <div class="modal-literature-text">${flower.alias_origin}</div>
      </div>
      ` : ''}

      <!-- 近似辨析 -->
      ${flower.distinction ? `
      <div class="modal-section modal-section--distinction">
        <div class="modal-section-label">近似辨析</div>
        <div class="modal-distinction-text">${flower.distinction}</div>
      </div>
      ` : ''}

      <!-- 诗歌典故 -->
      <div class="modal-section">
        <div class="modal-section-label">诗歌典故</div>
        <div class="modal-literature-text">${flower.literature || '—'}</div>
      </div>

    </div>

    <!-- 打卡行 -->
    ${unlocked ? `
      <div class="modal-stamp-row">
        ${createLargeStampSVG(date)}
        <div>
          <div style="font-size:13px;color:var(--accent);letter-spacing:0.1em;font-weight:500">春事已记</div>
          <div style="font-size:11px;color:var(--ink-faint);margin-top:4px;letter-spacing:0.1em">遇见于 ${date}</div>
        </div>
      </div>
    ` : ''}

    <div class="modal-checkin-row" style="padding-bottom:32px">
      ${unlocked ? `
        <button class="btn-checkin checked" style="width:100%" onclick="closeModal()">✓ 已打卡 · 春事已记</button>
        <button class="btn-share-card" onclick="openShareCard(${flower.id})">生成分享卡片</button>
      ` : `
        <button class="btn-primary" onclick="checkInFromModal(${flower.id})" style="width:100%">
          识别并打卡 · 加入标本墙
        </button>
        <button class="btn-primary" onclick="closeModal();startQuiz()" style="width:100%;background:transparent;color:var(--ink-light);border-color:var(--border);box-shadow:none">
          去识花向导识别
        </button>
      `}
      <button class="btn-secondary" onclick="closeModal()" style="width:100%">关闭</button>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function checkInFromModal(id) {
  const isNew = unlockFlower(id);
  const flower = findFlowerById(id);
  showToast(isNew ? `${flower?.name} 已加入标本墙` : '已在标本墙中');
  if (isNew && flower) track('flower_checkin', { flower_id: id, flower_name: flower.name, period: flower.period, total: getUnlockedCount(), source: 'modal' });
  if (flower) openModal(flower);
  // 解锁时在标本卡上播放水墨晕染
  if (isNew && flower) {
    setTimeout(() => {
      const cellEl = document.querySelector(`.specimen-cell[data-id="${id}"]`);
      if (cellEl) playInkWash(cellEl, flower.colorHex);
    }, 200);
    renderCollection();
  }
}

function startQuizForFlower(id) {
  closeModal();
  startQuiz();
}

// ===== SHARE CARD =====
function openShareCard(flowerId) {
  const flower = findFlowerById(flowerId);
  if (!flower) return;

  // 关闭当前详情 modal
  closeModal();

  // 构建分享卡片 overlay
  let overlay = document.getElementById('share-card-overlay');
  if (overlay) overlay.remove();

  overlay = document.createElement('div');
  overlay.id = 'share-card-overlay';
  overlay.className = 'share-card-overlay';
  let shareStyle = 'A';

  overlay.innerHTML = `
    <div class="share-card-sheet">
      <div class="share-card-header">
        <span class="share-card-title">分享卡片</span>
        <button class="share-card-close" onclick="closeShareCard()">✕</button>
      </div>

      <div class="share-canvas-wrap">
        <canvas id="share-canvas" width="800" height="1120"></canvas>
      </div>

      <div class="share-card-footer-actions">
        <label class="share-replace-link">
          <input type="file" accept="image/*" id="share-photo-input" style="display:none" onchange="replaceSharePhoto(${flowerId}, this)">
          ⊙ 替换照片
        </label>
        <button class="share-save-link" onclick="downloadShareCard()">⊡ 保存卡片</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));

  window._shareCardPhotoUrl = null;
  loadSharePhoto(flowerId, null);
}

function closeShareCard() {
  const overlay = document.getElementById('share-card-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 350);
  }
}

function replaceSharePhoto(flowerId, input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    window._shareCardPhotoUrl = e.target.result;
    loadSharePhoto(flowerId, e.target.result);
  };
  reader.readAsDataURL(file);
}

function downloadShareCard() {
  const canvas = document.getElementById('share-canvas');
  if (!canvas) return;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isIOS) {
    // iOS Safari 不支持 a[download]，在新标签页打开图片，用户长按即可保存
    const dataUrl = canvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <title>春天花会开 · 分享卡片</title>
            <style>
              body{margin:0;background:#111;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:16px}
              img{max-width:100%;border-radius:12px}
              p{color:#aaa;font-size:13px;font-family:sans-serif;letter-spacing:.05em;text-align:center;padding:0 24px}
            </style>
          </head>
          <body>
            <img src="${dataUrl}" alt="分享卡片">
            <p>长按图片 → 存储到「照片」</p>
          </body>
        </html>
      `);
      win.document.close();
    } else {
      // 弹窗被拦截时 fallback：showToast 提示
      showToast('请长按卡片图片保存');
    }
  } else {
    const a = document.createElement('a');
    a.download = '春天花会开.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  }
}

function loadSharePhoto(flowerId, customDataUrl) {
  const flower = findFlowerById(flowerId);
  if (!flower) return;

  const draw = (img) => drawStyleA(flower, img);

  if (customDataUrl) {
    const img = new Image();
    img.onload = () => draw(img);
    img.onerror = () => draw(null);
    img.src = customDataUrl;
    return;
  }

  const localImg = new Image();
  localImg.onload = () => draw(localImg);
  localImg.onerror = () => draw(null);
  localImg.src = `images/flower_${flower.id}.jpg`;
}

// ── Kinfolk 人文画报风格 ──────────────────────────────
function drawStyleA(flower, photoImg) {
  const canvas = document.getElementById('share-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 800, H = 1120;
  const date = getUnlockDate(flower.id);
  const bp = flower.blooming_period ? flower.blooming_period.split('，')[0].split('（')[0] : '';
  const BG = '#FDFCFB';

  // ── 背景 ──────────────────────────────────────
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  // ── 页眉（SPRING FIELD NOTES / No.xx）──────────
  const HEADER_H = 60;
  ctx.fillStyle = '#AAAAAA';
  ctx.font = '400 11px monospace';
  ctx.letterSpacing = '0.18em';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('SPRING FIELD NOTES', 56, HEADER_H / 2);
  ctx.textAlign = 'right';
  ctx.fillText(`No. ${String(flower.id).padStart(2,'0')}`, W - 56, HEADER_H / 2);
  ctx.letterSpacing = '0';
  // 页眉底线
  ctx.strokeStyle = 'rgba(0,0,0,0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, HEADER_H); ctx.lineTo(W, HEADER_H);
  ctx.stroke();

  // ── 图片区（4:5 比例，通栏，底部渐隐）────────────
  const IMG_Y = HEADER_H;
  const IMG_W = W;
  const IMG_H = Math.round(W * 1.0); // 4:5 => 800*1 px 太高，用0.78模拟视觉4:5
  // 4:5 实际 = 800/4*5 = 1000，稍压缩避免太长
  const IMG_H_ACTUAL = Math.round(W * 0.82);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (photoImg) {
    ctx.save();
    ctx.rect(0, IMG_Y, IMG_W, IMG_H_ACTUAL);
    ctx.clip();
    const sc = Math.max(IMG_W / photoImg.width, IMG_H_ACTUAL / photoImg.height);
    const dw = photoImg.width * sc, dh = photoImg.height * sc;
    const ddx = (IMG_W - dw) / 2, ddy = IMG_Y + (IMG_H_ACTUAL - dh) / 2;
    ctx.drawImage(photoImg, ddx, ddy, dw, dh);
    ctx.restore();
  } else {
    // 无图：花色渐变占位
    const cg = ctx.createRadialGradient(W/2, IMG_Y + IMG_H_ACTUAL/2, 0, W/2, IMG_Y + IMG_H_ACTUAL/2, IMG_H_ACTUAL*0.6);
    cg.addColorStop(0, hexToRgbaString(flower.colorHex, 0.12));
    cg.addColorStop(1, 'rgba(253,252,251,0)');
    ctx.fillStyle = cg;
    ctx.fillRect(0, IMG_Y, IMG_W, IMG_H_ACTUAL);
  }

  // 底部渐隐（透明→背景色），覆盖图片底部约 42%
  const FADE_START = IMG_Y + IMG_H_ACTUAL * 0.58;
  const FADE_END = IMG_Y + IMG_H_ACTUAL;
  const btmFade = ctx.createLinearGradient(0, FADE_START, 0, FADE_END);
  btmFade.addColorStop(0, 'rgba(253,252,251,0)');
  btmFade.addColorStop(0.6, 'rgba(253,252,251,0.82)');
  btmFade.addColorStop(1, BG);
  ctx.fillStyle = btmFade;
  ctx.fillRect(0, FADE_START, W, FADE_END - FADE_START);

  // ── 图片区内文字（图右下：大花名；图左下：坐标）────
  const PHOTO_BOTTOM = IMG_Y + IMG_H_ACTUAL;

  // 右下：大花名（衬线体，字间距0.25em，浮现在渐隐区）
  ctx.fillStyle = '#1A1A1A';
  ctx.font = '400 80px "Noto Serif SC", serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'alphabetic';
  // 手动 0.25em 字间距
  const NC = flower.name.split('');
  const NFS = 80, NGap = Math.round(NFS * 0.22);
  let NX = W - 52;
  for (let i = NC.length - 1; i >= 0; i--) {
    ctx.fillText(NC[i], NX, PHOTO_BOTTOM - 32);
    NX -= NFS * 0.74 + NGap;
  }

  // 花名下：时令小标签（右对齐，sans-serif 大写）
  ctx.fillStyle = '#888888';
  ctx.font = '400 13px "Noto Serif SC", serif';
  ctx.letterSpacing = '0.12em';
  ctx.fillText(flower.period || '', W - 52, PHOTO_BOTTOM - 8);
  ctx.letterSpacing = '0';

  // 左下：坐标 + 日期（monospace）
  ctx.fillStyle = 'rgba(60,60,60,0.7)';
  ctx.font = '400 13px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('⊙ 31°14′N  121°28′E', 52, PHOTO_BOTTOM - 46);
  if (date) {
    ctx.fillText(`⊡ ${date}`, 52, PHOTO_BOTTOM - 26);
  }

  // 采集者姓名（极小极淡，不抢主体）
  const collectorName = getCollectorName();
  if (collectorName) {
    ctx.fillStyle = 'rgba(60,60,60,0.45)';
    ctx.font = '400 11px monospace';
    ctx.fillText(`Collector: ${collectorName}`, 52, PHOTO_BOTTOM - 6);
  }

  // ── 白色内容区（图片下方）──────────────────────
  const CONTENT_Y = PHOTO_BOTTOM + 8;

  // 引文段落（多行自动换行）
  ctx.fillStyle = '#444444';
  ctx.font = '300 20px "Noto Serif SC", serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  const storyFull = flower.story || '';
  const maxW = W - 104;
  // 简单折行：每行约 20 字
  const lineLen = 20;
  const lines = [];
  for (let i = 0; i < storyFull.length && lines.length < 3; i += lineLen) {
    lines.push(storyFull.slice(i, i + lineLen));
  }
  if (storyFull.length > lineLen * 3) lines[2] = lines[2].slice(0, lineLen - 1) + '…';
  lines.forEach((line, i) => {
    ctx.fillText(line, 52, CONTENT_Y + i * 34);
  });

  // ── 分隔线 ────────────────────────────────────
  const DIV_Y = CONTENT_Y + lines.length * 34 + 28;
  ctx.strokeStyle = 'rgba(0,0,0,0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(52, DIV_Y); ctx.lineTo(W - 52, DIV_Y);
  ctx.stroke();

  // ── 元数据网格（双语，两列 2×2）──────────────────
  const GRID_Y = DIV_Y + 32;
  const climate = flower.climate || (flower.period === '早春' ? '湿冷' : flower.period === '仲春' ? '温润' : '温暖');
  const origin = flower.origin || flower.native || '华东';
  const GRID = [
    { zh: '时令', en: 'SEASON',  val: flower.period || '—', col: 0 },
    { zh: '产地', en: 'ORIGIN',  val: origin,                col: 1 },
    { zh: '花期', en: 'PERIOD',  val: bp || '—',             col: 0 },
    { zh: '气候', en: 'CLIMATE', val: climate,               col: 1 },
  ];
  const COL_X = [52, W / 2 + 10];
  const ROW_H = 68;

  GRID.forEach((item, idx) => {
    const row = Math.floor(idx / 2);
    const x = COL_X[item.col];
    const y = GRID_Y + row * ROW_H;

    // 双语标签
    ctx.fillStyle = '#AAAAAA';
    ctx.font = '400 10px monospace';
    ctx.letterSpacing = '0.18em';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`${item.zh} / ${item.en}`, x, y);
    ctx.letterSpacing = '0';

    // 值
    ctx.fillStyle = '#1A1A1A';
    ctx.font = '400 22px "Noto Serif SC", serif';
    ctx.fillText(item.val, x, y + 18);

    // 左侧细竖线装饰
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - 1, y + 2); ctx.lineTo(x - 1, y + 46);
    ctx.stroke();
  });

  // ── 底部：署名（左）+ 编号（右）──────────────────
  const FOOT_Y = H - 52;
  // 细分隔线
  ctx.strokeStyle = 'rgba(0,0,0,0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(52, FOOT_Y - 16); ctx.lineTo(W - 52, FOOT_Y - 16);
  ctx.stroke();

  ctx.fillStyle = '#BBBBBB';
  ctx.font = '400 12px "Noto Serif SC", serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('春天花会开', 52, FOOT_Y);
  ctx.font = '400 10px monospace';
  ctx.fillText('LUVLUA.XYZ', 52, FOOT_Y + 18);

  // 右：年份印章圆
  const stampCX = W - 72, stampCY = FOOT_Y + 8;
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = '#555555';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 5]);
  ctx.beginPath(); ctx.arc(stampCX, stampCY, 38, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.lineWidth = 0.6;
  ctx.beginPath(); ctx.arc(stampCX, stampCY, 28, 0, Math.PI * 2); ctx.stroke();
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = '#555555';
  ctx.font = '400 13px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(new Date().getFullYear()), stampCX, stampCY);
  ctx.globalAlpha = 1;
  ctx.restore();
}

function hexToRgbaString(hex, alpha) {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb}, ${alpha})`;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

window.openShareCard = openShareCard;
window.closeShareCard = closeShareCard;
window.replaceSharePhoto = replaceSharePhoto;
window.downloadShareCard = downloadShareCard;
window.openCollectorEdit = openCollectorEdit;
window.closeCollectorEdit = closeCollectorEdit;
window.saveCollectorEdit = saveCollectorEdit;

// ===== TOAST =====
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position: fixed; bottom: 88px; left: 50%; transform: translateX(-50%);
      background: rgba(44,36,22,0.85); color: #F9F8F4;
      padding: 10px 20px; border-radius: 20px; font-size: 13px;
      font-family: 'Noto Serif SC', serif; letter-spacing: 0.1em;
      z-index: 300; white-space: nowrap; pointer-events: none;
      transition: opacity 300ms ease;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
  }, 2000);
}

// ===== PRIVACY NOTICE =====
function showPrivacyNotice() {
  let overlay = document.getElementById('privacy-sheet-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'privacy-sheet-overlay';
    overlay.className = 'privacy-sheet-overlay';
    overlay.innerHTML = `
      <div class="privacy-sheet">
        <div class="privacy-sheet-title">隐私说明</div>
        <div class="privacy-sheet-body">
          <p>本应用使用 <strong>Umami</strong> 进行匿名访问统计，目的是了解花卉展示内容的受欢迎程度，以优化展示逻辑。</p>
          <p><strong>我们承诺：</strong>统计过程<strong>不使用 Cookie</strong>，不收集姓名、邮箱等任何个人身份信息，不跨站追踪用户行为。</p>
          <p>若您的浏览器已开启 <strong>Do Not Track</strong> 设置，Umami 将自动尊重该设置并停止统计。</p>
          <p style="color:var(--ink-faint);font-size:11px">数据托管于 Umami Cloud，仅供本项目作者查阅。</p>
        </div>
        <button class="privacy-sheet-close" onclick="closePrivacyNotice()">我知道了</button>
      </div>
    `;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePrivacyNotice();
    });
    document.body.appendChild(overlay);
  }
  requestAnimationFrame(() => overlay.classList.add('active'));
}

function closePrivacyNotice() {
  const overlay = document.getElementById('privacy-sheet-overlay');
  if (overlay) overlay.classList.remove('active');
}

// ===== LOADING SCREEN =====
function hideLoading() {
  const loading = document.getElementById('loading-screen');
  if (loading) {
    loading.classList.add('hide');
    setTimeout(() => loading.remove(), 700);
  }
}

// ===== INIT =====
function init() {
  loadProgress();
  renderHomePage();

  // Nav click
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navigateTo(item.dataset.page);
    });
  });

  // Period tag filter
  document.querySelectorAll('.period-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      renderHomeFlowerList(tag.dataset.period);
    });
  });

  // Close modal on overlay click
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  // Privacy notice link
  const privacyLink = document.getElementById('privacy-link');
  if (privacyLink) {
    privacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      showPrivacyNotice();
    });
  }

  // Hide loading after fonts/content ready
  setTimeout(hideLoading, 800);
}

document.addEventListener('DOMContentLoaded', init);

window.showPrivacyNotice = showPrivacyNotice;
window.closePrivacyNotice = closePrivacyNotice;
