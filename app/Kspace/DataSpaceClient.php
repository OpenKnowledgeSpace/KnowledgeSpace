<?php

namespace App\Kspace;

  use Elasticsearch\ClientBuilder;

  class DataSpaceClient 
  {
    protected $client;
    public function __construct()
    {
      
      
      $host = [[ 
        'host' => config('services.data_space.host'),
        'user' => config('services.data_space.user'), 
        'pass' => config('services.data_space.pass'),
        'port' => '80',
        'scheme' => 'http'
      ]]; 
      $this->client =  ClientBuilder::create()->setHosts($host)->build(); 
    }
    
    protected function default_params($terms, $keywords = [])
    {
				$keywords = array_filter($keywords);
				$params = [  'index' => "*", 
          'from' => 0,
          'size' => 20, 
          'body' => [ 
            'query' => [ 
              'bool' => [
                'must' => [
                  array_map( function($val) { 
                    return array('match_phrase' => ['_all' => $val ]);
                  }, $terms ),
                ],
							]
						], 
            'aggs' => [ 'source_count' => [ 'terms' => [ 'field' => '_index', 'size' => 10 ] ] ] 
          ]
         ];
			
				if ( !empty($keywords) ) {
					$keyword_query = array( 'simple_query_string' => [ 
							'query' => join( ' ', array_map( function($val) { return $val. "*"; }, $keywords  ) )
						 ]  
					);	
					array_push( $params["body"]["query"]["bool"]["must"], $keyword_query) ;
				}
				return $params; 	
    }
    
		protected function default_image_params($terms)
    {
        return [  'index' => "*", 
          'from' => 0,
          'size' => 20, 
          'body' => [ 
            'query' => [ 
              'filtered' => [
                'query' =>  
                   [ 'match' => [   '_all' => [ 'query' => join($terms, '  '), 'operator' => 'and'  ] ] ],
                'filter' => [ 'exists' => [ 'field' => 'access.landingPage' ] ]  
                ]
               ], 
               'aggs' => [ 
                 'source_count' => [ 'terms' => [ 'field' => '_index', 'size' => 10 ] ],
                 'sources' => [ 'terms' => [ 'field' => 'homePage', 'size' => 10 ] ],
               ] 
          ]
         ]; 
    }


    public function search($sources, $terms, $keywords = [], $params = array( 'size' => 5, 'from' => 0 ) ) 
    {
				$params["index"] = $sources;                 
        $params = array_merge( $this->default_params($terms, $keywords), $params );
        return $this->client->search($params); 
    }
    
    public function searchImages($sources, $terms, $params = array( 'size' => 5, 'from' => 0 ) ) 
    {
        $params["index"] = $sources;                 
        $params = array_merge( $this->default_image_params($terms), $params );
        return $this->client->search($params); 
    }
    
}
