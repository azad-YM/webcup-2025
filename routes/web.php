<?php

use App\Http\Controllers\Post\FarewellPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::group([], function() {
    Route::get('/', fn() => Inertia::render('welcome'))->name('home');
    Route::get('/create', fn() => Inertia::render('post/create'))->name("create");
    Route::get('/{slug}', [FarewellPageController::class, 'show'])->name("show");
});

Route::group([], function() {
    Route::get('/api/pages',  [FarewellPageController::class, 'index']);
    Route::get('/api/moods',  [\App\Http\Controllers\Post\MoodController::class, 'index']);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
