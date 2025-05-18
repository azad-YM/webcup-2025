<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FarewellPage extends Model
{
  use HasFactory;

    protected $fillable = [
			'title',
			'excerpt',
			'slug',
			'content',
			'mood_id',
			'author_id',
			'song',
			'theme',
			'likes',
			'views',
    ];

    public function author()
    {
        return $this->belongsTo(User::class);
    }

    public function mood()
    {
        return $this->belongsTo(Mood::class);
    }

    public function media()
    {
        return $this->hasMany(PageMedia::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
