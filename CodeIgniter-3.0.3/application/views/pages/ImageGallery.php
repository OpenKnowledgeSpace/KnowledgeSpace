
<!-----------------------Image gallery----------------------->
    <div class="panel panel-grey">
    <div class="panel-heading">Image gallery</div>

    <div class="panel-body" style="min-height: 23%; max-height: 23%;overflow-y: scroll"> 
        <div class="row" style="vertical-align: middle" >
            

<?php
        $imageCount = 0;
        $hasFirstImage = false;
        if($title == "Neocortical pyramidal cell")
        {
            echo "<div class=\"col-md-3\">";
            echo "   <a href=\"http://celltypes.brain-map.org/mouse/experiment/morphology/330080937\" target=\"_blank\">";
            echo "       <img width=\"84\" height=\"100\" src=\"http://celltypes.brain-map.org/cgi-bin/imageservice?path=/external/mousecelltypes/prod210/specimen_324466858/min_xy_324466858.aff&mime=2\"/>";
            echo "   </a>";
            echo "</div>";
            $hasFirstImage = true; 
            $imageCount++;
        }
        
?>
             
            
            
<?php

	    
	     if(sizeof($cilImages) > 0)
	     {
                echo "<div class=\"col-md-3\">";
		echo $cilImages[0];
                echo "</div>";
                $imageCount++;
	     }
 		


?>
            
<?php
        if(!$hasFirstImage && sizeof($cilImages) > 1)
        {
            if($originalCILImages != NULL && count($originalCILImages)>0)
            {
            echo "<div class=\"col-md-3\">";
            
                echo $cilImages[count($originalCILImages)-1];	   
           
            echo "</div>";
            $hasFirstImage = true;
            $imageCount++;
             }
        }


?>
            



            

<?php

		if(sizeof($neuroMorphoImages) > 0)
		{
                    for($i=0;$i<sizeof($neuroMorphoImages);$i++)
                    {
                        echo "<div class=\"col-md-3\">";
			echo $neuroMorphoImages[$i];
                        echo "</div> ";
                        
                        $imageCount++;
                        if($imageCount >= 3)
                            break;
                    }
		}

?>		


            <div class="col-md-3" >
<?php
            if($imageCount > 0)
            {    
                echo "<a href=\"#\"  data-toggle=\"modal\" data-target=\"#myModal6\">";
                echo "See All";       
                echo "</a>";
            }
            else
            {
                echo "No Images.";
            }
                        
                        
?>
                
            </div>  
        </div>

    </div>
   </div>




        
  <div class="modal fade" id="myModal6" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h3 class="modal-title">Image gallery</h3>
        </div>
        <div class="modal-body" style="overflow-y: scroll">

<?php



	if(sizeof($cilImages) > 0)
	{
		$i = 0;
		while($i < sizeof($cilImages))		
		{
		    echo "<div class=\"row\">";
		    echo "<div class=\"col-md-3\">". $cilImages[$i]  ."</div>";
		    $i = $i+1;
		
		    if($i < sizeof($cilImages))
		    	echo "<div class=\"col-md-3\">". $cilImages[$i]  ."</div>";

	            $i = $i+1;
		 	
		    if($i < sizeof($cilImages))
		    	echo "<div class=\"col-md-3\">". $cilImages[$i]  ."</div>";
		    $i = $i+1;		    
		    if($i < sizeof($cilImages))
		    	echo "<div class=\"col-md-3\">". $cilImages[$i]  ."</div>";

		    echo "</div>";

		    if($i < sizeof($cilImages))
		    {
		    	echo "<div class=\"row\">";
                    	echo "<div class=\"col-md-12\"><br/></div>";
                    	echo "</div>";
   		    }
		}

	}

?>



	</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>

      </div>
    </div>
 </div>