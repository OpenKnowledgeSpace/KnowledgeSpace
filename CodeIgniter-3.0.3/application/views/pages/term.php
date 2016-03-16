<?php  require_once 'ViewConfig.php'; ?>
<?php
//echo "-------testing------";
echo "\n<script type=\"text/javascript\">";
echo "\n var title = '".$title."';";
echo "\n var curie = '".$curie."';";
echo "\n var pageName = '".$pageName."';";
echo "\n</script>";
    

?>
<div id="loadingFade"></div>
<div id="loadingModal" style="min-height: 18%; max-height: 18%;width: 15%;">
            <img id="loader" src="http://www.itgeared.com/demo/images/loading.gif" />
</div>
<div class="row">
<div class="col-md-12" >
    <br/><br/>
   
</div>
</div> 

<div class="container">
    <div class="row">
        <div  id="summaryOutter0"    class="collapse" >
        <div class="panel panel-grey">

        <div class="panel-heading">
             
            <h3 class="panel-title"><a href="#" id="panel-fullscreen0" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-small"></i></a><span id="panel_title">Data space</span></h3>
								
        </div>

	<div id="dataspace_panel0" class="panel-body" style="min-height: 23%; max-height: 23%;overflow-y: scroll">
            
        </div>
        </div> 
        </div>
    </div>
  
     
    <div class="row">
        
        
               
            <div  id="summaryOutter1"    class="collapse" >
            <div class="panel panel-grey">

        <div class="panel-heading">
             
            <h3 class="panel-title"><a href="#" id="panel-fullscreen1" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-small"></i></a><span id="panel_title2">Literature</span></h3>
								
        </div>

            <div id="dataspace_panel1" class="panel-body" style="min-height: 100%; max-height: 100%;overflow-y: scroll">
                <?php   
                     include "FullLiterature.php";
                ?>
            </div>
            </div> 
            </div>
          
        
    </div>
    
    <div class="row">   
            <div  id="summaryOutter2"    class="collapse" >
                <div class="panel panel-grey">

                <div class="panel-heading">
             
                <h3 class="panel-title"><a href="#" id="panel-fullscreen2" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-small"></i></a><span id="panel_title3">Relations</span></h3>
								
                </div>
 
                <div id="relation-panel" class="panel-body" style="min-height: 100%; max-height: 100%;overflow-y: scroll">

                    
                </div>
                </div>
            </div>
    </div>
    
    
<div class="row">

    <div id="summaryOutter"    class="col-md-6" >
     <?php   
        include "innerWiki.php";
     ?>       

    </div>
    <link rel="stylesheet" href="/<?php //echo ViewConfig::$localContextName; ?>/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="sckb.css"> 
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> -->
    <div id="dataspaceOutter" class="col-md-6" >
        <div class="panel panel-grey">

        <div class="panel-heading">
             
	<h3 class="panel-title"><a href="#" id="panel-fullscreen" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a>Data space</h3>
								
        </div>

	<div id="dataspace_panel" class="panel-body" style="min-height: 19%; max-height: 19%;overflow-y: scroll">

    
          </div>
     <?php   
        include "DataSpacePopup.php";
     ?>   
  
    </div>
   
    <?php   
       include "ImageGallery.php";
     ?>  
        
  </div>   
   <script type="text/javascript">loadButtons();</script> 
</div>


<div class="row">

<div id="innerRelation"  class="col-md-6">
 <?php   
   include "innerLexicon_1.php";
 ?>       
        
</div>
<div  id="innerLiterature" class="col-md-6">
 <?php   
    include "innerLiterature.php";
 ?>       
        
</div>    
 </div> 



</div>



