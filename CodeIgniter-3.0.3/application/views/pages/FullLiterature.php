<?php  require_once 'ViewConfig.php'; ?>

  <script type="text/javascript">
$(function () {
    $('#container2').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Year by Number of Publications'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {
                text: 'Year'
            },
            min: 1976
           
        },
        yAxis: {
            title: {
                text: 'Number of publications'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: 'Year {point.x:.0f}: {point.y:.0f} publications'
        },

       /****
        * 
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        }, */
            
        plotOptions: {
            series: {
                   marker: {
                        enabled: true,
                        symbol: 'circle',
                        radius: 1,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                },    
                cursor: 'pointer',
                point: {
                    events: {
                        click: function(e) {
                                //alert(this.x);
                                //var url = this.options.url;
                                 //window.open(url);
                                 //var url = "https://neuinfo.org/mynif/search.php?q=neocortex%20pyramidal%20neuron&t=literature&r=20&yf="+e.currentTarget.x;
                                 //var url = "/SciCrunchKS/index.php/publications/view/<?php //echo $title;  ?>/"+e.currentTarget.x+"/1";
                                 var url = "/SciCrunchKS/index.php/publications/view/<?php echo $title;  ?>/"+this.x+"/1";
        
        
                                 window.open(url);
                            }
                        }
                    }
                }

        },
        
   
   
        

        series: [{
            name: "Publications",
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
             data: [
                 
            <?php
   

        //echo "-------count:".$count;
        $litIndex=0;
        foreach ($litMap as $key => $val) 
        {
            echo "[".$key.",". $val."]";
            
            if($litIndex !=  $count-1)
            {
                echo ", ";
            }
            echo "\n";
            
            $litIndex=$litIndex+1;
        }
    ?>     
            ]
        }]
    });
});

</script>



 
<!--        
    <div id="container2" style="min-width: 80%; height: 400px; margin: 0 auto"></div> 
-->
<div class="tab-v1">
    <ul class="nav nav-tabs">
	<li class="active"><a href="#full-most-recent" data-toggle="tab">Most recent</a></li>
	<li><a href="#full-year-graph" data-toggle="tab">Year graph</a></li>
							
    </ul>
    <div class="tab-content">
	<div class="tab-pane fade in active" id="full-most-recent">
            
        <?php
        if($latestResult->response->numFound == 0 )
        {
            echo "<div class=\"row\">";
            echo "No publications found!";
            echo "</div><br/>";
        }
        
        
        foreach($latestResult->response->docs as $row )
        {
            echo "<div class=\"row\">";
            echo "  <div class=\"col-md-12\">";
            
            echo "<u><a  style=\"font-size:16\"  target=\"_blank\" href=\"http://www.ncbi.nlm.nih.gov/pubmed?term=". 
                    $row->pmid."\">".$row->title."</a></u><br/>";
            
            echo "<span style=\"color:green\">";   
            if(count($row->author) > 0)
                echo $row->author[0]." - ";
            echo $row->journal."<br/>";
            echo "</span>";
            
            echo "<span style=\"color:green\">";   
            echo $row->month."-".$row->day."-".$row->year."<br/>";
            echo "</span>";
            //echo $row->abstract."<br/>";
            echo "<span style=\"color:brown\">";   
            echo "PMID:".$row->pmid;
            echo "</span>";
            echo "  </div>";
            echo "</div><br/>";

        }
        if($latestResult->response->numFound > 0 )
        {
            echo "<div class=\"row\">";
            echo "<center><a  style=\"font-size:16\"  target=\"_blank\" href=\"/".ViewConfig::$localContextName."/index.php/LatestPublications/view/".$title."/1\">See more</a></center>";
            echo "</div><br/>";
        }
?>  
        </div>
        
<?php
    if($latestResult->response->numFound > 0 )
    {
?>
        
	<div class="tab-pane fade in" id="full-year-graph">
            <div class="row">
                <div     class="col-md-12" >
           <!-- <div id="container2" style="min-width: 75%; height: 400px; margin: 0 auto"></div> -->
            <div id="container2" style="min-width: auto; height: 380px; margin: 0 auto"></div> 
                </div>
            </div>
            <br/>
	</div>
<?php } ?>
							
    </div>
    </div>
    <!-- End Tab v1 -->
   



