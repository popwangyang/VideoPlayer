
import { fixPathForAsarUnpack } from './util.js'
const ffmpegPath = fixPathForAsarUnpack(require('@ffmpeg-installer/ffmpeg').path);
const ffprobePath = fixPathForAsarUnpack(require('@ffprobe-installer/ffprobe').path);
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
var express = require('express');
var app = new express();




// export default class Express {
// 	constructor(props) {
// 		this.url;
// 	}
// 	
// 	createServer() {
// 		app.get('/', function (req, res) {
// 			console.log('ssss', req.query.startTime, this.url)
// 			
// 		   res.send('Hello World');
// 		})
// 		 
// 		app.listen(4398)
// 	}
// }

export const Express = function(){
	this.videoSourceInfo;
	this._ffmpegCommand;
}

Express.prototype.killFfmpegCommand = function(){
	 if (this._ffmpegCommand) {
	    this._ffmpegCommand.kill();
	}
}

Express.prototype.createServer = function(){
	app.get('/', (req, res) => {
		console.log('ssss', req.query.startTime)
		var startTime = req.query.startTime;
		let videoCodec = this.videoSourceInfo.checkResult.videoCodecSupport ? 'copy' : 'libx264';
		let audioCodec = this.videoSourceInfo.checkResult.audioCodecSupport ? 'copy' : 'aac';
		this.killFfmpegCommand();
		this._ffmpegCommand = ffmpeg()
		    .input(this.videoSourceInfo.videoSourcePath)
		    .nativeFramerate() // 以本机帧速率读取输入
		    .videoCodec(videoCodec)
		    .audioCodec(audioCodec)
		    .format('mp4')
		    .seekInput(startTime)
		    .outputOptions('-movflags', 'frag_keyframe+empty_moov') // 转换x264到Fragmented MP4格式
		    .on('progress', function (progress) {
		        console.log('time: ' + progress.timemark);
		    })
		    .on('error', function (err) {
		        console.log('An error occurred: ' + err.message);
		    })
		    .on('end', function () {
		        console.log('Processing finished !');
		    })
		let videoStream = this._ffmpegCommand.pipe();
		videoStream.pipe(res);
	})
	 
	app.listen(4398, function(){
		console.log('http:localhost:4398')
	})
}