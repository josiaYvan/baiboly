/* eslint-disable react/no-danger */
/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */
import { notification } from 'antd';

const notificationWithIcon = (type, title, msg, duration = 5) => {
  notification[type]({
    message: title,
    description: <span dangerouslySetInnerHTML={{ __html: msg.replace(/\n/g, '<br/>') }} />,
    duration
  });
};

export default notificationWithIcon;
