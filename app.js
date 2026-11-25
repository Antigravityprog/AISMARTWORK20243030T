(() => {
  const categories = ['전체', '영상', '이미지', '음악', '보고서', '카드뉴스', 'AI 가이드북', '웹페이지'];
  const works = window.PORTFOLIO_WORKS || [];
  const categoryBar = document.getElementById('categoryBar');
  const workGrid = document.getElementById('workGrid');
  const workSearch = document.getElementById('workSearch');
  const workCount = document.getElementById('workCount');
  let activeCategory = '전체';
  const icons = { 영상: '▶', 이미지: '▧', 음악: '♫', 보고서: '▤', 카드뉴스: '▦', 'AI 가이드북': '✧', 웹페이지: '⌘' };

  function renderProjects() {
    const selectedProjects = works.filter((work) => ['영상', '보고서', '웹페이지'].includes(work.category)).slice(0, 6);
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = selectedProjects.map((work) => `<article class="project-card"><div class="project-art cover-${work.tone || 'navy'}"><small>SELECTED PROJECT / ${work.category}</small><b>${work.title}</b></div><div class="project-card-body"><div class="project-meta">${work.category} · ${work.status}</div><p>${work.description}</p><button class="project-link" data-id="${work.id}">프로젝트 과정 보기 ↗</button></div></article>`).join('');
    grid.querySelectorAll('button[data-id]').forEach((button) => button.addEventListener('click', () => openWork(works.find((work) => work.id === button.dataset.id))));
  }

  function renderCategories() {
    categoryBar.innerHTML = categories.map((category) => `<button class="category-pill ${category === activeCategory ? 'selected' : ''}" role="tab" aria-selected="${category === activeCategory}" data-category="${category}">${category === '전체' ? '전체 보기' : `${icons[category]} ${category}`}</button>`).join('');
    categoryBar.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      renderCategories(); renderWorks(); renderProjects();
    }));
  }

  function renderWorks() {
    const query = workSearch.value.trim().toLowerCase();
    const filtered = works.filter((work) => (activeCategory === '전체' || work.category === activeCategory) && `${work.title} ${work.description} ${(work.tools || []).join(' ')}`.toLowerCase().includes(query));
    workCount.textContent = String(filtered.length).padStart(2, '0');
    if (!filtered.length) {
      workGrid.innerHTML = '<div class="empty-state"><b>검색 결과가 없습니다.</b><p>검색어 또는 카테고리를 변경해 주세요.</p></div>';
      return;
    }
    workGrid.innerHTML = filtered.map((work) => `
      <article class="work-card" data-id="${work.id}" tabindex="0" role="button" aria-label="${work.title} 제작 과정 보기">
        <div class="work-card-cover cover-${work.tone || 'navy'}"><div class="cover-top"><span class="work-category">${icons[work.category] || '◈'} ${work.category}</span><span class="work-status">${work.status}</span></div><div class="cover-bottom"><small>STUDENT WORK / ${work.id.toUpperCase()}</small><h3>${work.title}</h3></div><div class="cover-orb"></div></div>
        <div class="work-card-body"><p>${work.description}</p><div class="work-tags">${(work.tools || []).slice(0, 3).map((tool) => `<span>${tool}</span>`).join('')}</div><div class="card-footer"><span>결과물 · 과정 · 프롬프트</span><b>자세히 보기 ↗</b></div></div>
      </article>`).join('');
    workGrid.querySelectorAll('.work-card').forEach((card) => {
      const open = () => openWork(works.find((work) => work.id === card.dataset.id));
      card.addEventListener('click', open);
      card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
    });
  }

  const modal = document.getElementById('workModal');
  function openWork(work) {
    if (!work) return;
    document.getElementById('modalCover').className = `modal-cover cover-${work.tone || 'navy'}`;
    document.getElementById('modalCategory').textContent = `${icons[work.category] || '◈'} ${work.category} / PROCESS`; 
    document.getElementById('modalTitle').textContent = work.title;
    document.getElementById('modalDescription').textContent = work.description;
    document.getElementById('modalTools').innerHTML = (work.tools || []).map((tool) => `<span>${tool}</span>`).join('');
    document.getElementById('modalProcess').innerHTML = (work.process || []).map((step, index) => `<li><b>${String(index + 1).padStart(2, '0')}</b><span>${step}</span></li>`).join('');
    document.getElementById('modalPrompt').textContent = work.prompt || '실제 사용한 프롬프트를 기록하세요.';
    document.getElementById('modalReflection').textContent = work.reflection || '작업 후 배운 점과 개선 사항을 기록하세요.';
    document.getElementById('modalStatus').textContent = work.status || '작업 상태 미입력';
    const existing = document.getElementById('modalOutputLink');
    if (existing) existing.remove();
    if (work.outputUrl) {
      const link = document.createElement('a'); link.id = 'modalOutputLink'; link.className = 'output-link'; link.href = work.outputUrl; link.target = '_blank'; link.rel = 'noreferrer'; link.textContent = '결과물 열기 ↗';
      document.querySelector('.modal-footer').prepend(link);
    }
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open');
    document.getElementById('modalClose').focus();
  }
  function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); }
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalDone').addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
  workSearch.addEventListener('input', renderWorks);

  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.textContent = open ? '×' : '☰'; });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.textContent = '☰'; }));
  const sections = document.querySelectorAll('main section[id]');
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { nav.querySelectorAll('a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`)); } }), { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => observer.observe(section));

  renderCategories(); renderWorks(); renderProjects();
})();
