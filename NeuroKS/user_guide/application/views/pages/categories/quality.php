
	<table class="table ">
            <tbody>
<?php

    //var_dump($category_organism);
    $terms = $category_quality->terms;
    //var_dump($terms);
    $count = count($terms);
    $i=0;
    //foreach($terms as $term)
    while($i < $count)
    {
        $term = $terms[$i];
        $key = key($term);
        $value = $term->{$key};
        
        $i++;
?>
<tr>
<td>
    <?php
        echo "<td><a href=\"/NeuroKS/index.php/pages/view/".$term->{$key}."\" target=\"_blank\">".$key."</a>";
    ?>
</td>
                
                
                
<?php
        if($i < $count)
        {    
          $term = $terms[$i];
          $key = key($term);   
          $i++;
          echo "<td><a href=\"/NeuroKS/index.php/pages/view/".$term->{$key}."\" target=\"_blank\">".$key."</a></td>";
        }

    }
?>


</tr>
        </tbody>
    </table>


