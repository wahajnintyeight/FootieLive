export const PLAYER_INJECTED_JS = `
(function () {
  const strip = () => {
    document.querySelectorAll('iframe[sandbox]').forEach(f => {
      f.removeAttribute('sandbox');
    });
  };
  
  strip();
  
  new MutationObserver(() => strip()).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['sandbox'],
    childList: true,
    subtree: true,
  });
})();
true;`;