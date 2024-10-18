<?php

use App\Http\Controllers\PingController;
use App\Http\Controllers\ProfileController;
use App\Models\Message;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $messages = Message::pluck('message')->toArray();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'messages' => $messages,
    ]);
});

Route::get('/dashboard',[ProfileController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('public-ping', [PingController::class, 'public'])
    ->name('public.ping');

require __DIR__.'/auth.php';
