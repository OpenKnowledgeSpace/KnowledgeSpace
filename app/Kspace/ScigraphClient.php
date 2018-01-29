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
      
      public function getTermWithCurie($curie)
      {
          // Weird bug with PHP URI library not liking colons. 
          // https://github.com/guzzle/guzzle/issues/1550
          $res = $this->client->request("GET", "/scigraph/vocabulary/id/".$curie."?");
          try { return json_decode( $res->getBody() ); } catch (Exception $e) { return json_decode([]); } 
      }
      
      public function getTermWithKeyword($term)
      {
          // Weird bug with PHP URI library not liking colons. 
          // https://github.com/guzzle/guzzle/issues/1550
          $res = $this->client->request("GET", "/scigraph/vocabulary/term/".$term."?limit=20&searchSynonyms=false&searchAbbreviations=false&searchAcronyms=false");
          if ( $res->getStatusCode() < 400 ) {
            try { return json_decode( $res->getBody() ); } catch (Exception $e) { return json_decode("[]"); } 
          } else { return []; }
      }
      
      public function getGraph($term)
      {
          $res = $this->client->request("GET", "/scigraph/graph/neighbors/".$term."?depth=1&blankNodes=false&direction=BOTH&proejct=%2A");
          try { return json_decode( $res->getBody() ); } catch (Exception $e) { return json_decode("[]"); } 
      }
      
      public function search($params = array() )
      {

        // First we check the terms endpoint to see if there's something there
        // thats better than str8 keyword
        $termSearch = ScigraphClient::getTermWithKeyword($params["q"]);
        
        $defaults = array( "q" => 0, 'limit' => "100000", 'searchSynonyms' => "false",
          'searchAbbreviations' => "false", 'searchAcronyms' => "false"  );
        $params = array_merge( $defaults, $params );
        $terms = $params["q"];
        unset($params["q"]);
        $res = $this->client->request("GET", "/scigraph/vocabulary/search/".$terms, [ "query" => $params ]);
        if ( $res->getStatusCode() < 400 ) {
          // this merges in our results from the term search and the keyword
          // search 
          $results = array( "term" => $termSearch, "keyword" => json_decode( $res->getBody() ));
          return $results;
        } else {
          return json_decode("[]");
        }
      }

  }
