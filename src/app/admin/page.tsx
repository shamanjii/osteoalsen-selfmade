'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Client-side redirect to avoid SSR issues
    router.push('/admin/');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">Weiterleitung...</h1>
        <p className="text-slate-600 mt-2">Sie werden zum Admin-Bereich weitergeleitet.</p>
      </div>
    </div>
  );
}