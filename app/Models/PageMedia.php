<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageMedia extends Model
{
  use HasFactory;

  protected $fillable = ['farewell_page_id', 'url'];

  public function page()
  {
    return $this->belongsTo(FarewellPage::class, 'farewell_page_id');
  }
}
