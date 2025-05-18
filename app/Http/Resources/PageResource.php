<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
{
  public function toArray(Request $request): array
  {
    return [
      'id' => (string) $this->id,
      'title' => $this->title,
      'excerpt' => $this->excerpt,
      'mood' => optional($this->mood)->name, // mood est une relation
      'moodColor' => optional($this->mood)->color,
      'likes' => $this->likes,
      'views' => $this->views,
      'image' => $this->media->first()->url ?? '/placeholder.svg',
      'slug' => $this->slug,
      'theme' => $this->theme,
      'createdAt' => $this->created_at,
    ];
  }
}
