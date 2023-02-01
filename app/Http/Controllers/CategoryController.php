<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::latest()->get();
    }
    public function store(StoreCategoryRequest $request) {

        // $request->validate([
        //     'name'=> ['required', 'unique:categories']
        // ]);

        $name = $request->input('name');
        $category = new Category();
        $category->name = $name;

        return $category->save();
    }
    public function show(Category $category)
    {
        return $category;
    }
    public function update(StoreCategoryRequest $request, Category $category)
    {
        $name = $request->input('name');
        $category->name = $name;
        return $category->save();

    }
    public function destroy(Category $category)
    {
        return $category->delete();
    }
}
