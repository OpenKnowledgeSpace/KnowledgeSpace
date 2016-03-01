
<!--  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  -->
  <link rel="stylesheet" type="text/css" href="sckb.css"> 
  
 <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> -->
 <!--  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  -->
       <!--------------------Tree panel ----------------------------->
       <div class="panel panel-grey">
    <!-- <div class="panel panel-default">-->
    <!-- <div class="panel-heading">Relations
                <ul class="list-inline panel-actions">
                        <li><a href="#" id="relation-fullscreen" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
                </ul>
    </div> -->
        <div class="panel-heading">
             
	<h3 class="panel-title"><a href="#" id="relation-fullscreen" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a>Relations</h3>
								
        </div>

    <div id="relation-panel" class="panel-body" style="min-height: 35%; max-height: 35%;overflow-y: scroll">

        <div id="treeWell2" class="tree well">
<?php

        $parentLinkName = str_replace(" ", "_", $node->lbl);
        $parentLinkName = str_replace("(", "_",$parentLinkName);
        $parentLinkName = str_replace(")", "_",$parentLinkName);
        //$parentLink = "/SciCrunchKS/index.php/pages/view/".$parentLinkName;
        $parentLink = "/SciCrunchKS/index.php/pages/view/".$node->id;
	//echo "<ul><li><span><i class=\"icon-folder-open\"></i><a target=\"_self\" href=\"".$parentLink."\">" . $node->lbl    .    "</a></span> <a href=\"\"></a>";
        echo "<ul><li><span id=\"".$node->id.","."none"."\"><i class=\"icon-folder-open\"></i>" . $node->lbl    .    "</span><a target=\"_self\" href=\"".$parentLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>";


        
	//echo "<ul><li><span style=\"background-color: #FFFF00\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"\"></a>"; 
        $mainLink = "/SciCrunchKS/index.php/pages/view/".$mainNode->id;
	echo "<ul><li><span style=\"background-color: #FFFF00\" id=\"".$mainNode->id.",".$node->id."\"><i class=\"icon-plus-sign\"></i>" . $mainNode->lbl . "</span> <a href=\"".$mainLink."\"><img src=\"/img/view-icon.png\" width=\"25\" height=\"25\"></a>"; 


	echo $leafHTML;

	

	echo "</li></ul>";
	echo "</li></ul>";


?>



	</div>
    </div>
    </div>


    <!-- Lexicon table -->
    <!-- <div class="panel panel-default"> -->
     <div class="panel panel-grey">
    <div class="panel-heading">Lexicon</div>
<!--    <div class="panel-body" style="min-height: 120; max-height: 120;overflow-y: scroll">
	-->
	<div class="panel-body" style="min-height: 22%; max-height: 22%;overflow-y: scroll">

<?php
	$useBackground = false;
	$background = "background: #b8d1f3";
	echo "<div class=\"row\" style=\"";
	if($useBackground)
	{
	    $useBackground = false;
	    echo $background;
	}
	else
	    $useBackground = true;
	echo "\">";


?>    
<div class="col-md-3">Concept URI</div>
<div class="col-md-9"><?php  echo $curie;    ?></div>        
</div>

<?php
	echo "<div class=\"row\" style=\"";
        if($useBackground)
        {
            $useBackground = false;
            echo $background;
        }
        else
            $useBackground = true;
        echo "\">";

?>
        <div class="col-md-3">Label(s)</div>
        <div class="col-md-9"><?php
	
	echo $mainNode->lbl;	

	?></div>
	</div>

<?php
        echo "<div class=\"row\" style=\"";
        if($useBackground)
        {
            $useBackground = false;
            echo $background;
        }
        else
            $useBackground = true;
        echo "\">";

?>
    
    
    <?php


	
	$syn1 = 0;

        if(isset($mainNode->meta->synonym))
        {
            echo "<div class=\"col-md-3\">Synonyms</div>\n";
            echo "<div class=\"col-md-9\">\n";
            foreach($mainNode->meta->synonym as $synonym)
            {
                    if($syn1 > 0)
                       echo ", ";
                    else
                       $syn1 = $syn1+1;

                    echo $synonym;
            }
            echo "</div>\n";
           
        }


	?>
  </div>



<!---End of panel--------->
    </div>
    </div>

