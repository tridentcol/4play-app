'use client';

import { initWebObservability } from '@/lib/observability';
import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void initWebObservability();
  }, []);
  return <>{children}</>;
}
