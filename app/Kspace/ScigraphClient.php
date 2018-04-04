<?php
  namespace App\Kspace;

  use GuzzleHttp\Exception\GuzzleException;
  use GuzzleHttp\Client;
  use GuzzleHttp\Psr7\Request;

  class ScigraphClient 
  {
      protected $client;
      public function __construct()
      {
          $client =  new Client([ 'base_uri' => config('services.scigraph.host'), 'exceptions' => false ]); 
          $this->client = $client;
      }

      public function defaultParams()
      {
        return array( 
          'key' => config('services.scicrunch.key'), 
        );
      }
      

      public function getTermWithCurie($curie)
      {
          // Weird bug with PHP URI library not liking colons. 
          // https://github.com/guzzle/guzzle/issues/1550
          $params = $this->defaultParams(); 
          $res = $this->client->request("GET", "/api/1/scigraph/vocabulary/id/".$curie, ['query' => $params ]);
          try { 
            return json_decode( $res->getBody(), true );
          } catch (Exception $e) {
            echo var_dump($e); 
            return json_decode([], true);
         
          } 
      }
      
      public function getDescriptionWithCurie($curie)
      {
          // Weird bug with PHP URI library not liking colons. 
          // https://github.com/guzzle/guzzle/issues/1550
         $path =  "/api/1/scigraph/vocabulary/id/".$curie;
         $params = $this->defaultParams();
         $res = $this->client->request("GET", $path, $params);
          try {
            $term = json_decode($res->getBody());
            $definition = "#### No Descriptions Found.";
            if ( !empty($term->definitions) ) {
              $definition = $term->definitions[0];
            }
            
            $json = array("description" => $definition, 'source' => "SciGraph", 
              'url' =>  config('services.scigraph.host').$path);
            return $json;
          } catch (Exception $e) { return json_decode([]); }
      }
      
      public function getTermWithKeyword($term)
      {
          // Weird bug with PHP URI library not liking colons. 
          // https://github.com/guzzle/guzzle/issues/1550
        $params = array_merge( $this->defaultParams(), 
          [ "limit" => 20, "searchSynonyms" => "true", "searchAbbreviations" => "false"]
        );
        $res = $this->client->request("GET", "/api/1/scigraph/vocabulary/term/".$term, ['query' => $params]);
        if ( $res->getStatusCode() < 400 ) {
            try { return json_decode( $res->getBody() ); } catch (Exception $e) { return json_decode("[]"); } 
        } else { return []; }
      }
      
      public function getGraph($term)
      {
          $params = array_merge( $this->defaultParams(), 
            [ "depth" => 1, "blankNodes" => 'false', "direction" => "BOTH"]
          );
          $res = $this->client->request("GET", "/api/1/scigraph/graph/neighbors/".$term, ['query' => $params]);
          try { return json_decode( $res->getBody() ); } catch (Exception $e) { return json_decode("[]"); } 
      }
      
      public function search($params = array() )
      {

        // First we check the terms endpoint to see if there's something there
        // thats better than str8 keyword
        $termSearch = ScigraphClient::getTermWithKeyword($params["q"]);
        
        $defaults = array( "q" => "", 'limit' => "100000", 'searchSynonyms' => "false",
          'searchAbbreviations' => "false", 'searchAcronyms' => "false"  );
        $params = array_merge( $defaults, $params );
        $terms = $params["q"];
        unset($params["q"]);
        
        $params = array_merge( $this->defaultParams(),  $params  );
        $res = $this->client->request("GET", "/api/1/scigraph/vocabulary/search/".$terms, ["query" => $params ]);
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
