/**
 * @name Busnay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan. All rights reserved.
 * @version v0.0.1
 *
 */
export const userStatusAsResponse = (status) => {
  if (status === 'register') {
    return {
      color: '#108ee9',
      level: 'REGISTER'
    };
  }
  if (status === 'login') {
    return {
      color: '#87d068',
      level: 'LOGIN'
    };
  }
  if (status === 'logout') {
    return {
      color: '#2db7f5',
      level: 'LOGOUT'
    };
  }
  if (status === 'blocked') {
    return {
      color: '#f55000',
      level: 'BLOCKED'
    };
  }
  return {
    color: 'default',
    level: 'UNKNOWN'
  };
};

export const userSubscribedAsResponse = (status) => {
  if (status === true) {
    return {
      color: '#108ee9',
      level: 'Abonné(e)'
    };
  }
  if (status === false) {
    return {
      color: '#2db7f5',
      level: 'Désabonné(e)'
    };
  }

  return {
    color: 'default',
    level: 'UNKNOWN'
  };
};

export const roleAsResponse = (role) => {
  if (role === 'USER_ROLE') {
    return {
      color: '#87d068',
      level: 'USER_ROLE'
    };
  }
  if (role === 'ADMIN_ROLE') {
    return {
      color: '#f55000',
      level: 'ADMIN_ROLE'
    };
  }
  return {
    color: 'default',
    level: 'USER_ROLE'
  };
};

export const roomTypeAsColor = (type) => {
  if (type === 'single') {
    return 'purple';
  }
  if (type === 'couple') {
    return 'magenta';
  }
  if (type === 'family') {
    return 'volcano';
  }
  if (type === 'presidential') {
    return 'geekblue';
  }
  return 'default';
};

export const radioTypeAsResponse = (status) => {
  if (status === '192') {
    return {
      color: 'blue',
      level: '192'
    };
  }
  if (status === '128') {
    return {
      color: 'volcano',
      level: '128'
    };
  }
  if (status === '48') {
    return {
      color: 'lime',
      level: '48'
    };
  }
  return {
    color: 'default',
    level: 'UNKNOWN'
  };
};

/**
 * @name getRoleResponse
 * @description Returns color and label based on user role
 * @param {string} role - User role
 * @returns {{ color: string, label: string }}
 */
export const getRoleResponse = (role, inverse = false) => {
  const colors = {
    STUDENT_ROLE: 'lime',
    SOCIETY_ROLE: 'orange',
    ADMIN_ROLE: 'volcano',
    DRIVER_ROLE: 'geekblue',
    DEFAULT: 'default'
  };

  const color = inverse ? colors[role] || colors.DEFAULT : `${colors[role] || colors.DEFAULT}-inverse`;

  return {
    color,
    label: role === 'STUDENT_ROLE' ? 'Étudiant' :
      role === 'SOCIETY_ROLE' ? 'Société' :
        role === 'ADMIN_ROLE' ? 'Admin' :
          role === 'DRIVER_ROLE' ? 'Driver' :
            'User'
  };
};

/**
* @name getSexeResponse
* @description Returns color and label based on sex
* @param {string} sexe - User sex
* @returns {{ color: string, label: string }}
*/
export const getSexeResponse = (sexe) => {
  switch (sexe) {
    case 'male':
      return { color: 'cyan-inverse', label: 'Homme' };
    case 'female':
      return { color: 'magenta-inverse', label: 'Femme' };
    default:
      return { color: 'default', label: 'Indéfini' };
  }
};

/**
 * @name busTagAsResponse
 * @description Returns color and label based on bus tag
 * @param {string} tag - Bus tag
 * @returns {{ color: string, label: string }}
 */
export const getBusTagAsResponse = (tag) => {
  switch (tag) {
    case 'on_way':
      return { color: '#108ee9', label: 'En route' }; // Bleu
    case 'pickup':
      return { color: '#87d068', label: 'Ramassage' }; // Vert
    case 'drops_off':
      return { color: '#2db7f5', label: 'Dépôt' }; // Cyan
    case 'parking':
      return { color: '#f55000', label: 'Parking' }; // Rouge
    default:
      return { color: 'default', label: 'Inconnu' }; // Couleur par défaut
  }
};
