
	<table class="table ">
            <tbody>
<?php

    //var_dump($category_organism);
    $terms = $category_anatomical->terms;
    //var_dump($terms);
    $count = count($terms);
    echo "<h2>".$count." terms:</h2>";
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
        echo "<td><a href=\"/".$config_array->pagePrefix."/".$term->{$key}."\" target=\"_blank\">".$key."</a>";
    ?>
</td>
                
                
                
<?php
        if($i < $count)
        {    
          $term = $terms[$i];
          $key = key($term);   
          $i++;
          echo "<td><a href=\"/".$config_array->pagePrefix."/".$term->{$key}."\" target=\"_blank\">".$key."</a></td>";
        }

    }
?>


</tr>
        </tbody>
    </table>


