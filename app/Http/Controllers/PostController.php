<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Console\View\Components\Confirm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index(Request $request)
    {
        if($request->category){
            return PostResource::collection(Category::where('name', $request->category)->firstOrFail()->posts()->latest()->paginate(1)->withQueryString());
        }
        if($request->search){
            return PostResource::collection(Post::where('title', 'like', '%'. $request->search .'%')
                ->orWhere('body', 'like', '%'. $request->search .'%') ->latest()->paginate(1)->withQueryString());
        }
        return PostResource::collection(Post::latest()->paginate(1));
    }
    public function store(StorePostRequest $request)
    {
        $title = $request->input('title');
        if(!Post::count()){
            $postId = 1;
        } else {
            $postId = Post::latest()->first()->id + 1;
        }
        $slug = Str::slug($title, '-') . '-' . $postId;
        $imagePath = 'storage/' . $request->file('file')->store('postImages', 'public');
        //store will create an image with unique id for us in path public/postsImages after that will return the path of the file

        //create new post
        $post = new Post();
        $post->title = $title;
        $post->slug = $slug;
        $post->imagePath = $imagePath;
        $post->body = $request->input('body');
        $post->category_id = $request->category_id;
        $post->user_id = auth()->user()->id;
        $post->save();
    }
    public function show(Post $post)
    {
        if(auth()->user()->id !== $post->user_id){
            return abort(403);
        }
        return new PostResource($post);
    }
    public function update(Request $request, Post $post)
    {
        if(auth()->user()->id !== $post->user_id){
            return abort(403);
        }
        $request->validate([
            'title' => 'required',
            'file' => ['nullable | image'],
            'body' => ['required'],
            'category_id'=> 'required'
        ]);

        $title = $request->input('title');

        $slug = Str::slug($title, '-') . '-' . $post->id;
        if($request->file('file')){
            File::delete($post->imagePath);
            $imagePath = 'storage/' . $request->file('file')->store('postImages', 'public');
            $post->imagePath = $imagePath;
        }
        $post->title = $request->title;
        $post->slug = $slug;
        $post->body = $request->input('body');
        $post->category_id = $request->category_id;
        return $post->save();
    }
    public function destroy(Post $post)
    {
        if(auth()->user()->id !== $post->user_id){
            return abort(403);
        }
        return $post->delete();
    }
}