module.exports = {
  get: (data, permission) => {
    const permissionData = data.find(({ value }) => value === permission);
    if (permissionData) {
      return permissionData.value;
    }
  },

  isRole: (roleData, roleId) => {
    return roleData.find((role) => {
      return +role.id === +roleId;
    });
  },
  isPermission: (permissions, permission) => {
    if (permissions.includes(permission)) {
      return true;
    }
    return false;
  },
};
