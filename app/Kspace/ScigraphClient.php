<?php
  namespace App\Kspace;

  use GuzzleHttp\Exception\GuzzleException;
  use GuzzleHttp\Client;

  class ScigraphClient 
  {
      protected $client;
      public function __construct()
      {
          $client =  new Client([ 'base_uri' => config('services.scigraph.host'), 'exceptions' => false ]); 
          $this->client = $client;
      }
      
      public function getTerm($term)
      {
          // Weird bug with PHP URI library not liking colons. 
          // https://github.com/guzzle/guzzle/issues/1550
          $res = $this->client->request("GET", "/scigraph/vocabulary/id/".$term."?");
          return json_decode( $res->getBody() ); 
      }
      
      public function getGraph($term)
      {
          $res = $this->client->request("GET", "/scigraph/graph/neighbors/".$term."?depth=1&blankNodes=false&direction=BOTH&proejct=%2A");
          return json_decode( $res->getBody() ); 
      }
      
      public function search($params = array() )
      {
        
        $defaults = array( "q" => 0, 'limit' => "100000", 'searchSynonyms' => "false",
          'searchAbbreviations' => "false", 'searchAcronyms' => "false"  );
        $params = array_merge( $defaults, $params );
        $terms = $params["q"];
        unset($params["q"]);
        $res = $this->client->request("GET", "/scigraph/vocabulary/search/".$terms, [ "query" => $params ]);
        if ( $res->getStatusCode() < 400 ) {
          return json_decode( $res->getBody() );
        } else {    
          return json_decode( );
        }   
        
      }

  }
