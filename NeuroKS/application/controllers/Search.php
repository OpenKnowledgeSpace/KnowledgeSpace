<?php

    class Search extends CI_Controller {

        public function term($keywords)
        {
            $this->doSearch($keywords);
        }
        /*public function loadCategoriesConfig(&$data)
        {
            
            $sources= array();
            $selected = array();
            $array = explode("\n", file_get_contents(getcwd()."/application/controllers/categories.txt"));
            foreach ($array as $line) {
                $items= explode( ',', $line );
                array_push($sources,$items);
                
                if(strcmp(trim($items[1]), "true") == 0)
                    array_push($selected, $items[0]);

            }
            
            if(!isset($_COOKIE['ks_selected_categories']))
            {
                $line = implode(',',$selected);
                
                $data["ks_selected_categories"] = $line;
                
            }

            
            return $sources;
        }*/
        /*public function loadSourcesConfig(&$data)
        {

            $sourceIDs = "";
            $sources= array();
            $array = explode("\n", file_get_contents(getcwd()."/application/controllers/sources.txt"));
            foreach ($array as $line) {
                $items= explode( ',', $line );
                array_push($sources,$items);
                
                if(strcmp(trim($items[2]), "true")==0)
                {
                    if(strcmp($sourceIDs, "")==0)
                      $sourceIDs = $items[1];
                    else
                      $sourceIDs = $sourceIDs.",".$items[1];
                }
                     
            }
            
            if(!isset($_COOKIE['ks_selected_sources']))
            {
                $data["ks_selected_sources"] = $sourceIDs;
            }
            

            return $sources;
        } */
        private function doSearch($keywords)
        {
            
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
            //$protocol = "http";
            
            $domainName = $_SERVER['HTTP_HOST'];
            
            require_once('ServiceUtil.php');
            require_once 'Config.php';
            $this->load->helper('url');
            
            
             
                $myConfig = new Config();
                $myConfig->loadJsonConfig($data);
                
                $util = new ServiceUtil;
                $keywords = str_replace(" ", "%20", $keywords);
               
               /*$sources = $this->loadSourcesConfig($data);
               if($sources != null)
               {
                   $data['ks_sources'] = $sources;
                   
               }*/
               
               //Loading categories configurations
               /*$categories = $this->loadCategoriesConfig($data);
               if($categories != null)
               {
                   $data['categories'] = $categories;
               }*/
                $termResult = $util->getTerm($keywords);
                //var_dump($termResult);
                $termSize = 0;
				if(!is_array($termResult))
				{
						if($termResult->code >= 400)
							$termResult = null;
				}
                if(!is_null($termResult))
                    $termSize = count($termResult);
               
                //echo "------Term size:".$termSize."<br/>\n";
                if($termSize == 1)
                {
                    if(!property_exists($termResult[0], "curie"))
                      continue;
                    //echo "------Curie:".$termResult[0]->curie."<br/>\n";
                    if(isset($termResult[0]->curie))
                    {
                        //echo "<br/><center>Redirecting to ".$termResult[0]->curie." ...</center>";
                        //redirect($protocol."://".$domainName."/index.php/pages/view/".$termResult[0]->curie, 'refresh');
                        redirect($protocol.$domainName."/index.php/pages/view/".$termResult[0]->curie,'location',301);
                         
                    }   
                    return;
                }
                
                $searchResult = $util->searchTerm($keywords);
                
                    $data['keywords'] = $keywords;
                   
                    $data['termResult']=$termResult;
                    
                    if(!is_null($termResult))
                    {
                       $searchResult = array_merge($termResult,$searchResult);
                       $unique = array();
                       $uniqueArray = array();
                       foreach($searchResult as  $row )
                       {
                          if(!property_exists($row, "curie"))
                            continue;
                          if(isset($unique[$row->curie]))
                            continue;
                          else
                          {
                             if(!$row->deprecated) 
							 {
                                $unique[$row->curie] =$row->curie;
                                array_push($uniqueArray,$row);
							 }
                          }
                       }
					   /*
					   usort($uniqueArray, function($a, $b){
							   return strcmp(strtolower(empty($a->categories) ? 'zzzz' : current($a->categories)),
									   strtolower(empty($b->categories) ? 'zzzz' : current($b->categories)));
                                                           });
						*/
                       $searchResult = $uniqueArray;
                       
                    }
                     $data['searchResult'] = $searchResult;
                     $data['page_title'] = "Search";
                     $data['enable_config'] = false;
                     $data['disableTopSearchBar']=true;
                    //var_dump($termResult);
                    
                    $this->load->view('templates/header2', $data);
                    //$this->load->view('pages/'.$page, $data);
                    $this->load->view('pages/search_result', $data);
                    $this->load->view('templates/footer2', $data);
        }
        
	function index()
	{
            
		

		$this->load->library('form_validation');
                
                $keywords = $this->input->post('keywords');

                
                
                //echo "---keywords--".$keywords;
                $this->form_validation->set_rules('keywords', 'Keywords', 'trim|required');
		if ($this->form_validation->run() == FALSE)
		{
			//$this->form_validation->set_message('rule', 'Invalid keyword(s)');
		}
                $this->doSearch($keywords);
               

	}
}
?>
