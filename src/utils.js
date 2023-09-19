export function getRelativeDateTime(dateTimeStr) {
  const currentDate = new Date();
  const dateTime = new Date(dateTimeStr);

  const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const dateTimeWithoutTime = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

  const timeDifference = dateTimeWithoutTime - currentDateWithoutTime;
  const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  
  const hour_min = { hour: '2-digit', minute: '2-digit' };
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

  if (daysDifference === 0) {
    return `今天 ${dateTime.toLocaleTimeString('zh-CN', hour_min)}`;
  } else if (daysDifference === -1) {
    return `昨天 ${dateTime.toLocaleTimeString('zh-CN', hour_min)}`;
  } else if (daysDifference > -7) {
    return `${-daysDifference}天前 ${dateTime.toLocaleTimeString('zh-CN', hour_min)}`;
  } else {
    return dateTime.toLocaleTimeString('zh-CN', options);
  }
}
export function formatBytes(bytes) {
  if (bytes < 1024) {
    return bytes + ' Bytes';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
}