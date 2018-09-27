
export function truncate(text: string, characters: number): any {
    return text.length > characters ? `${text.substr(0, characters)}...` : text;
}
