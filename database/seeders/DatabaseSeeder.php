<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $faker = Faker::create();
        $positions = ['web dev', 'web dev intern']; // Pilihan posisi

        foreach (range(1, 5) as $index) {
            Employee::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'position' => $positions[array_rand($positions)], // Pilih posisi secara acak
                'salary' => $faker->numberBetween(30000, 100000),
            ]);
        }
    }
}
