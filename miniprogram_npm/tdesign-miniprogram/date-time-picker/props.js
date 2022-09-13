const props = {
    cancelBtn: {
        type: String,
        value: '',
    },
    confirmBtn: {
        type: String,
        value: '',
    },
    end: {
        type: String,
        optionalTypes: [Number],
    },
    externalClasses: {
        type: Array,
    },
    format: {
        type: String,
        value: '',
    },
    header: {
        type: Boolean,
        value: true,
    },
    mode: {
        type: String,
        optionalTypes: [Array],
        value: 'date',
    },
    showWeek: {
        type: Boolean,
        value: false,
    },
    start: {
        type: String,
        optionalTypes: [Number],
    },
    title: {
        type: String,
        value: '',
    },
    value: {
        type: String,
        optionalTypes: [Number],
        value: null,
    },
    defaultValue: {
        type: String,
        optionalTypes: [Number],
    },
    visible: {
        type: Boolean,
        value: false,
    },
};
export default props;
