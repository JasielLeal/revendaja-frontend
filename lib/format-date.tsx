export function formatLocalDate(date?: Date | string) {

  if (!date) return undefined

  const d = new Date(date)

  // Zera a hora para evitar deslocamento
  d.setHours(0, 0, 0, 0)

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}
