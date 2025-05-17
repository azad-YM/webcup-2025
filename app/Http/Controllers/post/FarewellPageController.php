<?php


namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
use App\Models\FarewellPage;
use Illuminate\Http\Request;

class FarewellPageController extends Controller
{
  /**
   * GET /api/pages
   */
  public function index()
  {
    $pages = FarewellPage::with('author', 'mood', 'media')
      ->latest()
      ->get()
    ;
  
    return PageResource::collection($pages);
  }

  /**
   * GET /api/pages/{slug}
   */
  public function show($slug)
  {
    $page = FarewellPage::with(['author', 'mood', 'media', 'comments.replies.author'])
      ->where('slug', $slug)
      ->firstOrFail();
    
    return response()->json($page);
  }

  // Optionnel : méthode pour créer une page
  /*
  public function store(Request $request)
  {
      $validated = $request->validate([
          'title' => 'required|string|max:255',
          'excerpt' => 'required|string',
          'slug' => 'required|string|unique:farewell_pages',
          'content' => 'required|string',
          'mood_id' => 'required|exists:moods,id',
          'author_id' => 'required|exists:authors,id',
          'song' => 'nullable|string',
          'color' => 'required|string'
      ]);

      $page = FarewellPage::create($validated);

      return response()->json($page, 201);
  }
  */
}
