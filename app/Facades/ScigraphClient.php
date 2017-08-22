<?php

namespace App\Facades;
use Illuminate\Support\Facades\Facade;

class ScigraphClient extends Facade
{
  protected static function getFacadeAccessor()
  {
    return 'ScigraphClient';
  }
}
