class toucher {
    constructor (dom) {
        this.dom = dom;
        this.events = {};
        this.isActiveFlag = false;
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.cfg = {
            /*设置检测滑动灵敏度，滑动多少px时会响应滑动事件*/
            Sensitivity: 50
        };

        dom.addEventListener('touchstart', this.start.bind(this));
        dom.addEventListener('touchend', this.end.bind(this));
        dom.addEventListener('touchmove', this.move.bind(this));
        dom.addEventListener('touchcancel', this.cancel.bind(this));
    }

    getDirection(x1, y1, x2, y2) {
        /* eslint-disable */
        return (Math.abs(x1 - x2) > Math.abs(y1 - y2)) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
        /* eslint-disable */
    }

    start (e) {
        this.isActiveFlag = true;
        this.startX = e.touches[0].clientX || 0;
        this.startY = e.touches[0].clientY || 0;
    }

    end (e) {
        this.isActiveFlag = false;
    }

    move(e) {
        this.endX = e.touches[0].clientX || 0;
        this.endY = e.touches[0].clientY || 0;

        if (!this.isActiveFlag) return;

        if (Math.abs(this.endX - this.startX) >= this.cfg.Sensitivity || Math.abs(this.endY - this.startY) >= this.cfg.Sensitivity) {
            /* eslint-disable */
            this && this.events['touch' + this.getDirection(this.startX, this.startY, this.endX, this.endY)] && this.events['touch' + this.getDirection(this.startX, this.startY, this.endX, this.endY)].forEach(function(item) {
                typeof(item.callBack) === 'function' && item.callBack(e)
            });
            /* eslint-disable */
            this.isActiveFlag = false;
        }
    }

    cancel(e) {
        this.isActiveFlag = false;
    }

    attach (eventName, callBack) {
        if ('string' !== typeof(eventName) || 'function' !== typeof(callBack)) return this;

        !this.events[eventName] && (this.events[eventName] = []);

        this.events[eventName].push({
        callBack: callBack
        })

        return this;
    }

    detech (eventName, callBack) {
        if ('string' !== typeof(eventName) || 'function' !== typeof(callBack)) return this;

        for(i in this.events) {
            if (i === eventName) {
                this.events[i].forEach(function(item, index) {
                    if (callBack === item.callBack) {
                        this.events[i].splice(index, 1);
                    }
                }.bind(this))
            }
        }

        return this;
    }
}

export default toucher;
