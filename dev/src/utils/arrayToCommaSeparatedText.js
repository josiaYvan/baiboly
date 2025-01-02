/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */
import dayjs from 'dayjs';

// function arrayToCommaSeparatedText(array) {
//   return array?.length > 0 ? array
//     .map((item) => item)
//     .join(', ')
//     .toString() : 'N/A';
// }

function formatDates(startDate, endDate) {
  dayjs.locale('fr'); // Définit la localisation sur "fr" (français)

  const formattedStartDate = dayjs(startDate).format('D MMMM ');
  const formattedEndDate = dayjs(endDate).format('D MMMM YYYY');

  return `${formattedStartDate} to ${formattedEndDate}`;
}
export default formatDates;
