<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mood extends Model
{
  use HasFactory;

	protected $fillable = ['name', 'emoji', 'color'];

	public function pages()
	{
			return $this->hasMany(FarewellPage::class);
	}

	public function testimonials()
	{
			return $this->hasMany(Testimonial::class);
	}
}
