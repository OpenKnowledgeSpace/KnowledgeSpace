   <!-- Lexicon table -->
  
     <div class="panel panel-grey">
    <div class="panel-heading">Lexicon</div>

	<div class="panel-body" style="min-height: 22%; max-height: 22%;overflow-y: scroll">

    <div class="row" style="<?php
	$useBackground = false;
	$background = "background: #b8d1f3";
	
	if($useBackground)
	{
	    $useBackground = false;
	    echo $background;
	}
	else
	    $useBackground = true;
	


?>">    
<div class="col-md-3">Concept URI</div>
<div class="col-md-9"><?php  echo $curie;    ?></div>
</div>


<div class="row" style="<?php
	
        if($useBackground)
        {
            $useBackground = false;
            echo $background;
        }
        else
            $useBackground = true;
       

?>">
        <div class="col-md-3">Label(s)</div>
        <div class="col-md-9"><?php
	
	echo $mainNode->lbl;	

	?></div>
	</div>
<div class="row" style="<?php
        
        if($useBackground)
        {
            $useBackground = false;
            echo $background;
        }
        else
            $useBackground = true;
       

?>">
    
    
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


</div>

    </div> 
