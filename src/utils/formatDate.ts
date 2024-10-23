import { addMinutes, format, formatISO, fromUnixTime, getTime, getUnixTime, isValid, toDate } from 'date-fns';

export const DateFormatParams = {
  date: new Date(),
  dateFormat: 'dd/MM/yyyy',
  unixDateFormat: 'yyyy/MM/dd',
  dayOfWeekFormat: 'eeee', //in  moment it is "dddd"
  timeFormat: 'h:mm a', //in  moment it is "LT"
};

//eee dd MMM in moment its ddd DD MMM
// dd MMM yyyy in moment its DD MMM YYYY

class DateFns {
  private returnDate: any = null;

  constructor(date = new Date()) {
    this.returnDate = date;
  }

  public formatDate(date?: any, dateFormat?: string) {
    if (!date || date === undefined) {
      date = new Date();
    }
    if (!dateFormat || dateFormat === undefined) {
      dateFormat = DateFormatParams.dateFormat;
    }
    this.returnDate = format(date, dateFormat);
    return this;
  }

  public formatToString() {
    this.returnDate = this.returnDate?.toString();
    return this.returnDate;
  }

  public formatToDate() {
    this.returnDate = toDate(new Date(this.returnDate));
    return this.returnDate;
  }

  public formatToISOString(date?: any) {
    if (!date || date === undefined) {
      date = new Date();
    }
    return formatISO(date);
  }

  public formatToUnix(dateformat?: string) {
    if (!dateformat) {
      dateformat = DateFormatParams.unixDateFormat;
    }
    this.returnDate = this.returnDate?.toString().split('/').reverse().join('/');
    this.returnDate = format(new Date(this.returnDate), dateformat);
    return getUnixTime(new Date(this.returnDate));
  }

  public formatFromUnix(time: number, formatType?: string) {
    this.returnDate = fromUnixTime(time);
    if (formatType) {
      this.returnDate = format(this.returnDate, formatType);
    }
    return this.returnDate;
  }

  public formatToDay() {
    return this.returnDate; // day of week
  }

  public formatToTime() {
    return this.returnDate; // current time
  }
}

const getFormatTime = (type: string, value: number, returnFormat?: string) => {
  const date = new Date();
  let returnTime = null; // time in milliseconds
  let addTime = null;
  returnTime = getTime(date);
  if (type && type !== undefined) {
    switch (type) {
      case 'minutes':
        addTime = addMinutes(date, value); //moment().add(5, 'minutes').valueOf()
        returnTime = getTime(addTime);
        break;
    }
  }
  if (returnFormat && returnFormat !== undefined) {
    switch (returnFormat) {
      case 'toUnix':
        returnTime = getUnixTime(new Date(returnTime));
        break;
    }
  }
  return returnTime;
};

// is date valid or not returns boolean moment(flightServiceTime).isValid() // moment(flightArrivalTime).isValid()

const isDateValid = (date?: string | Date) => {
  return isValid(date);
};

const dateFns = new DateFns();

export { dateFns, getFormatTime, isDateValid };
