import Touch from './touch';

export default {
    install (Vue) {
        Vue.directive('touch', {
            bind: (el, handle) => {
                let touchObj = new Touch(el);
                ['Up', 'Down', 'Left', 'Right'].forEach((item) => {
                    touchObj.attach(`touch${item}`, () => {
                        handle.value(`touch${item}`);
                    });
                });
            }
        });
    }
};
