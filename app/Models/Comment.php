<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
	use HasFactory;

	protected $fillable = ['farewell_page_id', 'author_id', 'content', 'likes'];

	public function page()
	{
			return $this->belongsTo(FarewellPage::class, 'farewell_page_id');
	}

	public function author()
	{
			return $this->belongsTo(User::class);
	}

	public function replies()
	{
			return $this->hasMany(Reply::class);
	}

}
