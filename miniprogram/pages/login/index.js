import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast.js';

Page({
    data: {
        btnDisabled: false,
    },
    onClick() {
        this.setData({
            btnDisabled: true,
        });
        wx.getUserProfile({ desc: '用户登录' }).then(res => {
            return wx.cloud.callFunction({
                name: 'login',
                data: res.userInfo,
            }).then(resp => Toast({
                type: 'success',
                message: '登录成功',
                onClose() {
                    console.log(resp.result);
                },
            }));
        }).catch(() => Toast.fail('登录失败')).finally(() => this.setData({ btnDisabled: false }))
    }
});