const mockUserPathDao = {
  getAllPaths: jest.fn(),
  findPathByName: jest.fn(),
  findPathById: jest.fn(),
  savePath: jest.fn(),
  deletePath: jest.fn(),
  toggleCompleted: jest.fn(),
};
export default mockUserPathDao;
