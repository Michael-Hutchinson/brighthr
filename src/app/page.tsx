'use client';

import AbsenceList from '@/components/AbsenseList/AbsenseList';
import Header from '@/components/Header/Header';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between'>
      <Header />
      <AbsenceList />
    </main>
  );
}
