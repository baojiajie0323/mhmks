import React from 'react';
import styles from './login.less';
import $ from 'jquery'
import { Icon, Checkbox, message} from 'antd';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savepwd: false,
    };
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  initCanvas() {
    var c1 = document.getElementById('c1'),
      ctx1 = c1.getContext('2d'),
      c2 = document.getElementById('c2'),
      ctx2 = c2.getContext('2d'),
      twopi = Math.PI * 2,
      parts = [],
      sizeBase,
      cw,
      ch,
      opt,
      hue,
      count;

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function hsla(h, s, l, a) {
      return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
    }

    function create(hue) {
      sizeBase = cw + ch;
      count = Math.floor(sizeBase * 0.3),
        // hue = rand(0, 360),
        // console.log(hue);
        opt = {
          radiusMin: 1,
          radiusMax: sizeBase * 0.04,
          blurMin: 10,
          blurMax: sizeBase * 0.04,
          hueMin: hue,
          hueMax: hue + 100,
          saturationMin: 10,
          saturationMax: 70,
          lightnessMin: 20,
          lightnessMax: 50,
          alphaMin: 0.1,
          alphaMax: 0.5
        }
      ctx1.clearRect(0, 0, cw, ch);
      ctx1.globalCompositeOperation = 'lighter';
      while (count--) {
        var radius = rand(opt.radiusMin, opt.radiusMax),
          blur = rand(opt.blurMin, opt.blurMax),
          x = rand(0, cw),
          y = rand(0, ch),
          hue = rand(opt.hueMin, opt.hueMax),
          saturation = rand(opt.saturationMin, opt.saturationMax),
          lightness = rand(opt.lightnessMin, opt.lightnessMax),
          alpha = rand(opt.alphaMin, opt.alphaMax);

        ctx1.shadowColor = hsla(hue, saturation, lightness, alpha);
        ctx1.shadowBlur = blur;
        ctx1.beginPath();
        ctx1.arc(x, y, radius, 0, twopi);
        ctx1.closePath();
        ctx1.fill();
      }

      parts.length = 0;
      for (var i = 0; i < Math.floor((cw + ch) * 0.03); i++) {
        parts.push({
          radius: rand(1, sizeBase * 0.03),
          x: rand(0, cw),
          y: rand(0, ch),
          angle: rand(0, twopi),
          vel: rand(0.1, 0.5),
          tick: rand(0, 10000)
        });
      }
    }

    function init(hue) {
      resize();
      create(hue);
      loop();
    }

    function loop() {
      requestAnimationFrame(loop);

      ctx2.clearRect(0, 0, cw, ch);
      ctx2.globalCompositeOperation = 'source-over';
      ctx2.shadowBlur = 0;
      ctx2.drawImage(c1, 0, 0);
      ctx2.globalCompositeOperation = 'lighter';

      var i = parts.length;
      ctx2.shadowBlur = 15;
      ctx2.shadowColor = '#fff';
      while (i--) {
        var part = parts[i];

        part.x += Math.cos(part.angle) * part.vel;
        part.y += Math.sin(part.angle) * part.vel;
        part.angle += rand(-0.05, 0.05);

        ctx2.beginPath();
        ctx2.arc(part.x, part.y, part.radius, 0, twopi);
        ctx2.fillStyle = hsla(0, 0, 100, 0.075 + Math.cos(part.tick * 0.02) * 0.05);
        ctx2.fill();

        if (part.x - part.radius > cw) { part.x = -part.radius }
        if (part.x + part.radius < 0) { part.x = cw + part.radius }
        if (part.y - part.radius > ch) { part.y = -part.radius }
        if (part.y + part.radius < 0) { part.y = ch + part.radius }

        part.tick++;
      }
    }

    function resize() {
      cw = c1.width = c2.width = window.innerWidth,
        ch = c1.height = c2.height = window.innerHeight;
    }

    init(84);
  }
  componentDidMount() {
    this.initCanvas();
    var username = localStorage.username;
    var password = localStorage.password;
    var savepwd = localStorage.savepwd;

    this.setState({
      savepwd: savepwd == 'true'
    });

    $('#username').val(username);
    if (savepwd) {
      $('#password').val(password);
    }

    
    Store.addChangeListener(StoreEvent.SE_KEYPRESS,this.onKeyPress);
  }
  componentWillUnmount() {
    localStorage.username = $('#username').val();
    localStorage.savepwd = this.state.savepwd;
    if(this.state.savepwd){
      localStorage.password = $('#password').val();
    }else{
      localStorage.password = '';
    }

    
    Store.removeChangeListener(StoreEvent.SE_KEYPRESS,this.onKeyPress);
  }
  onKeyPress(keyCode){
    if(keyCode == 13){
      this.onClickLogin();
    }
  }
  onClickLogin() {
    var username = $('#username').val();
    var password = $('#password').val();
    if(username == ""){
      message.info("请输入用户名！");
      return;
    }
    if(password == ""){
      message.info("请输入密码！");
      return;
    }
    var data = {
      username:username,
      password:password,
      type:1
    }
    Action.login(data);
  }
  onCheckChange(e) {
    this.setState({
      savepwd: e.target.checked
    })
  }
  onClickApp(){
    window.open("https://www.pgyer.com/wYbE");
  }
  render() {
    return (
      <div className={styles.container}>
        <canvas id='c1' className={styles.canvas1}></canvas>
        <canvas id='c2' className={styles.canvas2}></canvas>
        <div className={styles.content}>
          <div className={styles.appdownload} onClick={this.onClickApp} title="app下载">
           <Icon type="qrcode" />
          </div>
          <p className={styles.title}>满好访客通后台管理平台</p>
          <div className={styles.formcontent}>
            <Icon className={styles.formIcon} type="user" />
            <input id="username" className={styles.formInput} placeholder="请输入用户名" />
          </div>
          <div className={styles.formcontent}>
            <Icon className={styles.formIcon} type="unlock" />
            <input id="password" type="password" className={styles.formInput} placeholder="请输入密码" />
          </div>
          <div className={styles.savepwd}>
            <Checkbox checked={this.state.savepwd} onChange={this.onCheckChange} >记住密码</Checkbox>
          </div>
          <div className={styles.loginbtn} onClick={this.onClickLogin}>登 录</div>
        </div>
        <foot className={styles.footcontent}>
          <h5>Copyright 2017 by 上海满好日用品有限公司</h5>
          <h6>Shanghai Myhome Daily Household Product Co., Ltd.</h6>
        </foot>

      </div>
    );
  }
}

export default Login;