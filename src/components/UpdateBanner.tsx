'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const DISMISS_KEY = 'update-banner-dismissed';

export default function UpdateBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    fetch('/api/update-check')
      .then((r) => r.json())
      .then((data: { hasUpdate: boolean }) => {
        if (data.hasUpdate) setShow(true);
      })
      .catch(() => {});
  }, []);

  if (!show) return null;

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setShow(false);
  }

  return (
    <div className="flex items-center justify-between gap-4 px-8 py-2 bg-indigo-600 text-white text-sm">
      <span>
        Upstream changes are available —{' '}
        <a
          href="https://github.com/paulmassen/seo-playground"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 font-semibold hover:opacity-80"
        >
          review changes
        </a>{' '}
        before updating this fork.
      </span>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="shrink-0 hover:opacity-70 transition-opacity"
      >
        <X size={16} />
      </button>
    </div>
  );
}
