<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CacheControl
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $cache = 'public', $maxAge = 3600): Response
    {
        $response = $next($request);
        return $response->header('Cache-Control', $cache . ', max-age=' . $maxAge);
    }
}