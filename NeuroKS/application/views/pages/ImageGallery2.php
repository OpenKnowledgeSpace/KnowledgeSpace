
<!-----------------------Image gallery----------------------->
    <div class="panel panel-grey row_small_gap">
    <div class="panel-heading">Image gallery</div>

    <div class="panel-body" style="min-height: 23%; max-height: 23%;overflow-y: scroll"> 
        <div class="row" style="vertical-align: middle" >
       
<?php
        $cindex = 0;
        $imageCount = count($imageGallery);
        foreach($imageGallery as $gimage)
        {
            if($cindex == 3)
                break;
            echo "<div class=\"col-md-3\" >";
            echo $gimage;
            echo "</div>";
            $cindex++;
        
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
                //$cilImages = array_unique($cilImages);
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
                        $i = $i+1;	
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