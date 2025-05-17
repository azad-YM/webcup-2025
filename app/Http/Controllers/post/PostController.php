<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
  public function show($slug): Response
  {
    $post = null;

    return Inertia::render('post/show', [
      'post' => $post,
      'slug' => $slug
    ]);
  }

  public function store(Request $request): Response
  {
    return Inertia::render('/', []);
  }

}
