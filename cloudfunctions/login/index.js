const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

exports.main = async (event, context) => {
    const user = event;
    const db = cloud.database();
    const wxContext = cloud.getWXContext();
    const userTable = db.collection('user');

    delete user.userInfo;

    if (!user) {
        return {
            user,
            context,
        };
    }

    if (!user.nickName) {
        return {
            user,
            context,
        };
    }

    const now = new Date();
    const newUser = {
        ...user,
        updateTime: now,
        ip: wxContext.CLIENTIP,
        openId: wxContext.OPENID,
    };

    const query = await userTable.where({
        openId: wxContext.OPENID,
    }).get();
    const exsitUser = query.data[0];

    if (exsitUser) {
        userTable.doc(exsitUser._id).update({
            data: newUser,
        });
        return {
            ...exsitUser,
            ...newUser,
        };
    }
    newUser.createTime = now;
    return await userTable.add({
        data: newUser,
    }).then(res => {
        return {
            _id: res._id,
            ...newUser,
        };
    });
};
