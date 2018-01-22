import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
// import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'
import CurveView from './components/views/Curve.vue'
import AmapView from './components/views/Amap.vue'
import EchartView from './components/views/Echart.vue'
import UploadView from './components/views/Upload.vue'
import UsersView from './components/views/TingtingUsers.vue'
import EditUserView from './components/views/EditUser.vue'
import AddUserView from './components/views/AddUser.vue'
import MsgLogsView from './components/views/MsgLogs.vue'
import OpLogsView from './components/views/OperationLogs.vue'
import LoginLogsView from './components/views/LoginLogs.vue'
import EditDeviceView from './components/views/EditDevice.vue'
import ViewDeviceView from './components/views/ViewDevice.vue'
import WarningDeviceView from './components/views/WarningDevice.vue'
import EditOrgView from './components/views/EditOrg.vue'
import AddDeviceView from './components/views/AddDevice.vue'
import SystemConfigView from './components/views/SystemConfig.vue'
import UpdatePassView from './components/views/UpdatePass.vue'
import ChaptersView from './components/views/TingtingChapters.vue'
import BooksView from './components/views/TingtingBooks.vue'
import AlbumListView from './components/views/TingtingAlbums.vue'
import MemberListView from './components/views/TingtingMembers.vue'
import OrderListView from './components/views/TingtingOrders.vue'
import SubCategoryListView from './components/views/TingtingSubCategories.vue'
import CategoryListView from './components/views/TingtingCategories.vue'
import AddAlbumView from './components/views/TingtingAddAlbum.vue'
import AddBookView from './components/views/TingtingAddBook.vue'
import EditAlbumView from './components/views/TingtingEditAlbum.vue'
import EditAlbumBookRelationView from './components/views/TingtingAlbumBookRelation.vue'
import TingtingEditCategoryView from './components/views/TingtingEditCategory.vue'
import EditBookView from './components/views/TingtingEditBook.vue'
import EditChapterView from './components/views/TingtingEditChapter.vue'
import EditBookChapterRelationView from './components/views/TingtingBookChapterRelation.vue'
import RechargeListView from './components/views/TingtingRechargeList.vue'
import AddCategoryView from './components/views/TingtingAddCategory.vue'
import TingtingAddChapterView from './components/views/TingtingAddChapter.vue'

// Routes
const routes = [
  {
    path: '/backend',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'chapter/add',
        alias: 'addchapter',
        component: TingtingAddChapterView,
        name: '添加章节',
        meta: {description: 'TingtingAddChapterView'}
      },
      {
        path: 'category/add',
        alias: 'addcategory',
        component: AddCategoryView,
        name: '添加category',
        meta: {description: 'AddCategoryView'}
      },
      {
        path: 'recharge/list',
        alias: 'rechargelist',
        component: RechargeListView,
        name: '充值列表',
        meta: {description: 'RechargeListView'}
      },
      {
        path: 'chapter/edit',
        alias: 'editChapter',
        component: EditChapterView,
        name: '编辑章节',
        meta: {description: 'EditChapterView'}
      },
      {
        path: 'book/edit',
        alias: 'editBook',
        component: EditBookView,
        name: '编辑书本',
        meta: {description: 'EditBookView'}
      },
      {
        path: 'category/edit',
        alias: 'editCategory',
        component: TingtingEditCategoryView,
        name: '编辑类别信息',
        meta: {description: 'TingtingEditCategoryView'}
      },
      {
        path: 'book/chapter/relation',
        alias: 'bookchapterrelation',
        component: EditBookChapterRelationView,
        name: '编辑书本-章节对应关系',
        meta: {description: 'EditBookChapterRelationView'}
      },
      {
        path: 'album/book/relation',
        alias: 'editalbumbookrelation',
        component: EditAlbumBookRelationView,
        name: '编辑专辑-书本对应关系',
        meta: {description: 'EditAlbumBookRelationView'}
      },
      {
        path: 'album/edit',
        alias: 'editalbum',
        component: EditAlbumView,
        name: '编辑专辑',
        meta: {description: 'EditAlbumView'}
      },
      {
        path: 'book/add',
        alias: 'addbook',
        component: AddBookView,
        name: '添加书本',
        meta: {description: 'AddBookView'}
      },
      {
        path: 'album/add',
        alias: 'addalbum',
        component: AddAlbumView,
        name: '添加专辑',
        meta: {description: 'AddAlbumView'}
      },
      {
        path: 'category/list',
        alias: 'CategoryList',
        component: CategoryListView,
        name: '大类列表',
        meta: {description: 'CategoryListView'}
      },
      {
        path: 'subCategory/list',
        alias: 'subCategoryList',
        component: SubCategoryListView,
        name: '子类列表',
        meta: {description: 'subCategoryListView'}
      },
      {
        path: 'order/list',
        alias: 'orderlist',
        component: OrderListView,
        name: '订单列表',
        meta: {description: 'OrderListView'}
      },
      {
        path: 'member/list',
        alias: 'memberlist',
        component: MemberListView,
        name: '会员列表',
        meta: {description: 'MemberListView'}
      },
      {
        path: 'album/list',
        alias: 'albumlist',
        component: AlbumListView,
        name: '专辑列表',
        meta: {description: 'AlbumListView'}
      },
      {
        path: 'book/list',
        alias: 'booklist',
        component: BooksView,
        name: '书本列表',
        meta: {description: 'BooksView'}
      },
      {
        path: 'chapter/list',
        alias: 'chapterlist',
        component: ChaptersView,
        name: '章节列表',
        meta: {description: 'ChaptersView'}
      },
      {
        path: 'user/updatePass',
        alias: 'updatePass_alias',
        component: UpdatePassView,
        name: '修改用户密码',
        meta: {description: 'UpdatePassView'}
      },
      {
        path: 'user/add',
        alias: 'addUser_alias',
        component: AddUserView,
        name: '添加用户',
        meta: {description: 'AddUserView'}
      },
      {
        path: 'sysConfig',
        alias: 'sysconfig_alias',
        component: SystemConfigView,
        name: '系统设置',
        meta: {description: 'SystemConfigView'}
      },
      {
        path: 'device/add',
        alias: 'editorg',
        component: AddDeviceView,
        name: '添加设备',
        meta: {description: 'editorg'}
      },
      {
        path: 'org/edit',
        alias: 'editorg',
        component: EditOrgView,
        name: 'editorg',
        meta: {description: 'editorg'}
      },
      {
        path: 'device/warning',
        alias: 'WarningDeviceView',
        component: WarningDeviceView,
        name: 'WarningDeviceView',
        meta: {description: 'WarningDeviceView'}
      },
      {
        path: 'device/view',
        alias: 'ViewDeviceView',
        component: ViewDeviceView,
        name: 'ViewDeviceView',
        meta: {description: 'ViewDeviceView'}
      },
      {
        path: 'device/edit',
        alias: 'editDevice',
        component: EditDeviceView,
        name: 'editDevice',
        meta: {description: 'editDevice'}
      },
      {
        path: 'messageLog',
        alias: 'LogsView',
        component: MsgLogsView,
        name: '消息日志',
        meta: {description: 'LogsView'}
      },
      {
        path: 'operateLog',
        alias: 'OpLogsView',
        component: OpLogsView,
        name: '操作日志',
        meta: {description: 'OpLogsView'}
      },
      {
        path: 'loginLog',
        alias: 'LoginLogsView',
        component: LoginLogsView,
        name: '登录日志',
        meta: {description: 'LoginLogsView'}
      },
      {
        path: 'user/edit',
        alias: 'edituser',
        component: EditUserView,
        name: 'EditUser',
        meta: {description: 'EditUser'}
      },
      {
        path: 'user/list',
        alias: 'users_alias',
        component: UsersView,
        name: '用户列表',
        meta: {description: 'UsersView'}
      },
      {
        path: 'upload',
        alias: 'upload_alias',
        component: UploadView,
        name: 'UploadView',
        meta: {description: 'UploadView'}
      },
      {
        path: 'echart',
        alias: 'echart_alias',
        component: EchartView,
        name: 'echartView',
        meta: {description: 'echart'}
      },
      {
        path: 'amap',
        alias: 'amap_alias',
        component: AmapView,
        name: 'amapView',
        meta: {description: '曲线图'}
      },
      {
        path: 'curve',
        alias: 'curve_alias',
        component: CurveView,
        name: 'CurveView',
        meta: {description: '曲线图'}
      },
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers', requiresAuth: true}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
