<?php

namespace App\Facades;
use Illuminate\Support\Facades\Facade;

class DataSpaceClient extends Facade
{
  protected static function getFacadeAccessor()
  {
    return 'DataSpaceClient';
  }
}

