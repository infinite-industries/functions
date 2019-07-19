const calGenerator = require('./generator');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // test url local
    // http://localhost:7071/api/CalGen?title=Test&description=testing&location=doghouse&time_start=2024-12-22%2020%3A00%3A00&time_end=2024-12-22%2022%3A00%3A00

    // test url live on Azure
    // https://cal-generator.azurewebsites.net/api/ics-gen?title=Test&description=testing&location=doghouse&time_start=2024-12-22%2020%3A00%3A00&time_end=2024-12-22%2022%3A00%3A00

    if (req.query.title && req.query.time_start && req.query.time_end && req.query.description && req.query.location) {

        let cal_content = calGenerator.CreateICSFile(req.query.title, req.query.time_start, req.query.time_end, req.query.description, req.query.location);

        context.res = {
            status: 200,
            headers: {
                'Content-type': 'text/calendar',
                'Content-disposition':'attachment; filename="testing.ics"'
            },
            body: cal_content
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass correct data as url encoded vars."
        };
    }
};
