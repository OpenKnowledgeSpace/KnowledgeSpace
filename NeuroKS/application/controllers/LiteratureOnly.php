<?php

 /**
   * This class is controller for displaying the term pages.
   * 
   * 
   * @subpackage Controller
   * @author     Willy Wong <wwong@ncmir.ucsd.edu>
   */
class LiteratureOnly extends CI_Controller 
{
  
    private function handleLiterature(&$data, $searchName)
    {
        
            //echo "--------handleLiterature-------searchName:".$searchName;
            require_once 'ServiceUtil.php';
            date_default_timezone_set("America/New_York");
            //echo "Year----".date("Y");

            
            $util = new ServiceUtil();
            $result = $util->expandTerm($searchName);          
            $terms = $util->parseExpandedTerm($result,$searchName);
            
            //echo "<br/>----------------------Terms:".$terms;
            $latestResult = $util->searchLatestLiterature($terms,0,5,"*","*");
            
            $litResult = $util->searchLiteratureByYearUsingSolr($terms,0,25000000,"year","*");
            //$data['litResult'] = $litResult;
            
            $litMap = $util->processLiteratureObj2($litResult);
            
            $data['latestResult'] = $latestResult;
            $data['litSearchTerms'] = $terms;
            //var_dump($litMap);
            $data['litMap'] = $litMap;
           
            $count = count($litMap);
            $data['count'] = $count; 
    }
        
    public function view($page = 'home')
    {
        require_once 'ServiceUtil.php';
        $util = new ServiceUtil();
                
        require_once 'Config.php';
        $myConfig = new Config();
        $myConfig->loadJsonConfig($data);
        $pageName = $page;
               $termObj = NULL;
        $termObj[0] = $util->getObjByCurie($pageName);
                    #echo "\n-------Willy----!is_null(termObj):".!is_null($termObj)."\n";
                    if(!is_null($termObj) && !is_null($termObj[0]))
                    {
                        $data['curie'] = $termObj[0]->curie;
                        if(count($termObj[0]->labels) > 0)
                        {
                            $data['pageName'] = $termObj[0]->labels[0];
                            $pageName = $data['pageName'];
                            //echo "PageName here-----".$pageName;
                            $originalPageName=$pageName;
                            $pageName = str_replace(" ", "%20", $pageName);
                            // echo "<br/>PageName here-----".$pageName;
                            $pageName = str_replace(",", "%2c", $pageName);
                            // echo "<br/>PageName here-----".$pageName;
                             $data['pageName'] = $pageName;
                            $isNifID = true;
                        }
                        else
                            $data['pageName'] = $pageName;
                        
                    }
               $pageName = str_replace(str_split('_'), '%20',$pageName );
               $pageName = str_replace(str_split(','), '%2c',$pageName );
               $pageName = str_replace(str_split('/'), '%2f',$pageName );
               
               $data['pageName'] = $pageName;
               $data['page_title'] = $pageName;
               $data['title'] = $pageName;
               $data['enable_config'] = true;
               
               
      
            //$newCurie = str_replace(":","_",$data['curie']);
               
            $curieName = str_replace(":", "_", $data['curie']);
            $fileName = $data['config_array']->cache_folder."/".$curieName."-literature-String.cache";
            
            //echo "<br/>".$fileName;
            $stats = NULL;
            if (file_exists($fileName))
                $stats=stat($fileName);
            $current = time();
            $diff= $current - $stats[9];
            /*if (file_exists($fileName) && $diff > (86400 * 1))
            {
                unlink($fileName);
                //echo "unlinking due to expiration.";
            }
            else if(file_exists($fileName) && filesize($fileName) == 0)
            {
                unlink($fileName);
                //echo "unlinking due to empty file";
            }*/
            // $fileContent = file_get_contents($fileName);
            //echo "<br/>File content:".$fileContent."------";
            if(!file_exists($fileName))
            {
                //echo "<br/>----File does not exist:".$fileName."-----";
               $this->handleLiterature($data, $pageName);
               $this->load->view('pages/outputLiteratureAsString', $data);
            }   
            else 
            {
                //echo "<br/>----File exists:".$fileName;
                $fileContent = file_get_contents($fileName);
                $data['fileContent'] = $fileContent;
                $this->load->view('pages/outputLiteratureAsString2', $data);
            }   
               
            //$this->load->view('templates/header2', $data);
            
            //$this->load->view('templates/footer2', $data);
    }
    
}


?>
