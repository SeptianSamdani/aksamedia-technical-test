<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Employee;
use App\Models\Division;
use Illuminate\Support\Facades\DB;

echo "=== Testing Employee Creation ===\n\n";

// Check database connection
try {
    DB::connection()->getPdo();
    echo "✓ Database connected successfully\n";
} catch (\Exception $e) {
    echo "✗ Database connection failed: " . $e->getMessage() . "\n";
    exit(1);
}

// Get first division
$division = Division::first();
if (!$division) {
    echo "✗ No divisions found in database\n";
    exit(1);
}
echo "✓ Found division: {$division->name} (ID: {$division->id})\n";

// Try to create employee
echo "\nAttempting to create employee...\n";

try {
    $employee = Employee::create([
        'name' => 'Test Employee',
        'phone' => '081234567890',
        'division_id' => $division->id,
        'position' => 'Test Position',
        'image' => null, // No image for testing
    ]);
    
    echo "✓ Employee created successfully!\n";
    echo "  ID: {$employee->id}\n";
    echo "  Name: {$employee->name}\n";
    echo "  Phone: {$employee->phone}\n";
    echo "  Position: {$employee->position}\n";
    echo "  Division ID: {$employee->division_id}\n";
    
    // Verify in database
    $count = Employee::count();
    echo "\n✓ Total employees in database: {$count}\n";
    
} catch (\Exception $e) {
    echo "✗ Failed to create employee: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}
