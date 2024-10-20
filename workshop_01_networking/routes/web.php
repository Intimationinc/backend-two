<?php

use App\Http\Middleware\CacheControl;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->middleware(CacheControl::class.':public,3600');
