<?php


 /**
   * This class is controller for displaying the term pages.
   * 
   * 
   * @package    NeuroKS
   * @subpackage Controller
   * @author     Willy Wong <wwong@ncmir.ucsd.edu>
   */
class Pages extends CI_Controller 
{
        //public $enableCaching = false;
        
        
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
            
            $data['cilImages']=array();
            $data['originalCILImages']=array();
            $data['neuroMorphoImages']=array();
            foreach($sources as $source)
            {
               if($source->has_images)
               {
                $tempImages =  $util->getImageArray($source_search_result[$source->curie], 20);
               
               if(strcmp($source->curie, "nif-0000-37639-1")==0)//Look for CIL images
               {
                       $data['originalCILImages'] =$tempImages;
                       //echo "------originalCILImages source:".$source->curie;
               }
               else if(strcmp($source->curie, "nif-0000-00006-1")==0)//Look for NeuroMorppho
               {
                       $data['neuroMorphoImages'] =$tempImages;
                       //echo "------neuroMorphoImages source:".$source->curie;
               }
               
               $data['cilImages'] = array_merge($tempImages,$data['cilImages'] );
               }
            }
            
            $imageGallery = array();
            if(strcmp($data['title'],"Neocortical pyramidal cell")==0)
            {
                $gimage = "   <a href=\"http://celltypes.brain-map.org/mouse/experiment/morphology/330080937\" target=\"_blank\">".
                          "   <img width=\"84\" height=\"100\" src=\"http://celltypes.brain-map.org/cgi-bin/imageservice?path=/external/mousecelltypes/prod210/specimen_324466858/min_xy_324466858.aff&mime=2\"/>".
                          "   </a>";
                array_push($imageGallery,$gimage);
            }
            
            if(count($data['originalCILImages']) > 0)
            {
                array_push($imageGallery,$data['originalCILImages'][0]);
            }
            
            if(count($data['originalCILImages']) > 1)
            {
                array_push($imageGallery,$data['originalCILImages'][1]);
            }
            
            if(count($data['neuroMorphoImages']) > 0)
            {
                foreach($data['neuroMorphoImages'] as $gimage)
                {
                    array_push($imageGallery,$gimage);
                    if(count($imageGallery) == 3)
                        break;
                }
            }
            
            if(count($data['originalCILImages']) > 2)
            {
                $cindex = 0;
                foreach($data['originalCILImages'] as $gimage)
                {
                    if(count($imageGallery) == 3)
                        break;
                    
                    if($cindex > 1)
                        array_push($imageGallery,$gimage);
                    
                    
                    $cindex++;
                }
            }
            $data['imageGallery']=$imageGallery;
            
            /*
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
            
     
                $data['neuroMLResult'] = searchWithinSource($newName, $neuroML, 20);
                $data['modelDBResult'] = searchWithinSource($newName, $modelDB, 20);
                $data['brainModelResult'] = searchWithinSource($newName, $brainModel, 20);

                $data['cilResult'] = searchWithinSource($searchName, $CIL, 20);
                $data['cilImages'] = getImageArray($data['cilResult'], 20);

                $data['neuroMorphoImages'] = getImageArray($data['neuroMorphoResult'], 20);
                $data['originalCILImages'] = $data['cilImages'];
                $data['cilImages'] = array_merge($data['cilImages'], $data['neuroMorphoImages']);*/

           
        }
    
        private function handleLexicon(&$data, $curie)
        {
            require_once '../NeuroKS/application/models/CustomTree.php';
            require_once 'Config.php'; 
           //include 'Globals.php';
           //include 'JsonClientUtil.php';
            require_once 'ServiceUtil.php';
            $util = new ServiceUtil;
            
           //$curie = "NIFCELL:sao2128417084";
           $data['curie'] = $curie;
           
           $treeObj = $util->getTreeObj($curie);
           $data['treeObj'] = $treeObj;

           $parentID = $util->getParentID($treeObj, $curie);
           $data['parentID'] = $parentID;
           
           $node = $util->getNode($treeObj,$parentID);
           $data['node'] = $node;
           
           $mainNode = $util->getNode($treeObj,$curie);
           $data['mainNode'] = $mainNode;
           
           $list = $util->getChildrenIDs($treeObj, $curie);
           $data['list'] = $list;
           
           $leafHTML = "";
            
            $list->setIteratorMode(SplDoublyLinkedList::IT_MODE_FIFO);
            for ($list->rewind(); $list->valid(); $list->next()) {

    		$item = $list->current();
		$leaf = $util->getNode($treeObj, $item);
                
                
                $leafLinkName = str_replace(" ", "_", $leaf->lbl);
                $leafLinkName = str_replace("(", "_", $leafLinkName);
                $leafLinkName = str_replace(")", "_", $leafLinkName);
                //$leafLink = "/SciCrunchKS/index.php/pages/view/".$leafLinkName;
		$leafLink = "/".Config::$localContextName."/index.php/pages/view/".$leaf->id;
                //$leafHTML = $leafHTML . "<ul><li><span><i class=\"icon-leaf\"></i><a href=\"".$leafLink."\">" . $leaf->lbl . "</a></span> <a href=\"\"></a></li></ul>\n";
                $leafHTML = $leafHTML . "<ul><li><span id=\"".$leaf->id.",".$mainNode->id."\"><i class=\"icon-plus-sign\"></i>" . $leaf->lbl . "</span> <a href=\"".$leafLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a></li></ul>\n";
            }
            $data['leafHTML'] = $leafHTML;
            
            
            
            //require_once('ServiceUtil.php');
            //require_once('PropertyConfig.php');
            //$util = new ServiceUtil;
            //$list2 = $util->getOtherChildrenIDs($treeObj, $curie,PropertyConfig::$has_proper_part);
            $list2 = $util->getOtherChildrenIDs($treeObj, $curie,$data["config_array"]->has_proper_part_property);
            
            //$partOfParentID = $util->getOtherParentID($treeObj, $curie,PropertyConfig::$has_proper_part);
            $partOfParentID = $util->getOtherParentID($treeObj, $curie,$data["config_array"]->has_proper_part_property);
            $partOfParenttNode = $util->getNode($treeObj,$partOfParentID);
            $data['node2'] = $partOfParenttNode;
            
            $leafHTML = null;
            $list2->setIteratorMode(SplDoublyLinkedList::IT_MODE_FIFO);
            for ($list2->rewind(); $list2->valid(); $list2->next()) {

    		$item = $list2->current();
		$leaf = $util->getNode($treeObj, $item);
                
                
                $leafLinkName = str_replace(" ", "_", $leaf->lbl);
                $leafLinkName = str_replace("(", "_", $leafLinkName);
                $leafLinkName = str_replace(")", "_", $leafLinkName);
                //$leafLink = "/SciCrunchKS/index.php/pages/view/".$leafLinkName;
		$leafLink = "/".Config::$localContextName."/index.php/pages/view/".$leaf->id;
                //$leafHTML = $leafHTML . "<ul><li><span><i class=\"icon-leaf\"></i><a href=\"".$leafLink."\">" . $leaf->lbl . "</a></span> <a href=\"\"></a></li></ul>\n";
                $leafHTML = $leafHTML . "<ul><li><span id=\"".$leaf->id.",".$mainNode->id."\"><i class=\"icon-plus-sign\"></i>" . $leaf->lbl . "</span> <a href=\"".$leafLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a></li></ul>\n";
            }
            $data['leafHTML2'] = $leafHTML;
            
            
            //$list3 = $util->getChildrenIDsIncoming($treeObj, $curie,PropertyConfig::$part_of);
            //$partOfParentID3 = $util->getParentIDIncoming($treeObj, $curie,PropertyConfig::$part_of);
            $list3 = $util->getChildrenIDsIncoming($treeObj, $curie,$data["config_array"]->part_of_property);
            $partOfParentID3 = $util->getParentIDIncoming($treeObj, $curie,$data["config_array"]->part_of_property);
            
            
            $partOfParenttNode3 = $util->getNode($treeObj,$partOfParentID3);
            $data['node3'] = $partOfParenttNode3;
            
            $leafHTML = null;
            $list3->setIteratorMode(SplDoublyLinkedList::IT_MODE_FIFO);
            for ($list3->rewind(); $list3->valid(); $list3->next()) {

    		$item = $list3->current();
		$leaf = $util->getNode($treeObj, $item);
                
                
                $leafLinkName = str_replace(" ", "_", $leaf->lbl);
                $leafLinkName = str_replace("(", "_", $leafLinkName);
                $leafLinkName = str_replace(")", "_", $leafLinkName);
                //$leafLink = "/SciCrunchKS/index.php/pages/view/".$leafLinkName;
		$leafLink = "/".Config::$localContextName."/index.php/pages/view/".$leaf->id;
                //$leafHTML = $leafHTML . "<ul><li><span><i class=\"icon-leaf\"></i><a href=\"".$leafLink."\">" . $leaf->lbl . "</a></span> <a href=\"\"></a></li></ul>\n";
                $leafHTML = $leafHTML . "<ul><li><span id=\"".$leaf->id.",".$mainNode->id."\"><i class=\"icon-plus-sign\"></i>" . $leaf->lbl . "</span> <a href=\"".$leafLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a></li></ul>\n";
            }
            
            $data['leafHTML3'] = $leafHTML;
            /********************Loop properties***************************/
            $relation_array = array();
            
            $properties = $data["config_array"]->properties_included;
            foreach($properties as $property)
            {
                echo "<br/>".$property->name."-------".$property->value."\n";
                $tempList = $util->getChildrenIDsIncoming($treeObj, $curie,$property->value);
                $tempParentID = $util->getParentIDIncoming($treeObj, $curie,$property->value);
                $tempPrarentNode = $util->getNode($treeObj,$tempParentID);
                
                
                $leafHTML = null;
                $tempList->setIteratorMode(SplDoublyLinkedList::IT_MODE_FIFO);
                for ($tempList->rewind(); $tempList->valid(); $tempList->next()) 
                {

                    $item = $tempList->current();
                    $leaf = $util->getNode($treeObj, $item);


                    $leafLinkName = str_replace(" ", "_", $leaf->lbl);
                    $leafLinkName = str_replace("(", "_", $leafLinkName);
                    $leafLinkName = str_replace(")", "_", $leafLinkName);
                    //$leafLink = "/SciCrunchKS/index.php/pages/view/".$leafLinkName;
                    $leafLink = "/".Config::$localContextName."/index.php/pages/view/".$leaf->id;
                    //$leafHTML = $leafHTML . "<ul><li><span><i class=\"icon-leaf\"></i><a href=\"".$leafLink."\">" . $leaf->lbl . "</a></span> <a href=\"\"></a></li></ul>\n";
                    $leafHTML = $leafHTML . "<ul><li><span id=\"".$leaf->id.",".$mainNode->id."\"><i class=\"icon-plus-sign\"></i>" . $leaf->lbl . "</span> <a href=\"".$leafLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a></li></ul>\n";
                }
                
                
                $ctree = new CustomTree(); 
                $ctree->parentNode = $tempPrarentNode;
                $ctree->mainNode = $mainNode;
                $ctree->leafHtml = $leafHTML;
                
                $relation_array[$property->name] =$ctree;
            }
            
            $data["relation_array"] = $relation_array;
            
            
        }
    
        
        private function handleLiterature(&$data, $searchName)
        {
            require_once 'ServiceUtil.php';
            date_default_timezone_set("America/New_York");
            //echo "Year----".date("Y");

            
            $util = new ServiceUtil();
            $result = $util->expandTerm($searchName);          
            $terms = $util->parseExpandedTerm($result,$searchName);
            
            
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
        private function handleSummary(&$data, $termObj, $searchName)
        {
            require_once 'Parsedown.php';
            require_once 'ServiceUtil.php';
            $util = new ServiceUtil();
            $termCount = count($termObj);
            if($termCount > 0)
            {
                $curie = $termObj[0]->curie;
                //$data['description']=getDescriptionByCurie($curie);
                $description=$util->getDescriptionByCurie($curie);
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
        
        private function countRuntime(&$data)
        {
            $time = round(microtime(true) * 1000);
            
            $start = $time;
            
            $data['startTime'] = $start;
        }
        
        /* public function loadJsonConfig(&$data)
        {
            $configJson = file_get_contents(getcwd()."/application/config/config.json");
            $array = json_decode($configJson);
            //var_dump($array);
            $category_to_source = array();
            $sources = $array->sources;
            $data["config_array"] = $array;
            foreach($sources as $source)
            {
                $categories = $source->categories;
               
                foreach($categories as $category)
                {
                    //echo $category;
                    if(!isset($category_to_source[$category]))
                    {
                        $category_to_source[$category] = array();
                    }
                    $cArray = &$category_to_source[$category];
                    array_push($cArray, $source);
                }
            }
            //var_dump($category_to_source);
            $data["category_to_source"] = $category_to_source;
            
        }*/
        
        /* public function loadSourcesConfig(&$data)
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
        */
        /* public function loadCategoriesConfig(&$data)
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
                //setcookie("ks_selected_categories", $line,time()+2592000);
                //setcookie("ks_selected_categories",$line);
                //echo "\nks_selected_categories:".$_COOKIE["ks_selected_categories"];
                
            }

            
            return $sources;
        } */
        
        
	public function view($page = 'home')
	{
               //require  'Globals.php';
            //$enableCaching = false;
               //require_once 'CacheConfig.php';
               //require_once  'JsonClientUtil.php';  
               //require_once 'Config.php';
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";

                $this->countRuntime($data);
                $this->load->helper('url');
                                
                
                require_once 'ServiceUtil.php';
                $util = new ServiceUtil();
                
                require_once 'Config.php';
                $myConfig = new Config();
                 $myConfig->loadJsonConfig($data);
                //$this->loadJsonConfig($data);
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
               
               
               
               
               if( $pos != false)
               {
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
                   $termObj = $util->getTerm($pageName);
                   //var_dump($termObj);
                   
                   
                    $domainName = $_SERVER['HTTP_HOST'];
                   if(!is_null($termObj))
                   {
                       //echo "-------------termObj size: ".count($termObj);
                       if(count($termObj)==1 && isset($termObj[0]) && !is_null($termObj[0]->curie))
                       {
                          
                           //redirect('http://google.com', 'location');
                            
                           redirect($protocol.$domainName."/".Config::$localContextName."/index.php/pages/view/".$termObj[0]->curie, 'location',301);
                           
                           
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
               $pageName = str_replace(str_split('/'), '%2f',$pageName );
               
               $data['pageName'] = $pageName;
               $data['page_title'] = $pageName;
               $data['enable_config'] = true;
                

                //////////////////////
               $cacheLitfile = $data["config_array"]->cache_folder.basename($_SERVER['PHP_SELF']).'-literature.cache'; 
               $cacheFullLitfile = $data["config_array"]->cache_folder.basename($_SERVER['PHP_SELF']).'-Full-literature.cache'; 

               $cachetime = 3600*24; // time to cache in seconds
               $data['cachetime'] = $cachetime;
               
               
               ////////////Checking literature file/////////////////////////
               $loadCache = false;
               $data['cacheLitfile'] = $cacheLitfile;
               if(!file_exists($cacheLitfile))
               {
                       //Do nothing 
               }
               else if(file_exists($cacheLitfile) && time()-$cachetime <= filemtime($cacheLitfile))
               {
                   $loadCache = true;
               }
               else
               {
                   unlink($cacheLitfile);
               }
               $data['loadCache'] = $loadCache;
               ////////////////End checking literature file///////////////////////
               
               
               $loadFullLitCache = false;
               $data['cacheFullLitfile'] = $cacheFullLitfile;
               if(!file_exists($cacheLitfile))
               {//Do nothing
               }
               else if(file_exists($cacheFullLitfile) && time()-$cachetime <= filemtime($cacheFullLitfile))
               {
                   $loadFullLitCache = true;
               }
               else
               {
                   unlink($cacheFullLitfile);
               }
               $data['loadFullLitCache'] = $loadFullLitCache;
               if(!$loadCache || !$loadFullLitCache)
                   $loadCache = false;
               
               
               
               if(is_null($termObj))
               {
                        show_404 (); 
                        return;
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
                
                if(!$loadCache)
                    $this->handleLiterature($data, $pageName);

                

                    $this->load->view('templates/header2', $data);
                    //$this->load->view('pages/'.$page, $data);
                    //$this->load->view('pages/term', $data);
                    $this->load->view('pages/layout2', $data);
                    $this->load->view('templates/footer2', $data);

                ///////////////////////////////////////////////
                
	}

}
