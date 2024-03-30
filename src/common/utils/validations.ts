export function validateEmptyString(text:String){
    if( text.trim() == "")
      throw new Error('error.empty')
}