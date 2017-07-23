var config = {
    version: "1.2.0",

    // ios
    // platform:"ios",
    // titlebarPadding: "10px",
    // contentTop:'75px',
    // contentLargeTop:'131px',
    // contentUserTop:'275px',

    //android
    platform: "android",
    titlebarPadding: "0px",
    contentTop: '65px',
    contentLargeTop: '121px',
    contentUserTop: '265px',

    //release
    release: true,
    domain_name: "http://116.246.2.202:6115",
    //domain_name: "http://192.168.1.3:3000",

    //debug
    // debug:true,
    // domain_name:"http://localhost:3000",
}
window.config = config;
export default config;