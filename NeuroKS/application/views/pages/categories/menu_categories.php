<?php
    $organism = "";
    $disease = "";
    $anatomical = "";
    $technique = "";
    $biological_process = "";
    $subcellular = "";
    $quality = "";
    $institution = "";
    $resource = "";
    $cell="";
    if(strcmp($category,"organism")==0)
         $organism = "active";
    else if(strcmp($category,"disease")==0)
         $disease = "active";
    else if(strcmp($category,"anatomical")==0)
         $anatomical = "active";
    else if(strcmp($category,"technique")==0)
         $technique = "active";
    else if(strcmp($category,"biological_process")==0)
         $biological_process = "active";
    else if(strcmp($category,"subcellular")==0)
         $subcellular = "active";
    else if(strcmp($category,"quality")==0)
         $quality = "active";
    else if(strcmp($category,"institution")==0)
         $institution = "active";
    else if(strcmp($category,"resource")==0)
         $resource = "active";
     else if(strcmp($category,"cell")==0)
         $cell = "active";
    
?>


      <li class="<?php echo $organism; ?>"><a href="/category/organism">Organism</a></li>
      <li class="<?php echo $disease;  ?>"><a href="/category/disease">Disease</a></li>
      <li class="<?php echo $anatomical; ?>"><a href="/category/anatomical">Anatomical</a></li>
      <li class="<?php echo $technique; ?>"><a href="/category/technique">Technique</a></li>
      <li class="<?php echo $biological_process; ?>"><a href="/category/biological_process">Biological Process</a></li>
       <li class="<?php echo $cell; ?>"><a href="/category/cell">Cell</a></li>
      <li class="<?php echo $subcellular; ?>"><a href="/category/subcellular">Subcellular</a></li>
      <li class="<?php echo $quality; ?>"><a href="/category/quality">Quality</a></li>
      <li class="<?php echo $institution; ?>"><a href="/category/institution">Institution</a></li>
      <li class="<?php echo $resource; ?>"><a href="/category/resource">Resource</a></li>
