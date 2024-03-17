'use client';

import AbsenceList from '@/components/AbsenseList/AbsenseList';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <AbsenceList />
    </main>
  );
}
