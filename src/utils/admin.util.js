const moment = require("moment");
module.exports = {
  getArrayTimeLearn: (schedule, startDate, endDate, timeLearn) => {
    if (typeof schedule === "string" || schedule instanceof String) {
      schedule = schedule.split("");
    }
    const selectedDays = [];
    let currentDate = moment(startDate).startOf("day");
    while (currentDate.isSameOrBefore(endDate)) {
      const dayOfWeek = currentDate.day().toString();
      if (schedule.includes(dayOfWeek)) {
        const index = schedule.indexOf(dayOfWeek);
        let timeLearnStart = timeLearn[index * 2].split(":");
        let timeLearnEnd = timeLearn[index * 2 + 1].split(":");
        const modifiedStartDate = moment(currentDate).add(
          Number(timeLearnStart[0]) * 60 + Number(timeLearnStart[1]),
          "minutes"
        );

        const modifiedEndDate = moment(currentDate).add(
          Number(timeLearnEnd[0]) * 60 + Number(timeLearnEnd[1]),
          "minutes"
        );

        selectedDays.push(
          modifiedStartDate.format("YYYY-MM-DD HH:mm:ss"),
          modifiedEndDate.format("YYYY-MM-DD HH:mm:ss")
        );
      }
      currentDate = currentDate.add(1, "days");
    }
    return selectedDays;
  },
};
