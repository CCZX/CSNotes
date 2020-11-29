
abstract class User {
  abstract name: string;
  abstract viewPage: string[];
}

class SuperAdmin extends User {
  name: 'SuperAdmin'
  viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理']
}

class Admin extends User {
  name: 'Admin'
  viewPage: ['首页', '通讯录', '发现页', '应用数据']
}

class NormalUser extends User {
  name: 'NormalUser'
  viewPage: ['首页', '通讯录', '发现页']
}

interface UserFactory {
  createUser(): User
}

class SuperAdminFactory implements UserFactory {
  createUser() {
    return new SuperAdmin()
  }
}

class AdminFactory implements UserFactory {
  createUser() {
    return new Admin()
  }
}

class NormalUserFactory implements UserFactory {
  createUser() {
    return new NormalUser()
  }
}
