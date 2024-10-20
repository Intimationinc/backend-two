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
    public function handle(Request $request, Closure $next, string $cacheType = 'public', $maxAge = 3600, ...$extra): Response
    {
        $response = $next($request);
        if ($response instanceof Response) {
            $value = "{$cacheType}, max-age={$maxAge}";
            if (!empty($extra)) {
                $value .= "," . implode(",", $extra);
            }
            $response->headers->set("Cache-Control", $value);
        }
        return $response;
    }
}
