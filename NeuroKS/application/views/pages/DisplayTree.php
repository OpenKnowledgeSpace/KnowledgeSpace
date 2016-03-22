<?php
    if(strcmp($enableHeader, "true")==0)
    {
        
      
 ?>
  <link rel="stylesheet" type="text/css" href="sckb.css"> 
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

    <div class="panel panel-default">
    <div class="panel-heading">Relations
                <ul class="list-inline panel-actions">
                        <li><a href="#" id="relation-fullscreen" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
                </ul>
    </div>

    <div id="relation-panel" class="panel-body" style="min-height: 100%; max-height: 100%;overflow-y: scroll">

        <div id="treeWell" class="tree well">
<?php
    }
?>
<?php

        if(!is_null($node))
        {
        $parentLinkName = str_replace(" ", "_", $node->lbl);
        $parentLinkName = str_replace("(", "_",$parentLinkName);
        $parentLinkName = str_replace(")", "_",$parentLinkName);
        //$parentLink = "/SciCrunchKS/index.php/pages/view/".$parentLinkName;
        $parentLink = "/SciCrunchKS/index.php/pages/view/".$node->id;
	//echo "<ul><li><span><i class=\"icon-folder-open\"></i><a target=\"_self\" href=\"".$parentLink."\">" . $node->lbl    .    "</a></span> <a href=\"\"></a>";
        
        if (strpos($node->id, '/') == false)
            echo "<ul><li><span id=\"".$node->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node->lbl    .    "</span><a target=\"_self\" href=\"".$parentLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";
        else
            echo "<ul><li><span id=\"".$mainNode->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node->lbl    .    "</span><a target=\"_self\" href=\"".$parentLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";
        }

        $mainLink = "/SciCrunchKS/index.php/pages/view/".$mainNode->id;
        if (!is_null($node) && strpos($node->id, '/') == false)
            echo "<ul><li><span style=\"background-color: #FFFF00\" id=\"".$mainNode->id.",".$node->id."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 
        else
            echo "<ul><li><span style=\"background-color: #FFFF00\" id=\"".$mainNode->id.","."none"."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 
            
        if(!is_null($leafHTML))
            echo $leafHTML;

	

	echo "</li></ul>";
	echo "</li></ul>";


?>

<?php
    if(strcmp($enableHeader, "true")==0)
    {
        
      
 ?>

	</div>
    </div>
    </div>
<?php
    }
?>


<!---End of panel--------->
   <!-- </div>
    </div>

-->