<?php

// tests/Feature/EmployeeControllerTest.php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $registerToken;
    protected $loginToken;

    // Pendaftaran akun dan mendapatkan token
    protected function registerAndGetToken()
    {
        $response = $this->post('/api/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(201);
        return $response->json('token');
    }

    // Login dan mendapatkan token
    protected function loginAndGetToken()
    {
        $response = $this->post('/api/login', [
            'email' => 'john@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        return $response->json('token');
    }

    // Logout
    protected function logout($token)
    {
        $response = $this->post('/api/logout', [], [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertStatus(200);
    }

    // Uji coba
    public function testEmployeeFlow()
    {
        // Register dan simpan token
        $this->registerToken = $this->registerAndGetToken();

        // Logout dengan token dari pendaftaran
        $this->logout($this->registerToken);

        // Login dengan akun yang didaftarkan
        $this->loginToken = $this->loginAndGetToken();

        // Test Tambah 3 Data Employee
        $employees = [
            [
                'name' => 'Jane Doe',
                'email' => 'jane@example.com',
                'position' => 'web dev intern',
                'salary' => 1500,
            ],
            [
                'name' => 'John Smith',
                'email' => 'john@example.com',
                'position' => 'web dev',
                'salary' => 1800,
            ],
            [
                'name' => 'Alice Johnson',
                'email' => 'alice@example.com',
                'position' => 'web dev intern',
                'salary' => 1600,
            ],
        ];

        foreach ($employees as $employee) {
            $response = $this->post('/api/employee', $employee, [
                'Authorization' => 'Bearer ' . $this->loginToken,
            ]);

            $response->assertStatus(201);
            $response->assertJson([
                'name' => $employee['name'],
                'email' => $employee['email'],
                'position' => $employee['position'],
                'salary' => $employee['salary'],
            ]);
        }

        // Test Menampilkan semua data employee
        $response = $this->get('/api/employee', [
            'Authorization' => 'Bearer ' . $this->loginToken,
        ]);

        $response->assertStatus(200);

        $response->assertJsonFragment([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'position' => 'web dev intern',
            'salary' => '1500',
        ]);

        $response->assertJsonFragment([
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'position' => 'web dev',
            'salary' => '1800',
        ]);

        $response->assertJsonFragment([
            'name' => 'Alice Johnson',
            'email' => 'alice@example.com',
            'position' => 'web dev intern',
            'salary' => '1600',
        ]);

        // Test Update data dengan id 0
        $employeeId = $this->get('/api/employee', [
            'Authorization' => 'Bearer ' . $this->loginToken,
        ])->json('0.id');

        $response = $this->put('/api/employee/' . $employeeId, [
            'name' => 'Jane Doe Updated',
            'email' => 'jane@example.com',
            'position' => 'web dev',
            'salary' => '1550',
        ], [
            'Authorization' => 'Bearer ' . $this->loginToken,
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'name' => 'Jane Doe Updated',
            'email' => 'jane@example.com',
            'position' => 'web dev',
            'salary' => '1550',
        ]);

        // Verify the data is updated
        $response = $this->get('/api/employee/' . $employeeId, [
            'Authorization' => 'Bearer ' . $this->loginToken,
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'name' => 'Jane Doe Updated',
            'email' => 'jane@example.com',
            'position' => 'web dev',
            'salary' => '1550',
        ]);

        // Test Delete data id 1
        $employeeId = $this->get('/api/employee', [
            'Authorization' => 'Bearer ' . $this->loginToken,
        ])->json('1.id');

        $response = $this->delete('/api/employee/' . $employeeId, [], [
            'Authorization' => 'Bearer ' . $this->loginToken,
        ]);

        $response->assertStatus(200);

        // Verify the data is deleted
        $response = $this->get('/api/employee', [
            'Authorization' => 'Bearer ' . $this->loginToken,
        ]);

        $response->assertStatus(200);
        $response->assertJsonMissing([
            'id' => $employeeId,
        ]);


        // Test menampilkan 1 data dengan id 0
        $employeeId = $this->get('/api/employee', [
            'Authorization' => 'Bearer ' . $this->loginToken,
        ])->json('0.id');

        $response = $this->get('/api/employee/' . $employeeId, [
            'Authorization' => 'Bearer ' . $this->loginToken,
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'id' => $employeeId,
            'name' => 'Jane Doe Updated',
            'email' => 'jane@example.com',
            'position' => 'web dev',
            'salary' => '1550',
        ]);
    }
}
