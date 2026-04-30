'use client';

import { useOverlayScrollbars } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import { useEffect } from 'react';

export default function OverlayScrollbarsInit() {
  const [initialize] = useOverlayScrollbars({
    options: {
      scrollbars: {
        theme: 'os-theme-custom',
        autoHide: 'leave',
      },
    },
    defer: true,
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      initialize(document.body);
    }
  }, [initialize]);

  return null;
}
