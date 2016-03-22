<?php
/* //Retired
class Has_proper_part extends CI_Controller 
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
            require_once('PropertyConfig.php');
            $util = new ServiceUtil;
           
           $data['curie'] = $curie;
           
           $treeObj = $util->getTreeObj($curie);
           $data['treeObj'] = $treeObj;
           $mainNode = $util->getNode($treeObj,$curie);
           $data['mainNode'] = $mainNode;
  

            $list2 = $util->getOtherChildrenIDs($treeObj, $curie,PropertyConfig::$has_proper_part);
            
            
            $partOfParentID = $util->getOtherParentID($treeObj, $curie,PropertyConfig::$has_proper_part);
            $partOfParenttNode = $util->getNode($treeObj,$partOfParentID);
            $data['node'] = $partOfParenttNode;
            
            $leafHTML = null;
            $list2->setIteratorMode(SplDoublyLinkedList::IT_MODE_FIFO);
            for ($list2->rewind(); $list2->valid(); $list2->next()) {

    		$item = $list2->current();
		$leaf = $util->getNode($treeObj, $item);
                
                
                $leafLinkName = str_replace(" ", "_", $leaf->lbl);
                $leafLinkName = str_replace("(", "_", $leafLinkName);
                $leafLinkName = str_replace(")", "_", $leafLinkName);
                //$leafLink = "/SciCrunchKS/index.php/pages/view/".$leafLinkName;
		$leafLink = "/SciCrunchKS/index.php/pages/view/".$leaf->id;
                //$leafHTML = $leafHTML . "<ul><li><span><i class=\"icon-leaf\"></i><a href=\"".$leafLink."\">" . $leaf->lbl . "</a></span> <a href=\"\"></a></li></ul>\n";
                $leafHTML = $leafHTML . "<ul><li><span id=\"".$leaf->id.",".$mainNode->id."\"><i class=\"icon-plus-sign\"></i>" . $leaf->lbl . "</span> <a href=\"".$leafLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a></li></ul>\n";
            }
            $data['leafHTML'] = $leafHTML;
        }
}

*/
?>