<div id="loadingFade"></div>
<div id="loadingModal">
            <img id="loader" src="http://www.itgeared.com/demo/images/loading.gif" />
</div>
<div class="row">
<div class="col-md-12" >
    <br/><br/>
    <br/><br/>
</div>
</div>
<div class="container">
     
<div class="row">
    <div id="summaryOutter0"    class="collapse" >
        <div class="panel panel-default">
        <div class="panel-heading">
                    <h3 id="panel_title" class="panel-title">Data space</h3>
                    <ul class="list-inline panel-actions">
                        <li><a href="#" id="panel-fullscreen0" role="button" title="Toggle fullscreen"><i id="dataspace_i" class="glyphicon glyphicon-resize-small"></i></a></li>
                    </ul>
        </div> 

	<div id="dataspace_panel0" class="panel-body" style="min-height: 23%; max-height: 23%;overflow-y: scroll">
            
        </div>
        </div> 
    </div>
    <div id="summaryOutter"    class="col-md-6" >
     <?php   
        include "innerWiki.php";
     ?>       

    </div>
        <link rel="stylesheet" href="/SciCrunchKS/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="sckb.css"> 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <div id="dataspaceOutter" class="col-md-6" >
        <div class="panel panel-default">
        <div class="panel-heading">
                    <h3 id="panel_title" class="panel-title">Data space</h3>
                    <ul class="list-inline panel-actions">
                        <li><a href="#" id="panel-fullscreen" role="button" title="Toggle fullscreen"><i id="dataspace_i" class="glyphicon glyphicon-resize-full"></i></a></li>
                    </ul>
        </div> 

	<div id="dataspace_panel" class="panel-body" style="min-height: 23%; max-height: 23%;overflow-y: scroll">

     <?php   
        include "DataSpacePopup.php";
     ?>       
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>   
   <script type="text/javascript">loadButtons();</script> 
</div>    
 </div>
    <div class="row">
        
        
    </div>
    

<div class="row">
<!-- <div class="col-md-6" style="border: 1px solid #000000;border-radius: 25px"> -->
<div class="col-md-6">
 <?php   
    include "innerLexicon.php";
 ?>       
        
</div>
<div class="col-md-6">
 <?php   
    include "innerLiterature.php";
 ?>       
        
</div>    
 </div>

 <!--   <div id="spinner"></div> -->

</div>



