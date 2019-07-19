const moment = require('moment-timezone');
const uuidv4 = require('uuid/v4');

const project_settings = {
    calscale: "GREGORIAN",
    prodid:"InfiniteIndustries/ics",
    timezone: "America/New_York"   // need to figure out a more graceful way to deal with timezones
}

function CreateICSFile(summary, dtstart, dtend, description, location){

    moment.tz.setDefault(project_settings.timezone);

    let single_day_event = 
`BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:${project_settings.calscale}
PRODID:${project_settings.prodid}
METHOD:PUBLISH
X-PUBLISHED-TTL:PT1H
BEGIN:VEVENT
UID:${uuidv4()}
SUMMARY:${summary}
DTSTAMP:${moment().utc().format('YYYYMMDDTHHmmss')}Z
DTSTART:${moment(dtstart).format('YYYYMMDDTHHmmss')}
DTEND:${moment(dtend).format('YYYYMMDDTHHmmss')}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;

    return single_day_event;
}

module.exports.CreateICSFile = CreateICSFile;