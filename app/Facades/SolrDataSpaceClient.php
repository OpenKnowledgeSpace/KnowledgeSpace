<?php

namespace App\Facades;
use Illuminate\Support\Facades\Facade;

class SolrDataSpaceClient extends Facade
{
  protected static function getFacadeAccessor()
  {
    return 'SolrDataSpaceClient';
  }
}

