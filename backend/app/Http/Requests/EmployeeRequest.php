<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isCreating = $this->isMethod('post');
        
        $rules = [
            'name' => ($isCreating ? 'required' : 'sometimes') . '|string|max:255',
            'phone' => ($isCreating ? 'required' : 'sometimes') . '|string|max:20',
            'division' => ($isCreating ? 'required' : 'sometimes') . '|uuid|exists:divisions,id',
            'position' => ($isCreating ? 'required' : 'sometimes') . '|string|max:255',
        ];

        // Untuk create, image required. Untuk update, image optional
        if ($isCreating) {
            $rules['image'] = 'required|image|mimes:jpeg,png,jpg,gif|max:2048';
        } else {
            $rules['image'] = 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi',
            'phone.required' => 'Nomor telepon wajib diisi',
            'division.required' => 'Divisi wajib dipilih',
            'division.exists' => 'Divisi tidak ditemukan',
            'position.required' => 'Posisi wajib diisi',
            'image.required' => 'Foto wajib diupload',
            'image.image' => 'File harus berupa gambar',
            'image.mimes' => 'Format gambar harus jpeg, png, jpg, atau gif',
            'image.max' => 'Ukuran gambar maksimal 2MB',
        ];
    }
}