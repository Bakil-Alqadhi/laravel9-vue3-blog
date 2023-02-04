<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        return PostResource::collection(Post::latest()->get());
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
        return new PostResource($post);
    }
}