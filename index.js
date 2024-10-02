
const email = document.getElementById('email');
const dob = document.getElementById('dob');


email.addEventListener('input', () => validate(email));
dob.addEventListener('change', () => validate(dob));


function validate(element) 
{

    if (element.type === 'email') 
        {
        if (element.validity.typeMismatch) 
            {
            element.setCustomValidity('The Email Format Is Wrong!');
            element.reportValidity();
        } 
        else 
        {
            element.setCustomValidity('');
        }
    }

    if (element.type === 'date') 
        {
        const dobValue = new Date(element.value);
        const today = new Date();
        let age = today.getFullYear() - dobValue.getFullYear();
        const monthDiff = today.getMonth() - dobValue.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobValue.getDate())) 
            {
                age--;
            }

        if (age < 18 || age > 55) 
            {
            element.setCustomValidity('Age must be between 18 and 55 years.');
            element.reportValidity();
        } 
        else 
        {
            element.setCustomValidity('');
        }
    }
}

const retrieveEntries = () => {
    let entries = localStorage.getItem('user-entries');
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTerms}</td>`;
        
        const row = `<tr> ${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full">
    <tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">DOB</th>
        <th class="px-4 py-2">Accepted Terms?</th>
    </tr>${tableEntries} </table>`;

    let details = document.getElementById('user-entries');
    details.innerHTML = table;
}

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('acceptTerms').checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTerms
    };

    userEntries.push(entry);
    localStorage.setItem('user-entries', JSON.stringify(userEntries));
    displayEntries();
}

let userForm = document.getElementById('user-form');
userForm.addEventListener("submit", saveUserForm);

displayEntries();
