<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $query = Employee::with('division');

        // Filter berdasarkan nama
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        // Filter berdasarkan divisi
        if ($request->has('division_id')) {
            $query->where('division_id', $request->division_id);
        }

        $employees = $query->paginate(10);

        $data = $employees->map(function ($employee) {
            return [
                'id' => $employee->id,
                'image' => $employee->image_url,
                'name' => $employee->name,
                'phone' => $employee->phone,
                'division' => [
                    'id' => $employee->division->id,
                    'name' => $employee->division->name,
                ],
                'position' => $employee->position,
            ];
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Data karyawan berhasil diambil',
            'data' => [
                'employees' => $data,
            ],
            'pagination' => [
                'current_page' => $employees->currentPage(),
                'last_page' => $employees->lastPage(),
                'per_page' => $employees->perPage(),
                'total' => $employees->total(),
                'from' => $employees->firstItem(),
                'to' => $employees->lastItem(),
            ],
        ]);
    }

    public function store(EmployeeRequest $request)
    {
        \Log::info('Employee store method called');
        \Log::info('Request data:', $request->all());
        
        $data = $request->validated();
        \Log::info('Validated data:', $data);

        // Upload image
        if ($request->hasFile('image')) {
            \Log::info('Image file detected');
            $imagePath = $request->file('image')->store('employees', 'public');
            $data['image'] = $imagePath;
            \Log::info('Image uploaded to:', ['path' => $imagePath]);
        } else {
            \Log::warning('No image file in request');
        }

        // Map division to division_id if present
        if (isset($data['division'])) {
            $data['division_id'] = $data['division'];
            unset($data['division']);
        }
        
        \Log::info('Data before create:', $data);

        try {
            $employee = Employee::create($data);
            \Log::info('Employee created successfully:', ['id' => $employee->id]);
        } catch (\Exception $e) {
            \Log::error('Failed to create employee:', ['error' => $e->getMessage()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal membuat karyawan: ' . $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Data karyawan berhasil ditambahkan',
        ], 201);
    }

    public function update(EmployeeRequest $request, $id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data karyawan tidak ditemukan',
            ], 404);
        }

        $data = $request->validated();

        // Upload image baru jika ada
        if ($request->hasFile('image')) {
            // Hapus image lama
            if ($employee->image) {
                Storage::disk('public')->delete($employee->image);
            }

            $imagePath = $request->file('image')->store('employees', 'public');
            $data['image'] = $imagePath;
        }

        // Map division to division_id if present
        if (isset($data['division'])) {
            $data['division_id'] = $data['division'];
            unset($data['division']);
        }

        $employee->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Data karyawan berhasil diupdate',
        ]);
    }

    public function destroy($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data karyawan tidak ditemukan',
            ], 404);
        }

        // Hapus image
        if ($employee->image) {
            Storage::disk('public')->delete($employee->image);
        }

        $employee->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data karyawan berhasil dihapus',
        ]);
    }
}