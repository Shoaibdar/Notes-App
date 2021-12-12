const addbtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem("notes"));

/*
if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    });
}
*/

addbtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '')
{
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="flex-container">
    <div class="controls">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash"></i></button>
    </div>
    

    <div class="main ${text ?"" : "hidden"}"></div>
    <textarea ${text ? "hidden" : ""}></textarea>
    </div>`

    const editbtn = note.querySelector('.edit')
    const deletebtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

    deletebtn.addEventListener('click', () => {
        note.remove()
        SaveList();
    })

    editbtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const{value} = e.target

        main.innerHTML = marked(value)
    
        SaveList();
    })

    document.body.appendChild(note)
}

function SaveList()
{
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}