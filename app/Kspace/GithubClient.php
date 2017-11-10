<?php
  namespace App\Kspace;

  use GuzzleHttp\Exception\GuzzleException;
  use GuzzleHttp\Client;

  class GithubClient 
  {
      protected $client;
      public function __construct()
      {
          $client =  new Client([ 'base_uri' => config('services.github.host'), 'exceptions' => false ]); 
          $this->client = $client;
      }

      public function getDescription($term)
      {
          $path =  "/OpenKnowledgeSpace/ksdesc/master/".str_replace(":","/", $term).".md";  
          $res = $this->client->request("GET", $path );
          if ( $res->getStatusCode() < 400 ) {
            return  $res->getBody(); 
          } else { return "### No Description Found"; }     
      }
      

  }
