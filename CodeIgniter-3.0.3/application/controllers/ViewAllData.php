<?php

class ViewAllData extends CI_Controller 
{
    
        public function handleData(&$data,$searchTerm, $sourceID,$count, $offset)
        {
            require_once('ServiceUtil.php');
            $util = new ServiceUtil;
            
            $json = $util->searchWithinSource($searchTerm,$sourceID,$count,$offset);
            
            return $json;
        }
        
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
    
    	public function view($term, $sourceID, $pageID )
	{
            
            require_once('ServiceUtil.php');
            
            //echo "---------source ID:".$sourceID;
            
            
            $page = $term;
            $data["pageName"] = $page;
            
            $util = new ServiceUtil;
            //$util->loadSourcesConfig($data);
            //echo $data["ks_selected_sources"];   
            $ks_selected_sources = $_COOKIE['ks_selected_sources'];
            //echo $ks_selected_sources;
            $selectedSourcesArray =null;
            if($ks_selected_sources!= null)
            {
                $selectedSourcesArray = explode(",", $ks_selected_sources);
                $data['ks_selected_sources'] = $selectedSourcesArray;
                //var_dump($selectedSourcesArray);
            }
            $ks_sources = $util->loadSourcesConfig($data);
            $sourceNameArray = $this->handleSourceNames($ks_sources);
            $data['sourceNameArray'] = $sourceNameArray;
            //var_dump($sources);
            //if($sources != null)
            //{
            //       $data['ks_sources'] = $sources;
            //       
            //}
            $result = array();
            $description = array();
            if($selectedSourcesArray != null)
            {
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
                        //echo "handleData-----Source:".$source."----offset:".$offset;
                        $result[$source] =$this->handleData($data,$page,$source,20,$offset);
                    
                    }else
                        $result[$source] =$this->handleData($data,$page,$source,20,0);
                    
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