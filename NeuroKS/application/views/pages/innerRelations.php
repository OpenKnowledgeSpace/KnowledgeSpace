  <!-- <link rel="stylesheet" type="text/css" href="sckb.css"> -->

       <!--------------------Tree panel ----------------------------->
       <div class="panel panel-grey row_small_gap">
        <div class="panel-heading clearfix">   
	<h3 class="panel-title">
            <a class="pull-right"  href="#" id="relation-fullscreen" role="button" title="Toggle fullscreen" onclick="return ksTrackEvent('Link', 'Expand', 'Expand tree panel');">
            <!--  <i class="glyphicon glyphicon-resize-full" style="color:#008ae6"></i></a> -->
            <i class="glyphicon glyphicon-zoom-in"></i></a>
                Relations</h3>							
        </div>

        <div id="relation-panel-1" class="panel-body" style="min-height: 50%; max-height: 50%;overflow-y: scroll">
        <ul class="nav nav-tabs">
            <li class="active"><a href="#tab1default" data-toggle="tab" onclick="updateTreeTabID(1);">SubClassOf</a></li>
           <?php if(!is_null($node2) || !is_null($leafHTML2)){?>
            <li><a href="#tab2default" data-toggle="tab" onclick="updateTreeTabID(2);">has_proper_part</a></li>
            <?php } ?>
            <?php if(!is_null($node3) || !is_null($leafHTML3)){?>
            <li><a href="#tab3default" data-toggle="tab" onclick="updateTreeTabID(3);">part_of</a></li>
            <?php } ?>
        </ul>
       
        
        <div class="tab-content">
        <!---First Panel -->        
        <div class="tab-pane fade in active" id="tab1default">
         
        <div id="treeWell2" class="tree well">
<?php

        var_dump($node);
        /*$parentLinkName = str_replace(" ", "_", $node->lbl);
        $parentLinkName = str_replace("(", "_",$parentLinkName);
        $parentLinkName = str_replace(")", "_",$parentLinkName);
        
        
	$parentLink = "/index.php/pages/view/".$node->id;
        */
        $parentLinkName = "";
        if(isset($node->lbl))
            $parentLinkName = str_replace(" ", "_", $node->lbl);
        else
            $parentLinkName = "unknown";
        $parentLinkName = str_replace("(", "_",$parentLinkName);
        $parentLinkName = str_replace(")", "_",$parentLinkName);
        $parentLink="";
        if(isset($node->id))
            $parentLink = "/index.php/pages/view/".$node->id;
        else
            $parentLink = "#";

        if(isset($node->id) && isset($node->lbl))
            echo "<ul><li><span id=\"".$node->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node->lbl    .    
                "</span><a target=\"_self\" href=\"".$parentLink."\" ><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";

	$mainLink = "/index.php/pages/view/".$mainNode->id;

        if(isset($node->id))
            echo "<ul><li><span style=\"background-color: #f9f1ae\" id=\"".$mainNode->id.",".$node->id."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 
        else
            echo "<ul><li><span style=\"background-color: #f9f1ae\" id=\"".$mainNode->id.",none"."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 


	echo $leafHTML;

	

	echo "</li></ul>";
	echo "</li></ul>";


?>
        </div>
        </div>
        
        <!---End First Panel -->    
        <!---Second Panel -->    
        <div class="tab-pane" id="tab2default">
          <!-- <div id="rel-har_proper_part-panel" class="panel-body" style="min-height: 35%; max-height: 35%;overflow-y: scroll"> -->
           <div id="treeWellB" class="tree well">
<?php

        if(!is_null($node2))
        {
            $parentLinkName = str_replace(" ", "_", $node2->lbl);
            $parentLinkName = str_replace("(", "_",$parentLinkName);
            $parentLinkName = str_replace(")", "_",$parentLinkName);
            
            $parentLink = "/index.php/pages/view/".$node2->id;
            
            echo "<ul><li><span id=\"".$node2->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node2->lbl    .    "</span><a target=\"_self\" href=\"".$parentLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";
        }

	$mainLink = "/index.php/pages/view/".$mainNode->id;

        echo "<ul><li><span style=\"background-color: #f9f1ae\" id=\"".$mainNode->id.",".$node->id."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 

        if(!is_null($leafHTML2))
            echo $leafHTML2;

	

	echo "</li></ul>";
        
        if(!is_null($node2))
        {
            echo "</li></ul>";
        }


?>
       <!-- </div> -->
        </div>
        </div>
        <!-- End second panel -->
        <!---Third Panel -->    
        <div class="tab-pane" id="tab3default">
           <!--<div id="rel-has_part-panel" class="panel-body" style="min-height: 35%; max-height: 35%;overflow-y: scroll">-->
           <div id="treeWellC" class="tree well">
<?php

        if(!is_null($node3))
        {
            $parentLinkName = str_replace(" ", "_", $node3->lbl);
            $parentLinkName = str_replace("(", "_",$parentLinkName);
            $parentLinkName = str_replace(")", "_",$parentLinkName);
            
            $parentLink = "/index.php/pages/view/".$node3->id;
            
            echo "<ul><li><span id=\"".$node3->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node3->lbl    .    "</span><a target=\"_self\" href=\"".$parentLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";

        }
        
        $mainLink = "/index.php/pages/view/".$mainNode->id;
	
        echo "<ul><li><span style=\"background-color: #f9f1ae\" id=\"".$mainNode->id.",".$node->id."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 

        if(!is_null($leafHTML3))
            echo $leafHTML3;

        echo "</li></ul>";
	
            
	if(!is_null($node3))
        {
	echo "</li></ul>";
        }


?>
        </div>
        </div>
       <!-- </div> -->
        <!-- End Third panel -->
        
        </div>
       </div>
       </div>
       



 
<!---End of panel--------->

    <!-- </div> -->

