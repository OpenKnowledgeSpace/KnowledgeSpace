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
            $newName =$searchName;
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
            
            //echo "<p>----------------NewName:".$newName;
            
            $data['neuroElectroResult'] = searchWithinSource($newName, $neuroElectro, 20);
            $data['neuroMorphoResult'] = searchWithinSource($newName, $neuroMorpho, 20);
            $data['genSatResult'] = searchWithinSource($newName, $genSat, 20);
            $data['neuronDBResult'] = searchWithinSource($newName, $neuronDB, 20);
            $data['humanBrainResult'] = searchWithinSource($newName, $humanBrainAtlas, 20);
            $data['olfactoryMapResult'] = searchWithinSource($newName, $OlfactoryMap, 20);
            $data['abaMorphoResult'] = searchWithinSource($newName, $abaMorpho, 20);
            $data['abaCellResult'] = searchWithinSource($newName, $abaCell, 20);
            $data['brainMapResult'] = searchWithinSource($newName, $brainMap, 20);
            $data['connectivityResult'] = searchWithinSource($newName, $connectivity, 20);
            $data['humanBrainProjectResult'] = searchWithinSource($newName, $humanBrainProject, 20);
            
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
            require_once 'Config.php'; 
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
		$leafLink = "/".Config::$localContextName."/index.php/pages/view/".$leaf->id;
                //$leafHTML = $leafHTML . "<ul><li><span><i class=\"icon-leaf\"></i><a href=\"".$leafLink."\">" . $leaf->lbl . "</a></span> <a href=\"\"></a></li></ul>\n";
                $leafHTML = $leafHTML . "<ul><li><span id=\"".$leaf->id.",".$mainNode->id."\"><i class=\"icon-plus-sign\"></i>" . $leaf->lbl . "</span> <a href=\"".$leafLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a></li></ul>\n";
            }
            $data['leafHTML'] = $leafHTML;
            
            
            
            require_once('ServiceUtil.php');
            require_once('PropertyConfig.php');
            $util = new ServiceUtil;
            $list2 = $util->getOtherChildrenIDs($treeObj, $curie,PropertyConfig::$has_proper_part);
            
            
            $partOfParentID = $util->getOtherParentID($treeObj, $curie,PropertyConfig::$has_proper_part);
            $partOfParenttNode = getNode($treeObj,$partOfParentID);
            $data['node2'] = $partOfParenttNode;
            
            $leafHTML = null;
            $list2->setIteratorMode(SplDoublyLinkedList::IT_MODE_FIFO);
            for ($list2->rewind(); $list2->valid(); $list2->next()) {

    		$item = $list2->current();
		$leaf = getNode($treeObj, $item);
                
                
                $leafLinkName = str_replace(" ", "_", $leaf->lbl);
                $leafLinkName = str_replace("(", "_", $leafLinkName);
                $leafLinkName = str_replace(")", "_", $leafLinkName);
                //$leafLink = "/SciCrunchKS/index.php/pages/view/".$leafLinkName;
		$leafLink = "/".Config::$localContextName."/index.php/pages/view/".$leaf->id;
                //$leafHTML = $leafHTML . "<ul><li><span><i class=\"icon-leaf\"></i><a href=\"".$leafLink."\">" . $leaf->lbl . "</a></span> <a href=\"\"></a></li></ul>\n";
                $leafHTML = $leafHTML . "<ul><li><span id=\"".$leaf->id.",".$mainNode->id."\"><i class=\"icon-plus-sign\"></i>" . $leaf->lbl . "</span> <a href=\"".$leafLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a></li></ul>\n";
            }
            $data['leafHTML2'] = $leafHTML;
            
            
            
            
            
            
            
            
            $list3 = $util->getChildrenIDsIncoming($treeObj, $curie,PropertyConfig::$part_of);
            $partOfParentID3 = $util->getParentIDIncoming($treeObj, $curie,PropertyConfig::$part_of);
            $partOfParenttNode3 = getNode($treeObj,$partOfParentID3);
            $data['node3'] = $partOfParenttNode3;
            
            $leafHTML = null;
            $list3->setIteratorMode(SplDoublyLinkedList::IT_MODE_FIFO);
            for ($list3->rewind(); $list3->valid(); $list3->next()) {

    		$item = $list3->current();
		$leaf = getNode($treeObj, $item);
                
                
                $leafLinkName = str_replace(" ", "_", $leaf->lbl);
                $leafLinkName = str_replace("(", "_", $leafLinkName);
                $leafLinkName = str_replace(")", "_", $leafLinkName);
                //$leafLink = "/SciCrunchKS/index.php/pages/view/".$leafLinkName;
		$leafLink = "/".Config::$localContextName."/index.php/pages/view/".$leaf->id;
                //$leafHTML = $leafHTML . "<ul><li><span><i class=\"icon-leaf\"></i><a href=\"".$leafLink."\">" . $leaf->lbl . "</a></span> <a href=\"\"></a></li></ul>\n";
                $leafHTML = $leafHTML . "<ul><li><span id=\"".$leaf->id.",".$mainNode->id."\"><i class=\"icon-plus-sign\"></i>" . $leaf->lbl . "</span> <a href=\"".$leafLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a></li></ul>\n";
            }
            $data['leafHTML3'] = $leafHTML;
        }
    
        
        private function handleLiterature(&$data, $searchName)
        {
            require_once 'ServiceUtil.php';
            $util = new ServiceUtil();
            $result = expandTerm($searchName);          
            $terms = parseExpandedTerm($result,$searchName);
            
            
            $latestResult = $util->searchLatestLiterature($terms,0,5,"*","*");
            
            $litResult = searchLiteratureByYearUsingSolr($terms,0,25000000,"year","*");
            //$data['litResult'] = $litResult;
            
            $litMap = processLiteratureObj2($litResult);
            
            $data['latestResult'] = $latestResult;
            $data['litSearchTerms'] = $terms;
            //var_dump($litMap);
            $data['litMap'] = $litMap;
           
            $count = count($litMap);
            $data['count'] = $count; 
        }
        private function handleSummary(&$data, $termObj, $searchName)
        {
            require_once 'Parsedown.php';
            $termCount = count($termObj);
            if($termCount > 0)
            {
                $curie = $termObj[0]->curie;
                //$data['description']=getDescriptionByCurie($curie);
                $description=getDescriptionByCurie($curie);
                if(!is_null($description))
                {
                    $Parsedown = new Parsedown();
                    $data['description'] =$Parsedown->text($description);
                    
                }
                
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
               require_once 'Config.php';
                $this->load->helper('url');
                //init();
        	/*if ( ! file_exists(APPPATH.'/views/pages/'.$page.'.php'))
        	{
                	// Whoops, we don't have a page for that!
                	show_404();
        	}*/
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
               
               
               
               
               if( $pos != false)
               {
                    $termObj[0] = getObjByCurie($pageName);
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
                    else
                    {
               
                        $data['pageName'] = $pageName;                  
                        $termObj = getTerm($pageName);
                    }
               }
               else
               {
                   $data['pageName'] = $pageName;     
                   //echo "-----pageName:".$pageName;
                   $termObj = getTerm($pageName);
                   //var_dump($termObj);
                   
                   $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
                    $domainName = $_SERVER['HTTP_HOST'];
                   if(!is_null($termObj))
                   {
                       //echo "-------------termObj size: ".count($termObj);
                       if(count($termObj)==1 && isset($termObj[0]) && !is_null($termObj[0]->curie))
                       {
                          
                           //redirect('http://google.com', 'location');
                            
                           redirect($protocol."://".$domainName."/".Config::$localContextName."/index.php/pages/view/".$termObj[0]->curie, 'refresh');
                           
                           
                       }
                       
                       if(count($termObj)> 1)
                       {
                           
                           //http://localhost/NeuroKS/index.php/TermLanding/view/cerebellum%20purkinje%20cell
                           //redirect($protocol.":/".$domainName."/".Config::$localContextName."/index.php/Term/view/".$page, 'refresh');
                           $data['termObj'] = $termObj;
                           $temp_page_title = $pageName = str_replace(str_split('_,'), ' ', $page );
                           $data['page_title'] = "Term:".$temp_page_title;
                           $data['enable_config'] = false;
                           //redirect('http://google.com', 'location');
                            
                           //redirect($protocol."://".$domainName."/".Config::$localContextName."/index.php/pages/view/".$termObj[0]->curie, 'refresh');
                           //exit(0);
                            $this->load->view('templates/header2', $data);
                            $this->load->view('pages/DisplayTermLanding', $data);
                            $this->load->view('templates/footer2', $data);
                            return;
                            //exit(0);
                       }
                       
                       $data['curie'] = $termObj[0]->curie;
                   }
               }
               //$pageName = str_replace(" ", "%20", $pageName);
               //$pageName = str_replace(",", "%2c", $pageName);
               //$pageName = str_replace("/", "%20", $pageName);
               $pageName = str_replace(str_split('_'), '%20',$pageName );
               $pageName = str_replace(str_split(','), '%2c',$pageName );
               $pageName = str_replace(str_split('/'), '%20',$pageName );
               
               $data['pageName'] = $pageName;
               $data['page_title'] = $pageName;
               $data['enable_config'] = true;
                

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
                if(isset($termObj[0]))
                    $this->handleLexicon($data,$termObj[0]->curie);
                $this->handleLiterature($data, $pageName);

                

                    $this->load->view('templates/header2', $data);
                    //$this->load->view('pages/'.$page, $data);
                    //$this->load->view('pages/term', $data);
                    $this->load->view('pages/layout', $data);
                    $this->load->view('templates/footer2', $data);

                ///////////////////////////////////////////////
                if($this->enableCaching)
                {
                    $c = ob_get_contents();
                    file_put_contents($cachefile, $c);
                }
	}

}
