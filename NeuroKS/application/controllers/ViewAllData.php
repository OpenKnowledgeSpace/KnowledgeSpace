<?php

class ViewAllData extends CI_Controller 
{
    /*private function startsWith($haystack, $needle) {
    // search backwards starting from haystack length characters from the end
    return $needle === "" || strrpos($haystack, $needle, -strlen($haystack)) !== FALSE;
    }
    private function endsWith($haystack, $needle) {
    // search forward starting from end minus needle length characters
    return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== FALSE);
    }*/
    
       /* public function handleData(&$data,$searchTerm, $sourceID,$count, $offset)
        {
            require_once('ServiceUtil.php');
            $util = new ServiceUtil;
            
            $json = $util->searchWithinSource($searchTerm,$sourceID,$count,$offset);
            
            return $json;
        }*/
        
        public function getDescription($sourceID)
        {
                $protocol = "http";
		if(isset($_SERVER['HTTPS']))
		{
			$protocol = "https";	
		}
                $surl = $protocol."://".
                        $_SERVER['SERVER_NAME']
                        ."/SciCrunchKS/resources/source_description/".$sourceID;
                
		$responseCode =  @get_headers($surl);
   
                if($responseCode[0] == 'HTTP/1.1 404 Not Found')
                    return "";
                else
		{
			
                    return file_get_contents($surl);
                }
        }
    
        public function handleSourceNames($ks_sources)
        {
            $sourceNameArray = array();
            foreach($ks_sources as $source)
            {
                $id = $source[1];
                $sourceNameArray[$id]=$source[0];
            }
            return $sourceNameArray;
            
        }
        
        public function fixSearchName($term)
        {
            require_once('ServiceUtil.php');
            $util = new ServiceUtil;
            
                $newName =$term;
                $searchName = $term;
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
                
                return $newName;
        }
    
    	public function view($term, $sourceID, $pageID )
	{
            
            require_once('ServiceUtil.php');
            require_once 'Config.php';
            $myConfig = new Config();
            $myConfig->loadJsonConfig($data);
            
            
            $page = $term;
            $data["pageName"] = $page;
            
            $util = new ServiceUtil;
            
            /*$ks_selected_sources = $_COOKIE['ks_selected_sources'];
            
            $selectedSourcesArray =null;
            if($ks_selected_sources!= null)
            {
                $selectedSourcesArray = explode(",", $ks_selected_sources);
                $data['ks_selected_sources'] = $selectedSourcesArray;
                
            }
            $ks_sources = $util->loadSourcesConfig($data);
            $sourceNameArray = $this->handleSourceNames($ks_sources);
            $data['sourceNameArray'] = $sourceNameArray;*/
            
            //if($sources != null)
            //{
            //       $data['ks_sources'] = $sources;
            //       
            //}
            $selectedSourcesArray=$data['ks_sources'];
            $result = array();
            $description = array();
            if($selectedSourcesArray != null)
            {
                $newName = $this->fixSearchName($page);
                foreach($selectedSourcesArray as $source)
                {
                    if(strcmp($sourceID, $source)  == 0)
                    {
                        $offset = 0;
                        if(!isset($pageID) || $pageID <= 1)
                            $offset = 0;
                        else
                        {
                            $offset =($pageID-1)*20;
                        }
                        
                        
                        //$result[$source] =$this->handleData($data,$page,$source,20,$offset);
                        //$result[$source] =$this->handleData($data,$newName,$source,20,$offset);
                         $result[$source] =$util->searchWithinSource($newName,$source,20,$offset);
                    }else
                    {
                        //$result[$source] =$this->handleData($data,$newName,$source,20,0);
                        $result[$source] =$util->searchWithinSource($newName,$source,20,0);
                    
                        //var_dump($source);
                        //var_dump($data);
                        //echo "-----".$newName;
                        //echo "-----".$source;
                    }
                    $description[$source] = $this->getDescription($source);       
                }
            }
            $data['result'] = $result;
            $data['description']=$description;
            
            
            if( strcmp($sourceID, "0")!=0)
            {
                $data['selectedSourceID'] = $sourceID;
                $data['selectedPageID'] = $pageID;
            }      
            else 
            {
                $data['selectedSourceID'] = 0;
                $data['selectedPageID'] = 0;
            }
            //$this->load->view('templates/header', $data);
            $this->load->view('pages/viewAllData', $data);
            //$this->load->view('templates/footer', $data);
            
        }
}


?>