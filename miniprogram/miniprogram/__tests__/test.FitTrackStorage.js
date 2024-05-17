
const FitTrackStorage = require('../utils/FitTrackStorage'); 
  
// 模拟 wx 对象  
const wxMock = {  
  getStorage: jest.fn(),  
  setStorage: jest.fn(),  
};  
  
// 在测试之前，全局模拟 wx 对象  
beforeAll(() => {  
  global.wx = wxMock;  
});  
  
// 清除所有模拟函数的调用和实例  
afterEach(() => {  
  jest.clearAllMocks();  
});  
  
describe('FitTrackStorage', () => {  
  describe('getUserInfo', () => {  
    it('should return user info if storage contains valid data', (done) => {  
      // Arrange  
      const mockData = {  
        code: 1,  
        username: 'abc_u',  
        password: 'def_p',  
        jwtToken: 'ghi_j',  
      };  
      const expectedResult = {  
        status: true,  
        value: mockData,  
      };  
  
      wxMock.getStorage.mockImplementation((options) => {  
        options.success({ data: mockData });  
        options.complete(expectedResult);  
      });  
  
      // Act  
      FitTrackStorage.getUserInfo((result) => {  
        // Assert  
        expect(result).toEqual(expectedResult);  
        done(); // 通知 Jest 测试已完成（异步测试）  
      });  
    });  
  
    it('should return status false if storage fails to retrieve data', (done) => {  
      // Arrange  
      const expectedResult = {  
        status: false,  
      };  
  
      wxMock.getStorage.mockImplementation((options) => {  
        options.fail({});  
        options.complete(expectedResult);  
      });  
  
      // Act  
      FitTrackStorage.getUserInfo((result) => {  
        // Assert  
        expect(result).toEqual(expectedResult);  
        done(); // 通知 Jest 测试已完成（异步测试）  
      });  
    });  
  });  
  
  describe('setUserInfo', () => {  
    it('should set user info successfully', (done) => {  
      // Arrange  
      const userInfo = {  
        username: 'new_user',  
        password: 'new_pass',  
        jwtToken: 'new_token',  
      };  
  
      wxMock.setStorage.mockImplementation((options) => {  
        expect(options.key).toBe('data');  
        expect(options.data).toEqual(userInfo);  
        options.success({});  
        done(); // 通知 Jest 测试已完成（异步测试）  
      });  
  
      // Act  
      FitTrackStorage.setUserInfo(userInfo, () => {});  
    });  
  });  
});