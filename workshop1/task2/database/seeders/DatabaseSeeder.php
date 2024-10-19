<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'User',
            'email' => 'test@user.com',
        ]);
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'test@admin.com',
        ]);
        User::factory()->create([
            'name' => 'Test',
            'email' => 'test@test.com',
        ]);
    }
}
