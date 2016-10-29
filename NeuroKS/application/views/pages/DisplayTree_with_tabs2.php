
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

?>
            
            <!-----------------In relation panel---->
 <ul class="nav nav-tabs">
        <li <?php if($tabID==1) echo "class=\"active\""; ?>><a href="#tab1default" data-toggle="tab" onclick="updateTreeTabID(1);">SubClassOf</a></li>
       <?php 
            $properties = $config_array->properties_included;
            $index = 2;
            foreach($properties as $property)
            {
                $style = "";
                if($index == $tabID)
                    $style = "active";
                $customTree = $relation_array[$property->name];
                $myNode = $customTree->parentNode;
                $leafHTML2 = $customTree->leafHtml;
                if(is_null($myNode) && is_null($leafHTML2))
                {
                    $index++;
                    continue;
                }
                 echo "<li class=\"".$style."\"><a href=\"#tab".$index."default\" data-toggle=\"tab\" onclick=\"updateTreeTabID(".$index.");\">".$property->name."</a></li>";
                
                $index++;
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
            $parentLink = "/".$config_array->pagePrefix."/".$node->id;
        else
            $parentLink = "#";
        if (!is_null($node))
        {
            if (strpos($node->id, '/') == false)
                echo "<ul><li><span id=\"".$node->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node->lbl    .    "</span><a target=\"_self\" href=\"".$parentLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";
            else
                echo "<ul><li><span id=\"".$mainNode->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node->lbl    .    "</span><a target=\"_self\" href=\"".$parentLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";

        }

        $mainLink = "/".$config_array->pagePrefix."/".$mainNode->id;

        
        if (!is_null($node) && strpos($node->id, '/') == false)
            echo "<ul><li><span style=\"background-color: #FFFF00\" id=\"".$mainNode->id.",".$node->id."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 
        else
            echo "<ul><li><span style=\"background-color: #FFFF00\" id=\"".$mainNode->id.","."none"."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 
            
	
        //$mainLink = "/SciCrunchKS/".$config_array->pagePrefix."/".$mainNode->id;
	//echo "<ul><li><span style=\"background-color: #FFFF00\" id=\"".$mainNode->id.",".$node->id."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 


	echo $leafHTML;

	

	echo "</li></ul>";
	echo "</li></ul>";


?>
        </div>
            </div>
        
        <!---End First Panel -->  
        
        
        
        <!---Second Panel -->    
        <!-- <div class="tab-pane <?php //if($tabID==2) echo " fade in active"; ?>" id="tab2default"> -->
        <?php
            $properties = $config_array->properties_included;
            $index = 2;
            foreach($properties as $property)
            {
                $customTree = $relation_array[$property->name];
                $node = $customTree->parentNode;
                $leafHTML = $customTree->leafHtml;
                
                if(is_null($node) && is_null($leafHTML))
                {
                    $index++;
                    continue;
                }
                
                $style = "";
                if($index == $tabID)
                    $style = "active";
                echo "<div class=\"tab-pane fade in ".$style."\" id=\"tab".$index."default\">";
                echo "<div id=\"treeWell".$index."\" class=\"tree well\">";
                
                
                
                //var_dump($customTree);
                /*****************Tree components **********************/
                $parentLinkName = "";
                if(isset($node->lbl))
                    $parentLinkName = str_replace(" ", "_", $node->lbl);
                else
                    $parentLinkName = "unknown";
                $parentLinkName = str_replace("(", "_",$parentLinkName);
                $parentLinkName = str_replace(")", "_",$parentLinkName);
                $parentLink="";
                if(isset($node->id))
                    $parentLink = "/".$config_array->pagePrefix."/".$node->id;
                else
                    $parentLink = "#";

                if(isset($node->id) && isset($node->lbl))
                    echo "<ul><li><span id=\"".$node->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node->lbl    .    
                        "</span><a target=\"_self\" href=\"".$parentLink."\" ><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";

                $mainLink = "/".$config_array->pagePrefix."/".$mainNode->id;

                if(isset($node->id))
                    echo "<ul><li><span style=\"background-color: #FFFF00\" id=\"".$mainNode->id.",".$node->id."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 
                else
                    echo "<ul><li><span style=\"background-color: #FFFF00\" id=\"".$mainNode->id.",none"."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 


                echo $leafHTML;



                echo "</li></ul>";
                echo "</li></ul>";
        /***********************End tree components******************/
             
                echo "</div>";
                echo "</div>";
                $index++;
            }
        
            ?>
        
        
        <!-- End second panel -->

            
         

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