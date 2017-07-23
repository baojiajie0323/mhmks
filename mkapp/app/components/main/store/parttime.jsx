import React from 'react';
import styles from './store.less';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { Spin, Modal, Icon,message } from 'antd';
import { List, ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import MenuItem from 'material-ui/MenuItem';
import StarIcon from 'material-ui/svg-icons/toggle/star';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { cyan600, cyan300, transparent } from 'material-ui/styles/colors';
import config from '../../config';
const confirm = Modal.confirm;

class Parttime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      addmode: true,
      storeInfo: {},
      parttime: {},
    };
    this.onParttimeChange = this.onParttimeChange.bind(this);
    this.onParttimeSubmitChange = this.onParttimeSubmitChange.bind(this);
    this.onClickAddBlank = this.onClickAddBlank.bind(this);
    this.onClickSaveParttime = this.onClickSaveParttime.bind(this);
    this.onClickAddImage = this.onClickAddImage.bind(this);
    this.removePhoto = this.removePhoto.bind(this);

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.handleSexChange = this.handleSexChange.bind(this);
    this.onCardidChange = this.onCardidChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onWorkChange = this.onWorkChange.bind(this);
    this.onBankcardChange = this.onBankcardChange.bind(this);
    this.handleChangeEntryDate = this.handleChangeEntryDate.bind(this);
    this.handleChangeQuitDate = this.handleChangeQuitDate.bind(this);
    this.onToggleChange = this.onToggleChange.bind(this);

  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PARTTIME, this.onParttimeChange);
    Store.addChangeListener(StoreEvent.SE_PARTTIME_SUBMIT, this.onParttimeSubmitChange);


    var storeid = this.props.userdata;
    var storeInfo = Store.getStoreById(storeid);
    if (storeInfo) {
      this.setState({
        storeInfo
      })
    }

    var data = {
      begindate: '2016-01-01',
      enddate: new Date().Format('yyyy-MM-dd'),
      storeid,
      isfinish: 0,
    }
    console.log(data);
    Action.getParttime(data);
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PARTTIME, this.onParttimeChange);
    Store.removeChangeListener(StoreEvent.SE_PARTTIME_SUBMIT, this.onParttimeSubmitChange);
  }
  onParttimeChange(parttimeList) {
    if (parttimeList.length > 0) {
      this.setState({
        parttime: parttimeList[0],
        addmode: false,
      })
    }
    this.setState({
      loading: false
    })
  }
  onParttimeSubmitChange(parttime) {
    if (parttime.isfinish == 1) {
      parttime = {};
      this.setState({
        parttime,
        addmode: true,
      })
    } else {
      this.setState({
        parttime,
        addmode: false,
      })
    }
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  onClickAddBlank() {
    var parttime = {
      storeid: this.props.userdata,
      username: '',
      sex: 1,
      cardid: '',
      phone: '',
      work: '',
      bankcard: '',
      cardidfile: '',
      bankcardfile: '',
      entrytime: new Date(),
      isfinish: 0,
    }
    this.setState({
      parttime
    })
  }
  onClickSaveParttime() {
    var data = Object.assign({}, this.state.parttime);
    data.addmode = this.state.addmode;

    confirm({
      title: '确定要提交数据吗？',
      onOk() {
        console.log(data);
        Action.submitParttime(data);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  onUsernameChange(e, value) {
    var { parttime } = this.state;
    parttime.username = value;
    this.setState({ parttime })
  }
  handleSexChange(e, i, value) {
    var { parttime } = this.state;
    parttime.sex = value;
    this.setState({ parttime })
  }
  onCardidChange(e, value) {
    var { parttime } = this.state;
    parttime.cardid = value;
    this.setState({ parttime })
  }
  onPhoneChange(e, value) {
    var { parttime } = this.state;
    parttime.phone = value;
    this.setState({ parttime })
  }
  onWorkChange(e, value) {
    var { parttime } = this.state;
    parttime.work = value;
    this.setState({ parttime })
  }
  onBankcardChange(e, value) {
    var { parttime } = this.state;
    parttime.bankcard = value;
    this.setState({ parttime })
  }
  handleChangeEntryDate(n, value) {
    var { parttime } = this.state;
    parttime.entrytime = value;
    this.setState({ parttime })
  }
  handleChangeQuitDate(n, value) {
    var { parttime } = this.state;
    parttime.quittime = value;
    this.setState({ parttime })
  }
  onToggleChange(e, value) {
    var { parttime } = this.state;
    parttime.isfinish = value ? 1 : 0;
    parttime.quittime = new Date();
    this.setState({ parttime })
  }
  setOptions(srcType) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 20,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }
  onClickAddImage(filetype) {
    var srcType = Camera.PictureSourceType.PHOTOLIBRARY;
    var options = this.setOptions(srcType);
    var context = this;
    navigator.camera.getPicture(function cameraSuccess(imageUri) {
      window.resolveLocalFileSystemURL(imageUri, function success(fileEntry) {
        // Do something with the FileEntry object, like write to it, upload it, etc.
        // writeFile(fileEntry, imgUri);
        console.log("got file: " + fileEntry.fullPath);
        message.info("正在上传照片");

        var fileURL = fileEntry.fullPath;
        function win(r) {

          message.info("上传照片成功");
          var response = JSON.parse(r.response);

          var { parttime } = context.state;
          parttime[filetype] = response.data.uuid;
          // var files = context.state.file;
          // if (files[expensetype] == undefined) {
          //   files[expensetype] = [];
          // }
          // files[expensetype].push({
          //   response: response,
          //   imageUri: imageUri
          // });
          context.setState({ parttime })
          //console.log("Code = " + r.responseCode);
          //alert("Response = " + r.response);
          //console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
          alert("An error has occurred: Code = " + error.code);
          console.log("upload error source " + error.source);
          console.log("upload error target " + error.target);
        }

        var uri = encodeURI(config.domain_name + "/visitor/upload");

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";

        var ft = new FileTransfer();
        ft.onprogress = function (progressEvent) {
          if (progressEvent.lengthComputable) {
            //loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
          } else {
            //loadingStatus.increment();
          }
        };
        ft.upload(imageUri, uri, win, fail, options);
      }, function () {
      });

    }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");

    }, options);
  }
  removePhoto(filetype) {
    var { parttime } = this.state;
    parttime[filetype] = "";
    this.setState({ parttime })
  }

  render() {
    var context = this;
    var parttime = this.state.parttime;
    var hasParttime = !isEmptyObject(parttime);
    var noParttime = ([
      <Subheader>当前门店无兼促信息</Subheader>,
      <RaisedButton onClick={this.onClickAddBlank} label="添加兼促信息" primary={true} fullWidth={true} />
    ]);
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: config.titlebarPadding }}
          title="门店信息"
          onLeftIconButtonTouchTap={this.onClickBack}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
        />
        <div style={{ top: config.contentTop }} className={styles.content}>
          <Subheader>{this.state.storeInfo.Store_name}</Subheader>
          <Divider />
          <Spin size="large" tip="正在加载，请稍后" spinning={this.state.loading}>
            {hasParttime ? (
              <div style={{ padding: '0 10px' }}>
                <Subheader>兼促人员信息</Subheader>
                <TextField
                  value={parttime.username}
                  onChange={this.onUsernameChange}
                  style={{ padding: '0 20px' }}
                  floatingLabelText="姓名"
                />
                <SelectField
                  style={{ padding: '0 20px' }}
                  floatingLabelText="性别"
                  value={parseInt(parttime.sex)}
                  onChange={this.handleSexChange}
                >
                  <MenuItem value={1} primaryText="男" />
                  <MenuItem value={2} primaryText="女" />
                </SelectField>
                <TextField
                  value={parttime.cardid}
                  onChange={this.onCardidChange}
                  style={{ padding: '0 20px' }}
                  floatingLabelText="身份证"
                />
                <TextField
                  value={parttime.phone}
                  onChange={this.onPhoneChange}
                  style={{ padding: '0 20px' }}
                  floatingLabelText="联系方式"
                />
                <TextField
                  value={parttime.work}
                  onChange={this.onWorkChange}
                  style={{ padding: '0 20px' }}
                  floatingLabelText="本职工作"
                />
                <TextField
                  value={parttime.bankcard}
                  onChange={this.onBankcardChange}
                  style={{ padding: '0 20px' }}
                  floatingLabelText="工行卡号"
                />
                <DatePicker
                  style={{ padding: '0 20px' }}
                  onChange={this.handleChangeEntryDate}
                  autoOk={true}
                  floatingLabelText="入职日期"
                  value={new Date(parttime.entrytime)}
                />
                <p style={{ margin: '16px' }}>身份证照片（正面）</p>
                <div className={styles.photocontent}>
                  {parttime.cardidfile ?
                    <div className={styles.photoblock}>
                      <img src={`${config.domain_name}/upload/${parttime.cardidfile}.jpg`} />
                      <Icon onClick={function () { context.removePhoto("cardidfile") }} style={{ position: 'absolute', right: '0', fontSize: '20px', color: 'white' }} type="close" />
                    </div> :
                    <div className={styles.addPhotoButton} onClick={function () { context.onClickAddImage("cardidfile") }}>
                      <Icon type="plus" style={{ fontSize: '18px', marginBottom: '5px' }} />
                      <div className="ant-upload-text">添加照片</div>
                    </div>}
                </div>

                <p style={{ margin: '16px' }}>工行卡照片</p>
                <div className={styles.photocontent}>
                  {parttime.bankcardfile ?
                    <div className={styles.photoblock}>
                      <img src={`${config.domain_name}/upload/${parttime.bankcardfile}.jpg`} />
                      <Icon onClick={function () { context.removePhoto("bankcardfile") }} style={{ position: 'absolute', right: '0', fontSize: '20px', color: 'white' }} type="close" />
                    </div> :
                    <div className={styles.addPhotoButton} onClick={function () { context.onClickAddImage("bankcardfile") }}>
                      <Icon type="plus" style={{ fontSize: '18px', marginBottom: '5px' }} />
                      <div className="ant-upload-text">添加照片</div>
                    </div>}
                </div>
                <Toggle
                  style={{ padding: '0 20px', marginTop: '16px' }}
                  onToggle={this.onToggleChange}
                  toggled={parttime.isfinish == "1"}
                  label="兼促离职信息"
                />
                {parttime.isfinish == "1" ? <DatePicker
                  style={{ padding: '0 20px' }}
                  onChange={this.handleChangeQuitDate}
                  autoOk={true}
                  floatingLabelText="离职日期"
                  value={parttime.quittime ? new Date(parttime.quittime) : new Date()}
                /> : null}

                <RaisedButton style={{ margin: '16px 0' }} onClick={this.onClickSaveParttime} label="保存兼促信息" primary={true} fullWidth={true} />
              </div>
            ) : noParttime}
          </Spin>

          {/*<List>
            <ListItem
              disableTouchRipple={true}
              primaryText={this.state.storeInfo.Address}
              leftIcon={<PlaceIcon color={cyan600} />}
            />
            <ListItem
              disableTouchRipple={true}
              primaryText={<span style={{ fontWeight: 'bold' }}>{this.state.storeInfo.Level}</span>}
              leftIcon={<StarIcon color={cyan600} />}
            />
            <ListItem
              disableTouchRipple={true}
              primaryText={this.state.storeInfo.Contacts_name}
              secondaryText={this.state.storeInfo.Tel}
              leftIcon={<CommunicationCall color={cyan600} />}
            />
          </List>*/}
        </div>
      </div>
    );
  }
}

export default Parttime;