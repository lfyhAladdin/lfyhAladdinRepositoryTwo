/*
 * @Author: helin3
 * @Date: 2020-01-06 19:12:41
 * @LastEditors  : helin3
 * @LastEditTime : 2020-01-07 10:18:31
 * @Description: 文件上传与下载模拟
 * 注：若方法中存在异步回调设置responseHeader(res)、
 * 或者异步回调里面设置了res.send等发送数据或流时，
 * 该方法不能再有返回值。否则会发生错误(Can't set headers after they are sent.)
 * 原因在于mocks路由有会根据模拟方法的返回值往响应报文里面写数据res.json
 */
/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const multer = require('multer');

import { backend, responseHeader } from '../utils';

const DIST_PATH = path.resolve(__dirname, '../../../dist');
const TEMP_PATH = path.resolve(DIST_PATH, './temp');
const UPLOAD_PATH = path.resolve(DIST_PATH, './upload');
const DOWNLOAD_PATH = path.resolve(DIST_PATH, './download');

const upload = multer({ dest: TEMP_PATH }).any();

/**
 * 文件上传，目前仅处理单文件上传
 */
const uploadFn = (req, res) => {
  shell.mkdir('-p', UPLOAD_PATH);
  upload(req, res, function (err) {
    let retObj = { code: '-1', message: 'fail' };
    if (err) {
      responseHeader(res, retObj);
      return;
    }
    responseHeader(res);
    let file = req.files[0];
    let original = file.originalname + '';
    let newFileName = new Date().getTime() + original.substring(original.lastIndexOf('.'));
    let destFile = path.resolve(UPLOAD_PATH, newFileName);

    fs.readFile(file.path, function (err0, data) {
      fs.writeFile(destFile, data, function (err) {
        if (err) {
          console.log(err);
        } else {
          retObj.code = '0';
          retObj.message = 'ok';
          retObj.fileName = newFileName;
        }
        res.end(JSON.stringify(retObj));
      });
    });
  });
};

/**
 * 文件下载
 */
const downloadFn = (req, res) => {
  let fileName = req.query.fileName;
  let currFile = path.join(DOWNLOAD_PATH, fileName);
  let fReadStream;
  fs.stat(currFile, function (error, stats) {
    if (!error) {
      res.set({
        'Content-type': 'application/octet-stream',
        'Content-Disposition': 'attachment;filename=' + encodeURI(fileName)
      });
      fReadStream = fs.createReadStream(currFile);
      fReadStream.on('data', function (chunk) {
        res.write(chunk, 'binary');
      });
      fReadStream.on('end', function () {
        res.end();
      });
    } else {
      res.set('Content-type', 'text/html');
      res.send(JSON.stringify({ code: '-1', message: 'fail' }));
      res.end();
    }
  });
};

/**
 * 导出服务，{url,type,response}
 */
export default [{
  url: backend.mockExampleService + '/file/upload',
  type: 'post',
  response: uploadFn
}, {
  url: backend.mockExampleService + '/file/download',
  type: 'get',
  response: downloadFn
}];