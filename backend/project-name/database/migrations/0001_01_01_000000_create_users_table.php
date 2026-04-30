<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password'); // Laravel standard field name
            $table->enum('role', ['USER', 'ADMIN'])->default('USER');
            $table->timestamps();
        });

        // Seed a default admin user
        DB::table('users')->insertOrIgnore([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), // use Laravel’s Hash for security
            'role' => 'ADMIN',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
