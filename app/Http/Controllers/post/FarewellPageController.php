<?php


namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
use App\Models\FarewellPage;
use App\Models\Mood;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

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

      return Inertia::render('post/show', [
      'page' => $page 
    ]);
  }

  /**
   * Post /api/pages
   */
  public function store(Request $request)
  {
    // Tu récupères les données brutes
    $data = $request->all();
    
    // Tu trouves le mood via son nom
    $mood = Mood::where('name', $data['mood'] ?? 'Dramatique')->first();

    // Tu crées la page directement
    $page = FarewellPage::create([
      'title' => $data['title'] ?? 'Sans titre',
      'excerpt' => Str::limit($data['message'] ?? '', 120),
      'slug' => Str::slug(($data['title'] ?? 'page') . '-' . Str::random(4)),
      'content' => $data['message'] ?? '',
      'mood_id' => $mood->id,
      'author_id' => Auth::user()?->id ?? 1,
      'song' => null,
      'color' => $data['theme'] ?? 'bg-gray-500',
      'likes' => 0,
      'views' => 0,
    ]);

    return redirect('/')
    ->with('success', 'Votre page d\'adieu est maintenant en ligne.');
  }


}
