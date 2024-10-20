<?php

use App\Http\Controllers\CacheController;
use Illuminate\Support\Facades\Route;

Route::get('/cache/public', [CacheController::class, 'content'])->middleware('cache.control:public,300');
Route::get('/cache/private', [CacheController::class, 'content'])->middleware('cache.control:private,300');
Route::get('/cache/extra', [CacheController::class, 'content'])->middleware('cache.control:public,300,stale-while-revalidate=300');