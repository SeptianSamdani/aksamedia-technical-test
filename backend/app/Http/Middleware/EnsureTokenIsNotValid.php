<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTokenIsNotValid
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda sudah login',
            ], 403);
        }

        return $next($request);
    }
}