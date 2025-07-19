<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TodoController extends Controller
{
    /**
     * Obtener todas las tareas
     */
    public function index(): JsonResponse
    {
        $todos = Todo::orderBy('created_at', 'desc')->get();
        return response()->json($todos);
    }

    /**
     * Crear una nueva tarea
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:Sin iniciar,En Proceso,Completada,Anulada',
            'due_date' => 'nullable|date'
        ]);

        $todo = Todo::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status ?? 'En Proceso',
            'due_date' => $request->due_date,
            'completed' => false
        ]);

        return response()->json($todo, 201);
    }

    /**
     * Obtener una tarea específica
     */
    public function show(int $id): JsonResponse
    {
        $todo = Todo::findOrFail($id);
        return response()->json($todo);
    }

    /**
     * Actualizar una tarea
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $todo = Todo::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:Sin iniciar,En Proceso,Completada,Anulada',
            'due_date' => 'nullable|date',
            'completed' => 'sometimes|boolean'
        ]);

        $todo->update($request->all());

        return response()->json($todo);
    }

    /**
     * Eliminar una tarea
     */
    public function destroy(int $id): JsonResponse
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json(['message' => 'Tarea eliminada correctamente']);
    }

    /**
     * Cambiar el estado de completado de una tarea
     */
    public function toggle(int $id): JsonResponse
    {
        $todo = Todo::findOrFail($id);
        $todo->update(['completed' => !$todo->completed]);

        return response()->json($todo);
    }
} 