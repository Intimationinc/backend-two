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
    public function handle(Request $request, Closure $next, $cacheType = 'public', $maxAge = null, $mustRevalidate = false) : Response
    {
        $response = $next($request);
        $cacheControl = $cacheType;
        if ($maxAge) {
            $cacheControl .= ', max-age=' . $maxAge;
        }

        if ($mustRevalidate) {
            $cacheControl .= ', must-revalidate';
        }
        $response->headers->set('Cache-Control', $cacheControl);
        return $response;
    }
}
