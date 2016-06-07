<?php

class Tree_with_tabs2 extends CI_Controller 
{

    
    	public function view($curie,$enableHeader,$tempParentID,$tabID)
	{
            require_once '../NeuroKS/application/models/CustomTree.php';
            require_once 'Config.php';
            $myConfig = new Config();
            $myConfig->loadJsonConfig($data);
            
            $data['enableHeader'] = $enableHeader;
            $data['tabID'] = $tabID;
            $this->handleLexicon($data, $curie,$tempParentID);
            if(strcmp($enableHeader, "true")==0)
            {
                $this->load->view('templates/header2', $data);
            }
            $this->load->view('pages/DisplayTree_with_tabs2', $data);
        }
        
        private function handleLexicon(&$data, $curie,$tempParentID)
        {
           require_once('ServiceUtil.php');
           require_once 'Config.php';
           $util = new ServiceUtil;
           $data['curie'] = $curie;
           
           $treeObj = $util->getTreeObj($curie);
           $data['treeObj'] = $treeObj;

           $parentID = $tempParentID;
           if(strcmp($parentID,"none")==0)
                $parentID  = $util->getParentID($treeObj, $curie);
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
            
            
            

            $myConfig = new Config();
            $myConfig->loadJsonConfig($data);
            $util = new ServiceUtil;
            //$list2 = $util->getOtherChildrenIDs($treeObj, $curie,PropertyConfig::$has_proper_part);
            $list2 = $util->getOtherChildrenIDs($treeObj, $curie,
                    $data["config_array"]->has_proper_part_property);
            
            //$partOfParentID = $util->getOtherParentID($treeObj, $curie,PropertyConfig::$has_proper_part);
            $partOfParentID = $util->getOtherParentID($treeObj, $curie,
                    $data["config_array"]->has_proper_part_property);

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
            $list3 = $util->getChildrenIDsIncoming($treeObj, $curie,
                    $data["config_array"]->part_of_property);
            
            //$partOfParentID3 = $util->getParentIDIncoming($treeObj, $curie,PropertyConfig::$part_of);
            $partOfParentID3 = $util->getParentIDIncoming($treeObj, $curie,
                    $data["config_array"]->part_of_property);

            
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
                //echo "<br/>".$property->name."-------".$property->value."\n";
                /*$tempList = $util->getChildrenIDsIncoming($treeObj, $curie,$property->value);
                $tempParentID = $util->getParentIDIncoming($treeObj, $curie,$property->value);*/
                $tempList = NULL;
                $tempParentID = NULL;
                if(strcmp($property->direction, "in-coming"))
                {
                    $tempList=$util->getChildrenIDsIncoming($treeObj, $curie,$property->value);
                    $tempParentID=$util->getParentIDIncoming($treeObj, $curie,$property->value);
                }
                else if(strcmp($property->direction, "out-going"))
                {
                    $tempList = $util->getOtherChildrenIDs($treeObj, $curie,$property->value);
                    $tempParentID = $util->getOtherParentID($treeObj, $curie,$property->value);
                }
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
}


?>