export function validateEmptyString(text: String) {
  if (text.trim() == "")
    throw new Error('error.empty')
}
export function validateEmail(text: string) {
  validateEmptyString(text)
  if (!new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/).test(text))
    throw new Error('error.email')
}
export function validateCI(text: string) {
  validateEmptyString(text)
  if (text.length !== 11)
    throw new Error('error.ci')

  let y = text.substring(0, 2); // 82 (year)
  let m = text.substring(2, 4); // 06 (month)
  let d = text.substring(4, 6); // 15/32 (day)
  if (text.charAt(6) === '9')
    y = "18" + y
  else if (Number(text.charAt(6)) >= 0 && Number(text.charAt(6)) <= 5)
    y = "19" + y

  else if (Number(text.charAt(6)) >= 6 && Number(text.charAt(6)) <= 8)
    y = "20" + y
  let date = y + '-' + m + '-' + d
  console.log(date)

  console.log(new Date(date))
  if (isNaN(Date.parse(y + '-' + m + '-' + d)))
    throw new Error('error.ci_date')
}