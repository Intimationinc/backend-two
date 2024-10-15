<?php

use Illuminate\Support\Facades\Route;

Route::middleware('cache.headers:private;max_age=2628000;etag')->group(function () {
    Route::get('/', function () {
        return "hello world";
    });

    Route::get('/terms', function () {
        return "Hello Bangladesh";
    });
});
