const now = new Date();
const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
const nextMonthEnd = new Date(now.getFullYear(), now.getMonth() + 2, 0);

const WORK_HOURS_START = "09:00";
const WORK_HOURS_END = "18:00";


export const rules = {
    required: (value: string) => !!value || 'Поле обязательно',
    validDate: (value: string) => {
        if (!value) return "Поле обязательно";
        const selectedDate = new Date(value);
        return (selectedDate >= currentMonthStart && selectedDate <= nextMonthEnd) ||
            "Дата должна быть в пределах текущего и следующего месяца";
    },
    validTime: (from: string, to: string) => {
        if (!from || !to) return "Укажите время начала и окончания";
        return from < to || "Время окончания должно быть позже времени начала";
    },

    validStartTime: (value: string) => {
        if (!value) return "Поле обязательно";
        return (value >= WORK_HOURS_START && value < WORK_HOURS_END) ||
            `Интервал между ${WORK_HOURS_START} и ${WORK_HOURS_END}`;
    },

    validEndTime: (value: string) => {
        if (!value) return "Поле обязательно";
        return (value > WORK_HOURS_START && value <= WORK_HOURS_END) ||
            `Интервал между ${WORK_HOURS_START} и ${WORK_HOURS_END}`;
    }
}