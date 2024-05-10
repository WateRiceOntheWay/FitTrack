// 导入你需要的库和你要测试的文件
const FitTrackStorage = require('../utils/FitTrackStorage');
const FitTrackRequests = require('../utils/FitTrackRequests');

// 创建一个模拟的 wx 对象
global.wx = {
	redirectTo: jest.fn(),
	request: jest.fn(),
};

// 创建一个模拟的 FitTrackStorage 对象

describe('FitTrackRequests.js', () => {
  beforeEach(() => {
    // 在每个测试开始前重置所有的模拟函数
		jest.clearAllMocks();
		FitTrackStorage.getUserInfo = jest.fn();
	});

	// 测试 InitUserInfo()函数
  it('should initialize user info when InitUserInfo is called and user info is available', () => {
    // Arrange
    const mockAfterFunction = jest.fn();
    const mockResult = {
      status: true,
      value: {
        username: 'test_username',
        jwtToken: 'test_jwtToken',
      },
    };
    FitTrackStorage.getUserInfo.mockImplementation((callback) => callback(mockResult));

    // Act
    FitTrackRequests.InitUserInfo(mockAfterFunction);

    // Assert
    expect(FitTrackStorage.getUserInfo).toHaveBeenCalled();
    expect(FitTrackRequests.username).toBe('test_username');
    expect(FitTrackRequests.jwtToken).toBe('test_jwtToken');
    expect(mockAfterFunction).toHaveBeenCalled();
    expect(wx.redirectTo).not.toHaveBeenCalled();
  });

  it('should redirect to login page when InitUserInfo is called and user info is not available', () => {
    // Arrange
    const mockAfterFunction = jest.fn();
    const mockResult = {
      status: false,
    };
    FitTrackStorage.getUserInfo.mockImplementation((callback) => callback(mockResult));

    // Act
    FitTrackRequests.InitUserInfo(mockAfterFunction);

    // Assert
    expect(FitTrackStorage.getUserInfo).toHaveBeenCalled();
    expect(wx.redirectTo).toHaveBeenCalledWith({"url": "/pages/login/login"});
    expect(mockAfterFunction).toHaveBeenCalled();
	});
},
describe('FitTrackRequests.js', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	// 测试getURL_SportGetAll()函数
	it('',()=>{
		// Arrange
		const url = FitTrackRequests.getURL_SportGetAll()
		const username = ""
		// Assert
		expect(url).toBe(`http://10.16.203.123:8080/sports?username=${username}&getAll=`)
	})
	// 测试 getURL_DietGetAll()函数
	it('',()=>{
		// Arrange
		const url = FitTrackRequests.getURL_DietGetAll()
		const username = ""
		// Assert
		expect(url).toBe(`http://10.16.203.123:8080/diet?username=${username}&getAll=`)
	})
	// 测试 getURL_BodyGetAll函数
	it('',()=>{
		// Arrange
		const url = FitTrackRequests.getURL_BodyGetAll()
		const username = ""
		// Assert
		expect(url).toBe(`http://10.16.203.123:8080/healthcare?username=${username}&getAll=`)
	}) 
	// 测试 getURL_SportAdd函数
	it('',()=>{
		// Arrange
		let url = FitTrackRequests.getURL_SportAdd()
		const sport_add = "/sports/add"
		// Assert
		expect(url).toBe('http://10.16.203.123:8080'+ sport_add)
	}) 
	// 测试 getURL_DietAdd函数
	it('',()=>{
		// Arrange
		const url = FitTrackRequests.getURL_DietAdd()
		const diet_add = "/diet/add"
		// Assert
		expect(url).toBe('http://10.16.203.123:8080'+ diet_add)
	}) 
	// 测试 getURL_BodyAdd函数
	it('',()=>{
		// Arrange
		const url = FitTrackRequests.getURL_BodyAdd()
		const body_add = "/healthcare/add"
		// Assert
		expect(url).toBe('http://10.16.203.123:8080'+ body_add)
	}) 
	// 测试 getURL_Signup函数
	it('',()=>{
		// Arrange
		const url = FitTrackRequests.getURL_Signup()
		const signup = "/signup"
		// Assert
		expect(url).toBe('http://10.16.203.123:8080'+ signup)
	}) 
	// 测试 getURL_Login函数
	it('',()=>{
		// Arrange
		const url = FitTrackRequests.getURL_Login()
		const login = "/login"
		// Assert
		expect(url).toBe('http://10.16.203.123:8080'+ login)
	}) 
}),
// 测试 getURL_SportAdd()函数
describe('FitTrackRequests.js', () =>{
	beforeEach(() => {
    // 在每个测试开始前重置所有的模拟函数
		jest.clearAllMocks();
		FitTrackRequests.InitUserInfo = jest.fn();
		FitTrackRequests.getURL_SportAdd = jest.fn();
	});

	it('should add sport info when SportAdd is called', () => {
    // Arrange
    const mockAfterFunction = jest.fn();
    const mockSportInfo = {
      type: 1,
      duration: 30,
      distance: 5,
    };
    FitTrackRequests.InitUserInfo.mockImplementation((callback) => callback());
    FitTrackRequests.getURL_SportAdd.mockReturnValue('mock_url');
    wx.request.mockImplementation((options) => options.complete());

    // Act
    FitTrackRequests.SportAdd(mockSportInfo, mockAfterFunction);

    // Assert
    expect(FitTrackRequests.InitUserInfo).toHaveBeenCalled();
    expect(FitTrackRequests.getURL_SportAdd).toHaveBeenCalled();
    expect(wx.request).toHaveBeenCalledWith(expect.objectContaining({
      url: 'mock_url',
      method: 'POST',
      data: expect.objectContaining({
        gamesName: mockSportInfo.type,
        sportsTime: mockSportInfo.duration,
        sportsDistance: mockSportInfo.distance,
      }),
    }));
    expect(mockAfterFunction).toHaveBeenCalled();
  });
})
);
