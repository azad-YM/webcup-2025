<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Mood;

class MoodSeeder extends Seeder
{
  public function run(): void
  {
    $moods = [
      ['name' => 'Dramatique', 'emoji' => '😭', 'color' => 'bg-rose-500'],
      ['name' => 'Ironique', 'emoji' => '😂', 'color' => 'bg-amber-500'],
      ['name' => 'Honnête', 'emoji' => '😐', 'color' => 'bg-blue-500'],
      ['name' => 'Classe', 'emoji' => '💅', 'color' => 'bg-purple-500'],
      ['name' => 'Absurde', 'emoji' => '🤪', 'color' => 'bg-yellow-500'],
      ['name' => 'Gênant', 'emoji' => '🥴', 'color' => 'bg-pink-500'],
      ['name' => 'Passif-agressif', 'emoji' => '😏', 'color' => 'bg-indigo-500'],
    ];

    foreach ($moods as $mood) {
      Mood::create($mood);
    }
  }
}
