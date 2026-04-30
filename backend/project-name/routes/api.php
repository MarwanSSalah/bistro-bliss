<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\MenuItemsController;
use App\Http\Controllers\BookingsController;
use App\Models\User;
use App\Models\Booking;
use App\Models\MenuItem;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/

Route::get('/health', fn() => response()->json(['status' => 'OK'], 200));

// TEMPORARY: one-time admin setup — will be removed after use
Route::get('/setup-admin', function () {
    if (User::where('email', 'admin@bistro.com')->exists()) {
        return response()->json(['message' => 'Admin already exists']);
    }
    $user = User::create([
        'name'     => 'Admin',
        'email'    => 'admin@bistro.com',
        'password' => bcrypt('admin1234'),
        'role'     => 'ADMIN',
    ]);
    return response()->json(['message' => 'Admin created', 'email' => $user->email]);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

/*
|--------------------------------------------------------------------------
| Protected API Routes (Sanctum)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', fn(Request $request) => response()->json(['user' => $request->user()]));

    // Bookings
    Route::get('/bookings', [BookingsController::class, 'index']);
    Route::post('/bookings', [BookingsController::class, 'store']);
    Route::patch('/bookings/{booking}/status', [BookingsController::class, 'updateStatus']);

    // Resources
    Route::apiResource('users', UsersController::class);
    Route::apiResource('menu-items', MenuItemsController::class);

    // Admin stats
    Route::get('/admin/stats', function () {
        return response()->json([
            'totalBookings' => Booking::count(),
            'totalUsers' => User::count(),
            'totalMenuItems' => MenuItem::count(),
        ]);
    });
});
