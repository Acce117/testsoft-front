
const questionsNotAnswered = {
    "2": Array(),
    "5": Array(),
};

const pushQuestionsNotAnswered = (questions: any[]) => {
    questions.forEach((question) => {
        switch (parseInt(question.question.fk_id_type_question)) {
            case 2:
                questionsNotAnswered["2"].push(question);
                break;
            case 5:
                questionsNotAnswered["5"].push(question);
                break;
            //ADD OTHERS QUESTION TYPES
        }
    });
}

export function getErrorMessages(questions: any[]) {
    let errorMessages = Array()
    pushQuestionsNotAnswered(questions)
    for (let key in questionsNotAnswered) {
        if (questionsNotAnswered[key].length > 0) {
            let error = ''
            switch (parseInt(key)) {
                case 2:
                    error = "Debe seleccionar una respuesta ";
                    break;
                case 5:
                    error = "Existen puntos por asignar aún ";
                    break;
                //ADD OTHERS QUESTION TYPES
            }
            if (questionsNotAnswered[key].length == 1) error += "en la pregunta "
            else error += "en las preguntas "
            questionsNotAnswered[key].forEach((question:any, index:number) => {
                if (index > 0) {
                    if (index == questionsNotAnswered[key].length - 1) error += ` y `;
                    else error += ", ";
                }
                error += question.questionIndex;
            });
            errorMessages.push(error)
            questionsNotAnswered[key].splice(0, questionsNotAnswered[key].length);
        }
    }
    return errorMessages
};