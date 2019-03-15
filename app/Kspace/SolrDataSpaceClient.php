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


    public function searchSource( $source, $params, $try = 0)
      {
        try {
          $res = $this->client->request("GET", '/api/1/dataservices/federation/data/'.$source,
          ['query' => $params]);
          return $res->getBody(); 
        } catch ( \GuzzleHttp\Exception\BadResponseException $e ) {
          if ( $try < 20 ) {
            sleep(2); 
            $this->searchSource($source, $params, $try + 1); 
          } else {
            return false; 
          }
        } 
      }  

      /* DRY this out */ 
    public function getFacets( $source, $params, $try = 0)
      {
        try {
          $facetsRes = $this->client->request("GET",
            '/api/1/dataservices/federation/facets/'.$source, ['query' => $params]);
          return $facetsRes->getBody(); 
        } catch ( \GuzzleHttp\Exception\BadResponseException $e ) {
          if ( $try < 10 ) {
            sleep(2); 
	          $this->getFacets($source, $params, $try + 1); 
          } else {
            return false; 
          }
        } 
      }  

      /* Swap this out to do concurrent requests... eventually
       * However, currently I'm not sure if the NIF services server can take
       * that kind of load. Eventually refactor this, especially the weak
       * searchSource and getFacets methods. 
       * */ 
    public function search( $sources, $query,  $params = array( 'count' => 5, 'offset' => 0 ))
      {
        $params = array_merge( $this->defaultParams(), $params );
        $params["q"] = $query;
        $output = []; 
        foreach ( $sources as $source  ) {

          $resBody = $this->searchSource($source, $params); 
          $facetBody = $this->getFacets($source, $params); 

          if ( $resBody != false ) {
            $output[$source]["data"] = simplexml_load_string( $resBody );
          } 

          // YUCK!
          $facets = []; 
          if ( $facetBody != false && $resBody != false ) {   
            $xml = simplexml_load_string( $facetBody ); 
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
            $output[$source]["facets"] = $facets; 
          } 
        
        }
        return json_encode($output);
      }
  }
