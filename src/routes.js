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
import TagListView from './components/views/TingtingTags.vue'
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
import AddTagView from './components/views/TingtingAddTag.vue'
import EditTagView from './components/views/TingtingEditTag.vue'
import AlbumTagRelationView from './components/views/TingtingAlbumTagRelation.vue'
import BookTagRelationView from './components/views/TingtingBookTagRelation.vue'
import BanndersView from './components/views/TingtingBanners.vue'
import IconsView from './components/views/TingtingIcons.vue'
import MsgsView from './components/views/TingtingMsgs'
import DefaultBooksView from './components/views/TingtingDefaultBooks.vue'
import VersionsView from './components/views/TingtingVersions.vue'
import AddBannerView from './components/views/TingtingAddBanner.vue'
import EditBannerView from './components/views/TingtingEditBanner.vue'
import AddIconView from './components/views/TingtingAddIcon.vue'
import EditIconView from './components/views/TingtingEditIcon.vue'
import CategoryBannerRelationView from './components/views/TingtingCategoryBannerRelation.vue'
import CategoryIconRelationView from './components/views/TingtingCategoryIconRelation.vue'
import AddDefaultBookView from './components/views/TingtingAddDefaultBook.vue'
import CategoryAlbumRelationView from './components/views/TingtingCategoryAlbumRelation.vue'
import RecordsView from './components/views/TingtingRecords.vue'
import FeedbackView from './components/views/TingtingFeedback.vue'
import FavAlbumsView from './components/views/TingtingFavAlbums.vue'
import FavBooksView from './components/views/TingtingFavBooks.vue'
import EditWebView from './components/views/TingtingEditWeb.vue'
import TingtingAddMultiChaptersView from './components/views/TingtingAddMultiChapters.vue'
import TingtingHelp from './components/views/TingtingHelp.vue'
// import EditWebSpecialView from './components/views/TingtingEditSpecial.vue'
// import EditWebAboutView from './components/views/TingtingEditAbout.vue'
import WebsView from './components/views/TingtingWebs.vue'
import EditVersionView from './components/views/TingtingEditVersion.vue'
import AddMsgView from './components/views/TingtingAddMsg.vue'

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
        path: 'web/help',
        alias: 'TingtingHelp',
        component: TingtingHelp,
        name: '帮助',
        meta: {description: 'TingtingHelp'}
      },
      {
        path: 'chapters/add',
        alias: 'TingtingAddMultiChaptersView',
        component: TingtingAddMultiChaptersView,
        name: '添加多个章节',
        meta: {description: 'TingtingAddMultiChaptersView'}
      },
      {
        path: 'msg/add',
        alias: 'AddMsgView',
        component: AddMsgView,
        name: '添加消息',
        meta: {description: 'AddMsgView'}
      },
      {
        path: 'version/edit',
        alias: 'EditVersionView',
        component: EditVersionView,
        name: '编辑version',
        meta: {description: 'EditVersionView'}
      },
      {
        path: 'web/list',
        alias: 'WebsView',
        component: WebsView,
        name: 'web列表',
        meta: {description: 'WebsView'}
      },
      {
        path: 'web/edit',
        alias: 'EditWebView',
        component: EditWebView,
        name: '编辑web',
        meta: {description: 'EditWebView'}
      },
      {
        path: 'book/list/fav',
        alias: 'FavBooksView',
        component: FavBooksView,
        name: '书本收藏列表',
        meta: {description: 'FavBooksView'}
      },
      {
        path: 'album/list/fav',
        alias: 'FavAlbumsView',
        component: FavAlbumsView,
        name: '专辑收藏列表',
        meta: {description: 'FavAlbumsView'}
      },
      {
        path: 'feedback/list',
        alias: 'FeedbackView',
        component: FeedbackView,
        name: '反馈列表',
        meta: {description: 'FeedbackView'}
      },
      {
        path: 'records/list',
        alias: 'RecordsView',
        component: RecordsView,
        name: '录音列表',
        meta: {description: 'RecordsView'}
      },
      {
        path: 'book/default/add',
        alias: 'AddDefaultBookView',
        component: AddDefaultBookView,
        name: 'categoryicon关联',
        meta: {description: 'AddDefaultBookView'}
      },
      {
        path: 'category/icon/relation',
        alias: 'CategoryIconRelationView',
        component: CategoryIconRelationView,
        name: 'categoryicon关联',
        meta: {description: 'CategoryIconRelationView'}
      },
      {
        path: 'category/album/relation',
        alias: 'CategoryAlbumRelationView',
        component: CategoryAlbumRelationView,
        name: 'categoryalbum关联',
        meta: {description: 'CategoryAlbumRelationView'}
      },
      {
        path: 'category/banner/relation',
        alias: 'CategoryBannerRelationView',
        component: CategoryBannerRelationView,
        name: 'categorybanner关联',
        meta: {description: 'CategoryBannerRelationView'}
      },
      {
        path: 'icon/edit',
        alias: 'EditIconView',
        component: EditIconView,
        name: '编辑Icon',
        meta: {description: 'EditIconView'}
      },
      {
        path: 'icon/add',
        alias: 'AddIconView',
        component: AddIconView,
        name: '添加Icon',
        meta: {description: 'AddIconView'}
      },
      {
        path: 'banner/edit',
        alias: 'EditBannerView',
        component: EditBannerView,
        name: '编辑Banner',
        meta: {description: 'EditBannerView'}
      },
      {
        path: 'banner/add',
        alias: 'AddBannerView',
        component: AddBannerView,
        name: '添加banner',
        meta: {description: 'AddBannerView'}
      },
      {
        path: 'version/list',
        alias: 'defaultbooklist',
        component: VersionsView,
        name: '版本管理',
        meta: {description: 'VersionsView'}
      },
      {
        path: '/book/list/default',
        alias: 'defaultbooklist',
        component: DefaultBooksView,
        name: '默认播放书本管理',
        meta: {description: 'DefaultBooksView'}
      },
      {
        path: 'msg/list',
        alias: 'msg',
        component: MsgsView,
        name: 'msg管理',
        meta: {description: 'MsgsView'}
      },
      {
        path: 'icon/list',
        alias: 'icon',
        component: IconsView,
        name: 'icon管理',
        meta: {description: 'IconsView'}
      },
      {
        path: 'banner/list',
        alias: 'bannerlist',
        component: BanndersView,
        name: 'bannder管理',
        meta: {description: 'BanndersView'}
      },
      {
        path: 'tag/book/relation',
        alias: 'tagalbumrelation',
        component: BookTagRelationView,
        name: 'tagbook关联',
        meta: {description: 'BookTagRelationView'}
      },
      {
        path: 'tag/album/relation',
        alias: 'tagalbumrelation',
        component: AlbumTagRelationView,
        name: 'tagalbum关联',
        meta: {description: 'AlbumTagRelationView'}
      },
      {
        path: 'chapter/add',
        alias: 'addchapter',
        component: TingtingAddChapterView,
        name: '添加章节',
        meta: {description: 'TingtingAddChapterView'}
      },
      {
        path: 'tag/edit',
        alias: 'edittag',
        component: EditTagView,
        name: '修改tag',
        meta: {description: 'EditTagView'}
      },
      {
        path: 'tag/add',
        alias: 'addtag',
        component: AddTagView,
        name: '添加tag',
        meta: {description: 'AddTagView'}
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
        path: 'tag/list',
        alias: 'taglist',
        component: TagListView,
        name: 'tag列表',
        meta: {description: 'TagListView'}
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
