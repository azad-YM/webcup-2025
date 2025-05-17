<?php


namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
use App\Models\FarewellPage;
use App\Models\Mood;
use Illuminate\Http\Request;

class MoodController extends Controller
{
  /**
   * GET /api/pages
   */
  public function index()
  {
    $moods = Mood::get();
    return response()->json($moods);
  }
}
