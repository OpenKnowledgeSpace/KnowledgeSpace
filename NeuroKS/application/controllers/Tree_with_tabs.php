<?php

class Tree_with_tabs extends CI_Controller 
{

    
    	public function view($curie,$enableHeader,$tempParentID,$tabID)
	{
            $data['enableHeader'] = $enableHeader;
            $data['tabID'] = $tabID;
            $this->handleLexicon($data, $curie,$tempParentID);
            if(strcmp($enableHeader, "true")==0)
            {
                require_once 'Config.php';
                $myConfig = new Config();
                 $myConfig->loadJsonConfig($data);
                $this->load->view('templates/header2', $data);
            }
            $this->load->view('pages/DisplayTree_with_tabs', $data);
        }
        
        private function handleLexicon(&$data, $curie,$tempParentID)
        {
            require_once('ServiceUtil.php');
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
            
            
            
            require_once('ServiceUtil.php');
            //require_once('PropertyConfig.php');
            require_once 'Config.php';
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
        }
}


?>