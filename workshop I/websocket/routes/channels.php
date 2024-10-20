<?php

use Illuminate\Support\Facades\Broadcast;



Broadcast::channel('public', function ($user) {
    return true;
});

Broadcast::channel('public-{user}', function ($user) {
    return true;
});