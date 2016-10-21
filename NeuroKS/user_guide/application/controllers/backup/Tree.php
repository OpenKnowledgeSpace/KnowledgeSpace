<?php

class Tree extends CI_Controller 
{

    
    	public function view($curie,$enableHeader,$tempParentID)
	{
            $data['enableHeader'] = $enableHeader;
            $this->handleLexicon($data, $curie,$tempParentID);
            if(strcmp($enableHeader, "true")==0)
                $this->load->view('templates/header', $data);
            $this->load->view('pages/DisplayTree', $data);
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
		$leafLink = "/SciCrunchKS/index.php/pages/view/".$leaf->id;
                //$leafHTML = $leafHTML . "<ul onlick=\"alert('test');\"><li><span><i class=\"icon-leaf\"></i>" . $leaf->lbl . "</span> <a href=\"".$leafLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a></li></ul>\n";
                $leafHTML = $leafHTML . "<ul><li><span id=\"".$leaf->id.",".$mainNode->id."\"><i class=\"icon-plus-sign\"></i>" . $leaf->lbl . "</span> <a href=\"".$leafLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a></li></ul>\n";

            }
            $data['leafHTML'] = $leafHTML;
        }
}


?>