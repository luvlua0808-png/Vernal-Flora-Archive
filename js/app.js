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
  if (page === 'home') renderHomeFlowerList();
}

// ===== HOME PAGE =====
function renderHomePage() {
  const heroWrap = document.getElementById('hero-svg-wrap');
  if (heroWrap) heroWrap.innerHTML = '<img src="icons/icon-logo.png" alt="春天花会开" class="hero-logo-img">';

  renderHomeFlowerList();
}

function renderHomeFlowerList(period = 'all') {
  const container = document.getElementById('flower-preview-list');
  if (!container) return;

  let flowers = FLOWERS_DATA;
  if (period !== 'all') {
    const periodMap = { early: '早春', mid: '仲春', late: '暮春' };
    flowers = FLOWERS_DATA.filter(f => f.period === periodMap[period]);
  }

  container.innerHTML = flowers.map(f => {
    const unlocked = isUnlocked(f.id);
    return `
      <div class="flower-preview-card ${unlocked ? 'flower-preview-unlocked' : 'flower-preview-locked'}"
           style="--flower-color: ${f.colorHex}"
           onclick="openFlowerDetail(${f.id})">
        <div class="flower-preview-name">${f.name}${f.isHero ? ' ✦' : ''}</div>
        <div class="flower-preview-period">
          <span class="flower-preview-dot" style="background:${f.colorHex}"></span>
          ${f.period}
          ${unlocked ? `<span style="color:var(--accent);font-size:10px;margin-left:4px">· 已遇见</span>` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Period tag active state
  document.querySelectorAll('.period-tag').forEach(tag => {
    const tp = tag.dataset.period;
    tag.classList.toggle('active', tp === period || (tp === 'all' && period === 'all'));
  });
}

// ===== QUIZ =====
function startQuiz() {
  STATE.quizHistory = [];
  STATE.quizCurrentNode = QUIZ_TREE;
  STATE.quizStep = 0;
  STATE.quizResult = null;
  navigateTo('quiz');
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
            onerror="this.src='${f.imageUrl || ''}';this.onerror=function(){this.style.display='none'}"
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
        onerror="this.src='${flower.imageUrl || ''}';this.onerror=function(){this.style.display='none'}"
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
