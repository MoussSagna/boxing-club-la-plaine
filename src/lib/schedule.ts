/** `18:00` → « 18h », `20:30` → « 20h30 ». */
export function formatTime(time: string) {
  const [hours = '', minutes = ''] = time.split(':')
  return `${Number(hours)}h${minutes === '00' ? '' : minutes}`
}
