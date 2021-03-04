console.log("This is working");

(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        const cols = [
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
        },
        ];

        let tableSchema = {
            id: "USAPopData",
            alias: "USA Population",
            columns: cols,
        };

        schemaCallback([tableSchema]);


    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);
})();