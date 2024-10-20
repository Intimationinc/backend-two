<?php

use App\Http\Controllers\BroadcastController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::post('/message/send', [BroadcastController::class, 'index']);
