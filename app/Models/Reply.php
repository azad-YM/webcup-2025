<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reply extends Model
{
    use HasFactory;

    protected $fillable = ['comment_id', 'author_id', 'content', 'likes'];

    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class);
    }
}
