<?php
  namespace App\Kspace;

  use GuzzleHttp\Exception\GuzzleException;
  use GuzzleHttp\Client;

  /* This is a placeholder until the ElasticSearch stuff gets sorted out */
  class SolrDataSpaceClient 
  {
      protected $client;
      public function __construct()
      {
          $client =  new Client([ 'base_uri' => config('services.nif.host'), 'verify' => false ]); 
          $this->client = $client;
      }

      public function defaultParams()
      {
        return array( 
          'offset' => 0,
          'count' => 5,
          'key' => config('services.scicrunch.key'), 
        );
 
      }

      
    public function search( $sources, $query,  $params = array( 'count' => 5, 'offset' => 0 ))
      {
        $params = array_merge( $this->defaultParams(), $params );
        $params["q"] = $query;
        $output = []; 
        foreach ( $sources as $source  ) {
          $res = $this->client->request("GET", '/api/1/dataservices/federation/data/'.$source, ['query' => $params]);
          $facetsRes = $this->client->request("GET", '/api/1/dataservices/federation/facets/'.$source, ['query' => $params]);
          
          // YUCK!
          $facets = []; 
          $xml = simplexml_load_string( $facetsRes->getBody() ); 
          foreach ( $xml->facets as $category ) {
            $name = (string) $category["category"];
            $facets[$name] = []; 
            foreach ( $category->facets as $facet ) {
              $facetOutput = array();
              $facetOutput["value"] = (string) $facet;
              $facetOutput["count"] = (string) $facet["count"];  
              array_push($facets[$name], $facetOutput); 
            } 
          }; 
           
          $output[$source]["data"] = simplexml_load_string( $res->getBody() );
          $output[$source]["facets"] = $facets; 
        }
        return json_encode($output);
      }
  }
