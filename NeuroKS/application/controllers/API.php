<?php

 /**
   * This class is controller for the KS API
   * 
   * 
   * @package    NeuroKS
   * @subpackage Controller
   * @author     Willy Wong <wwong@ncmir.ucsd.edu>
   */
class API extends CI_Controller 
{
    
    private function handleDataSpace(&$data, $searchName)
    {
            
            //require_once  'Globals.php';
            require_once 'ServiceUtil.php';
            $util = new ServiceUtil;

            $newName =$searchName;
            if(strcasecmp($searchName,"cell")==0)
            {
                $newName=$searchName;
            }
            else if(strcasecmp($searchName,"neuron")==0)
            {
                $newName=$searchName;
            }
            else if($util->endsWith($searchName, "%20cell"))
            {
                $tempName = substr($searchName, 0, strlen($searchName)-strlen("%20cell"));
                $newName = $tempName;
            }
            else if($util->endsWith($searchName, "%20neuron"))
            {
                $tempName = substr($searchName, 0, strlen($searchName)-strlen("%20neuron"));
                $newName = $tempName;
            }
            
            //echo "<p>----------------NewName:".$newName;
            
            $source_search_result =array();
            $sources = $data["config_array"]->sources;
            $category_to_source = $data["category_to_source"];
            $categories =  $data["config_array"]->categories;
            $category_count_array = array();
            foreach($sources as $source)
            {
                $source_search_result[$source->curie] = $util->searchWithinSource($newName, $source->curie, 20,0);
            }
            
            foreach($categories as $category)
            {
                $category_count_array[$category] =0;
                $categorySources = $category_to_source[$category];
                foreach($categorySources as $csource)
                {
                    $sourceResult = $source_search_result[$csource->curie];
                    if(!is_null($sourceResult))
                        $category_count_array[$category]=
                            $category_count_array[$category]+$sourceResult->result->resultCount;
                }
            }
            $data["source_search_result"] =$source_search_result;
            //var_dump($category_count_array);
            $data["category_count_array"] = $category_count_array;
            
            
    }
    
    public function summary($page)
    {
        require_once 'ServiceUtil.php';
        $util = new ServiceUtil();
                
        require_once 'Config.php';
        $myConfig = new Config();
        $myConfig->loadJsonConfig($data);
        
        
        $pageName = NULL;
        $termObj = NULL;

        $pageName = $page;
        $pos = strpos($pageName,":");
        //echo "----pos:".$pos;
        if($pos == false)
        {
            $pageName = str_replace("_", "%20", $page);
            $pageName = str_replace(",","%2c",$pageName);
            $data["page"] = $page;
        }
               
        $isNifID = false;
        $originalPageName="";
        
        if( $pos != false)
        {
                    $termObj[0] = $util->getObjByCurie($pageName);
                    #echo "\n-------Willy----!is_null(termObj):".!is_null($termObj)."\n";
                    //echo "---------------------TermObj-------------------------";
                    //var_dump($termObj);
                    //echo "----------------------------------------------";
                    if(!is_null($termObj) && !is_null($termObj[0]))
                    {
                        $data['curie'] = $termObj[0]->curie;
                        if(count($termObj[0]->labels) > 0)
                        {
                            $data['pageName'] = $termObj[0]->labels[0];
                            $pageName = $data['pageName'];
                            
                            $originalPageName=$pageName;
                            $pageName = str_replace(" ", "%20", $pageName);
                            
                            $pageName = str_replace(",", "%2c", $pageName);
                            
                             $data['pageName'] = $pageName;
                            $isNifID = true;
                        }
                        else
                            $data['pageName'] = $pageName;
                        
                    }
                    else
                    {
                        show_404();
                        //$data['pageName'] = $pageName;                  
                        //$termObj = getTerm($pageName);
                    }
        }
        
        $pageName = str_replace(str_split('_'), '%20',$pageName );
        $pageName = str_replace(str_split(','), '%2c',$pageName );
        $pageName = str_replace(str_split('/'), '%2f',$pageName );
               
        $data['pageName'] = $pageName;
        $data['page_title'] = $pageName;
        $data['enable_config'] = true;
        
        $stitle="";
        if(!$isNifID)
        {
            $stitle = ucfirst($page);
            $stitle = str_replace("_", " ", $stitle);
            $data['title'] = $stitle;
        }
        else
        {
            $stitle = $originalPageName;
            $data['title'] = $stitle;
        }
            
        
        if(!isset($data['curie']))
            show_404();
        else 
        {
            $this->handleDataSpace($data, $pageName);
            $this->load->view('api/view_summary', $data);
        }
    }
    

}


?>
