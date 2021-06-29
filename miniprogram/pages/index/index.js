Page({
    data: {
        active: 2,
        top: '5'
    },
    onChange(event) {
        const active = event.detail;
        if (active === 1) {
            console.log('新增 note');
            return;
        }
        this.setData({ active });
    },
});