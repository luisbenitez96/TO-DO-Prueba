<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas para las tareas (todos)
Route::prefix('todos')->group(function () {
    Route::get('/', [App\Http\Controllers\TodoController::class, 'index']);
    Route::post('/', [App\Http\Controllers\TodoController::class, 'store']);
    Route::get('/{id}', [App\Http\Controllers\TodoController::class, 'show']);
    Route::put('/{id}', [App\Http\Controllers\TodoController::class, 'update']);
    Route::delete('/{id}', [App\Http\Controllers\TodoController::class, 'destroy']);
    Route::patch('/{id}/toggle', [App\Http\Controllers\TodoController::class, 'toggle']);
}); 