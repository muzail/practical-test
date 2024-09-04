<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Middleware\EnsureTokenIsValid;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware([EnsureTokenIsValid::class]);
Route::get('user', [AuthController::class, 'user'])->middleware([EnsureTokenIsValid::class]);

Route::middleware([EnsureTokenIsValid::class])->group(function () {
    Route::resource('employee', EmployeeController::class);
});
