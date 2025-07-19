<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
class TaskController extends Controller
{
public function index()
{
return Task::orderBy('due_date')->get();
}
public function store(Request $request)
{
$data = $request->validate([
'reference'
=> 'required|unique:tasks',
'name'
=> 'required|string',
'description' => 'nullable|string',
'due_date'
=> 'required|date',
'status'
=> 'in:Sin iniciar,En
proceso,Completada,Anulada',
]);
return Task::create($data);
}
public function show(Task $task)
{
return $task;
}
public function update(Request $request, Task $task)
{
$data = $request->validate([
'name'
=> 'sometimes|required|string',
'description' => 'nullable|string',
'due_date'
=> 'sometimes|required|date',
'status'
=> 'in:Sin iniciar,En
proceso,Completada,Anulada',
]);
$task->update($data);
return $task;
}
public function destroy(Task $task)
{
$task->delete();
return response()->noContent();
}
}