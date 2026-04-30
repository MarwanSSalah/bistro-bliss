<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MenuItem;

class MenuItemsController extends Controller
{
    public function index()
    {
        return response()->json(MenuItem::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required|string',
            'price'       => 'required|numeric|min:0',
            'image'       => 'string|max:255',
            'category'    => 'required|in:BREAKFAST,MAIN_DISH,DRINK,DESSERT',
            'is_available'=> 'boolean'
        ]);

        $menuItem = MenuItem::create($validated);
        return response()->json($menuItem, 201);
    }

    public function update(Request $request, MenuItem $menu_item)
    {
        $validated = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price'       => 'sometimes|numeric|min:0',
            'image'       => 'sometimes|string|max:255',
            'category'    => 'sometimes|in:BREAKFAST,MAIN_DISH,DRINK,DESSERT',
            'is_available'=> 'sometimes|boolean'
        ]);

        $menu_item->update($validated);
        return response()->json($menu_item);
    }

    public function destroy(MenuItem $menu_item)
    {
        $menu_item->delete();
        return response()->json(['message' => 'Menu item deleted successfully']);
    }
}
