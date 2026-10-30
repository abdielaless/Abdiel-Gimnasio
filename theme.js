// Run before first paint so saved or system appearance applies without a flash.
(function () {
  const preferenceKey = 'abdiel-appearance-v1';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = 'system';
  try {
    const saved = localStorage.getItem(preferenceKey);
    if (['system', 'light', 'dark'].includes(saved)) preference = saved;
  } catch { /* The current choice still works when storage is unavailable. */ }
  function apply() {
    const dark = preference === 'dark' || preference === 'system' && system.matches;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]').content = dark ? '#101a17' : '#f6f7f3';
  }
  apply();
  system.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('#appearance');
    select.value = preference;
    select.addEventListener('change', () => {
      preference = select.value;
      apply();
      try { localStorage.setItem(preferenceKey, preference); }
      catch { document.querySelector('#save-status').textContent = 'La apariencia se aplicó, pero no se pudo guardar la preferencia.'; }
    });
  });
})();
