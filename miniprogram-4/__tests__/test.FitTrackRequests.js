// 导入你需要的库和你要测试的文件
const FitTrackStorage = require('../utils/FitTrackStorage');
const FitTrackRequests = require('../utils/FitTrackRequests');

// 创建一个模拟的 wx 对象
global.wx = {
  redirectTo: jest.fn(),
};

// 创建一个模拟的 FitTrackStorage 对象
FitTrackStorage.getUserInfo = jest.fn();

describe('FitTrackRequests.js', () => {
  beforeEach(() => {
    // 在每个测试开始前重置所有的模拟函数
    jest.clearAllMocks();
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
	// 测试getURL_SportGetAll()函数
	it('',()=>{
		// Arrange
		const url = FitTrackRequests.getURL_SportGetAll()

		// Assert
		expect(url).toBe('http://10.16.203.123:8080/sports?username=test_username&getAll=')
	})

});
