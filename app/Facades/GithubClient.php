<?php

namespace App\Facades;
use Illuminate\Support\Facades\Facade;

class GithubClient extends Facade
{
  protected static function getFacadeAccessor()
  {
    return 'GithubClient';
  }
}
