(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [ 
        {
            id: "Nation",
            alias: "Nation",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Year",
            alias: "Year",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Population",
            alias: "Population",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "USAPopData",
            alias: "USA Population",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://datausa.io/api/data?drilldowns=Nation&measures=Population", function (resp) {
            var feat = resp.data,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "Nation": feat[i].Nation,
                    "Year": feat[i].Year,
                    "Population": feat[i].Population
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();
