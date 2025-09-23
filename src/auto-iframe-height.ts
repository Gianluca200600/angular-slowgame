// src/auto-iframe-height.ts
(() => {
  const PARENT_ORIGIN = 'https://www.slowgame.it'; // <- your WP site origin

  const compute = () => {
    const el = document.documentElement;
    const body = document.body;
    return Math.max(
      el.scrollHeight, el.offsetHeight, el.clientHeight,
      body ? Math.max(body.scrollHeight, body.offsetHeight, body.clientHeight) : 0
    );
  };

  const post = () => {
    const height = compute();
    // Send height only to your WP origin
    parent.postMessage({ type: 'ng-iframe:height', height }, PARENT_ORIGIN);
  };

  // Respond when parent asks explicitly (race-free init)
  window.addEventListener('message', (ev) => {
    if (ev.origin !== PARENT_ORIGIN) return;
    if (ev.data && ev.data.type === 'ng-iframe:request-height') post();
  });

  // Initial + dynamic updates
  const sendOnNextFrame = (() => {
    let scheduled = false;
    return () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => { scheduled = false; post(); });
    };
  })();

  if (document.readyState === 'complete') post();
  else window.addEventListener('load', () => setTimeout(post, 0));

  // Watch layout changes
  new ResizeObserver(sendOnNextFrame).observe(document.documentElement);

  // Font/route changes can affect height too
  (document as any).fonts?.addEventListener?.('loadingdone', sendOnNextFrame);
  window.addEventListener('resize', sendOnNextFrame);
})();
