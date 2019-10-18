'use strict';

class Widget {
    /**
     * @constructor
     */
    constructor($element, options) {
        this.$element = $element;
        this.options = Object.assign({}, Widget.defaults, this.$element.data(), options);
    }
}
Widget.defaults = {};

export default Widget;
