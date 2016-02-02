<?php



class Pages extends CI_Controller 
{
        public $enableCaching = false;
        
        
        private function handleDataSpace(&$data, $searchName)
        {
            //require  'Globals.php';
            require_once  'Globals.php';
                      
            
            //echo "------Gobal".$this->enableCaching;
            
            
            //$newName = str_replace("%20cell", "", $searchName);
            //$newName = str_replace("%20neuron", "", $newName);
            $newName ="";
            if(strcasecmp($searchName,"cell")==0)
            {
                $newName=$searchName;
            }
            else if(strcasecmp($searchName,"neuron")==0)
            {
                $newName=$searchName;
            }
            else if(endsWith($searchName, "%20cell"))
            {
                $tempName = substr($searchName, 0, strlen($searchName)-strlen("%20cell"));
                $newName = $tempName;
            }
            else if(endsWith($searchName, "%20neuron"))
            {
                $tempName = substr($searchName, 0, strlen($searchName)-strlen("%20neuron"));
                $newName = $tempName;
            }
            
            
            
            $data['neuroElectroResult'] = searchWithinSource($newName, $neuroElectro, 20);
            $data['neuroMorphoResult'] = searchWithinSource($newName, $neuroMorpho, 20);
            $data['genSatResult'] = searchWithinSource($newName, $genSat, 20);
            $data['neuronDBResult'] = searchWithinSource($newName, $neuronDB, 20);

            //$data['neuroElectroDesc'] = getSourceDescObj($neuroElectro);
            //$data['neuroMorphoDesc'] = getSourceDescObj($neuroMorpho);
            //$data['genSatDesc'] = getSourceDescObj($genSat);
            //$data['neuronDBDesc'] = getSourceDescObj($neuronDB);
            
            
            /*
            $data['neuroMLResult'] = searchWithinSource("neocortex%20pyramidal%20cell", $neuroML, 20);
            $data['modelDBResult'] = searchWithinSource("neocortex%20pyramidal%20cell", $modelDB, 20);
            $data['brainModelResult'] = searchWithinSource("pyramidal%20cell", $brainModel, 20);	
            */
            
            /*$data['neuroMLResult'] = searchWithinSource($searchName, $neuroML, 20);
            $data['modelDBResult'] = searchWithinSource($searchName, $modelDB, 20);
            $data['brainModelResult'] = searchWithinSource($searchName, $brainModel, 20);*/	
            
            $data['neuroMLResult'] = searchWithinSource($newName, $neuroML, 20);
            $data['modelDBResult'] = searchWithinSource($newName, $modelDB, 20);
            $data['brainModelResult'] = searchWithinSource($newName, $brainModel, 20);

            $data['cilResult'] = searchWithinSource($searchName, $CIL, 20);
            $data['cilImages'] = getImageArray($data['cilResult'], 20);

            $data['neuroMorphoImages'] = getImageArray($data['neuroMorphoResult'], 20);
            $data['originalCILImages'] = $data['cilImages'];
            $data['cilImages'] = array_merge($data['cilImages'], $data['neuroMorphoImages']);
           
        }
    
        private function handleLexicon(&$data, $curie)
        {
           //include 'Globals.php';
           //include 'JsonClientUtil.php';
            
           //$curie = "NIFCELL:sao2128417084";
           $data['curie'] = $curie;
           
           $treeObj = getTreeObj($curie);
           $data['treeObj'] = $treeObj;

           $parentID = getParentID($treeObj, $curie);
           $data['parentID'] = $parentID;
           
           $node = getNode($treeObj,$parentID);
           $data['node'] = $node;
           
           $mainNode = getNode($treeObj,$curie);
           $data['mainNode'] = $mainNode;
           
           $list = getChildrenIDs($treeObj, $curie);
           $data['list'] = $list;
           
           $leafHTML = "";
            
            $list->setIteratorMode(SplDoublyLinkedList::IT_MODE_FIFO);
            for ($list->rewind(); $list->valid(); $list->next()) {

    		$item = $list->current();
		$leaf = getNode($treeObj, $item);
                
                
                $leafLinkName = str_replace(" ", "_", $leaf->lbl);
                $leafLinkName = str_replace("(", "_", $leafLinkName);
                $leafLinkName = str_replace(")", "_", $leafLinkName);
                //$leafLink = "/SciCrunchKS/index.php/pages/view/".$leafLinkName;
		$leafLink = "/SciCrunchKS/index.php/pages/view/".$leaf->id;
                $leafHTML = $leafHTML . "<ul><li><span><i class=\"icon-leaf\"></i><a href=\"".$leafLink."\">" . $leaf->lbl . "</a></span> <a href=\"\"></a></li></ul>\n";

            }
            $data['leafHTML'] = $leafHTML;
        }
    
        
        private function handleLiterature(&$data, $searchName)
        {
           /*$litResult =  searchLiterature($searchName);
           $data['litResult'] = $litResult;
           
           $litMap = processLiteratureObj($litResult);
           $data['litMap'] = $litMap;
           
           $count = count($litMap);
           $data['count'] = $count;*/
            
            //$litResult = searchLiteratureByYearOnly($searchName);
            //$data['litResult'] = $litResult;
            
            $result = expandTerm($searchName);
            $terms = parseExpandedTerm($result,$searchName);
            $litResult = searchLiteratureByYearUsingSolr($terms,0,25000000,"year","*");
            //$data['litResult'] = $litResult;
            
            $litMap = processLiteratureObj2($litResult);
            //var_dump($litMap);
            $data['litMap'] = $litMap;
           
            $count = count($litMap);
            $data['count'] = $count; 
        }
        private function handleSummary(&$data, $termObj, $searchName)
        {
            $termCount = count($termObj);
            if($termCount > 0)
            {
                $curie = $termObj[0]->curie;
                $data['description']=getDescriptionByCurie($curie);
                
                $definitions = $termObj[0]->definitions;
                //echo "definitions:".$definitions;
                if(count($definitions) > 0)
                {
                    $data['definition'] = $definitions[0];
                    //echo "definition:".$data['definition'];
                }
                
                
            }
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
        
        
	public function view($page = 'home')
	{
               //require  'Globals.php';
            //$enableCaching = false;
               //require_once 'CacheConfig.php';
               require_once  'JsonClientUtil.php';  
                
                //init();
        	/*if ( ! file_exists(APPPATH.'/views/pages/'.$page.'.php'))
        	{
                	// Whoops, we don't have a page for that!
                	show_404();
        	}*/
               $pageName = NULL;
               $termObj = NULL;
               $pageName = str_replace("_", "%20", $page);
               $data["page"] = $page;
               
               $pos = strpos($pageName,"%20");
               $isNifID = false;
               $originalPageName="";
               
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
               
               
               
               
               if( $pos == false)
               {
                    $termObj[0] = getObjByCurie($pageName);
                    #echo "\n-------Willy----!is_null(termObj):".!is_null($termObj)."\n";
                    if(!is_null($termObj) && !is_null($termObj[0]))
                    {
                        
                        if(count($termObj[0]->labels) > 0)
                        {
                            $data['pageName'] = $termObj[0]->labels[0];
                            $pageName = $data['pageName'];
                            $originalPageName=$pageName;
                            $pageName = str_replace(" ", "%20", $pageName);
                            $isNifID = true;
                        }
                        else
                            $data['pageName'] = $pageName;
                        
                    }
                    else
                    {
               
                        $data['pageName'] = $pageName;                  
                        $termObj = getTerm($pageName);
                    }
               }
               else
               {
                   $data['pageName'] = $pageName;                  
                   $termObj = getTerm($pageName);
               }
                

                //////////////////////
                $cachefile = '/webCache/'.basename($_SERVER['PHP_SELF']).'.cache'; // e.g. cache/index.php.cache
                $cachetime = 3600*24; // time to cache in seconds
                $c = "";
                if($this->enableCaching)
                {
                    if(!file_exists($cachefile))
                    {
                       //Do nothing 
                    }
                    else if(file_exists($cachefile) && time()-$cachetime <= filemtime($cachefile)){
                      $c = @file_get_contents($cachefile);
                      echo $c;
                      exit;
                    }else{
                      unlink($cachefile);
                    }

                    ///////////////////////
   
                    if(is_null($termObj))
                    {
                        show_404 (); 
                        return;
                    }
                    ob_start();
                }
                ///////////////////////////////////////////////////////
                $this->handleSummary($data, $termObj, $pageName);
        	//$data['title'] = ucfirst($page); // Capitalize the first letter
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
            
                #echo "\nWilly--------pageName:".$pageName."\n";
                $this->handleDataSpace($data, $pageName);
                $this->handleLexicon($data,$termObj[0]->curie);
                $this->handleLiterature($data, $pageName);

                

                    $this->load->view('templates/header', $data);
        	//$this->load->view('pages/'.$page, $data);
                    $this->load->view('pages/term', $data);
                    $this->load->view('templates/footer', $data);

                ///////////////////////////////////////////////
                if($this->enableCaching)
                {
                    $c = ob_get_contents();
                    file_put_contents($cachefile, $c);
                }
	}

}
