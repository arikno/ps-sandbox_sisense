


/*
Welcome to your Widget's Script.

To learn how you can access the Widget and Dashboard objects, see the online documentation at https://sisense.dev/guides/js/extensions
*/

widget.on('processresult', function(se, ev){    
    ev.result.chart.marginTop = 60;
});

var normalState = {
    fill: '#f44336',
    stroke: '#f44336',
    r: 3,
    style: {
        color: '#ffffff',
        borderWidth: 0
    }
};

var hoverState = {
    fill: '#f05146',
    stroke: '#f05146',
    r: 3,
    style: {
        color: '#ffffff',
        borderWidth: 0
    }
};

var pressedState = {
    fill: '#284dc7',
    stroke: '#284dc7',
    r: 3,
    style: {
        color: '#ffffff',
        borderWidth: 0
    }
};

var disabledState = {
    fill: '#284dc7',
    stroke: '#284dc7',
    r: 5,
    style: {
        color: '#ffffff',
        borderWidth: 0
    }
};

widget.on("domready", function(w) {
    var chart = w.chart[0][Object.keys(w.chart[0])[0]].hc;

    chart.renderer.button('Export csv', 10, 10,
        null,
        normalState,
        hoverState,
        pressedState,
        disabledState)
    .attr({
        zIndex: 10,
        height: 12,
        width: 100,
        'text-align': 'center'
    })
    .on('click', function() {
        // Get raw data from the server
        var rawData = getRawData();

        // Create a CSV file and trigger download
        var blob = new Blob([rawData], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
		debugger
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .add();
});



function runHTTP(jaql) {
    const $internalHttp = prism.$injector.has("base.factories.internalHttp") ?
        prism.$injector.get("base.factories.internalHttp") : null;
    const ajaxConfig = {
        url: "/api/datasources/" + encodeURIComponent(jaql.datasource.title) + "/jaql",
        method: "POST",
        data: JSON.stringify(jaql),
        contentType: "application/json",
        dataType: "json",
        async: false
    };
    const httpPromise = $internalHttp ? $internalHttp(ajaxConfig, true) : $.ajax(ajaxConfig);
    return httpPromise.responseJSON;
}



function getRawData() {
  const query = {
  "datasource": {
    "address": "LocalHost",
    "title": "AzureSQL EC",
    "id": "aLOCALHOST_aAZURESQLIAAaEC",
    "database": "aAzureSQLIAAaEC",
    "fullname": "LocalHost/AzureSQL EC"
  },
  "metadata": [
    {
      "jaql": {
        "table": "Dates",
        "column": "Date",
        "dim": "[Dates.Date (Calendar)]",
        "datatype": "datetime",
        "merged": true,
        "level": "quarters",
        "title": "Quarters in Date"
      },
      "instanceid": "0E89D-E7FE-3B",
      "panel": "rows",
      "field": {
        "id": "[Dates.Date (Calendar)]_quarters",
        "index": 0
      },
      "format": {
        "mask": {
          "years": "yyyy",
          "quarters": "yyyy Q",
          "months": "MM/yyyy",
          "weeks": "ww yyyy",
          "days": "shortDate",
          "minutes": "HH:mm",
          "seconds": "MM/dd/yyyy HH:mm:ss",
          "dateAndTime": "MM/dd/yyyy HH:mm",
          "isdefault": true
        }
      },
      "hierarchies": [
        "calendar",
        "calendar - weeks"
      ],
      "handlers": [
        {}
      ]
    },
    {
      "jaql": {
        "table": "Bookings",
        "column": "bookingCreatedByUserId",
        "dim": "[Bookings.bookingCreatedByUserId]",
        "datatype": "numeric",
        "merged": true,
        "title": "bookingCreatedByUserId"
      },
      "instanceid": "7D3B6-2AFA-21",
      "format": {
        "mask": {
          "abbreviations": {
            "t": false,
            "b": false,
            "m": false,
            "k": false
          },
          "decimals": "auto",
          "currency": {
            "symbol": "€"
          },
          "abbreviateAll": false
        }
      },
      "handlers": [
        {}
      ]
    },
    {
      "jaql": {
        "table": "Area",
        "column": "Area",
        "dim": "[Area.Area]",
        "datatype": "text",
        "merged": true,
        "title": "Area"
      },
      "instanceid": "78BCA-9F57-28",
      "handlers": []
    },
    {
      "jaql": {
        "table": "Bookings",
        "column": "bookingId",
        "dim": "[Bookings.bookingId]",
        "datatype": "text",
        "merged": true,
        "title": "bookingId"
      },
      "instanceid": "B5088-428F-E3",
      "handlers": []
    },
    {
      "jaql": {
        "table": "Site Group",
        "column": "Site Group",
        "dim": "[Site Group.Site Group]",
        "datatype": "text",
        "merged": true,
        "title": "Site Group"
      },
      "instanceid": "E4BD5-905C-FD",
      "handlers": []
    },
    {
      "jaql": {
        "table": "Bookings",
        "column": "bookingCreatedDATE",
        "dim": "[Bookings.bookingCreatedDATE (Calendar)]",
        "datatype": "datetime",
        "merged": true,
        "level": "years",
        "title": "Years in bookingCreatedDATE"
      },
      "instanceid": "74645-B708-51",
      "format": {
        "mask": {
          "years": "yyyy",
          "quarters": "yyyy Q",
          "months": "MM/yyyy",
          "weeks": "ww yyyy",
          "days": "shortDate",
          "minutes": "HH:mm",
          "seconds": "MM/dd/yyyy HH:mm:ss",
          "dateAndTime": "MM/dd/yyyy HH:mm",
          "isdefault": true
        }
      },
      "hierarchies": [
        "calendar",
        "calendar - weeks"
      ],
      "handlers": [
        {}
      ]
    },
    {
      "jaql": {
        "table": "User",
        "column": "Username",
        "dim": "[User.Username]",
        "datatype": "text",
        "merged": true,
        "title": "Username"
      },
      "instanceid": "7E954-EACC-14",
      "handlers": []
    },
    {
      "jaql": {
        "table": "User",
        "column": "User Id",
        "dim": "[User.User Id]",
        "datatype": "numeric",
        "merged": true,
        "title": "User Id"
      },
      "instanceid": "1DF38-04CE-98",
      "handlers": []
    },
    {
      "jaql": {
        "table": "Site Group",
        "column": "Site Group",
        "dim": "[Site Group.Site Group]",
        "datatype": "text",
        "merged": true,
        "collapsed": true,
        "title": "Site Group",
        "datasource": {
          "fullname": "localhost/AzureSQL EC",
          "id": "localhost_aAzureSQLIAAaEC",
          "address": "LocalHost",
          "database": "aAzureSQLIAAaEC",
          "live": false,
          "title": "AzureSQL EC"
        },
        "isDashboardFilter": true,
        "panel": "scope",
        "firstday": "mon",
        "locale": "en-us",
        "filter": {
          "explicit": false,
          "multiSelection": true,
          "all": true
        },
        "$$hashKey": "object:1090"
      },
      "disabled": false,
      "isCascading": true,
      "instanceid": "D27CB-BD4C-AA",
      "panel": "scope"
    },
    {
      "jaql": {
        "table": "Site",
        "column": "Site",
        "dim": "[Site.Site]",
        "datatype": "text",
        "merged": true,
        "collapsed": true,
        "title": "Site",
        "isDashboardFilter": true,
        "panel": "scope",
        "datasource": {
          "fullname": "localhost/AzureSQL EC",
          "id": "localhost_aAzureSQLIAAaEC",
          "address": "LocalHost",
          "database": "aAzureSQLIAAaEC",
          "live": false,
          "title": "AzureSQL EC"
        },
        "filter": {
          "explicit": false,
          "multiSelection": true,
          "all": true
        },
        "$$hashKey": "object:1091"
      },
      "disabled": false,
      "isCascading": true,
      "instanceid": "8983D-5D23-23",
      "rootInstanceId": "D27CB-BD4C-AA",
      "panel": "scope"
    },
    {
      "jaql": {
        "table": "Area",
        "column": "Area",
        "dim": "[Area.Area]",
        "datatype": "text",
        "merged": true,
        "title": "Area",
        "collapsed": true,
        "isDashboardFilter": true,
        "panel": "scope",
        "index": 2,
        "_id": "638e812efd753f003734c436",
        "datasource": {
          "fullname": "localhost/AzureSQL EC",
          "id": "localhost_aAzureSQLIAAaEC",
          "address": "LocalHost",
          "database": "aAzureSQLIAAaEC",
          "live": false,
          "title": "AzureSQL EC"
        },
        "filter": {
          "explicit": false,
          "multiSelection": true,
          "all": true
        },
        "$$hashKey": "object:1092"
      },
      "disabled": false,
      "isCascading": true,
      "instanceid": "1DD8B-123E-DF",
      "rootInstanceId": "D27CB-BD4C-AA",
      "panel": "scope"
    },
    {
      "jaql": {
        "table": "Resource",
        "column": "Resource",
        "dim": "[Resource.Resource]",
        "datatype": "text",
        "merged": true,
        "title": "Resource",
        "collapsed": true,
        "isDashboardFilter": true,
        "datasource": {
          "fullname": "localhost/AzureSQL EC",
          "id": "localhost_aAzureSQLIAAaEC",
          "address": "LocalHost",
          "database": "aAzureSQLIAAaEC",
          "live": false,
          "title": "AzureSQL EC"
        },
        "filter": {
          "explicit": false,
          "multiSelection": true,
          "all": true
        },
        "$$hashKey": "object:1093"
      },
      "disabled": false,
      "isCascading": true,
      "instanceid": "E8102-C919-9B",
      "rootInstanceId": "D27CB-BD4C-AA",
      "panel": "scope"
    },
    {
      "jaql": {
        "datatype": "text",
        "dim": "[User.Username]",
        "title": "Username",
        "column": "Username",
        "table": "User",
        "datasource": {
          "fullname": "localhost/AzureSQL EC",
          "id": "localhost_aAzureSQLIAAaEC",
          "address": "LocalHost",
          "database": "aAzureSQLIAAaEC",
          "live": false,
          "title": "AzureSQL EC"
        },
        "collapsed": true,
        "isDashboardFilter": true,
        "merged": true,
        "firstday": "mon",
        "locale": "en-us",
        "filter": {
          "explicit": false,
          "multiSelection": true,
          "all": true
        }
      },
      "disabled": false,
      "isCascading": false,
      "instanceid": "305A4-24F4-BA",
      "panel": "scope"
    }
  ],
  "ungroup": true,
  "offset": 0,
  "m2mThresholdFlag": 0,
  "useAcceleration": false,
  "isMaskedResult": true,
  "format": "json",
  "widgetType": "tablewidget",
  "by": "widget",
  "dashboard": "6628e35415248d0032eaa652;Dashboard SQL EC"
};	
	
	
	
	// Call runHTTP with the query
    const response = runHTTP(query);
	
	// Convert JSON to CSV
    const csvData = convertJsonToCsv(response);
    
    // You can return the response if needed
    return csvData;
}

function convertJsonToCsv(data) {
    if (!data || !data.headers || !data.values) {
        console.error("Invalid data format:", data);
        return ''; // Return an empty string if data is undefined or missing properties
    }

    const headers = data.headers;
    const values = data.values;
    let csv = headers.map(header => `"${header}"`).join(',') + '\n';

    values.forEach(row => {
        const rowData = row.map(item => {
            return typeof item.text === 'string' ? `"${item.text.replace(/"/g, '""')}"` : item.text;
        });
        csv += rowData.join(',') + '\n';
    });

    return csv;
}
