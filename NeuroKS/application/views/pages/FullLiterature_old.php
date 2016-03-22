
  
 <!--    <script src="http://code.highcharts.com/highcharts.js"></script>
    <script src="http://code.highcharts.com/modules/exporting.js"></script>
-->

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


 <br/><br/><br/>
 
        
    <div id="container2" style="min-width: 80%; height: 400px; margin: 0 auto"></div> 




