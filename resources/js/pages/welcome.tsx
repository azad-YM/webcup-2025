import RootLayout from '@/layouts/app/app';
import { HeroSection } from '@/sections/hero-section/hero.section';
import { MoodSelector } from '@/sections/mod-selector/mood-selector.section';
import { TrendingPages } from '@/sections/trending-pages/trending-pages.section';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
      <RootLayout >
        <Head title="Welcome">
          <link rel="preconnect" href="https://fonts.bunny.net" />
          <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        </Head>
        <main className="min-h-screen bg-background">
          <HeroSection />
          <div className='md:w-[80%] mx-auto'>
            <section className="container px-4 py-12 md:py-16">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Choose a mood</h2>
              <MoodSelector />
            </section>
            <section className="container px-4 py-8 md:py-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Trending Farewells</h2>
                <select className="bg-background border rounded-md px-3 py-1 text-sm">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Most Dramatic</option>
                </select>
              </div>
              <TrendingPages />
            </section>
          </div>
        </main>
      </RootLayout>
    );
}
