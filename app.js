const state = { category: 'all', query: '', items: [] };

const money = value => value == null ? '—' : `${Number(value).toLocaleString()} meso`;

function render() {
  const visible = state.items.filter(item =>
    (state.category === 'all' || item.category === state.category) &&
    item.name.toLowerCase().includes(state.query.toLowerCase())
  );
  document.querySelector('#item-count').textContent = state.items.length || '—';
  document.querySelector('#result-count').textContent = state.items.length ? `${visible.length} of ${state.items.length} items` : '';
  document.querySelector('#table-wrap').hidden = !visible.length;
  document.querySelector('#empty').hidden = Boolean(visible.length);
  document.querySelector('#price-rows').innerHTML = visible.map(item => `<tr><td><strong>${item.name}</strong></td><td>${item.category}</td><td>${money(item.low)}</td><td>${money(item.median)}</td><td>${money(item.high)}</td><td>${item.sources?.join(', ') || '—'}</td></tr>`).join('');
}

document.querySelector('#search').addEventListener('input', event => { state.query = event.target.value; render(); });
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active'); state.category = button.dataset.category; render();
}));

fetch('data/market.json').then(response => response.ok ? response.json() : null).then(data => {
  if (!data) return;
  state.items = data.items || [];
  document.querySelector('#source-count').innerHTML = `${data.sources?.filter(source => source.connected).length || 0} <small>/ ${data.sources?.length || 0}</small>`;
  document.querySelector('#last-update').textContent = data.generated_at ? new Date(data.generated_at).toLocaleDateString() : '—';
  document.querySelector('#generated').textContent = data.generated_at ? `Snapshot: ${new Date(data.generated_at).toLocaleString()}.` : '';
  render();
}).catch(() => render());
