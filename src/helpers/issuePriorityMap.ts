const priorityNameMap = {
    'highest': 'Самый высокий приоритет',
    'high': 'Высокий приоритет',
    'критичный': 'Критичный приоритет',
    'высокий': 'Высокий приоритет',
}
export const getPriorityName = (n: string) => {
    return n ? priorityNameMap[String(n.toLowerCase())] : 'Неизвестный приоритет';
}