// Pie Chart
var canvasP = document.getElementById("pieChart");
var ctxP = canvasP.getContext('2d');
var myPieChart = new Chart(ctxP, {
   type: 'pie',
   data: {
      labels: ["Värde 1", "Värde 2", "Värde 3", "Värde 4", "Värde 5", "Värde 6", "Värde 7"],
      datasets: [{
         data: [1, 5, 10, 20, 50, 70, 50],
         backgroundColor: ["#64B5F6", "#FFD54F", "#2196F3", "#FFC107", "#1976D2", "#FFA000", "#0D47A1"],
         hoverBackgroundColor: ["#B2EBF2", "#FFCCBC", "#4DD0E1", "#FF8A65", "#00BCD4", "#FF5722", "#0097A7"]
      }]
   },
   options: {
      legend: {
         display: true,
         position: "right"
      }
   }
});

canvasP.onclick = function(e) {
   var slice = myPieChart.getElementAtEvent(e);
   if (!slice.length) return; // return if not clicked on slice
   var label = slice[0]._model.label;
   switch (label) {
      // add case for each label/slice
      case 'Värde 5':
         alert('clicked on slice 5');
         window.open('www.example.com/foo');
         break;
      case 'Värde 6':
         alert('clicked on slice 6');
         window.open('www.example.com/bar');
         break;
      // add rests ...
   }
}
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>
<canvas id="pieChart"></canvas>