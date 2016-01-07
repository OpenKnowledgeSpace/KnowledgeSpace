  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="sckb.css"> 
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  
  
    <!-------------------Data space panel------------------------>
    <div class="panel panel-default">
    <div class="panel-heading">Data space</div>
    <div class="panel-body" style="min-height: 138; max-height: 138;overflow-y: scroll">  
    
        
  
  <!-- Trigger the modal with a button -->
    <div class="row">
    <div class="col-md-4">
               
   <!-- <button style="height:30px;width:120px" type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal">Physiology -->
       <?php 

        $neuroElectroCount = 0;
    
        //echo $neuroElectroResult;
        if(!is_null($neuroElectroResult) && $neuroElectroResult->result->resultCount > 0)
        {
           $neuroElectroCount = $neuroElectroResult->result->resultCount;
	   echo "<button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal\">Physiology (".$neuroElectroResult->result->resultCount.")";
           
        }
        else
          echo "<button  style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal\" disabled>Physiology (0)";

?></button>
    </div>

    <div class="col-md-4">
    <!-- <button style="height:30px;width:120px" type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal2">Expression -->
        <?php
	
       $genSatCount = 0;
       if(!is_null($genSatResult) && $genSatResult->result->resultCount> 0)
       {
           $genSatCount = $genSatResult->result->resultCount;
           echo "<button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal2\">Expression (".$genSatResult->result->resultCount.")";
           
       }
       else 
           echo "<button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal2\" disabled>Expression (0)";
       
?></button> 
    </div>

    <div class="col-md-4">
    <!-- <button style="height:30px;width:120px" type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal5">Models -->
        <?php
	$modelCount = 0;
        $neuroMLCount = 0;
        $modelDBCount = 0;
        $brainModelCount =0;
        if(!is_null($neuroMLResult))
        {
            $neuroMLCount = $neuroMLResult->result->resultCount;
            $modelCount = $neuroMLResult->result->resultCount;
        }
        if(!is_null($modelDBResult))
        {
            $modelDBCount = $modelDBResult->result->resultCount;
            $modelCount = $modelCount+$modelDBResult->result->resultCount;
            
        }
        if(!is_null($brainModelResult))
        {
            $brainModelCount = $brainModelResult->result->resultCount;
            $modelCount = $modelCount+$brainModelResult->result->resultCount;
            
        }
        if($modelCount > 0)
            echo "<button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal5\">Models (".$modelCount.")";
        else
            echo "<button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal5\" disabled>Models (".$modelCount.")";

?></button> 
    </div>
  </div>


 <br/>
   <div class="row">
    <div class="col-md-4">
    <!-- <button style="height:30px;width:120px" type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal3">Anatomy -->
        <?php
	
        $neuronDBCount = 0;
        if(!is_null($neuronDBResult) && $neuronDBResult->result->resultCount > 0)
        {
           $neuronDBCount = $neuronDBResult->result->resultCount;
           echo "<button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal3\">Anatomy (".$neuronDBResult->result->resultCount.")";
           
        }
       else 
           echo "<button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal3\" disabled>Anatomy (0)";
      
?></button>
    </div>
    
    <div class="col-md-4">
    <!-- <button style="height:30px;width:120px" type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal4">Morphology -->
        <?php
	$neuroMorphoCount = 0;
        if(!is_null($neuroMorphoResult) && $neuroMorphoResult->result->resultCount > 0)
        {
            $neuroMorphoCount = $neuroMorphoResult->result->resultCount;
            echo "<button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal4\">Morphology (".$neuroMorphoResult->result->resultCount.")";
            
        }
        else 
            echo "<button style=\"height:30px;width:120px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#myModal4\" disabled>Morphology (0)";
?></button>
    </div>
  </div>

  </div>  
</div>

    
  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Physiology</h4>
        </div>
        <div class="modal-body">
                   
            <p>
 <?php
 
           if($neuroElectroCount > 0)
           {    
 
                echo "<div class=\"row\">\n";
                echo "<div class=\"col-md-3\">\n";
                //echo "<a href=\"https://neuinfo.org/mynif/search.php?list=cover&q=neocortex%20pyramidal%20neuron&t=indexable&nif=nlx_151885-1\" target=\"_blank\">NeuroElectro:EPhysData (".$neuroElectroCount.")</a>\n";
                echo "<a href=\"/SciCrunchKS/index.php/Results/view/nlx_151885-1/".$pageName."/1\" target=\"_blank\">NeuroElectro:EPhysData (".$neuroElectroCount.")</a>\n";
                echo "</div>\n";
                echo "<div class=\"col-md-9\">\n";
                echo "is a database of elecrophysiological properties text-mined from the biomedical literature as a function of neuron type.\n";
                echo "</div>\n";
                echo "</div>\n";
                    
           }
            
?>
<!--                
            <div class="row"  style="background: #b8d1f3">
                            <div class="col-md-3">
                                <a href="NIFResultServlet?dataSource=nif-0000-00508-4&searchTerm=primary%20visual%20area" target="_blank">ABA Mouse Brain:CellType EphysData (35)</a>
                            </div>
                            <div class="col-md-9">
                                The <a href="http://celltypes.brain-map.org/" target="_blank">cell type view</a> provides a database of neuronal cell types based on multimodal characterization of single cells to enable data-driven approaches to classification. For more details about the experiments, please refer to the <a href="http://help.brain-map.org/download/attachments/8323525/EphysOverview.pdf" target="_blank">technical white paper</a>.
                            </div>
            </div>  -->
            </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>



  <!-- Modal -->
  <div class="modal fade" id="myModal2" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Expression</h4>
        </div>
        <div class="modal-body">
            
            <div class="row">
                <div class="col-md-12">
                    
                    <?php
                    if($genSatCount > 0)
                    {
                        echo "<div class=\"row\" >\n";
                        echo "   <div class=\"col-md-3\">\n";
                        //echo "       <a href=\"https://neuinfo.org/mynif/search.php?q=neocortex%20pyramidal&t=indexable&nif=nif-0000-00130-1&b=0&r=20\" target=\"_blank\">GENSAT:GeneExpression (".$genSatCount.")</a>\n";
                        echo "       <a href=\"/SciCrunchKS/index.php/Results/view/nif-0000-00130-1/".$pageName."/1\" target=\"_blank\">GENSAT:GeneExpression (".$genSatCount.")</a>\n";
                        echo "   </div>\n";
                        echo "   <div class=\"col-md-9\">\n";
                        echo "        contains gene expression data and maps of the mouse brain and spinal cord. ";
                        echo "   </div>";
                        echo "</div>";
                    }
                    ?>
		</div>    
            </div>
           
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>



  <!-- Modal -->
  <div class="modal fade" id="myModal3" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Anatomy</h4>
        </div>
        <div class="modal-body">
            
            <?php
            
            if($neuronDBCount > 0)
            {
                echo "<div class=\"row\">";
                echo "   <div class=\"col-md-3\">";
                //echo "      <a href=\"https://neuinfo.org/mynif/search.php?q=neocortex%20pyramidal&t=indexable&nif=nif-0000-00054-3\" target=\"_blank\">NeuronDB:Transmitters (".$neuronDBCount.")</a>";
                echo "      <a href=\"http://localhost/SciCrunchKS/index.php/Results/view/nif-0000-00054-1/".$pageName."/1\" target=\"_blank\">NeuronDB:Transmitters (".$neuronDBCount.")</a>";
                echo "   </div>";
                echo "    <div class=\"col-md-9\">";
                echo "        at <a href=\"http://senselab.med.yale.edu/\" target=\"_blank\">  SenseLab </a>provides data about neurotransmitter properties for submitted neurons. ";
                echo "    </div>";
                echo "</div>";
            }  
            ?>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>



  <!-- Modal -->
  <div class="modal fade" id="myModal4" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Morphology</h4>
        </div>
        <div class="modal-body">
            
            <?php
            
            if($neuroMorphoCount > 0)
            {
            echo "<div class=\"row\">";
            echo "   <div class=\"col-md-3\">";
            //echo "        <a href=\"https://neuinfo.org/mynif/search.php?q=pyramidal%20neocortex&t=indexable&list=cover&nif=nif-0000-00006-1\" target=\"_blank\">NeuroMorpho:ModelImage (".$neuroMorphoCount.")</a>";
            echo "        <a href=\"/SciCrunchKS/index.php/Results/view/nif-0000-00006-1/".$pageName."/1\" target=\"_blank\">NeuroMorpho:ModelImage (".$neuroMorphoCount.")</a>";
            echo "   </div>";
            echo "    <div class=\"col-md-9\">";
            echo "        contains a curated repository of digitally reconstructed neurons.";
            echo "    </div>";
            echo "</div>";
            }
                    
            ?>        
            
            
            <!-- 
            <div class="row" style="background: #b8d1f3">
               <div class="col-md-3">
                    <a href="https://neuinfo.org/mynif/search.php?q=apical%20spiny%20dendrite&t=indexable&nif=nif-0000-00508-5&b=0&r=20" target="_blank">ABA Mouse Brain:CellType MorphoData (36)</a>
               </div>
                <div class="col-md-9">
                    The <a href="http://celltypes.brain-map.org/" target="_blank">cell type view</a> provides a database of neuronal cell types based on multimodal characterization of single cells to enable data-driven approaches to classification. For more details about the experiments, please refer to the <a href="http://help.brain-map.org/download/attachments/8323525/MorphOverview.pdf" target="_blank">technical white paper</a>.
                </div>
            </div> -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>




<!-- Modal -->
  <div class="modal fade" id="myModal5" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Models</h4>
        </div>
        <div class="modal-body">
                   
            
            <?php
            
            if($neuroMLCount > 0)
            {
                echo "<div class=\"row\">";
                echo "    <div class=\"col-md-4\">";
                //echo "       <a href=\"https://neuinfo.org/mynif/search.php?list=cover&q=neocortical%20pyramidal%20cell&t=indexable&nif=scr_013705-1\" target=\"_blank\">NeuroML database:Models (".$neuroMLCount.")</a>";
                echo "       <a href=\"/SciCrunchKS/index.php/Results/view/scr_013705-1/".$pageName."/1\" target=\"_blank\">NeuroML database:Models (".$neuroMLCount.")</a>";
                echo "    </div>";

                echo "    <div class=\"col-md-8\">";
                echo "       is a curated relational database that provides for the storage and retrieval of computational neuroscience model.";
                echo "    </div>";
                echo "</div>";
            }
                    
            ?>
            
            <?php
            
            if($modelDBCount > 0)
            {
            echo "<div class=\"row\"  style=\"background: #b8d1f3\">";
            echo "    <div class=\"col-md-4\">";
            //echo "      <a href=\"https://neuinfo.org/mynif/search.php?list=cover&q=neocortical%20pyramidal%20cell&t=indexable&nif=nif-0000-00004-1\" target=\"_blank\">ModelDB:Models (".$modelDBCount.")</a>";
            echo "      <a href=\"/SciCrunchKS/index.php/Results/view/nif-0000-00004-1/".$pageName."/1\" target=\"_blank\">ModelDB:Models (".$modelDBCount.")</a>";            
            echo "    </div>";
            echo "    <div class=\"col-md-8\">";
            echo "      provides high quality computational neuroscience models. ModelDB is tightly coupled with <a href=\"http://senselab.med.yale.edu/neurondb/\" target=\"_blank\">NeuronDB</a>."; 
            echo "    </div>";
            echo "</div>";
            }
            ?>
            
            <?php
            if($brainModelCount >0)
            {
                echo "<div class=\"row\">";
                echo "    <div class=\"col-md-4\">";
                //echo "      <a href=\"https://neuinfo.org/mynif/search.php?q=Pyramidal%20cell&t=indexable&list=cover&nif=nlx_152590-1\" target=\"_blank\">Open Source Brain:models (10)</a>";
                echo "      <a href=\"/SciCrunchKS/index.php/Results/view/nlx_152590-1/".$pageName."/1\" target=\"_blank\">Open Source Brain:models (".$brainModelCount.")</a>";
                echo "    </div>";
                echo "    <div class=\"col-md-8\">";
                echo "      provides annotated computational models."; 
                echo "    </div>";
                echo "</div>";
            }
            ?>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>    














<!-----------------------Image gallery----------------------->
    <div class="panel panel-default">
    <div class="panel-heading">Image gallery</div>
    <div class="panel-body" style="min-height: 138; max-height: 138;overflow-y: scroll"> 
      
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


           <!--     <a href="http://www.cellimagelibrary.org/images/40188" target="_blank">
                    <img width="84" height="100" src="http://grackle.crbs.ucsd.edu:8001/ascb_il/render_thumbnail/40188/220/"/>
                </a>  -->
            
            
            
<?php
        if(!$hasFirstImage && sizeof($cilImages) > 1)
        {
            
            echo "<div class=\"col-md-3\">";
            echo $cilImages[count($originalCILImages)-1];	   
            echo "</div>";
            $hasFirstImage = true;
            $imageCount++;
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
<!--
                <a href="http://neuromorpho.org/neuroMorpho/neuron_info.jsp?neuron_name=Pyramid-IIIC-2-5M-1" target="_blank">
                    <img width="84" height="100" src="http://neuromorpho.org/neuroMorpho/images/imageFiles/Vuksic/Pyramid-IIIC-2-5M-1.png"/>
                </a>   
-->

            



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

        <!-- Modal -->
  <div class="modal fade" id="myModal6" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Image gallery</h4>
        </div>
        <div class="modal-body" style="overflow-y: scroll">

<?php

//	$cilImages = array_merge($cilImages, $neuroMorphoImages);

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



