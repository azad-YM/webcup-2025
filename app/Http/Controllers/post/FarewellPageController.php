<?php


namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
use App\Models\FarewellPage;
use App\Models\Mood;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
    $author = Auth::user();
    if ($author === null) {
      throw new \Exception("Vous dévez d'abord vous connectez !");
    }

    // Tu récupères les données brutes
    $data = $request->all();

    $mood = Mood::where('name', $data['mood'] ?? 'Dramatique')->first();
    // Tu crées la page directement
    $page = FarewellPage::create([
      'title' => $data['title'] ?? 'Sans titre',
      'excerpt' => Str::limit($data['message'] ?? '', 120),
      'slug' => Str::slug(($data['title'] ?? 'page') . '-' . Str::random(4)),
      'content' => $data['message'] ?? '',
      'mood_id' => $mood->id,
      'author_id' => Auth::user()?->id,
      'song' => null,
      'theme' => $data['theme'],
      'likes' => 0,
      'views' => 0,
    ]);

    if ($request->hasFile('attachedFiles')) {
      foreach ($request->file('attachedFiles') as $uploadedFile) {
        // Stockage dans public/pages
        $path = $uploadedFile->store('pages', 'public');

        // Enregistrement dans la table page_media (relation)
        $page->media()->create([
          'url' => Storage::url($path),
        ]);
      }
    }

    return response()->json(status: '201');
  }

}
