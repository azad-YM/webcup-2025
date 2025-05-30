import RootLayout from '@/layouts/app/app';
import { HeroSection } from '@/sections/hero-section/hero.section';
import { TrendingPages } from '@/sections/trending-pages/trending-pages.section';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;

  return (
    <RootLayout >
      <Head title="Welcome">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      <main className="min-h-screen bg-background">
        <HeroSection user={auth.user} />
        <TrendingPages />
      </main>
    </RootLayout>
  );
}
