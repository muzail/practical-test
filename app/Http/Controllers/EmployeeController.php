<?php

namespace App\Http\Controllers;

use App\Repositories\EmployeeRepositoryInterface;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    protected $employeeRepository;

    public function __construct(EmployeeRepositoryInterface $employeeRepository)
    {
        $this->employeeRepository = $employeeRepository;
    }

    public function index()
    {
        $employees = $this->employeeRepository->all();
        return response()->json($employees, 200);
    }

    public function show($id)
    {
        $employee = $this->employeeRepository->find($id);
        if ($employee) {
            return response()->json($employee, 200);
        }
        return response()->json(['message' => 'Employee not found'], 404);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $employee = $this->employeeRepository->create($data);
        return response()->json($employee, 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $employee = $this->employeeRepository->update($id, $data);
        if ($employee) {
            return response()->json($employee);
        }
        return response()->json(['message' => 'Employee not found'], 404);
    }

    public function destroy($id)
    {
        $deleted = $this->employeeRepository->delete($id);
        if ($deleted) {
            return response()->json(['message' => 'Employee deleted']);
        }
        return response()->json(['message' => 'Employee not found'], 404);
    }
}
