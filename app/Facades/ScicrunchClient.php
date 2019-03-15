<?php

namespace App\Facades;
use Illuminate\Support\Facades\Facade;

class ScicrunchClient extends Facade
{
  protected static function getFacadeAccessor()
  {
    return 'ScicrunchClient';
  }
}
