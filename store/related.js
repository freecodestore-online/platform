// Related Tools — FreeCodeStore
(function() {
  const ACCENT = '#22d3ee';
  const REGISTRY_KEY = 'robots';

  function getCurrentId() {
    const match = window.location.pathname.match(/\/(?:formatters|encoders|generators|testers|converters)\/([^/]+)/);
    return match ? match[1] : null;
  }

  function render(current, items) {
    const same = items.filter(i => i.category === current.category && i.id !== current.id);
    const others = items.filter(i => i.category !== current.category && i.id !== current.id);
    let related = same.slice(0, 3);
    if (related.length < 3) related = related.concat(others.slice(0, 3 - related.length));
    if (related.length === 0) return;

    const container = document.createElement('div');
    container.id = 'related-tools';
    container.innerHTML = '<style>' +
      '#related-tools{position:fixed;bottom:0;left:0;right:0;z-index:50;background:#18181b;border-top:1px solid #27272a;padding:.5rem 1rem;display:flex;align-items:center;gap:.6rem;overflow-x:auto}' +
      '.rel-label{font-size:.7rem;color:#71717a;font-weight:600;white-space:nowrap;font-family:Inter,system-ui,sans-serif}' +
      '.rel-card{display:flex;align-items:center;gap:.4rem;background:#0a0a0a;border:1px solid #27272a;border-radius:6px;padding:.3rem .6rem;text-decoration:none;color:#e4e4e7;font-family:Inter,system-ui,sans-serif;transition:border-color .15s;flex-shrink:0}' +
      '.rel-card:hover{border-color:' + ACCENT + '}' +
      '.rel-name{font-size:.7rem;font-weight:600;white-space:nowrap}' +
      '</style>' +
      '<span class="rel-label">Related:</span>' +
      related.map(r => {
        const section = r.section || 'formatters';
        return '<a class="rel-card" href="/' + section + '/' + r.id + '/"><span class="rel-name">' + r.name + '</span></a>';
      }).join('');
    document.body.appendChild(container);
  }

  const currentId = getCurrentId();
  if (!currentId) return;

  fetch('/registry.json')
    .then(r => r.json())
    .then(data => {
      const items = data[REGISTRY_KEY] || [];
      const current = items.find(i => i.id === currentId);
      if (current) render(current, items);
    })
    .catch(() => {});
})();
