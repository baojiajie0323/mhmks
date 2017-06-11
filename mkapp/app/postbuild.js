var path = require('path');
var fs = require('fs');
var shelljs = require('shelljs');
stat = fs.stat;

// var distDir = path.join(__dirname, './dist');
// shelljs.cp('-f', ['./package.json'], distDir);
//
// var mainPath = path.join(__dirname, './main.js');
// var mainContent = fs.readFileSync(mainPath, { encoding: 'utf8' });
// var mainUrlRe = /mainWindow.loadUrl\((.*)\)/g;
// var newUrl = '"file://" + __dirname + "/index.html"';
// mainContent.replace(mainUrlRe, function(match, p1, offset, str) {
//   var newContent = mainContent.replace(p1, newUrl);
//   fs.writeFileSync(path.join(distDir, './main.js'), newContent, { encoding: 'utf8' });
// })


/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var copy = function( src, dst ){
    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }
        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;
            stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }
                // 判断是否为文件
                if( st.isFile() ){
                    // 创建读取流
                    readable = fs.createReadStream( _src );
                    // 创建写入流
                    writable = fs.createWriteStream( _dst );
                    // 通过管道来传输流
                    readable.pipe( writable );
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, _dst, copy );
                }
            });
        });
    });
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback ){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( src, dst );
        }
        // 不存在
        else{
            fs.mkdir( dst, function(){
                callback( src, dst );
            });
        }
    });
};

var copyfile = function(src,dst){
  var srcpath = path.join(__dirname, src);
  var dstpath = path.join(__dirname, dst);
  var content = fs.readFileSync(srcpath);
  fs.writeFileSync(dstpath, content,{ encoding: 'utf8' });
}

copyfile( './index.html', './dist/main.html');
copyfile( './index_start.html', './dist/index.html');
exists( './dist', '../../mkserver/public/mkapp', copy );
exists( './dist', '../mkcordova/www', copy );
