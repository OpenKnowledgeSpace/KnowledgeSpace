<?php

    class Search extends CI_Controller {

        public function term($keywords)
        {
            //echo "-----".$keywords;
            $this->doSearch($keywords);
        }
        public function loadCategoriesConfig(&$data)
        {
            // Open the file
            //echo "--------------loadCategoriesConfig-----------";
            $sources= array();
            $selected = array();
            $array = explode("\n", file_get_contents(getcwd()."/application/controllers/categories.txt"));
            foreach ($array as $line) {
                $items= explode( ',', $line );
                array_push($sources,$items);
                
                if(strcmp(trim($items[1]), "true") == 0)
                    array_push($selected, $items[0]);

            }
            
            //if(!array_key_exists('ks_selected_categories',$_COOKIE))
            if(!isset($_COOKIE['ks_selected_categories']))
            {
                //echo "Setting cookies--------ks_selected_categories";
                $line = implode(',',$selected);
                //echo "-----line:".$line;
                $data["ks_selected_categories"] = $line;
                //setcookie("ks_selected_categories", $line,time()+2592000);
                //setcookie("ks_selected_categories",$line);
                //echo "\nks_selected_categories:".$_COOKIE["ks_selected_categories"];
                
            }

            
            return $sources;
        }
        public function loadSourcesConfig(&$data)
        {
            //echo "--------------loadSourcesConfig-----------";
            // Open the file
            $sourceIDs = "";array();
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
                     //array_push($sourceIDs,$items[1]);
            }
            //if(!array_key_exists('ks_selected_sources',$_COOKIE))
            if(!isset($_COOKIE['ks_selected_sources']))
            {
                //echo "Setting cookies--------ks_selected_sources";
                //setcookie('ks_selected_sources', $sourceIDs, time()+3600);
                $data["ks_selected_sources"] = $sourceIDs;
            }
            //if(!array_key_exists('ks_selected_sources',$_COOKIE))
            //{ 
                    //$json = json_encode($sourceIDs);
                    //setcookie('ks_selected_sources', $json, time()+3600);
            //}

            return $sources;
        }
        private function doSearch($keywords)
        {
             require_once('ServiceUtil.php');
                $util = new ServiceUtil;
                $keywords = str_replace(" ", "%20", $keywords);
                //Loading sources configurations
               $sources = $this->loadSourcesConfig($data);
               if($sources != null)
               {
                   $data['ks_sources'] = $sources;
                   
               }
               
               //Loading categories configurations
               $categories = $this->loadCategoriesConfig($data);
               if($categories != null)
               {
                   $data['categories'] = $categories;
               }
                $termResult = $util->getTerm($keywords);
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
                          if(isset($unique[$row->curie]))
                            continue;
                          else
                          {
                            $unique[$row->curie] =$row->curie;
                            array_push($uniqueArray,$row);
                          }
                       }
                       $searchResult = $uniqueArray;
                       
                    }
                     $data['searchResult'] = $searchResult;
                     $data['page_title'] = "Search";
                     $data['enable_config'] = false;
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
