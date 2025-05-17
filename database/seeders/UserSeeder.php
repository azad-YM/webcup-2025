<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
  public function run(): void
  {
    $users = [
      [
        'name' => 'Julie L.',
        'email' => 'julie@example.com',
        'password' => Hash::make('password123'),
      ],
      [
        'name' => 'Maxime R.',
        'email' => 'maxime@example.com',
        'password' => Hash::make('password123'),
      ],
      [
        'name' => 'Sami A.',
        'email' => 'sami@example.com',
        'password' => Hash::make('password123'),
      ],
      [
        'name' => 'Nina D.',
        'email' => 'nina@example.com',
        'password' => Hash::make('password123'),
      ],
    ];

    foreach ($users as $user) {
      User::create($user);
    }
  }
}
