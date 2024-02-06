export function areRadioGroupsChecked() {
    let allRadioGroupsChecked = true
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    const radioGroupNames = new Set();
    radioInputs.forEach(input => {
        radioGroupNames.add(input.name);
    });
    radioGroupNames.forEach(radioGroupName => {
        if (!isRadioGroupChecked(radioGroupName))
            allRadioGroupsChecked = false

    })
    return allRadioGroupsChecked

}
function isRadioGroupChecked(groupName: string) {
    const radios = document.getElementsByName(groupName);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked)
            return true;
    }

    radios[0].parentElement?.parentElement?.parentElement?.parentElement?.classList.add('question-not-responded')
    return false;
}
