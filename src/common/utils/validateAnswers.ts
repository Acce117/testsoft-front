
//TODO IMPORT ANSWERS AND DONT PASS THESE AS PARAMETERS
export function isTestValid(id_type_question: string, answers, questions) {
    for(let i=0; i<questions.length;i++)
        if (!validateComponent(id_type_question, questions[i].id_question, answers))
            return false
        
    return true
};



export function validateComponent(id_type_question: string, id_question: string, answers) {
    let isComponentValid
    
    if (!answers.hasOwnProperty(id_question))
        isComponentValid = false
    else
        switch (parseInt(id_type_question)) {
            case 2:
                isComponentValid = validateSingleOptionAnswer(id_question, answers)
                break;
            case 5://TODO DO YOUR FUNCTION 
                break;
        }
        
    return isComponentValid
};

function validateSingleOptionAnswer(id_question: string, answers) {
    return answers[id_question] !== null || answers[id_question] !== undefined;
}