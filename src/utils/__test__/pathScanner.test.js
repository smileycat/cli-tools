const pathScanner = require('../pathScanner');

describe('Path Scanner Test', () => {
  console.log = jest.fn();

  test('to load one file path', () => {
    const args = [__dirname + '/pathScanner.test.js'];
    const paths = pathScanner(args, { appName: 'appName' });

    expect(paths.length).toBe(1);
  });

  test('to load two file paths', () => {
    const args = ['pathTest.txt', 'pathTest2.txt'].map(file => `${__dirname}/testDir/${file}`);
    const paths = pathScanner(args, { appName: 'appName' });

    expect(paths.length).toBe(2);
  });

  test('non-existent path should console log', () => {
    const file = __dirname + 'pathTest';
    const paths = pathScanner([file], { appName: 'appName' });

    expect(console.log).toHaveBeenCalledWith(`appName: ${file}: No such file or directory`);
    expect(paths.length).toBe(0);
  });

  test('directory path should console log', () => {
    const directory = __dirname + '/testDir';
    const paths = pathScanner([directory], { appName: 'appName' });

    expect(paths.length).toBe(0);
    expect(console.log).toHaveBeenCalledWith(`appName: ${directory}: is a directory`);
  });
});
