
var canvas1 = document.getElementById('lineChart').getContext('2d');
var canvas2 = document.getElementById("barChart").getContext('2d');

//Select Dataset
$.ajax({
    url: "http://localhost:49957/api/values/gettable/",
    type: "GET",
    dataType: "json",
    success: function (data) {
        $.each(data, function (key, item) {
            $("#dataset").append("<option value = " + item.spId + ">" + item.spName + "</option>")
        })

    }
})

$(Getir).click(function () {
    //Select Canvas
    if ($("#chartType").val() == "lineChart") {
        $("#lineChart").css('display', 'inline');
        $("#barChart").css('display', 'none');
    } else if ($("#chartType").val() == "barChart") {
        $("#lineChart").css('display', 'none');
        $("#barChart").css('display', 'inline');
    }

    $.ajax({
        method: "POST",
        url: "http://localhost:49957/api/values/get?spName=" + $("#dataset").val(),
        type: "GET",
        dataType: "json",
        success: function (response) {
            $.each(response, function (index, item) {
                addData(lineChart, item.dataX, item.dataY);
                addData(barChart, item.dataX, item.dataY);
            });
            
        }
    })

});

$(vtConn).click(function () {
    connectServer($("#severname").val(), $("#userid").val(), $("#userpwd").val(), $("#database").val());
});

function connectServer(serverName, userID, userPwd, dbName) {
    var data = { "serverName": serverName, "userID": userID, "userPwd": userPwd, "dbName": dbName };
    $.ajax({
        method: "POST",
        //type: "POST",
        url: "http://localhost:49957/api/values/getlogin?" + "serverName=" + serverName + "&userID=" + userID + "&userPwd=" + userPwd + "&dbName=" + dbName,
        data: data,
        dataType: "json",
        success: function (response) { bootbox.alert(response) },
        error: function (response) { console.log(response) },
        async: false
    })
}


function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

//Line Chart
var lineChart = new Chart(canvas1, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
        }]
    },
    options: {}
});

//Bar Chart
var barChart = new Chart(canvas2, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: '# of Votes',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});