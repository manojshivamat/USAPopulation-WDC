(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [
        //{
            //id: "ID Nation",
            //alias: "ID",
            //dataType: tableau.dataTypeEnum.string
        //}, 
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
                    //"ID Nation": feat[i].ID_Nation,
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

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "USA Population Data"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
