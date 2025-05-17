<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'author', 'quote', 'mood_id', 'color'];

    public function mood()
    {
        return $this->belongsTo(Mood::class);
    }
}
