<?php

namespace App\Http\Controllers;

class CacheController extends Controller
{
    public function content() {
        return 'This response generated at: ' . now();
    }
}
