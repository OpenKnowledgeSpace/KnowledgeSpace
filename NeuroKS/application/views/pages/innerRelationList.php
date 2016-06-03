<?php
    require_once '../NeuroKS/application/models/CustomTree.php';
 ?>
<!--------------------Tree panel ----------------------------->
       <div class="panel panel-grey">
        <div class="panel-heading clearfix">   
	<h3 class="panel-title">
            <a class="pull-right"  href="#" id="relation-fullscreen" role="button" title="Toggle fullscreen" onclick="return ksTrackEvent('Link', 'Expand', 'Expand tree panel');">
            <!--  <i class="glyphicon glyphicon-resize-full" style="color:#008ae6"></i></a> -->
            <i class="glyphicon glyphicon-zoom-in"></i></a>
                Relations</h3>							
        </div>

        <div id="relation-panel-1" class="panel-body" style="min-height: 50%; max-height: 50%;overflow-y: scroll">
        <ul class="nav nav-tabs">
        <?php
            $properties = $config_array->properties_included;
            $index = 1;
            foreach($properties as $property)
            {
                $style = "";
                if($index == 1)
                   $style = "active";
                echo "<li class=\"".$style."\"><a href=\"#tab".$index."default\" data-toggle=\"tab\" onclick=\"updateTreeTabID(".$index.");\">".$property->name."</a></li>";
                $index++;
            }
        ?>
        </ul>
        <!-- Tab content --->
        <div class="tab-content"> 
            <?php
            $properties = $config_array->properties_included;
            $index = 1;
            foreach($properties as $property)
            {
                $style = "";
                if($index == 1)
                   $style = "active";
                echo "<div class=\"tab-pane fade in ".$style."\" id=\"tab".$index."default\">";
                echo "<div id=\"treeWell".$index."\" class=\"tree well\">";
                
                $customTree = $relation_array[$property->name];
                $node = $customTree->parentNode;
                $leafHTML = $customTree->leafHtml;
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
                    $parentLink = "/".$config_array->local_context_name."/index.php/pages/view/".$node->id;
                else
                    $parentLink = "#";

                if(isset($node->id) && isset($node->lbl))
                    echo "<ul><li><span id=\"".$node->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node->lbl    .    
                        "</span><a target=\"_self\" href=\"".$parentLink."\" ><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";

                $mainLink = "/".$config_array->local_context_name."/index.php/pages/view/".$mainNode->id;

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
        </div>
        <!-- End Tab content --->
            
        </div>
       </div> 
       