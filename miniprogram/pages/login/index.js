Page({
    data: {
        active: 0,
        currentDate: '12:00',
        minHour: 10,
        maxHour: 20,
    },
    onChange(event) {
        this.setData({ active: event.detail });
    },
    onInput(event) {
        this.setData({
            currentDate: event.detail,
        });
    },
    onClick(e) {
        console.log(e);
    }
});