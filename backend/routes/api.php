<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DivisionController;
use App\Http\Controllers\Api\EmployeeController;
use Illuminate\Support\Facades\Route;

// Route untuk guest (belum login)
Route::middleware('guest.api')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});

// Route untuk authenticated user (sudah login)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/divisions', [DivisionController::class, 'index']);
    Route::get('/employees', [EmployeeController::class, 'index']);
    Route::post('/employees', [EmployeeController::class, 'store']);
    Route::put('/employees/{id}', [EmployeeController::class, 'update']);
    Route::post('/employees/{id}', [EmployeeController::class, 'update']); // Untuk form-data dengan _method=PUT
    Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);
});