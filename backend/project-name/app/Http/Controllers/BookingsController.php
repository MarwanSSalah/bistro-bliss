<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingsController extends Controller
{
    /**
     * Store a new booking
     */
    public function store(Request $request)
    {
        // Validate incoming data — status always defaults to PENDING
        $validator = Validator::make($request->all(), [
            'date_time' => 'required|date|after:now',
            'guests'    => 'required|integer|min:1|max:20',
            'notes'     => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // ✅ Get user ID from authenticated user (Sanctum)
            $userId = $request->user()->id;

            // Create the booking — status always starts as PENDING
            $booking = Booking::create([
                'user_id'   => $userId,
                'date_time' => $request->date_time,
                'guests'    => $request->guests,
                'notes'     => $request->notes,
                'status'    => 'PENDING',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Booking created successfully',
                'data' => $booking
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create booking',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get bookings — admins see all, regular users see only their own.
     */
    public function index(Request $request)
    {
        $user  = $request->user();
        $query = Booking::with('user')->orderBy('date_time', 'desc');

        if ($user->role !== 'ADMIN') {
            $query->where('user_id', $user->id);
        }

        return response()->json([
            'success' => true,
            'data'    => $query->get(),
        ]);
    }

    /**
     * Update booking status
     */
    public function updateStatus(Request $request, Booking $booking)
    {
        $request->validate([
            'status' => 'required|in:PENDING,CONFIRMED,CANCELLED',
        ]);

        $booking->status = $request->status;
        $booking->save();

        return response()->json([
            'success' => true,
            'message' => 'Booking status updated',
            'data' => $booking,
        ]);
    }
}
