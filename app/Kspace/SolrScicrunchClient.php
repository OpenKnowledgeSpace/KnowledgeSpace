<?php
  namespace App\Kspace;

  use GuzzleHttp\Exception\GuzzleException;
  use GuzzleHttp\Client;

  /* This is a placeholder until the ElasticSearch stuff gets sorted out */
  class SolrScicrunchClient 
  {
      protected $client;
      public function __construct()
      {
          $client =  new Client([ 'base_uri' => config('services.literature.host') ]); 
          $this->client = $client;
      }

      public function defaultParams()
      {
        return array( 'start' => 0, 'rows' => 5, 'fl' => '*', 'wt' => 'json', 
          'indent' => true, 
          'facet' => 'on',
          'facet.field' => "year",
					'json.nl' => 'arrarr', 
          'sort' => 'year desc,month desc,day desc' 
        );
 
      }


      public function searchLatestLiterature($terms, $year,  $params = array())
      {
        
        $params = array_merge( $this->defaultParams(), $params );
        $params["q"] = "{!lucene q.op=OR}".implode(" ", $terms);
        $params["fq"] = "year:".$year; 
        $res = $this->client->request("GET", "/literature/collection1/select", 
                                 [ 'query' => $params ]     
                                  );
          return json_decode( $res->getBody() ); 
           
      
      }


  }
