function get_CSV_data(){
  const pdata = myChart.data.datasets[0].data
  const macd = macd_chart.data.datasets[0].data
  const macd_signal = macd_chart.data.datasets[1].data
  const macd_hist = macd_chart.data.datasets[2].data
  const rsi_data = rsi_chart.data.datasets[0].data

  var newdata = []

  for (i=0; i<pdata.length-10;i++){
      newdata.push([pdata[i+10],pdata[i],macd[i],macd_signal[i],macd_hist[i],rsi_data[i]])
  }

  var csvContent = '';
  newdata.forEach(function(infoArray, index) {
      dataString = infoArray.join(',');
      csvContent += index < newdata.length ? dataString + '\n' : dataString;
  });

  return csvContent; 
}


var download = function(content, fileName, mimeType) {
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';
  
    if (navigator.msSaveBlob) { // IE10
      navigator.msSaveBlob(new Blob([content], {
        type: mimeType
      }), fileName);
    } else if (URL && 'download' in a) { //html5 A[download]
      a.href = URL.createObjectURL(new Blob([content], {
        type: mimeType
      }));
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
    }
  }