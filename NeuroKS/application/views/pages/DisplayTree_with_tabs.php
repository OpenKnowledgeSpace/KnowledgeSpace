
<?php
    if(strcmp($enableHeader, "true")==0)
    {
        
      
 ?>
  <link rel="stylesheet" type="text/css" href="sckb.css"> 
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

    <div class="panel panel-default">

            <div class="panel-heading">   
	<h3 class="panel-title"><a href="#" id="relation-fullscreen" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a>Relations</h3>							
        </div>

        <div id="relation-panel" class="panel-body" style="min-height: 35%; max-height: 35%;overflow-y: scroll">
<?php
    }
    
    /* echo "-----tabID:".$tabID;
    if($tabID==2)
        echo "tabID=2";
    else
        echo "tabID!=2"; */
?>
            
            <!-----------------In relation panel---->
 <ul class="nav nav-tabs">
        <li <?php if($tabID==1) echo "class=\"active\""; ?>><a href="#tab1default" data-toggle="tab" onclick="updateTreeTabID(1);">SubClassOf</a></li>
       <?php 
            if(!is_null($node2) || !is_null($leafHTML2))
            {
                
            ?>
        <li <?php if($tabID==2) echo "class=\"active\""; ?>><a href="#tab2default" data-toggle="tab" onclick="updateTreeTabID(2);">has_proper_part</a></li>
        
        <?php
            }
            ?>
            <?php 
            if(!is_null($node3) || !is_null($leafHTML3))
            {
                
            ?>    
        <li <?php if($tabID==3) echo "class=\"active\""; ?>><a href="#tab3default" data-toggle="tab" onclick="updateTreeTabID(3);">part_of</a></li>
             <?php
            }
            ?>
 </ul>
       
        
        <div class="tab-content">
        <!---First Panel -->        
        <div class="tab-pane <?php if($tabID==1) echo " fade in active"; ?>" id="tab1default">
         
        <div id="treeWell2" class="tree well">
<?php

        $parentLinkName = "";
        if(isset($node->lbl))
            $parentLinkName = str_replace(" ", "_", $node->lbl);
        else
            $parentLinkName = "unknown";
        $parentLinkName = str_replace("(", "_",$parentLinkName);
        $parentLinkName = str_replace(")", "_",$parentLinkName);
        $parentLink="";
        if(isset($node->id))
            $parentLink = "/index.php/".$config_array->pagePrefix."/".$node->id;
        else
            $parentLink = "#";
        if (!is_null($node))
        {
            if (strpos($node->id, '/') == false)
                echo "<ul><li><span id=\"".$node->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node->lbl    .    "</span><a target=\"_self\" href=\"".$parentLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";
            else
                echo "<ul><li><span id=\"".$mainNode->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node->lbl    .    "</span><a target=\"_self\" href=\"".$parentLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";

        }

        $mainLink = "/index.php/".$config_array->pagePrefix."/".$mainNode->id;

        
        if (!is_null($node) && strpos($node->id, '/') == false)
            echo "<ul><li><span style=\"background-color: #FFFF00\" id=\"".$mainNode->id.",".$node->id."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 
        else
            echo "<ul><li><span style=\"background-color: #FFFF00\" id=\"".$mainNode->id.","."none"."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 
            
	
        //$mainLink = "/SciCrunchKS/index.php/".$config_array->pagePrefix."/".$mainNode->id;
	//echo "<ul><li><span style=\"background-color: #FFFF00\" id=\"".$mainNode->id.",".$node->id."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 


	echo $leafHTML;

	

	echo "</li></ul>";
	echo "</li></ul>";


?>
        </div>
            </div>
        
        <!---End First Panel -->    
        <!---Second Panel -->    
        <div class="tab-pane <?php if($tabID==2) echo " fade in active"; ?>" id="tab2default">
          <!-- <div id="rel-har_proper_part-panel" class="panel-body" style="min-height: 35%; max-height: 35%;overflow-y: scroll"> -->
           <div id="treeWellB" class="tree well">
<?php

        if(!is_null($node2))
        {
            $parentLinkName = str_replace(" ", "_", $node2->lbl);
            $parentLinkName = str_replace("(", "_",$parentLinkName);
            $parentLinkName = str_replace(")", "_",$parentLinkName);
            
            $parentLink = "/index.php/".$config_array->pagePrefix."/".$node2->id;

            echo "<ul><li><span id=\"".$node2->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node2->lbl    .    "</span><a target=\"_self\" href=\"".$parentLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";
        }

        
	$mainLink = "/index.php/".$config_array->pagePrefix."/".$mainNode->id;
	
        
        echo "<ul><li><span style=\"background-color: #FFFF00\" id=\"".$mainNode->id.",".$node->id."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 

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
        <div class="tab-pane <?php if($tabID==3) echo " fade in active"; ?>" id="tab3default">
           <!--<div id="rel-has_part-panel" class="panel-body" style="min-height: 35%; max-height: 35%;overflow-y: scroll">-->
           <div id="treeWellC" class="tree well">
<?php

        if(!is_null($node3))
        {
            $parentLinkName = str_replace(" ", "_", $node3->lbl);
            $parentLinkName = str_replace("(", "_",$parentLinkName);
            $parentLinkName = str_replace(")", "_",$parentLinkName);
            
            $parentLink = "/index.php/".$config_array->pagePrefix."/".$node3->id;
            
            
            echo "<ul><li><span id=\"".$node3->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node3->lbl    .    "</span><a target=\"_self\" href=\"".$parentLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";

        }
        
	$mainLink = "/index.php/".$config_array->pagePrefix."/".$mainNode->id;

        
        echo "<ul><li><span style=\"background-color: #FFFF00\" id=\"".$mainNode->id.",".$node->id."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 

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
            
            
            <!-----------------End relation panel---->

<?php
    if(strcmp($enableHeader, "true")==0)
    {
        
      
 ?>

	</div>
    </div>
   
<?php
    }
?>


<!---End of panel--------->
   <!-- </div>
    </div>

-->