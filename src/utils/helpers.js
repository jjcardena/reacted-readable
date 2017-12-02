import moment from 'moment';
export const EDIT_OPERATION = 'EDIT';

export function timestampToDate(timestamp) {
  var t = moment(new Date( timestamp ));
  return t.format("DD.MM.YYYY HH:mm:ss");
}

export function getTimestamp() {
  return  moment().valueOf();
}

export function getUniqueId() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c==='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}
