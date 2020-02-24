var label = 'Stock Price'
var label2 = "RSI DATA"
var label3 = "MACD Data"
var label4 = "MACD Histogram"
var xvalues = []
var yvalues = []

// A plugin to draw the background color
Chart.plugins.register({
    beforeDraw: function(chartInstance) {
      var ctx = chartInstance.chart.ctx;
      ctx.fillStyle = '#1d1e22';
      ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
    }
  })
  
var ctx = document.getElementById('chart').getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xvalues,
        datasets: [{
            label: label,
            data: yvalues,
            fill: false,
            backgroundColor: 
                'rgba(255, 99, 132, 0.8)',
            borderColor: 
                'rgba(255, 99, 132, 1)',
            pointRadius: 1,
            borderWidth: 1
        }
]
    },
    options: {
        legend: {
            position: 'top',
            labels: {
              fontColor: 'white'
            }
          },
          title: {
            display: true,
            text: 'Stock Prices',
            fontColor: 'white'
          },
        maintainAspectRatio: false,
        hover: {
            mode: 'nearest',
            intersect: true
        },  
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    fontColor: 'white', 
                },
                pointLabels: {
                    fontColor: 'white' // labels around the edge like 'Running'
                  },
                  gridLines: {
                    color: 'rgba(255, 255, 255, 0.2)'
                  },
                  angleLines: {
                    color: 'white' // lines radiating from the center
                  }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: false,
                    fontColor: 'white', 
                },
                pointLabels: {
                    fontColor: 'white' // labels around the edge like 'Running'
                  },
                  gridLines: {
                    color: 'rgba(255, 255, 255, 0.2)'
                  },
                  angleLines: {
                    color: 'white' // lines radiating from the center
                  }
            }],
        },
        
    }
});

var ctx2 = document.getElementById('rsi_chart').getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
var rsi_chart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: xvalues,
        datasets: [{
            label: label2,
            data: yvalues,
            fill: false,
            backgroundColor: 
                'rgba(255, 99, 132, 0.8)',
            borderColor: 
                'rgba(255, 99, 132, 1)',
            pointRadius: 1,
            borderWidth: 1  
        }
]
    },
    options: {
        legend: {
            position: 'top',
            labels: {
              fontColor: 'white'
            }
          },
          title: {
            display: true,
            text: 'RSI Study',
            fontColor: 'white'
          },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    fontColor: 'white', 
                },
                pointLabels: {
                    fontColor: 'white' // labels around the edge like 'Running'
                  },
                  gridLines: {
                    color: 'rgba(255, 255, 255, 0.2)'
                  },
                  angleLines: {
                    color: 'white' // lines radiating from the center
                  }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: false,
                    fontColor: 'white', 
                },
                pointLabels: {
                    fontColor: 'white' // labels around the edge like 'Running'
                  },
                  gridLines: {
                    color: 'rgba(255, 255, 255, 0.2)'
                  },
                  angleLines: {
                    color: 'white' // lines radiating from the center
                  }
            }],
        }
    }
});

var ctx3 = document.getElementById('macd_chart').getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
var macd_chart = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: xvalues,
        datasets: [{
            label: label3,
            data: yvalues,
            fill: false,
            backgroundColor: 
                'rgba(255, 99, 132, 0.8)',
            borderColor: 
                'rgba(255, 99, 132, 1)',
            pointRadius: 1,
            borderWidth: 1  
        }, {
            type: 'bar',
            label: label4,
            backgroundColor: 'rgba(255, 190, 132, 0.8)',
            data: yvalues,
            borderColor: 'white',
            borderWidth: 2
        }
]
    },
    options: {
        legend: {
            position: 'top',
            labels: {
              fontColor: 'white'
            }
          },
          title: {
            display: true,
            text: 'MACD Study',
            fontColor: 'white'
          },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    fontColor: 'white', 
                },
                pointLabels: {
                    fontColor: 'white' // labels around the edge like 'Running'
                  },
                  gridLines: {
                    color: 'rgba(255, 255, 255, 0.2)'
                  },
                  angleLines: {
                    color: 'white' // lines radiating from the center
                  }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: false,
                    fontColor: 'white', 
                },
                pointLabels: {
                    fontColor: 'white' // labels around the edge like 'Running'
                  },
                  gridLines: {
                    color: 'rgba(255, 255, 255, 0.2)'
                  },
                  angleLines: {
                    color: 'white' // lines radiating from the center
                  }
            }],
        }
    }
});

var ctx3 = document.getElementById('newdata_chart').getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
var newdata_chart = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: xvalues,
        datasets: [{
            label: label,
            data: yvalues,
            fill: false,
            backgroundColor: 
                'rgba(255, 99, 132, 0.8)',
            borderColor: 
                'rgba(255, 99, 132, 1)',
            pointRadius: 1,
            borderWidth: 1
        }
]
    },
    options: {
        legend: {
            position: 'top',
            labels: {
              fontColor: 'white'
            }
          },
          title: {
            display: true,
            text: 'Stock Prices',
            fontColor: 'white'
          },
        maintainAspectRatio: false,
        hover: {
            mode: 'nearest',
            intersect: true
        },  
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    fontColor: 'white', 
                },
                pointLabels: {
                    fontColor: 'white' // labels around the edge like 'Running'
                  },
                  gridLines: {
                    color: 'rgba(255, 255, 255, 0.2)'
                  },
                  angleLines: {
                    color: 'white' // lines radiating from the center
                  }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: false,
                    fontColor: 'white', 
                },
                pointLabels: {
                    fontColor: 'white' // labels around the edge like 'Running'
                  },
                  gridLines: {
                    color: 'rgba(255, 255, 255, 0.2)'
                  },
                  angleLines: {
                    color: 'white' // lines radiating from the center
                  }
            }],
        },
        
    }
});


function chart_removeData(chart) {

    myChart.data.datasets.splice(0, 4);
    chart.update();
}
function chart_updateData(chart,chart_title,x_values,y_values) {
    var new_Dataset = {
        label: chart_title,
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 4,
        data: y_values,
        fill: false
    };
 
    chart.data.labels=x_values;
    chart.data.datasets.splice(0, 4);
    chart.data.datasets.push(new_Dataset)
    chart.update();
}
function chart_add_bbandData(chart, middle_set, upper_set, lower_set){
    // chart.data.datasets[0].label = 'Bollinger Bands'
    chart.data.datasets.push(middle_set);
    chart.data.datasets.push(upper_set);
    chart.data.datasets.push(lower_set);
    chart.update();
}
function chart_add_Data(chart, data_set){
    chart.data.datasets.push(data_set);
    chart.update();
}
function chart_add_macd(chart, x_values, macd, macd_hist, macd_signal){
    var macd_Dataset = {
        label: 'MACD',
        data: macd,
        fill: false,
        backgroundColor: 
            'rgba(255, 99, 132, 0.8)',
        borderColor: 
            'rgba(255, 99, 132, 1)',
        pointRadius: 1,
        borderWidth: 1  
    }
    var macd_signal_Dataset = {
        label: 'MACD Signal',
        data: macd_signal,
        fill: false,
        backgroundColor: 
            'rgba(255, 99, 132, 0.8)',
        borderColor: 
            'rgba(255, 99, 132, 1)',
        pointRadius: 1,
        borderWidth: 1  
    }
    var macd_histDataset = {
        type: 'bar',
        label: 'MACD HIST',
        backgroundColor: 'rgba(255, 190, 132, 0.8)',
        data: macd_hist,
        borderColor: 'white',
        borderWidth: 2
    }
    chart.data.datasets.splice(0, 4);
    chart.data.labels=x_values;
    chart.data.datasets.push(macd_Dataset);
    chart.data.datasets.push(macd_signal_Dataset);
    chart.data.datasets.push(macd_histDataset);
    chart.update();

}
function clear_canvas() {
    var canvas = document.getElementById('chart')
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log('Clear')
}
$(document).ready(function(){

    $('#clear').click(function(){
        chart_removeData(myChart)
    })
    $('#stock_submit').click(function(){
        var stock_symbol = $('input#stock_symbol').val();
        $('#stock_submit').attr("disabled", "disabled");
        $('#stock_submit').html('Getting Data...');
        $.ajax({
            method: 'GET',
            url: '',
            data: {stock: stock_symbol},
            success:function(data) {
                $('#stock_submit').removeAttr("disabled");
                $('#stock_submit').html('Get Price Data');
                console.log(data)
                var title = data[0]
                var xs = data[1]
                var ys = data[2]
                chart_updateData(myChart,title,xs,ys);
            },
            error: function(data){
                console.log(data['responseText'])
                $('#stock_submit').removeAttr("disabled");
                $('#stock_submit').html('Get Price Data');
                alert(data['responseText'])
            },
        })

    })
    $('#bollinger_data').click(function(){
        var stock_symbol = $('input#stock_symbol').val();
        $('#bollinger_data').attr("disabled", "disabled");
        $('#bollinger_data').html('Getting Data...');
        $.ajax({
            method: 'GET',
            url: '',
            data: {bollinger_data: stock_symbol},
            success: function(data) {
                $('#bollinger_data').removeAttr("disabled");
                $('#bollinger_data').html('Get Bollinger Data');
                var middlebbands_Dataset = {
                    label: 'Middle BBands',
                    backgroundColor: 'rgba(17, 214, 214, 0.8)',
                    borderColor: 'rgba(17, 214, 214, 1)',
                    pointRadius: 2,
                    data: data[0],
                    fill: false
                };
                var upperbbands_Dataset = {
                    label: 'Upper BBands',
                    backgroundColor: 'rgba(214, 17, 70, 0.8)',
                    borderColor: 'rgba(214, 17, 70, 1)',
                    pointRadius: 2,
                    data: data[1],
                    fill: false
                };
                var lowerbbands_Dataset = {
                    label: 'Lower BBands',
                    backgroundColor: 'rgba(214, 17, 194, 0.8)',
                    borderColor: 'rgba(214, 17, 194, 1)',
                    pointRadius: 2,
                    data: data[2],
                    fill: false
                };
                console.log(data)
                chart_add_bbandData(myChart,middlebbands_Dataset,upperbbands_Dataset,lowerbbands_Dataset);
            },
            error: function(data){
                console.log(data['responseText'])
                alert(data['responseText'])
                $('#bollinger_data').removeAttr("disabled");
                $('#bollinger_data').html('Get Bollinger Data');
            },
        })
    })
    $('#get_rsi_data').click(function (){
        var stock_symbol = $('input#stock_symbol').val();
        $('#get_rsi_data').attr("disabled", "disabled");
        $('#get_rsi_data').html('Getting Data...');
        console.log(stock_symbol)
        $.ajax({
            method: 'GET',
            url: '',
            data: {get_rsi_data: stock_symbol},
            success: function(data) {
                console.log(data)
                $('#get_rsi_data').removeAttr("disabled");
                $('#get_rsi_data').html('Get RSI Data');
                var title = 'RSI DATA'
                var xs = data[1]
                var ys = data[2]
                chart_updateData(rsi_chart,title,xs,ys);
            },
            error: function(data){
                console.log(data['responseText'])
                alert(data['responseText'])
                $('#get_rsi_data').removeAttr("disabled");
                $('#get_rsi_data').html('Get RSI Data');
            },
        })
    });
    $('#get_macd_data').click(function (){
        var stock_symbol = $('input#stock_symbol').val();
        $('#get_macd_data').attr("disabled", "disabled");
        $('#get_macd_data').html('Getting Data...');
        console.log(stock_symbol)
        $.ajax({
            method: 'GET',
            url: '',
            data: {get_macd_data: stock_symbol},
            success: function(data) {
                console.log(data)
                $('#get_macd_data').removeAttr("disabled");
                $('#get_macd_data').html('Get MACD Data');
                var fechas = data[0]
                var macd = data[1]
                var macd_hist = data[2]
                var macd_signal = data[3]
                chart_add_macd(macd_chart, fechas, macd, macd_hist, macd_signal)
            },
            error: function(data){
                console.log(data['responseText'])
                alert(data['responseText'])
                $('#get_macd_data').removeAttr("disabled");
                $('#get_macd_data').html('Get MACD Data');
            },
        })
    });
    $('#train-test').click(function (){
        var stock_symbol = $('input#stock_symbol').val();
        console.log(stock_symbol)
        $('#train-test').attr("disabled", "disabled");
        $('#train-test').html('Training Model...');
        $.ajax({
            method: 'GET',
            url: '/trainmodel/',
            data: {},
            success: function(data){
            console.log('Train Completed')
            $('#train-test').html('Train Completed!');
                    setTimeout(function(){ 
                        $("#train-test").html('Train Test');
                        $('#train-test').removeAttr("disabled"); }, 1500);
            },
            error: function(data){
                console.log('errorxd')
                $('#train-test').html('No data to train');
                setTimeout(function(){ 
                    $("#train-test").html('Train Test');
                    $('#train-test').removeAttr("disabled"); }, 1000);
                
            },
        })
    });
    $('#make-predict').click(function (){
        $('#make-predict').attr("disabled", "disabled");
        $('#make-predict').html('Predicting...');
        $.ajax({
            method: 'GET',
            url: '/modeltrained/',
            data: {},
            success: function(data){
            console.log('Predict Completed')
            console.log(data)
            var xs = data[1]
            var ys = data[2]
            chart_updateData(newdata_chart,'Actual Prices',xs,ys);
            var predictions_Dataset = {
				label: 'Predictions',
				backgroundColor: 'rgba(0, 214, 214, 0.8)',
                borderColor: 'rgba(0, 214, 214, 1)',
                pointRadius: 2,
				data: data[3],
				fill: false
            };
            chart_add_Data(newdata_chart,predictions_Dataset)
            $('#make-predict').html('Completed!');
                    setTimeout(function(){ 
                        $("#make-predict").html('Predict Prices');
                        $('#make-predict').removeAttr("disabled"); }, 1500);
            },
            error: function(data){
                console.log('errorxd')
                
            },
        })
    })

});