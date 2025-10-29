export function getInitials(name: string) {
    if (!name) return "";
    const parts = name.split(" "); // divide o nome em palavras
    const initials = parts
        .slice(0, 2) // pega só o primeiro e segundo nome
        .map(part => part[0].toUpperCase()) // pega a primeira letra e coloca maiúscula
        .join(""); // junta
    return initials;
}