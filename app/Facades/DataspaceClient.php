<?php

namespace App\Facades;
use Illuminate\Support\Facades\Facade;

class DataspaceClient extends Facade
{
  protected static function getFacadeAccessor()
  {
    return 'DataspaceClient';
  }
}

