var express = require("express");
var oracledb = require("oracledb");

var app = express();

var port = process.env.PORT || 10000;

app.get('/', (req, res) =>
{
    res.send("Welcome");
});
app.get('/jtest', (req, rest) =>
{
    var myObj = { "id":"secured", "cash":"0", "valid":"null"};
    res.send(myObj);
});

app.get('/jtestStr', (req, rest) =>
{
    var myObj = { "id":"secured", "cash":"0", "valid":"null"};
    var myJSON = JSON.stingify(myObj);
    res.send(myJSON);
});

app.get('/login', async (req, res) =>
{
    let connection;

    try
    {
        connection = await oracledb.getConnection({
            user: "pjg11",
            password: "Avo1desh3ll8",
            connectString: "(DESCRIPTION = \
                                (ADDRESS = (PROTOCOL = TCP)(HOST = cedar.humboldt.edu)(PORT = 1521)) \
                                (CONNECT_DATA = \
                                    (SERVER = DEDICATED) \
                                    (SERVICE_NAME = student.humboldt.edu) \
                                ) \
                            )"
        });

        const result = await connection.execute(
            `SELECT '3' from dual`
        );

        console.log(result.rows);
        res.send(result.rows);
    }
    catch (err)
    {
        console.error(err);
    }
    finally
    {
        if (connection)
        {
            try
            {
                await connection.close();
            }
            catch (err)
            {
                console.error(err);
            }
        }
    }
});

app.listen(port, () => console.log("Listening on port " + port + "..."));
