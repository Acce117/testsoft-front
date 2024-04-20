export function validateEmptyString(text:String){
    if( text.trim() == "")
      throw new Error('error.empty')
}
export function validateEmail(text:string){
  validateEmptyString(text)
  if( !new RegExp('^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$').test(text))
    throw new Error('error.email')
}
export function validateCI(text:string){
  validateEmptyString(text)
  if(!new RegExp('/(\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)|([02468][048]|[13579][26])0229)[0-9]{5}/').test(text))
    throw new Error('error.ci')

}