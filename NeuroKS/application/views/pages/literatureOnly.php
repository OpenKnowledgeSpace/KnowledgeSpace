<!-----------------------------------Literature only -------------------------->
 <!--   <script src="/<?php  //echo $config_array->local_context_name; ?>/application/views/js/highcharts.js"></script>
    <script src="/<?php //echo $config_array->local_context_name; ?>/application/views/js/exporting.js"></script>  
 -->
  <script type="text/javascript">
      alert('highchart-----');
//$(function () {
    $('#container').highcharts({
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

                                 var url = "/<?php echo $config_array->local_context_name; ?>/index.php/publications/view/<?php echo $title;  ?>/"+this.x+"/1";
        
        
                                 window.open(url);
                            }
                        }
                    }
                }

        },
        
   
   
        

        series: [{
            name: "Publications",
             data: [
                 
            <?php
   
        $litIndex=0;
        foreach ($litMap as $key => $val) 
        {
            if($key != date("Y"))
            {
                echo "[".$key.",". $val."]";

                if($litIndex !=  $count-1)
                {
                    echo ", ";
                }
                echo "\n";

                $litIndex=$litIndex+1;
            }
        }
    ?>     
            ]
        }]
    });
//}); 

</script>



  <script type="text/javascript">
//$(function () {
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

                                 var url = "/<?php echo $config_array->local_context_name; ?>/index.php/publications/view/<?php echo $title;  ?>/"+this.x+"/1";
               
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
            if($key != date("Y"))
            {
                echo "[".$key.",". $val."]";

                if($litIndex !=  $count-1)
                {
                    echo ", ";
                }
                echo "\n";

                $litIndex=$litIndex+1;
            }
        }
    ?>     
            ]
        }]
    });
//});
