const priorityNameMap = {
    'highest': 'Самый высокий приоритет',
    'high': 'Высокий приоритет',
    'критичный': 'Критичный приоритет',
    'высокий': 'Высокий приоритет',
}

type PriorityKey = keyof typeof priorityNameMap;

export const getPriorityName = (n: string): string => {
    const key = n.toLowerCase() as PriorityKey;
    return key in priorityNameMap ? priorityNameMap[key] : 'Неизвестный приоритет';
};